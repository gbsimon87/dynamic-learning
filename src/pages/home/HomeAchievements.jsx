import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { useRewards } from "../../hooks/useRewards";
import { useTrophyData } from "../../hooks/useTrophyData";
import { localDay, streakStatus, weekDots } from "../../data/streak";
import { hasNews } from "../../data/news";
import { BADGES, heldBadgeIds } from "../../data/badges";
import { countStickers, topicStickers } from "../../data/stickers";
import LevelBar from "../../components/rewards/LevelBar";
import WeekDots from "../../components/rewards/WeekDots";
import "./HomeAchievements.css";

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}

/** The home page's three achievement cards, for the child who is playing. */
export default function HomeAchievements() {
  const { child } = useContext(AuthContext);
  const { rewards, hydrated, xp } = useRewards();
  const { candidates } = useTrophyData(child?._id); // progress, for sticker totals
  if (!child || !hydrated) return null;

  const today = localDay();
  const streak = streakStatus(rewards.streak, today);
  const stickers = candidates.reduce(
    (sum, c) => {
      const n = countStickers(topicStickers(c.curriculum, c.progress, c.isBuilt));
      return { earned: sum.earned + n.earned, total: sum.total + n.total };
    },
    { earned: 0, total: 0 }
  );
  const latest = rewards.recentStickers.at(-1);
  const latestSticker = latest && (() => {
    const [year, subject, topicId] = latest.split("/");
    const c = candidates.find((x) => String(x.year) === year && x.subject === subject);
    return c && topicStickers(c.curriculum, c.progress, c.isBuilt)
      .flatMap((g) => g.stickers)
      .find((s) => s.topicId === topicId);
  })();
  const newBadges = rewards.news.badges.length;
  const newStickers = rewards.news.stickers.length;

  return (
    <section className="home-section home-achievements" aria-labelledby="home-achievements-title">
      <h2 className="home-section-title" id="home-achievements-title">Your adventure</h2>

      {hasNews(rewards) && (
        <Link className="home-ach-card home-ach-news" to="/trophies">
          <span className="home-ach-news-icon" aria-hidden="true">🎁</span>
          <span>
            <strong>Something new!</strong>{" "}
            You earned {[newBadges && plural(newBadges, "new badge", "new badges"), newStickers && plural(newStickers, "sticker", "stickers")].filter(Boolean).join(" and ")}.
          </span>
          <span className="home-ach-go">Open your trophies <span aria-hidden="true">→</span></span>
        </Link>
      )}

      <div className="home-ach-grid">
        <div className="home-ach-card">
          <p className="home-ach-eyebrow">Streak</p>
          <p className="home-ach-big">
            <span aria-hidden="true">🔥 </span>
            {streak.current > 0 ? plural(streak.current, "day", "days") : "Start a streak today!"}
          </p>
          {streak.atRisk && <p className="home-ach-note">Play today to keep it going!</p>}
          {rewards.streak.freezes > 0 && (
            <p className="home-ach-note">🧊 {plural(rewards.streak.freezes, "freeze", "freezes")} saved up</p>
          )}
          <WeekDots dots={weekDots(rewards.streak, today)} />
          <LevelBar xp={xp} className="home-ach-level" />
        </div>

        <Link className="home-ach-card home-ach-collection" to="/trophies">
          <p className="home-ach-eyebrow">Collection</p>
          <p className="home-ach-big">
            {heldBadgeIds(rewards).size} of {BADGES.length} badges
          </p>
          <p className="home-ach-note">{stickers.earned} of {stickers.total} stickers</p>
          {latestSticker && (
            <p className="home-ach-latest">
              <span className="home-ach-sticker" aria-hidden="true">{latestSticker.icon}</span>
              Latest: {latestSticker.name}
            </p>
          )}
        </Link>
      </div>
    </section>
  );
}
