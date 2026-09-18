import ColumnMethodGame from "../ColumnMethodGame";

export default function ColumnAdditionChallenge1({ onComplete }) {
  return <ColumnMethodGame operation="add" level={1} onComplete={onComplete} />;
}
