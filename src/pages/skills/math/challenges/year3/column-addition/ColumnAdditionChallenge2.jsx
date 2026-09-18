import ColumnMethodGame from "../ColumnMethodGame";

export default function ColumnAdditionChallenge2({ onComplete }) {
  return <ColumnMethodGame operation="add" level={2} onComplete={onComplete} />;
}
