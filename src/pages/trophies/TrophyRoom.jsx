import { useContext, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { useTrophyData } from "../../hooks/useTrophyData";
import { BADGES, badgeProgress, heldBadgeIds } from "../../data/badges";
import { countStickers, topicStickers } from "../../data/stickers";
import { pickResume } from "../../data/curriculumResume";
import { getYearStats } from "../../data/curriculumProgressStats";
import ProgressRing from "../../components/ProgressRing";
import Mascot from "../../components/mascot/Mascot";
import LevelBar from "../../components/rewards/LevelBar";
import { useRewards } from "../../hooks/useRewards";
import { displayXp } from "../../data/xp";
import { streakStatus, localDay } from "../../data/streak";
import { stickerKey } from "../../data/news";
import "./TrophyRoom.css";

function earnedOn(rewards, badgeId) {
  const at = rewards.badges.find((entry) => entry.id === badgeId)?.earnedAt;
  if (!at) return null;
  return new Date(at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function BadgeShelf({ rewards, fresh }) {
  const held = heldBadgeIds(rewards);

  return (
    <section className="trophy-section" aria-labelledby="trophy-badges">
      <h2 id="trophy-badges">Badges</h2>
      <ul className="trophy-badges">
        {BADGES.map((badge) => {
          const isHeld = held.has(badge.id);
          const progress = isHeld ? null : badgeProgress(badge, rewards);
          const date = isHeld ? earnedOn(rewards, badge.id) : null;

          return (
            <li key={badge.id} className={`trophy-badge ${isHeld ? "is-held" : "is-locked"}`}>
              {fresh?.badges.has(badge.id) && <span className="trophy-new">NEW</span>}
              <span className="trophy-badge-icon" aria-hidden="true">{badge.icon}</span>
              <strong>{badge.name}</strong>
              {isHeld ? (
                <span className="trophy-badge-note">
                  {badge.blurb}
                  {date && <span className="trophy-badge-date">Earned {date}</span>}
                </span>
              ) : (
                <span className="trophy-badge-note">
                  <span className="sr-only">Not earned yet. </span>
                  <span aria-hidden="true">🔒 </span>{badge.hint}
                </span>
              )}
              {progress && (
                <span className="trophy-meter" role="img" aria-label={`${progress.current} of ${progress.target}`}>
                  <span style={{ width: `${(progress.current / progress.target) * 100}%` }} />
                  <em aria-hidden="true">{progress.current} of {progress.target}</em>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function StickerBook({ candidate, open, fresh }) {
  const { year, subjectName, curriculum, progress, isBuilt } = candidate;
  const groups = topicStickers(curriculum, progress, isBuilt);
  const count = countStickers(groups);
  const stats = getYearStats(progress, curriculum, isBuilt);

  return (
    <details className="trophy-year" open={open}>
      <summary>
        <ProgressRing
          percent={stats.percent}
          prefix="tr-ring"
          label={`${stats.percent}% of Year ${year} ${subjectName} complete`}
        />
        <span className="trophy-year-title">
          <strong>Year {year} {subjectName}</strong>
          <span>{count.earned} of {count.total} stickers</span>
        </span>
      </summary>

      {groups.map((group) => (
        <div className="trophy-quest" key={group.categoryId}>
          <h3>{group.title}</h3>
          <ul className="trophy-stickers">
            {group.stickers.map((sticker) => {
              const note = sticker.earned
                ? "Collected!"
                : !sticker.available
                  ? "Coming soon"
                  : `${sticker.remaining} to go`;
              return (
                <li
                  key={sticker.topicId}
                  className={`trophy-sticker ${sticker.earned ? "is-earned" : "is-locked"}`}
                >
                  {fresh?.stickers.has(stickerKey(year, candidate.subject, sticker.topicId)) && (
                    <span className="trophy-new">NEW</span>
                  )}
                  <span className="trophy-sticker-disc" aria-hidden="true">{sticker.icon}</span>
                  <span className="trophy-sticker-name">{sticker.name}</span>
                  <span className="trophy-sticker-note">
                    <span className="sr-only">{sticker.earned ? "Sticker collected." : "Sticker not collected yet."} </span>
                    {sticker.earned ? <span aria-hidden="true">{note}</span> : note}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </details>
  );
}

function NextUp({ resume, candidates, isActive, name }) {
  // The child reads "Your …"; a grown-up reads the child's name.
  const whose = isActive || !name ? "Your" : `${name}’s`;
  if (!resume) return null;

  // Everything built in the year they were working on is done: point them on
  // rather than leaving the card out and the room with no way forward.
  if (!resume.next) {
    return (
      <section className="trophy-next" aria-labelledby="trophy-next">
        <span className="trophy-next-disc" aria-hidden="true">🎉</span>
        <div className="trophy-next-text">
          <h2 id="trophy-next">Next up</h2>
          <p>Every Year {resume.year} {resume.subjectName} challenge is done.{isActive && " Ready for a new adventure?"}</p>
        </div>
        {isActive && (
          <Link className="trophy-next-play" to="/curriculum">
            Choose what’s next <span aria-hidden="true">→</span>
          </Link>
        )}
      </section>
    );
  }
  const { next } = resume;
  const candidate = candidates.find(
    (entry) => entry.year === resume.year && entry.subject === resume.subject
  );
  const sticker = candidate
    ? topicStickers(candidate.curriculum, candidate.progress, candidate.isBuilt)
      .flatMap((group) => group.stickers)
      .find((entry) => entry.topicId === next.topicId)
    : null;

  return (
    <section className="trophy-next" aria-labelledby="trophy-next">
      <span className="trophy-next-disc" aria-hidden="true">{sticker?.icon ?? "⭐"}</span>
      <div className="trophy-next-text">
        <h2 id="trophy-next">Next up</h2>
        <p>
          {sticker?.available
            ? <>{whose} <strong>{next.topicName}</strong> sticker — {sticker.remaining} {sticker.remaining === 1 ? "challenge" : "challenges"} to go!</>
            : <>{isActive ? "Keep going with" : "Working on"} <strong>{next.topicName}</strong>.</>}
        </p>
      </div>
      {isActive && (
        <Link className="trophy-next-play" to={next.href}>
          Play <span aria-hidden="true">→</span>
        </Link>
      )}
    </section>
  );
}

/**
 * The collection itself, for one child. Read-only — nothing here can award or
 * remove anything.
 *
 * `grownUp` is the parent's view of any child (from /parent): no Bix, no Play
 * button, and the heading names the child rather than addressing them.
 */
function TrophyCabinet({ viewed, grownUp = false }) {
  const own = useRewards();
  const { clearNews } = own;
  const stored = useTrophyData(viewed?._id); // grown-up: rewards + progress; child: progress only
  const rewards = grownUp ? stored.rewards : own.rewards;
  const loading = grownUp ? stored.loading : stored.loading || !own.hydrated;
  const { candidates } = stored;

  // What was new when this visit began: the ribbons show it for the whole
  // visit, while the stored news is cleared once, after the rewards load.
  const [fresh, setFresh] = useState(null);
  useEffect(() => {
    if (grownUp || !own.hydrated || fresh) return;
    setFresh({ badges: new Set(own.rewards.news.badges), stickers: new Set(own.rewards.news.stickers) });
    clearNews();
  }, [grownUp, own.hydrated, own.rewards, clearNews, fresh]);
  const resume = useMemo(() => pickResume(candidates), [candidates]);

  const held = heldBadgeIds(rewards).size;
  const stickers = candidates.reduce(
    (sum, candidate) => {
      const count = countStickers(topicStickers(candidate.curriculum, candidate.progress, candidate.isBuilt));
      return { earned: sum.earned + count.earned, total: sum.total + count.total };
    },
    { earned: 0, total: 0 }
  );
  // Open the book at the year they are working in; the rest stay folded.
  const openYear = resume?.year ?? (Number(viewed?.yearGroup) || candidates[0]?.year);

  return (
    <main className="trophy-room">
      <header className="trophy-header">
        {grownUp && (
          <Link className="trophy-back" to="/parent">
            <span aria-hidden="true">← </span>Back to the parent area
          </Link>
        )}
        <p className="trophy-eyebrow">Trophy Room</p>
        <h1>
          <span aria-hidden="true">{viewed?.avatar} </span>
          {viewed?.name ? `${viewed.name}’s trophies` : "Your trophies"}
        </h1>
      </header>

      {loading ? (
        <p role="status" className="trophy-loading">Opening the trophy cabinet…</p>
      ) : (
        <>
          <ul className="trophy-summary" aria-label="Collection so far">
            <li><strong>{held}</strong> of {BADGES.length} badges</li>
            <li><strong>{stickers.earned}</strong> of {stickers.total} stickers</li>
          </ul>

          <div className="trophy-stats">
            <LevelBar xp={grownUp ? displayXp(rewards, null) : own.xp} />
            <p>
              <span aria-hidden="true">🔥 </span>
              {streakStatus(rewards.streak, localDay()).current}-day streak · best {rewards.streak.best}
            </p>
          </div>

          <div className={`trophy-next-row ${grownUp ? "" : "has-bix"}`}>
            {/* Bix cheers the child on towards their next sticker. */}
            {!grownUp && (
              <div className="trophy-bix">
                <Mascot className="mascot-medium" label="Bix is cheering you on" />
              </div>
            )}
            <NextUp
              resume={resume}
              candidates={candidates}
              isActive={!grownUp}
              name={viewed?.name}
            />
          </div>

          <BadgeShelf rewards={rewards} fresh={fresh} />

          <section className="trophy-section" aria-labelledby="trophy-stickers">
            <h2 id="trophy-stickers">Sticker book</h2>
            <p className="trophy-section-note">Finish every challenge in a topic to collect its sticker.</p>
            {candidates.map((candidate) => (
              <StickerBook
                key={`${candidate.year}-${candidate.subject}`}
                candidate={candidate}
                fresh={fresh}
                open={candidate.year === openYear}
              />
            ))}
          </section>
        </>
      )}
    </main>
  );
}

/**
 * /trophies — the child who is playing, and only them. Siblings' rooms are the
 * grown-up's to look at, from /parent (below), not a child's.
 */
export default function TrophyRoom() {
  const { child } = useContext(AuthContext);
  return <TrophyCabinet viewed={child} />;
}

/**
 * /parent/trophies/:childId — a grown-up looking at one child's room. Only a
 * child of the signed-in account resolves; anything else is sent back.
 */
export function ChildTrophyRoom() {
  const { childId } = useParams();
  const { status, children = [] } = useContext(AuthContext);
  if (status === "loading") return null;
  if (status === "signedOut") return <Navigate to="/login" replace />;

  const viewed = children.find((kid) => kid._id === childId);
  if (!viewed) return <Navigate to="/parent" replace />;
  return <TrophyCabinet viewed={viewed} grownUp />;
}
