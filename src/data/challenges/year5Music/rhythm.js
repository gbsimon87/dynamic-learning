import { fact as f, sequence as o, sentence as s, measurement as n, groups as g, linked } from "../year5Creative/shared.js";

// Beats are crotchet beats. Every sum below is worked out here, never typed.
const DURATIONS = [["a semibreve", 4], ["a minim", 2], ["a crotchet", 1], ["a crotchet rest", 1], ["paired quavers", 1], ["four semiquavers", 1]];

function combinations(size, within) {
  const out = [];
  const walk = (start, chosen) => {
    if (chosen.length === size) {
      const total = chosen.reduce((sum, [, beats]) => sum + beats, 0);
      if (within(total)) out.push(chosen);
      return;
    }
    for (let i = start; i < DURATIONS.length; i += 1) walk(i, [...chosen, DURATIONS[i]]);
  };
  walk(0, []);
  return out;
}
const spread = (items, count) => items.filter((_, i) => i % Math.max(1, Math.floor(items.length / count)) === 0).slice(0, count);

/** "How many beats do these add up to?" questions. */
const addUp = spread(combinations(3, (t) => t >= 3 && t <= 8), 12).map((parts) => n(
  `A bar has ${parts.map(([name]) => name).join(", ")}. How many crotchet beats is that altogether?`,
  parts.reduce((sum, [, beats]) => sum + beats, 0), { maxDigits: 2 }));

/** "How many beats are missing?" questions for a time signature. */
const missing = [2, 3, 4].flatMap((top) => [...combinations(1, (t) => t < top), ...combinations(2, (t) => t < top)]
  .map((parts) => n(
    `A bar in ${top}/4 holds ${top} crotchet beats. It has ${parts.map(([name]) => name).join(" and ")} so far. How many crotchet beats are missing?`,
    top - parts.reduce((sum, [, beats]) => sum + beats, 0), { maxDigits: 2 })));

const NAMES = [["semibreve", "4 beats"], ["minim", "2 beats"], ["crotchet", "1 beat"], ["paired quavers", "1 beat"], ["semiquaver", "a quarter of a beat"]];

export const rhythm = {
  "note-values-and-rests": {
    rule: "A semibreve lasts 4 beats, a minim 2 beats and a crotchet 1 beat. Two quavers (paired) make 1 beat and four semiquavers make 1 beat. A crotchet rest is 1 beat of silence.",
    hint: "Count in crotchet beats: semibreve 4, minim 2, crotchet 1, paired quavers 1, four semiquavers 1.",
    facts: [
      ...linked(NAMES, (note) => `How long does ${note === "paired quavers" ? "a pair of quavers last altogether" : `a ${note} last`}?`),
      f("Which is the longest note in this list?", "Semibreve", "Minim", "Crotchet"),
      f("Which is the shortest note in this list?", "Semiquaver", "Quaver", "Crotchet"),
      f("What is a crotchet rest?", "One beat of silence", "One beat of sound", "Two beats of silence"),
      f("How many quavers last as long as one crotchet?", "Two", "Four", "Eight"),
      f("How many semiquavers last as long as one crotchet?", "Four", "Two", "Eight"),
      f("What do we call notes that are joined together in twos by a beam?", "Paired quavers", "Semibreves", "Minims"),
      f("How many minims last as long as a semibreve?", "Two", "Four", "One"),
      f("How many crotchets last as long as a minim?", "Two", "Four", "One"),
      f("What is a rest in music?", "A silence of a set length", "A very quiet note", "A loud note"),
      f("What is the pulse of a piece of music?", "The steady beat you could tap along to", "The loudest note", "The title of the piece"),
    ],
    sorts: [
      g("Sort these notes.", ["1 beat or more", "Less than 1 beat"], [["Semibreve", 0], ["Minim", 0], ["Crotchet", 0], ["One quaver", 1], ["One semiquaver", 1], ["Half a crotchet", 1]]),
      g("Sort these.", ["Sound", "Silence"], [["Crotchet", 0], ["Minim", 0], ["Semiquaver", 0], ["Crotchet rest", 1], ["A rest of one beat", 1], ["A silent beat", 1]]),
      g("Sort by the number of crotchet beats.", ["2 beats", "4 beats"], [["Minim", 0], ["Two crotchets", 0], ["A crotchet and a crotchet rest", 0], ["Semibreve", 1], ["Two minims", 1], ["Four crotchets", 1]]),
      g("Sort what lasts the same as one crotchet.", ["Same as a crotchet", "Not the same"], [["Paired quavers", 0], ["Four semiquavers", 0], ["A crotchet rest", 0], ["A minim", 1], ["A semibreve", 1], ["Three crotchets", 1]]),
      g("Sort these groups of notes.", ["Add up to 2 beats", "Add up to 3 beats"], [["A minim", 0], ["Crotchet and crotchet", 0], ["Crotchet and paired quavers", 0], ["Minim and crotchet", 1], ["Three crotchets", 1], ["Crotchet and two paired quavers", 1]]),
      g("Sort these note names.", ["Longer than a crotchet", "Shorter than a crotchet"], [["Minim", 0], ["Semibreve", 0], ["Two minims tied", 0], ["Quaver", 1], ["Semiquaver", 1], ["Paired quavers each", 1]]),
    ],
    structures: [
      o("Order these notes from the longest to the shortest.", ["Semibreve", "Minim", "Crotchet", "Semiquaver"]),
      o("Order these from the shortest to the longest.", ["Semiquaver", "Quaver", "Crotchet", "Minim"]),
      o("Order the notes by the beats they last, longest first.", ["Semibreve", "Minim", "Crotchet", "Paired quavers each"]),
      o("Order the groups by how many beats they last, fewest first.", ["A crotchet", "A minim", "Minim and crotchet", "A semibreve"]),
      s("Build a sentence about a semibreve.", "A semibreve lasts four crotchet beats."),
      s("Build a sentence about quavers.", "Two quavers last as long as one crotchet."),
      s("Build a sentence about rests.", "A crotchet rest is one beat of silence."),
      g("Which statements are true?", ["True", "False"], [["A minim is two beats", 0], ["Four semiquavers make one beat", 0], ["A rest is silent", 0], ["A semibreve is one beat", 1], ["A crotchet is two beats", 1], ["Two crotchets equal a semibreve", 1]]),
      g("Sort by the family of notes.", ["Long notes", "Short notes"], [["Semibreve", 0], ["Minim", 0], ["Two minims tied", 0], ["Quaver", 1], ["Semiquaver", 1], ["Paired quavers", 1]]),
    ],
    enquiries: [
      n("How many crotchets last as long as a semibreve?", 4),
      n("How many quavers last as long as a minim?", 4),
      n("How many semiquavers last as long as a quaver?", 2),
      n("How many semiquavers last as long as a minim?", 8),
      n("How many crotchet beats are in a minim and a crotchet?", 3),
      n("A piece has a semibreve and a minim. How many crotchet beats is that?", 6),
      ...addUp.slice(0, 3),
      f("Mia taps two quick notes in one beat. Which notes are they?", "Paired quavers", "A minim", "A semibreve"),
      f("Jo reads four very fast notes in a single beat. Which notes are they?", "Four semiquavers", "A minim", "Two crotchets"),
      f("Ravi plays a note for two beats. Which note is it?", "A minim", "A crotchet", "A quaver"),
      o("Order Asha's rhythm from the shortest note to the longest.", ["Semiquaver", "Quaver", "Crotchet", "Minim"]),
      s("Build Ben's rhythm note.", "A minim lasts for two beats."),
      g("Sort Zara's rhythm cards.", ["One beat", "More than one beat"], [["Crotchet", 0], ["Paired quavers", 0], ["Crotchet rest", 0], ["Minim", 1], ["Semibreve", 1], ["Two crotchets tied", 1]]),
      o("Order Leo's rests and notes by the length of sound, shortest first.", ["Paired quavers", "Two crotchets", "A semibreve"]),
      s("Build Sam's clap rule.", "Clap on each crotchet and rest on a rest."),
      g("Sort Mia's note groups by total beats.", ["2 beats", "3 beats"], [["Minim", 0], ["Two crotchets", 0], ["Paired quavers and a crotchet", 0], ["Minim and crotchet", 1], ["Three crotchets", 1], ["Crotchet and two pairs of quavers", 1]]),
    ],
  },

  "time-signatures": {
    rule: "A time signature at the start of a piece tells you how many beats are in each bar. In 2/4, 3/4 and 4/4 the top number is the beats in a bar and the bottom 4 means the beats are crotchets.",
    hint: "Read the top number for the beats in every bar, and remember the bottom 4 means crotchet beats.",
    facts: [
      f("What does the top number of 3/4 tell you?", "There are 3 beats in each bar", "There are 3 bars", "The music is 3 minutes long"),
      f("What does the bottom 4 in a time signature mean here?", "The beats are crotchets", "There are four bars", "The music is very loud"),
      f("How many crotchet beats are in a bar of 2/4?", "Two", "Three", "Four"),
      f("How many crotchet beats are in a bar of 3/4?", "Three", "Two", "Four"),
      f("How many crotchet beats are in a bar of 4/4?", "Four", "Two", "Three"),
      f("Which time signature is often called common time?", "4/4", "3/4", "2/4"),
      f("Which dance is written in 3/4?", "The waltz", "The march", "The disco"),
      f("Which time signature suits a march with two steps to a bar?", "2/4", "3/4", "5/4"),
      f("What is a bar in music?", "A group of beats between two bar lines", "A single very long note", "A place to buy tickets"),
      f("What are the vertical lines that divide music into bars called?", "Bar lines", "Stave lines", "Ledger lines"),
      f("What marks the end of a piece of music?", "A double bar line", "A clef", "A rest"),
      f("Which beat of the bar usually feels the strongest?", "Beat one", "The last beat", "None of them"),
      f("What is metre?", "The pattern of strong and weaker beats in music", "The height of a note", "The title of a song"),
      f("What is syncopation?", "Stressing the off-beats so the rhythm surprises you", "Playing all notes at the same loudness", "Playing very slowly"),
      f("Mars from The Planets by Holst is famous for which unusual number of beats in a bar?", "Five", "Two", "One"),
    ],
    sorts: [
      g("Sort by the number of crotchet beats in a bar.", ["2 beats", "3 beats", "4 beats"], [["2/4", 0], ["A march step", 0], ["3/4", 1], ["A waltz", 1], ["4/4", 2], ["Common time", 2]]),
      g("Sort these.", ["Time signature", "Not a time signature"], [["2/4", 0], ["3/4", 0], ["4/4", 0], ["pp", 1], ["Treble clef", 1], ["Crotchet rest", 1]]),
      g("Sort what each number tells you.", ["Top number", "Bottom number"], [["How many beats in a bar", 0], ["The number of beats to count", 0], ["3 in 3/4", 0], ["What kind of note is the beat", 1], ["4 means crotchet", 1], ["The 4 in 2/4", 1]]),
      g("Sort these pieces of music.", ["Easy to march to", "Easy to waltz to"], [["Two beats in a bar", 0], ["ONE two, ONE two", 0], ["A marching band tune", 0], ["Three beats in a bar", 1], ["ONE two three, ONE two three", 1], ["A ballroom dance tune", 1]]),
      g("Sort the groups of crotchets into bars.", ["Fits 3/4", "Fits 4/4"], [["Three crotchets", 0], ["A minim and a crotchet", 0], ["Crotchet, crotchet, crotchet", 0], ["Four crotchets", 1], ["Two minims", 1], ["A semibreve", 1]]),
      g("Sort these musical words.", ["About beats and bars", "About pitch"], [["Bar line", 0], ["Time signature", 0], ["Pulse", 0], ["Treble clef", 1], ["Ledger line", 1], ["Octave", 1]]),
    ],
    structures: [
      o("Order the steps of counting a bar of 3/4.", ["Look at the time signature", "Count one, two, three", "Stress beat one", "Start the next bar"]),
      o("Order these time signatures by beats in a bar, fewest first.", ["2/4", "3/4", "4/4"]),
      o("Order the parts of a bar of 4/4 from the first beat.", ["Beat one", "Beat two", "Beat three", "Beat four"]),
      o("Order these note groups by length, shortest first.", ["Crotchet", "Minim", "Minim and crotchet", "Semibreve"]),
      s("Build a sentence about 4/4.", "In 4/4 there are four crotchet beats in every bar."),
      s("Build a sentence about 3/4.", "The waltz has three beats in every bar."),
      s("Build a sentence about bar lines.", "Bar lines divide the music into bars."),
      g("Which statements are true?", ["True", "False"], [["4/4 has four beats in a bar", 0], ["3/4 feels like a waltz", 0], ["Bar lines divide bars", 0], ["2/4 has four beats in a bar", 1], ["The bottom number counts the bars", 1], ["A double bar line starts a piece", 1]]),
      g("Sort by the feeling of the rhythm.", ["In two", "In three"], [["March", 0], ["ONE two", 0], ["Polka-style tune", 0], ["Waltz", 1], ["ONE two three", 1], ["Triple time", 1]]),
    ],
    enquiries: [
      f("Mia counts one, two, three, one, two, three. Which time signature is the tune in?", "3/4", "2/4", "4/4"),
      f("Jo counts one, two, one, two for a marching tune. Which time signature is it?", "2/4", "3/4", "4/4"),
      f("Ravi sees 4/4 at the start of a song. How many crotchet beats are in each bar?", "Four", "Two", "Three"),
      f("Asha sees a vertical line between two groups of notes. What is it?", "A bar line", "A clef", "A rest"),
      f("Ben says the bottom number 4 means a crotchet gets one beat. Is he right?", "Yes", "No, it means four bars", "No, it means four minutes"),
      f("Zara wants music for a waltz. Which time signature should she write?", "3/4", "2/4", "4/4"),
      f("Leo claps in groups of four and stresses the first. Which time signature does it fit?", "4/4", "3/4", "2/4"),
      f("Sam tries a tune with stressed off-beats. What is the effect called?", "Syncopation", "Legato", "A drone"),
      f("Which rhythm fits one bar of 3/4?", "A minim and a crotchet", "A semibreve", "Two minims"),
      n("A piece is in 3/4 and has 4 bars. How many crotchet beats are there altogether?", 12),
      n("A piece is in 4/4 and has 5 bars. How many crotchet beats are there altogether?", 20),
      n("A piece is in 2/4 and has 8 bars. How many crotchet beats are there altogether?", 16),
      o("Order Ravi's steps for reading a new tune.", ["Find the time signature", "Tap the pulse", "Clap the rhythm", "Play the notes"]),
      s("Build Asha's note about her march.", "My march is in two time with a strong first beat."),
      g("Sort Ben's bars.", ["Fits 3/4", "Fits 2/4"], [["Three crotchets", 0], ["A minim and a crotchet", 0], ["A crotchet and a minim", 0], ["Two crotchets", 1], ["A minim", 1], ["Paired quavers and a crotchet", 1]]),
      o("Order Zara's practice from the slowest step to the fastest.", ["Count the bar slowly", "Tap along at half speed", "Clap at the right speed", "Play it at full speed"]),
      s("Build Leo's metre note.", "Beat one is the strongest beat in the bar."),
      g("Sort Sam's pieces.", ["In three", "In four"], [["A waltz", 0], ["A minuet", 0], ["Three beats in a bar", 0], ["A rock song", 1], ["Most pop songs", 1], ["Four beats in a bar", 1]]),
    ],
  },

  "counting-beats-in-a-bar": {
    rule: "Add up the beats in a bar and compare the total with the time signature. In 4/4 a bar holds 4 crotchet beats. A bar that is too short is missing beats, and a bar that is too long has too many.",
    hint: "Add the beats of every note and rest, then compare the total with the top number.",
    facts: [
      f("A bar in 4/4 has a minim and a crotchet. Is it full?", "No, it needs one more beat", "Yes", "No, it has too many beats"),
      f("A bar in 3/4 has a minim and a crotchet. Is it full?", "Yes, it has three beats", "No, it needs one more beat", "No, it has too many beats"),
      f("A bar in 2/4 has a minim. Is it full?", "Yes, it has two beats", "No, it needs one more beat", "No, it has too many beats"),
      f("Which bar is full in 4/4?", "Minim, crotchet, crotchet", "Minim and crotchet", "Three crotchets"),
      f("Which bar is full in 3/4?", "Three crotchets", "Four crotchets", "A semibreve"),
      f("Which bar is full in 2/4?", "Crotchet and paired quavers", "Three crotchets", "A semibreve"),
      f("What do you add to a bar of 4/4 that has three crotchets?", "A crotchet or a crotchet rest", "A minim", "A semibreve"),
      f("Does a rest count when you add up the beats in a bar?", "Yes, a rest counts as silent beats", "No, rests are ignored", "Only at the end of a piece"),
      f("A bar of 4/4 has a semibreve. How many more beats does it need?", "None, it is full", "One", "Two"),
      f("How many beats does a crotchet rest take up?", "One", "Two", "None"),
      f("Which two notes together fill a bar of 4/4?", "Two minims", "Two crotchets", "A crotchet and a minim"),
      f("Which two notes together fill a bar of 3/4?", "A minim and a crotchet", "Two minims", "Two crotchets"),
      f("Four semiquavers have the same total length as which note?", "A crotchet", "A minim", "A semibreve"),
      f("Paired quavers have the same total length as which note?", "A crotchet", "A minim", "A semibreve"),
      f("Which of these makes a bar of 2/4 too long?", "A minim and a crotchet", "A minim", "Two crotchets"),
    ],
    sorts: [
      g("Sort these bars of 4/4.", ["Full", "Not full"], [["Semibreve", 0], ["Two minims", 0], ["Minim and two crotchets", 0], ["Minim", 1], ["Three crotchets", 1], ["Crotchet and minim", 1]]),
      g("Sort these bars of 3/4.", ["Full", "Not full"], [["Three crotchets", 0], ["Minim and crotchet", 0], ["Crotchet and minim", 0], ["A minim", 1], ["Two crotchets", 1], ["A semibreve", 1]]),
      g("Sort these bars of 2/4.", ["Full", "Not full"], [["A minim", 0], ["Two crotchets", 0], ["Crotchet and paired quavers", 0], ["A crotchet", 1], ["A crotchet rest", 1], ["Paired quavers", 1]]),
      g("Sort these bars by the beats they hold.", ["2 beats", "4 beats"], [["Minim", 0], ["Two crotchets", 0], ["Paired quavers and crotchet", 0], ["Semibreve", 1], ["Four crotchets", 1], ["Two minims", 1]]),
      g("Sort these bars of 4/4 by what they need.", ["Needs 1 more beat", "Needs 2 more beats"], [["Three crotchets", 0], ["Minim and crotchet", 0], ["Crotchet rest, crotchet and crotchet", 0], ["A minim", 1], ["Two crotchets", 1], ["Crotchet rest and crotchet", 1]]),
      g("Sort by what to add to a bar of 4/4 that has two crotchets.", ["Fills the bar", "Does not fill the bar"], [["A minim", 0], ["Two crotchets", 0], ["Crotchet and crotchet rest", 0], ["A semibreve", 1], ["A crotchet", 1], ["Paired quavers", 1]]),
    ],
    structures: [
      o("Order the steps of checking a bar.", ["Read the time signature", "Add up the beats", "Compare with the top number", "Fix any bar that is wrong"]),
      o("Order these bars by the beats they hold, fewest first.", ["A crotchet", "A minim", "Minim and crotchet", "A semibreve"]),
      o("Order the notes you might add to a bar, shortest first.", ["Crotchet", "Two crotchets", "Minim and crotchet", "A semibreve"]),
      o("Order the bars of 4/4 from the one needing most beats to the one needing none.", ["A crotchet", "A minim", "Minim and crotchet", "A semibreve"]),
      s("Build a sentence about a full bar.", "A full bar has the same beats as the top number."),
      s("Build a sentence about rests.", "A rest counts as silent beats in the bar."),
      s("Build a sentence about adding beats.", "Add every note and rest to count the beats."),
      g("Which statements are true?", ["True", "False"], [["Rests count in a bar", 0], ["A minim and two crotchets fill a bar of 4/4", 0], ["Two minims fill a bar of 4/4", 0], ["A semibreve fills a bar of 3/4", 1], ["Three crotchets fill 4/4", 1], ["Rests do not count", 1]]),
      g("Sort what can fill a bar of 4/4 with a minim already in it.", ["Fills the bar", "Does not fill it"], [["A minim", 0], ["Two crotchets", 0], ["Crotchet and crotchet rest", 0], ["A semibreve", 1], ["Three crotchets", 1], ["Four crotchets", 1]]),
    ],
    enquiries: [
      ...spread(missing, 8),
      ...addUp.slice(3, 7),
      o("Order Mia's bars by the beats they hold, fewest first.", ["Crotchet rest", "Minim", "Minim and crotchet", "Semibreve"]),
      s("Build Jo's note about his bar.", "My bar is full because it has four beats."),
      g("Sort Ravi's bars of 3/4.", ["Full", "Not full"], [["Minim and crotchet", 0], ["Three crotchets", 0], ["Crotchet, paired quavers, crotchet", 0], ["A minim", 1], ["A semibreve", 1], ["Two crotchets", 1]]),
      o("Order Asha's bars by how many beats are missing in 4/4, most first.", ["A crotchet", "A minim", "Minim and crotchet", "A semibreve"]),
      s("Build Ben's fix.", "I added a crotchet rest to fill the bar."),
      g("Sort Zara's bars of 2/4.", ["Full", "Too long"], [["A minim", 0], ["Two crotchets", 0], ["Crotchet and paired quavers", 0], ["Minim and crotchet", 1], ["A semibreve", 1], ["Three crotchets", 1]]),
    ],
  },

  "tempo-and-rhythm-words": {
    rule: "Tempo is the speed of the music. Allegro is fast and adagio is slow. Accelerando means getting faster and rallentando means getting slower. The pulse is the steady beat.",
    hint: "Think of speed: fast, slow, getting faster, getting slower.",
    facts: [
      f("What does tempo mean?", "The speed of the music", "How loud the music is", "How high the notes are"),
      f("What does allegro mean?", "Fast", "Slow", "Getting louder"),
      f("What does adagio mean?", "Slow", "Fast", "Very quiet"),
      f("What does accelerando mean?", "Getting faster", "Getting slower", "Getting louder"),
      f("What does rallentando mean?", "Getting slower", "Getting faster", "Getting quieter"),
      f("What does andante mean?", "At a walking pace", "Very fast", "Very loud"),
      f("What does presto mean?", "Very fast", "Very slow", "Quiet"),
      f("What does the word pulse mean in music?", "The steady beat", "A loud chord", "A high note"),
      f("What is a metronome used for?", "Keeping a steady beat at a chosen speed", "Tuning a violin", "Making notes louder"),
      f("What does BPM stand for?", "Beats per minute", "Bars per music", "Big piano music"),
      f("A tempo of 120 BPM is faster than 60 BPM. How many beats per minute is faster?", "120", "60", "They are the same"),
      f("What is a rhythm?", "A pattern of long and short sounds", "A kind of instrument", "The loudness of a note"),
      f("What does it mean if the pulse slows down gradually?", "Rallentando", "Accelerando", "Allegro"),
      f("What is a downbeat?", "The strong first beat of a bar", "The last note of a piece", "A very quiet beat"),
      f("What is syncopation?", "Stressing beats that are normally weak", "Making the music louder", "A slow ending"),
    ],
    sorts: [
      g("Sort these words by speed.", ["Fast", "Slow"], [["Allegro", 0], ["Presto", 0], ["Lively", 0], ["Adagio", 1], ["Largo", 1], ["Slow and calm", 1]]),
      g("Sort the changes of tempo.", ["Getting faster", "Getting slower"], [["Accelerando", 0], ["Speeding up", 0], ["Rushing ahead", 0], ["Rallentando", 1], ["Slowing down", 1], ["Easing off", 1]]),
      g("Sort these musical terms.", ["Tempo", "Dynamics"], [["Allegro", 0], ["Adagio", 0], ["Accelerando", 0], ["Forte", 1], ["Piano", 1], ["Crescendo", 1]]),
      g("Sort what these pieces might use.", ["Allegro", "Adagio"], [["A race", 0], ["A fast dance", 0], ["A chase scene", 0], ["A lullaby", 1], ["A sad slow song", 1], ["A calm sunset", 1]]),
      g("Sort what is true about pulse and rhythm.", ["Pulse", "Rhythm"], [["A steady beat", 0], ["Like a heartbeat", 0], ["Tapped along to evenly", 0], ["A pattern of long and short notes", 1], ["Changes from note to note", 1], ["Clapped from the words of a song", 1]]),
      g("Sort the speeds in beats per minute.", ["Slower", "Faster"], [["60 BPM", 0], ["50 BPM", 0], ["70 BPM", 0], ["120 BPM", 1], ["140 BPM", 1], ["160 BPM", 1]]),
    ],
    structures: [
      o("Order these tempo words from the slowest to the fastest.", ["Adagio", "Andante", "Allegro", "Presto"]),
      o("Order the speeds of a piece that gets faster, slowest first.", ["Start slowly", "Speed up a little", "Speed up more", "Finish very fast"]),
      o("Order these beats-per-minute from the slowest to the fastest.", ["50 BPM", "80 BPM", "110 BPM", "140 BPM"]),
      o("Order the steps of practising with a metronome.", ["Set a slow speed", "Play along with the clicks", "Speed it up a little", "Play at the final speed"]),
      s("Build a sentence about allegro.", "Allegro means play the music fast."),
      s("Build a sentence about adagio.", "Adagio means play the music slowly."),
      s("Build a sentence about pulse.", "The pulse is the steady beat in music."),
      g("Which statements are true?", ["True", "False"], [["Allegro is fast", 0], ["Rallentando means getting slower", 0], ["A metronome keeps a steady beat", 0], ["Adagio is fast", 1], ["Accelerando means getting slower", 1], ["Tempo means loudness", 1]]),
      g("Sort by how a tune changes speed.", ["Gets faster", "Gets slower"], [["Accelerando", 0], ["A train leaving a station", 0], ["A bouncing ball speeding up", 0], ["Rallentando", 1], ["A train arriving at a station", 1], ["A ball rolling to a stop", 1]]),
    ],
    enquiries: [
      f("Mia plays a lively dance. Which tempo word fits it?", "Allegro", "Adagio", "Rallentando"),
      f("Jo plays a gentle lullaby. Which tempo word fits it?", "Adagio", "Allegro", "Presto"),
      f("Ravi's song speeds up at the end. Which word describes it?", "Accelerando", "Rallentando", "Adagio"),
      f("Asha's tune slows down at the end. Which word describes it?", "Rallentando", "Accelerando", "Allegro"),
      f("Ben taps a steady beat on his knee. What is he playing?", "The pulse", "A melody", "A chord"),
      f("Zara's metronome says 60. What does that mean?", "60 beats every minute", "60 notes every second", "60 bars in the piece"),
      f("Leo plays at 120 beats per minute, then at 60. Which is faster?", "120", "60", "They are the same"),
      f("Sam plays at a walking pace. Which tempo word is that?", "Andante", "Presto", "Adagio"),
      f("Which tempo word suits a chase scene in a film?", "Presto", "Adagio", "Rallentando"),
      n("A metronome clicks 60 times a minute. How many clicks are there in 3 minutes?", 180),
      n("A piece at 100 beats per minute is played for 2 minutes. How many beats is that?", 200),
      n("A tune has 4 bars of 4 beats. How many beats is that?", 16),
      o("Order Ravi's piece from the slowest section to the fastest.", ["Adagio introduction", "Andante verse", "Allegro chorus", "Presto finish"]),
      s("Build Asha's note about her piece.", "The music slows down with a rallentando at the end."),
      g("Sort Ben's music by tempo.", ["Fast", "Slow"], [["A galloping horse", 0], ["A racing car", 0], ["A fast dance", 0], ["A sleeping baby", 1], ["A slow walk", 1], ["A sad song", 1]]),
      o("Order Zara's practice steps.", ["Count the pulse", "Clap the rhythm slowly", "Speed up gradually", "Play at the tempo of the piece"]),
      s("Build Leo's conductor tip.", "Watch the conductor for changes of tempo."),
      g("Sort Sam's terms.", ["Speed", "Not speed"], [["Allegro", 0], ["Adagio", 0], ["Accelerando", 0], ["Forte", 1], ["Legato", 1], ["Treble clef", 1]]),
    ],
  },
};
