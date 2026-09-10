import { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ThemeContext } from '../../../context/theme-context';
import './OppositeMatch.css';

const PAIRS = [
  // 🌡️ Temperature / Weather
  ['hot', 'cold'],
  ['warm', 'cool'],
  ['wet', 'dry'],
  ['sunny', 'rainy'],

  // 📏 Size / Amount
  ['big', 'small'],
  ['tall', 'short'],
  ['wide', 'narrow'],
  ['full', 'empty'],
  ['heavy', 'light'],

  // 💬 Feelings / Character
  ['happy', 'sad'],
  ['kind', 'mean'],
  ['brave', 'scared'],
  ['polite', 'rude'],
  ['quiet', 'loud'],

  // ⚡ Speed / Movement
  ['fast', 'slow'],
  ['early', 'late'],
  ['near', 'far'],
  ['up', 'down'],
  ['come', 'go'],

  // 🌞 Time / States
  ['day', 'night'],
  ['open', 'closed'],
  ['awake', 'asleep'],
  ['begin', 'end'],
  ['start', 'finish'],

  // 👶 Age / Growth
  ['young', 'old'],
  ['new', 'old'],
  ['first', 'last'],

  // ⚙️ Qualities / Opposites
  ['hard', 'soft'],
  ['strong', 'weak'],
  ['clean', 'dirty'],
  ['bright', 'dark'],
  ['smooth', 'rough'],

  // 💭 Others / Abstract
  ['right', 'wrong'],
  ['in', 'out'],
  ['before', 'after'],
  ['push', 'pull'],
];


function shuffle(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/**
 * Pick `count` pairs, never two that share a word.
 *
 * `old` is the right-hand word of both ['young','old'] and ['new','old']. When a
 * round drew both, `rightWords` contained "old" twice - and that word is used as
 * the React key AND the dnd `droppableId`, which must be globally unique. One
 * drop zone went inert, matching was done by value so dropping onto either
 * marked BOTH as matched, and the round could never reach completion: a dead end
 * with no restart control. Deduping the round makes it structurally impossible
 * while keeping both (individually correct) pairs in the bank.
 */
function getRandomPairs(count = 5) {
  const chosen = [];
  const used = new Set();

  for (const pair of shuffle(PAIRS)) {
    if (chosen.length === count) break;
    if (used.has(pair[0]) || used.has(pair[1])) continue;
    chosen.push(pair);
    used.add(pair[0]);
    used.add(pair[1]);
  }

  return chosen;
}

export default function OppositeMatch() {
  const { theme } = useContext(ThemeContext);
  const [pairs, setPairs] = useState(getRandomPairs());
  const [leftWords, setLeftWords] = useState([]);
  const [rightWords, setRightWords] = useState([]);
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Setup words each round
  useEffect(() => {
    setLeftWords(shuffle(pairs.map((p) => p[0])));
    setRightWords(shuffle(pairs.map((p) => p[1])));
  }, [pairs]);

  // Handle drag end
  function handleDragEnd(result) {
    if (!result.destination) return;

    const dragged = result.draggableId;       // left word
    const target = result.destination.droppableId; // right word

    const pair = pairs.find(([a]) => a === dragged);
    const correct = pair && pair[1] === target;

    setTotal(prev => prev + 1);

    if (correct) {
      setScore(prev => prev + 1);
      setMatches(prev => ({ ...prev, [dragged]: target }));
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      // brief shake animation resets feedback
      setTimeout(() => setFeedback(null), 800);
    }
  }

  // Next round once all matched
  useEffect(() => {
    if (Object.keys(matches).length === pairs.length) {
      setFeedback('done');
      const timer = setTimeout(() => {
        setPairs(getRandomPairs());
        setMatches({});
        setFeedback(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [matches, pairs]);

  return (
    <div className={`match-wrapper ${theme}`}>
      <div className="match-score">Score: {score} / {total}</div>
      <h2 className="match-prompt">Drag each word to its opposite</h2>

      <div className="match-area">
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Left column: Draggable words */}
          <Droppable droppableId="left-column" isDropDisabled={true}>
            {(provided) => (
              <div className="left-column" ref={provided.innerRef}>
                {leftWords.map((word, index) => (
                  <Draggable
                    key={word}
                    draggableId={word}
                    index={index}
                    isDragDisabled={!!matches[word]}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`word-chip ${
                          matches[word] ? 'matched' : ''
                        }`}
                      >
                        {word}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Right column: Drop targets */}
          <div className="right-column">
            {rightWords.map((target) => (
              <Droppable droppableId={target} key={target}>
                {(provided, snapshot) => {
                  // Find if any left word matched this right word
                  const matchedLeft = Object.entries(matches).find(
                    ([, val]) => val === target
                  );
                  const isMatched = Boolean(matchedLeft);

                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`drop-zone ${
                        isMatched ? 'matched' : snapshot.isDraggingOver ? 'hover' : ''
                      }`}
                    >
                      {isMatched ? (
                        <span className="locked">
                          {target}
                        </span>
                      ) : (
                        <span>{target}</span>
                      )}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {feedback && feedback !== 'done' && (
        <div className={`match-feedback ${feedback}`}>
          {feedback === 'correct' ? '✅ Correct!' : '❌ Try again!'}
        </div>
      )}
      {feedback === 'done' && (
        <div className="match-feedback correct">🎉 Well done!</div>
      )}
    </div>
  );
}
