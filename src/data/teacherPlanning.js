import { teachingForNeed } from "./teacherClassInput.js";

// Pure planning rules. Assessment evidence is deliberately separate from progress.
export const PLANNING_OBJECTIVES = [
  {
    id: "fractions-as-numbers", title: "Fractions as numbers", strand: "Fractions",
    goal: "Recognise and use unit and non-unit fractions as numbers.",
    teach: "Use equal-length fraction strips and a number line. Agree what counts as one whole before naming or locating a fraction.",
    practical: "Pairs build and label halves, thirds and quarters with equal-length strips, then place them on a number line. Include a point beyond one whole when ready.",
    checkpoint: "Ask pupils to place a new fraction on a number line and explain the size of each equal interval.",
    support: "Keep the whole visible. Start with halves and count equal intervals together.",
    stretch: "Place a fraction beyond one whole and explain its position.",
  },
  {
    id: "fractions-of-a-set-of-objects", title: "Fractions of a set of objects", strand: "Fractions",
    goal: "Find and write unit and non-unit fractions of a discrete set.",
    teach: "Share counters into equal groups. Connect the denominator to the number of groups and the numerator to the groups being selected.",
    practical: "Use 12 counters to find one third, then two thirds. Draw the equal groups and label the selected quantity.",
    checkpoint: "Use a fresh set of counters. Ask pupils to find a fraction and explain why the groups must be equal.",
    support: "Use a small set that divides exactly. Make equal groups before selecting one.",
    stretch: "Find two different fractions of a set that select the same number of counters.",
  },
  {
    id: "equivalent-fractions", title: "Equivalent fractions", strand: "Fractions",
    goal: "Show equivalent fractions with small denominators using diagrams.",
    teach: "Align equal-length strips to compare one half with two quarters. Keep the whole the same size.",
    practical: "Pairs fold equal-length paper strips into halves and quarters, shade equivalent amounts and explain their diagrams.",
    checkpoint: "Show a fresh pair of fraction diagrams. Ask whether the amounts are equivalent and why.",
    support: "Align strips representing the same whole before comparing the shaded lengths.",
    stretch: "Draw another equivalent pair and justify it using equal parts.",
  },
  {
    id: "comparing-and-ordering-fractions", title: "Comparing and ordering fractions", strand: "Fractions",
    goal: "Compare unit fractions and fractions with the same denominator.",
    teach: "Compare fraction strips of the same whole. Separate unit-fraction comparisons from comparisons with the same denominator.",
    practical: "Order one half, one third and one quarter using equal-length strips; then compare two fifths with four fifths.",
    checkpoint: "Ask pupils to explain a new comparison using a diagram of the same whole.",
    support: "Use just two strips first and keep the whole the same length.",
    stretch: "Explain why a larger denominator gives a smaller unit fraction of the same whole.",
  },
  {
    id: "adding-and-subtracting-ones-tens-and-hundreds", title: "Adding and subtracting ones, tens and hundreds", strand: "Addition and subtraction",
    goal: "Mentally add and subtract ones, tens and hundreds from three-digit numbers.",
    teach: "Model a three-digit number with place-value counters. Discuss which place changes when ones, tens or hundreds are added or removed.",
    practical: "Pairs model 234, then add or subtract ones, tens or hundreds. Explain the changed places, including exchanging when ready.",
    checkpoint: "Use a fresh three-digit number and ask pupils to explain a mental addition or subtraction strategy.",
    support: "Keep place-value columns visible and change one place at a time.",
    stretch: "Explain an example that crosses a tens or hundreds boundary.",
  },
];

// Eight fictional pupils, four opportunities per objective. C/I/S/N distinguish
// correct, incorrect, skipped and not assessed; these are not real test results.
const SAMPLE_RESPONSES = [
  ["CIII", "CIII", "CINN", "NNNN", "CCCC"],
  ["ICII", "IIII", "NNNN", "NNNN", "CCCI"],
  ["IICS", "CIII", "NNNN", "NNNN", "CCCC"],
  ["CCII", "CCII", "NNNN", "NNNN", "CCCI"],
  ["IIIS", "IICS", "NNNN", "NNNN", "CCCC"],
  ["CCCI", "CCCI", "NNNN", "NNNN", "CCCC"],
  ["CCCC", "CCCC", "NNNN", "NNNN", "CCCC"],
  ["NNNN", "NNNN", "NNNN", "NNNN", "CCCS"],
];

export const SAMPLE_CLASS = {
  id: "fictional-year3-v1", name: "Sample Year 3 class", version: 1,
  pupils: SAMPLE_RESPONSES.map((responses, index) => ({
    id: `sample-${index + 1}`, label: `Sample pupil ${String.fromCharCode(65 + index)}`,
    responses: Object.fromEntries(PLANNING_OBJECTIVES.map((objective, i) => [objective.id, [...responses[i]]])),
  })),
};

export function summariseObjective(pupils, objectiveId) {
  const distribution = pupils.map((pupil) => {
    const responses = pupil.responses[objectiveId] ?? ["N", "N", "N", "N"];
    const count = (value) => responses.filter((response) => response === value).length;
    const correct = count("C");
    const incorrect = count("I");
    const answered = correct + incorrect;
    return { id: pupil.id, label: pupil.label, correct, incorrect, answered,
      skipped: count("S"), missing: count("N"),
      followUp: answered < 2, support: answered >= 2 && correct / answered < 0.6 };
  });
  const total = (key) => distribution.reduce((sum, row) => sum + row[key], 0);
  const correct = total("correct");
  const answered = total("answered");
  const opportunities = answered + total("skipped") + total("missing");
  const coverage = opportunities ? answered / opportunities : 0;
  const accuracy = answered ? correct / answered : null;
  const sufficientlyAssessed = distribution.filter((row) => !row.followUp).length;
  const enoughEvidence = coverage >= 0.75 && sufficientlyAssessed >= Math.ceil(pupils.length * 0.75) && pupils.length > 0;
  const priority = !enoughEvidence ? "check" : accuracy < 0.6 ? "teach" : accuracy < 0.8 ? "consolidate" : "retrieve";
  const labels = { check: "Check first", teach: "Teaching priority", consolidate: "Consolidate", retrieve: "Retrieval practice" };
  const reason = !enoughEvidence
    ? `${answered} of ${opportunities} responses available. Gather more evidence before choosing teaching time.`
    : `${correct} of ${answered} answered questions correct. ${priority === "retrieve" ? "Use brief retrieval and check individual needs." : "Review the responses and allow focused teaching time."}`;
  return { objectiveId, correct, answered, incorrect: total("incorrect"), skipped: total("skipped"),
    missing: total("missing"), coverage, accuracy, priority, label: labels[priority], reason, distribution };
}

export const SAMPLE_EVIDENCE = PLANNING_OBJECTIVES.map((objective) => summariseObjective(SAMPLE_CLASS.pupils, objective.id));

export function moveItem(items, index, offset) {
  const target = index + offset;
  if (index < 0 || index >= items.length || target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function generateTeachingPlan({ selectedIds, lessonsPerWeek = 5, duration = 45, evidence = [], resources = [], evidenceMeta = {}, objectives = PLANNING_OBJECTIVES, year = 3, subjectName = "Maths", subject = "math" }) {
  if (!Number.isInteger(lessonsPerWeek) || lessonsPerWeek < 1 || lessonsPerWeek > 5 || !Number.isInteger(duration) || duration < 20 || duration > 90) {
    throw new RangeError("Choose 1–5 lessons per week and 20–90 minutes per lesson.");
  }
  // Catalogue order keeps foundational fraction representations before comparisons.
  const selected = objectives.filter((objective) => selectedIds.includes(objective.id));
  if (!selected.length) throw new RangeError("Choose at least one objective.");
  const count = lessonsPerWeek * 3;
  const snapshots = selected.map((objective) => {
    const summary = evidence.find((row) => row.objectiveId === objective.id);
    return { objectiveId: objective.id, reason: summary?.reason ?? "No assessment evidence. Start with a teacher-led check.", priority: summary?.priority ?? "check",
      source: summary?.source ?? evidenceMeta.source ?? "unspecified", needs: summary?.needs?.map((need) => ({ ...need, resourceIds: need.resourceIds ? [...need.resourceIds] : null })) ?? [] };
  });
  const focuses = selected.flatMap((objective, objectiveIndex) => {
    const snapshot = snapshots[objectiveIndex];
    const active = snapshot.needs.filter((need) => need.priority !== "retrieve");
    return (active.length ? active : snapshot.needs.length ? snapshot.needs : [null]).map((need) => ({
      objective, objectiveIndex, needId: need?.needId, resourceIds: need?.resourceIds, title: need?.title ?? objective.title,
      reason: need?.reason ?? snapshot.reason, priority: need?.priority ?? snapshot.priority,
    }));
  });
  const teachingSlots = Math.max(focuses.length, Math.ceil(count * 2 / 3));
  if (focuses.length > count) throw new RangeError("Choose fewer learning needs or more lessons so each focus has a lesson.");
  const allocation = focuses.map(() => 1);
  const weight = (focus) => ({ teach: 3, consolidate: 2, check: 1, retrieve: 1 })[focus.priority] ?? 1;
  for (let remaining = teachingSlots - focuses.length; remaining > 0; remaining -= 1) {
    const target = focuses.reduce((best, focus, i) => weight(focus) / (allocation[i] + 1) > weight(focuses[best]) / (allocation[best] + 1) ? i : best, 0);
    allocation[target] += 1;
  }
  const sequence = focuses.flatMap((_, i) => Array.from({ length: allocation[i] }, () => i));
  const retrieval = evidence.find((row) => row.priority === "retrieve" && !selectedIds.includes(row.objectiveId));
  const retrievalObjective = objectives.find((objective) => objective.id === retrieval?.objectiveId);
  const lessons = Array.from({ length: count }, (_, index) => {
    const focusIndex = index < teachingSlots ? sequence[index] : (index - teachingSlots) % focuses.length;
    const focus = focuses[focusIndex];
    const objective = focus.objective;
    const teaching = teachingForNeed(focus.needId, objective);
    const revisit = index >= teachingSlots;
    const previousOccurrences = Array.from({ length: index }, (_, earlier) => earlier < teachingSlots ? sequence[earlier] : (earlier - teachingSlots) % focuses.length).filter((value) => value === focusIndex).length;
    const stage = revisit ? "Revisit and apply" : snapshotStage(previousOccurrences, focus.priority);
    const options = resources.filter((resource) => resource.objectiveIds.includes(objective.id) && resource.available && (!focus.needId || resource.needIds?.includes(focus.needId)) && (!focus.resourceIds || focus.resourceIds.includes(resource.id)));
    const curriculum = options.filter((resource) => resource.kind === "curriculum");
    const resource = curriculum[Math.min(previousOccurrences, curriculum.length - 1)] ?? options[0];
    const practiceMinutes = Math.min(10, Math.floor(duration / 4));
    const checkpointMinutes = 5;
    const starterMinutes = 5;
    return {
      id: `lesson-${index + 1}`, objectiveId: objective.id, needId: focus.needId ?? null, learningGoal: focus.title,
      title: `${stage}: ${focus.title}`,
      duration, rationale: focus.reason,
      starter: retrievalObjective ? `Brief retrieval: ${retrievalObjective.goal} Ask pupils to explain their method.` : "Ask pupils to show what they remember about today's objective using a drawing or objects.",
      // Briefing notes are written for teachers; Bix's lesson lines are for children.
      teaching: resource?.detailLevel === "lesson" && objective.source !== "briefing" ? resource.lesson.lines.join(" ") : teaching.teach,
      activity: resource?.detailLevel === "lesson" && resource.lesson.example ? `Work through “${resource.lesson.example.title}” together. Ask pupils to explain the steps, then use the selected challenge for practice.` : teaching.practical, checkpoint: teaching.checkpoint,
      support: teaching.support, stretch: teaching.stretch, notes: "",
      vocabulary: objective.vocabulary ?? [], briefingPath: objective.briefingPath ?? null,
      timing: { starter: starterMinutes, teaching: duration - starterMinutes - practiceMinutes - checkpointMinutes, practice: practiceMinutes, checkpoint: checkpointMinutes },
      resources: resource ? [{ resourceId: resource.id, minutes: practiceMinutes, instruction: resource.instruction }] : [],
    };
  });
  return { title: `Year ${year} ${subjectName.toLowerCase()} · Three-week teaching plan`, year, subject, subjectName, objectives: selected.map((objective) => ({ ...objective })), lessonsPerWeek, duration,
    evidenceSource: evidenceMeta.source ?? "unspecified", inputRevision: evidenceMeta.revision ?? 0, classSize: evidenceMeta.classSize ?? null,
    retrievalReason: retrieval?.reason ?? "", snapshots, lessons };
}

function snapshotStage(occurrence, priority) {
  if (occurrence === 0 && priority === "check") return "Check and explore";
  return ["Model and explore", "Guided practice", "Explain and connect", "Apply independently", "Check and consolidate"][Math.min(occurrence, 4)];
}
