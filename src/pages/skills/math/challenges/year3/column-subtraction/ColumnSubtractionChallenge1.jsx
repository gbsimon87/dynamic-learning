import ColumnMethodGame from "../ColumnMethodGame";

export default function ColumnSubtractionChallenge1({ onComplete }) {
  return <ColumnMethodGame operation="subtract" level={1} onComplete={onComplete} />;
}
