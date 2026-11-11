import * as measurement from "../challenges/year3Measurement.js";
import { paperQuestion, essential, seededPaper, paperMoney } from "./paperQuestions.js";
export const MEASUREMENT_BUILDERS = {
  "measuring-length-in-mm-cm-and-m": measurement.buildLengthQuestions,
  "measuring-mass": measurement.buildMassQuestions,
  "measuring-volume-and-capacity": measurement.buildVolumeQuestions,
  "adding-and-subtracting-measurements": measurement.buildMeasurementArithmeticQuestions,
  "perimeter-of-2-d-shapes": measurement.buildPerimeterQuestions,
  "money-and-giving-change": measurement.buildMoneyQuestions,
  "telling-the-time-to-the-minute": measurement.buildTimeToMinuteQuestions,
  "roman-numerals-and-24-hour-clocks": measurement.buildRoman24Questions,
  "units-of-time-and-durations": measurement.buildDurationQuestions,
};
// Year 3 records pounds and pence separately, including adapted source stories.
const moneyWords = (text) => text.replace(/£(\d+)\.(\d{2})/g, (_all, pounds, pence) => `£${pounds} ${Number(pence)}p`);
function adapt(topic, level, q) {
  let prompt = q.prompt, answer = q.answer, model = null, reason = "";
  switch (q.type) {
    case "read-scale": case "read-jug": prompt = `Read the ${q.type === "read-jug" ? "measuring jug" : q.unit === "g" ? "weighing scale" : "ruler"}. What ${q.unit === "g" ? "mass" : q.unit === "ml" ? "volume" : "length"} is marked A? Give your answer in ${q.unit}.`; model = essential(q.type === "read-jug" ? "jug" : q.unit === "g" ? "dial-scale" : "ruler", { min: q.min, max: q.max, step: q.majorStep, minorStep: q.minorStep, value: q.answer, unit: q.unit }); answer = `${q.answer} ${q.unit}`; break;
    case "compare-measures": case "compare-durations": prompt = `Write <, > or = between these measures: ${q.leftLabel} ____ ${q.rightLabel}. Show how you compared them.`; answer = q.left === q.right ? "=" : q.left > q.right ? ">" : "<"; break;
    case "mixed-build": prompt = `Convert ${q.major} ${q.majorUnit} ${q.minor} ${q.minorUnit} into ${q.minorUnit}.`; answer = `${q.answer} ${q.minorUnit}`; reason = `${q.majorUnit === "m" ? "1 m = 100 cm" : q.majorUnit === "kg" ? "1 kg = 1000 g" : "1 l = 1000 ml"}.`; break;
    case "measure-calculation": case "mixed-calculation": prompt = `Work out ${q.calculation}. Give your answer in ${q.unit}.`; answer = `${q.answer} ${q.unit}`; break;
    case "mixed-result": prompt = `Work out ${q.calculation}. Give your answer in ${q.majorUnit} and ${q.minorUnit}.`; answer = `${q.major} ${q.majorUnit} ${q.minor} ${q.minorUnit}`; break;
    case "perimeter-read": case "perimeter-trace": prompt = "Find the perimeter of this shape. The diagram is not drawn to scale."; answer = `${q.answer} cm`; model = essential("perimeter", { shape: q.shape, sides: q.sides }); break;
    case "perimeter-missing": prompt = `The perimeter is ${q.perimeter} cm. Find the missing side length. The diagram is not drawn to scale.`; answer = `${q.answer} cm`; model = essential("perimeter", { shape: q.shape, sides: q.sides }); break;
    case "money-add": prompt = `Find the total of ${paperMoney(q.first)} and ${paperMoney(q.second)}. Give your answer in pounds and pence.`; answer = paperMoney(q.answer); break;
    case "money-change": case "money-coins": prompt = `You pay ${paperMoney(q.paid)} for an item costing ${paperMoney(q.cost)}. How much change should you get? Give your answer in pounds and pence.`; answer = paperMoney(q.answer); break;
    case "money-story": prompt = moneyWords(q.prompt); answer = `${q.answer}p (${paperMoney(q.answer)})`; break;
    case "read-clock-minute": case "roman-clock-read": case "clock-words": prompt = q.type === "clock-words" ? "Write the time shown on this clock in words." : "Write the time shown on this clock in digits."; model = essential("clock", { hour: q.hour, minute: q.minute, roman: q.type === "roman-clock-read" }); break;
    case "set-clock-minute": case "set-roman-clock": prompt = `Draw the hands to show ${q.type === "set-roman-clock" ? measurement.formatDigital24(q.hour24, q.minute) : measurement.formatDigital12(q.hour, q.minute)}.`; answer = `Minute hand at minute ${q.minute}; hour hand ${q.minute ? "part-way after" : "at"} ${q.hour}.`; model = essential("clock", { blank: true, roman: q.type === "set-roman-clock" }); break;
    case "to-24-hour": prompt = `Write ${measurement.formatDigital12(q.hour, q.minute)} ${q.period} using the 24-hour clock.`; break;
    case "from-24-hour": prompt = `Write ${measurement.formatDigital24(q.hour, q.minute)} using the 12-hour clock and am or pm.`; break;
    case "order-durations": prompt = `Order these durations, shortest first: ${q.items.map((item) => item.label).join("; ")}.`; answer = q.ordered; break;
    case "duration-timeline": prompt = `An activity starts at ${measurement.formatDigital24(q.startHour, q.startMinute)} and ends at ${measurement.formatDigital24(q.endHour, q.endMinute)} on the same day. How long does it last?`; answer = `${q.answer} minutes`; break;
    default: break;
  }
  if (q.type === "time-story") answer = `${answer} minutes`;
  return paperQuestion("math", topic, level, prompt, answer, model, reason, { data: q });
}
export function measurementPaperPool(topic) {
  if (!MEASUREMENT_BUILDERS[topic]) return [];
  return [1, 2, 3, 4].flatMap((level) => MEASUREMENT_BUILDERS[topic](level, seededPaper(level * 71)).map((q) => adapt(topic, level, q)).filter(Boolean));
}
