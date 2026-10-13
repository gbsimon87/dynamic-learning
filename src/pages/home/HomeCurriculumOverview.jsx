import { CURRICULUM_SUBJECTS, loadCurriculum } from "../../data/curriculumRegistry";
import { isChallengeImplemented } from "../../data/challengeAvailability";

const overviewSubjects = [
  ...CURRICULUM_SUBJECTS.filter((subject) => subject.id !== "geography"),
  ...CURRICULUM_SUBJECTS.filter((subject) => subject.id === "geography"),
];

// Read the content inventory, never a learner's completion or award status.
const rows = [1, 2, 3, 4, 5, 6].map((year) => ({
  year,
  subjects: overviewSubjects.map(({ id }) => {
    const curriculum = loadCurriculum(year, id);
    if (!curriculum) return null;
    const topics = curriculum.flatMap((category) => category.topics);
    const challenges = topics.flatMap((topic) => topic.challenges.map((challenge) => (
      isChallengeImplemented(id, year, topic.id, challenge.id)
    )));
    return {
      topics: topics.length,
      built: challenges.filter(Boolean).length,
      complete: challenges.length > 0 && challenges.every(Boolean),
    };
  }),
}));
const pathways = rows.flatMap((row) => row.subjects).filter(Boolean);
const totals = {
  pathways: pathways.filter((pathway) => pathway.complete).length,
  topics: pathways.reduce((sum, pathway) => sum + pathway.topics, 0),
  challenges: pathways.reduce((sum, pathway) => sum + pathway.built, 0),
};

export default function HomeCurriculumOverview() {
  return (
    <div className="home-coverage">
      <h3 id="home-coverage-title">A world of learning, ready to explore</h3>
      <p className="home-coverage-summary">
        <strong>{totals.pathways} completed pathways</strong>
        <span>{totals.topics} topics · {totals.challenges.toLocaleString("en-GB")} challenges</span>
      </p>
      <div className="home-coverage-scroll" role="region" aria-labelledby="home-coverage-title" tabIndex={0}>
        <table className="home-coverage-table" aria-describedby="home-coverage-key home-coverage-note">
          <caption id="home-coverage-key">Number of topics by year and subject</caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              {overviewSubjects.map((subject) => (
                <th scope="col" key={subject.id}>
                  <span className="home-coverage-subject">
                    <span aria-hidden="true">{subject.icon}</span> {subject.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.year}>
                <th scope="row">Year {row.year}</th>
                {row.subjects.map((pathway, index) => (
                  <td key={overviewSubjects[index].id}>
                    {pathway ? (
                      <strong className="home-coverage-count">{pathway.topics}</strong>
                    ) : <span className="home-coverage-empty">Not yet available</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="home-coverage-note" id="home-coverage-note">
        Learn with Bix is independently developed and is not affiliated with or endorsed by the UK government.
      </p>
    </div>
  );
}
