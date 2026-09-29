import { useContext, useMemo, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { useTrophyData } from "../../hooks/useTrophyData";
import { BADGES, badgeProgress, heldBadgeIds } from "../../data/badges";
import { countStickers, topicStickers } from "../../data/stickers";
import { pickResume } from "../../data/curriculumResume";
import { getYearStats } from "../../data/curriculumProgressStats";
import ProgressRing from "../../components/ProgressRing";
import "./TrophyRoom.css";

function earnedOn(rewards, badgeId) {
  const at = rewards.badges.find((entry) => entry.id === badgeId)?.earnedAt;
  if (!at) return null;
  return new Date(at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function BadgeShelf({ rewards }) {
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

function StickerBook({ candidate, open }) {
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

function NextUp({ resume, candidates, viewed, isActive }) {
  if (!resume?.next) return null;
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
            ? <>Your <strong>{next.topicName}</strong> sticker — {sticker.remaining} {sticker.remaining === 1 ? "challenge" : "challenges"} to go!</>
            : <>Keep going with <strong>{next.topicName}</strong>.</>}
        </p>
      </div>
      {isActive ? (
        <Link className="trophy-next-play" to={next.href}>
          Play <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <Link className="trophy-next-play" to="/profiles">
          Switch to {viewed.name} to play
        </Link>
      )}
    </section>
  );
}

/**
 * The Trophy Room: every badge and topic sticker a child has, and the ones
 * still to win. Read-only — nothing here can award or remove anything.
 */
export default function TrophyRoom() {
  const { child, children = [] } = useContext(AuthContext);
  const [viewedId, setViewedId] = useState(child?._id);
  const viewed = children.find((kid) => kid._id === viewedId) ?? child;
  const { loading, rewards, candidates } = useTrophyData(viewed?._id);
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
        <p className="trophy-eyebrow">Trophy Room</p>
        <h1>
          <span aria-hidden="true">{viewed?.avatar} </span>
          {viewed?.name ? `${viewed.name}’s trophies` : "Your trophies"}
        </h1>

        {children.length > 1 && (
          <div className="trophy-picker" role="group" aria-label="Whose trophies">
            {children.map((kid) => (
              <button
                key={kid._id}
                type="button"
                aria-pressed={kid._id === viewed?._id}
                onClick={() => setViewedId(kid._id)}
                style={{ "--trophy-kid-colour": `var(${kid.colour})` }}
              >
                <span aria-hidden="true">{kid.avatar}</span> {kid.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {loading ? (
        <p role="status" className="trophy-loading">Opening the trophy cabinet…</p>
      ) : (
        <>
          <ul className="trophy-summary" aria-label="Collection so far">
            <li><strong>{held}</strong> of {BADGES.length} badges</li>
            <li><strong>{stickers.earned}</strong> of {stickers.total} stickers</li>
          </ul>

          <NextUp
            resume={resume}
            candidates={candidates}
            viewed={viewed}
            isActive={viewed?._id === child?._id}
          />

          <BadgeShelf rewards={rewards} />

          <section className="trophy-section" aria-labelledby="trophy-stickers">
            <h2 id="trophy-stickers">Sticker book</h2>
            <p className="trophy-section-note">Finish every challenge in a topic to collect its sticker.</p>
            {candidates.map((candidate) => (
              <StickerBook
                key={`${candidate.year}-${candidate.subject}`}
                candidate={candidate}
                open={candidate.year === openYear}
              />
            ))}
          </section>
        </>
      )}
    </main>
  );
}
