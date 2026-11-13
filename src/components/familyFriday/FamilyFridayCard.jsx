import { Link } from 'react-router';
import { editionPath, isFamilyFriday } from '../../../shared/familyFridaySchedule.js';
import { useFamilyFridayDay } from '../../hooks/useFamilyFridayDay.js';
import './FamilyFriday.css';

export default function FamilyFridayCard() {
  const day = useFamilyFridayDay();
  if (!day || !isFamilyFriday(new Date(`${day}T12:00:00Z`))) return null;
  return (
    <section className="ff-theme family-friday-card" aria-labelledby="family-friday-heading">
      <div className="ff-ticket" aria-hidden="true"><span>FRIDAY</span><strong>5</strong><span>little questions</span></div>
      <div className="ff-card-copy">
        <p className="ff-eyebrow">It’s Family Friday!</p>
        <h2 id="family-friday-heading">Five questions. Your whole crew.</h2>
        <p>Gather round for this week’s Family Friday Quiz. Chat, choose and discover something new together.</p>
        <div className="ff-tags"><span>5 minutes or less</span><span>No account needed</span></div>
      </div>
      <Link className="ff-button" to={editionPath(day)}>Play the quiz <span aria-hidden="true">→</span></Link>
    </section>
  );
}
