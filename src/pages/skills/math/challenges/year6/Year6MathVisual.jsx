import ScrollableTable from '../../../../../components/ui/ScrollableTable';
import Year5MathVisual from '../year5/Year5MathVisual';

const HEADS = ['Ten millions', 'Millions', 'Hundred thousands', 'Ten thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
export default function Year6MathVisual({ question }) {
  if (question.visual?.type !== 'place6') return <Year5MathVisual question={question} />;
  return <ScrollableTable><table className="year5-table"><caption>Place-value chart</caption>
    <thead><tr>{HEADS.slice(-question.visual.digits.length).map(head => <th key={head} scope="col">{head}</th>)}</tr></thead>
    <tbody><tr>{question.visual.digits.map((digit, i) => <td key={i}>{digit}</td>)}</tr></tbody>
  </table></ScrollableTable>;
}
