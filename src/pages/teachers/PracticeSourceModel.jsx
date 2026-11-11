import PracticeDataModel from "./PracticeDataModel";
import GeographyVisual from "../../components/challenge/geography/GeographyVisual";
import SourceVisual from "../../components/challenge/history/SourceVisual";
import HistoryIllustration from "../../components/challenge/history/HistoryIllustration";
import TimelineVisual from "../../components/challenge/history/TimelineVisual";
import "../../components/challenge/geography/geography.css";
import "../../components/challenge/history/history.css";

export default function PracticeSourceModel({ model }) {
  if (model.type === "geography-source") return <div className="pp-source-model"><GeographyVisual visual={model.visual} sources={model.sources} />{model.chart && <PracticeDataModel model={{ ...model.chart, type: "bar-chart", caption: model.chart.unit }} />}{model.taskLines.map((line, i) => <p key={i}>{line}</p>)}</div>;
  const story = model.story;
  return <div className="pp-source-model">
    <p className="pp-evidence-title">Read the source before answering</p>
    {story.lines.map((line, i) => <p key={i}>{line}</p>)}
    {(model.visual?.type === "source" || story.image) && <SourceVisual image={model.visual?.type === "source" ? model.visual.image : story.image} />}
    {model.visual?.type === "scene" && <HistoryIllustration scene={model.visual.scene} />}
    {(model.visual?.type === "timeline" || story.timeline) && <TimelineVisual timeline={model.visual?.timeline ?? story.timeline} />}
    {model.taskLines.map((line, i) => <p key={i}>{line}</p>)}
  </div>;
}
