import ColumnMethodGame from "../ColumnMethodGame";

export default function ColumnSubtractionChallenge2({ onComplete }) {
  return <ColumnMethodGame operation="subtract" level={2} onComplete={onComplete} />;
}
