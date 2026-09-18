import ColumnMethodGame from "../ColumnMethodGame";

export default function ColumnAdditionChallenge3({ onComplete }) {
  return <ColumnMethodGame operation="add" level={3} onComplete={onComplete} />;
}
