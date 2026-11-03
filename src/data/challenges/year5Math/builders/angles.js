import { build, choice, choiceN, int, number, pick, shuffle, sort, NAMES } from '../kit.js';

const NAME = r => pick(r, NAMES);
const CLASS_RULE = 'Acute is less than 90°. A right angle is exactly 90°. Obtuse is between 90° and 180°. Reflex is more than 180°.';
const kinds = ['acute', 'right angle', 'obtuse', 'reflex'];
const SCALE_HINT = 'Start at the 0 on the arm that lies along the base line, and read that scale.';

/** A multiple of 5 in [lo, hi] that is not 90 (so a measure never lands on a right angle by accident). */
const five = (r, lo, hi) => { const v = int(r, lo / 5, hi / 5) * 5; return v === 90 ? v + 5 : v; };

export const BUILDERS = {
  angles(l, r, i) {
    if (l === 1) {
      const type = ['acute', 'obtuse', 'reflex', 'right angle', 'obtuse'][i];
      const degrees = type === 'acute' ? int(r, 20, 75) : type === 'obtuse' ? int(r, 105, 165) : type === 'reflex' ? int(r, 200, 320) : 90;
      return choice('What type of angle is this?', type, kinds.filter(k => k !== type), r, { visual: { type: 'angle5', degrees, from: pick(r, ['right', 'left']) }, rule: CLASS_RULE });
    }
    if (l === 2) {
      const degrees = five(r, 15, 165), from = i % 2 ? 'left' : 'right';
      return number('Measure this angle with the protractor. How many degrees is it?', degrees, { visual: { type: 'angle5', degrees, from, protractor: true }, maxDigits: 3, rule: SCALE_HINT, hint: 'Check: is the angle acute or obtuse? Pick the reading that fits.' });
    }
    if (l === 3) {
      const degrees = five(r, 25, 155), from = pick(r, ['right', 'left']);
      return { kind: 'number', prompt: `Draw an angle of ${degrees}°. Use the buttons to move the arm.`, answer: degrees, maxDigits: 3, interaction: 'setAngle', from,
        rule: from === 'right' ? 'The 0 on the right is where the base arm starts. Turn anticlockwise.' : 'The 0 on the left is where the base arm starts. Turn clockwise.', hint: SCALE_HINT };
    }
    const name = NAME(r), a = five(r, 20, 60), b = five(r, 25, 60), h = int(r, 1, 5), late = int(r, 7, 11), quarters = int(r, 2, 3), turn = pick(r, [90, 180]);
    return number([
      `${name} opens a door ${a}°. Then ${name} opens it another ${b}°. How many degrees is the door open now?`,
      `At ${h} o'clock the hour hand points at ${h} and the minute hand at 12. What is the smaller angle between the hands, in degrees?`,
      `At ${late} o'clock, what is the smaller angle between the clock hands, in degrees?`,
      `A spinner turns ${quarters} quarter turns clockwise. How many degrees has it turned?`,
      `A robot turns through a right angle, and then through another ${turn}°. How many degrees has it turned altogether?`,
    ][i], [a + b, 30 * h, 360 - 30 * late, 90 * quarters, 90 + turn][i], { maxDigits: 3 });
  },
  angleFacts(l, r, i) {
    const onLine = i < 3;
    if (l === 1) {
      const given = onLine ? five(r, 30, 150) : five(r, 100, 300), total = onLine ? 180 : 360, answer = total - given, visual = { type: onLine ? 'lineAngles' : 'pointAngles', parts: [given, '?'] };
      return choiceN(`${onLine ? 'Angles on a straight line total 180°.' : 'Angles around a point total 360°.'} What is the size of the missing angle, in degrees?`, answer, [given, total - given + 10, total - given - 10, 360 - given, 90 - given > 0 ? 90 - given : answer + 20].filter(v => v !== answer && v > 0), r,
        { visual, rule: onLine ? 'Angles on a straight line add up to 180°.' : 'Angles around a point add up to 360°.' });
    }
    if (l === 2) {
      const total = onLine ? 180 : 360, a = five(r, 20, onLine ? 80 : 110), b = five(r, 25, onLine ? 70 : 120), c = total - a - b;
      return number(onLine ? 'Three angles meet on a straight line. What is the missing angle, in degrees?' : 'Three angles meet at a point. What is the missing angle, in degrees?', c,
        { visual: { type: onLine ? 'lineAngles' : 'pointAngles', parts: [a, b, '?'] }, maxDigits: 3, hint: `Add the two angles you know, then take the total away from ${total}.` });
    }
    if (l === 3) {
      if (i % 2 === 0) {
        const bins = ['Make 180°', 'Make 360°'], a1 = five(r, 30, 80), a2 = a1 + 60, a3 = five(r, 60, 120), b3 = five(r, 60, 120);
        const cards = [[`${a1}° + ${180 - a1}°`, bins[0]], [`${a2}° + ${180 - a2}°`, bins[0]], [`${a3}° + ${b3}° + ${360 - a3 - b3}°`, bins[1]], [`${a3 + 10}° + ${b3}° + ${350 - a3 - b3}°`, bins[1]]];
        return sort('Sort the angle sets. Which make a straight line and which make a full turn?', bins, shuffle(cards, r));
      }
      const total = onLine ? 180 : 360, a = five(r, 30, onLine ? 80 : 110), b = five(r, 30, onLine ? 80 : 110), c = total - a - b;
      return build(`Build the angle fact for ${onLine ? 'a straight line' : 'angles around a point'}.`, [`${a}`, '+', `${b}`, '+', `${c}`, '=', String(total)], r,
        { visual: { type: onLine ? 'lineAngles' : 'pointAngles', parts: [a, b, c] } });
    }
    const x = int(r, 20, 60), n = pick(r, [5, 6, 8, 9, 10]), name = NAME(r);
    return number([
      `Two straight lines cross. One angle is ${x * 2}°. How many degrees is the angle next to it?`,
      `${name} cuts a round cake into 4 equal slices. How many degrees is the angle of each slice at the centre?`,
      `Three equal angles meet at a point. How many degrees is each angle?`,
      `Two angles on a straight line are x and 2 × x. What is x, in degrees?`,
      `A pizza is cut into ${n} equal slices. How many degrees is the angle at the centre of each slice?`,
    ][i], [180 - x * 2, 90, 120, 60, 360 / n][i], { maxDigits: 3 });
  },
};

export const TOPIC_TITLES = {
  angles: ['What type of angle?', 'Measure with a protractor.', 'Draw the angle.', 'Solve an angle problem.'],
  angleFacts: ['Find the missing angle.', 'Use the angle total.', 'Build an angle fact.', 'Solve an angle story.'],
};
