// Figures for the Year 5 PE bank. A figure draws what a question describes; it
// never prints the answer. Players are circles (team A) or squares (team B) with
// a letter in them, so a team is never shown by colour alone.
const blocks = (count, each, unit, item, plural) => ({ type: "blocks", count, each, unit, item, ...(plural ? { plural } : {}) });
const picto = (unit, ...rows) => ({ type: "pictogram", unit, rows: rows.map(([label, count]) => ({ label, count })) });
const bars = (unit, ...rows) => ({ type: "bars", unit, rows: rows.map(([label, value]) => ({ label, value })) });
const a = (x, y, t = "A", name) => ({ at: [x, y], team: "a", t, name });
const b = (x, y, t = "D", name) => ({ at: [x, y], team: "b", t, name });
const pitch = (sport, extra = {}) => ({ type: "pitch", sport, ...extra });
const compass = (show, facing) => ({ type: "orienteering", kind: "compass", show: [show], facing });
const water = (kind) => ({ type: "water", kind });
const dancers = (alt, ...poses) => ({ type: "poses", row: true, alt, items: poses.map((pose) => ({ pose })) });
const POSE_ALT = {
  balance: "A person standing on one leg with both arms out to the sides, holding still.",
  toeTouch: "A person standing with straight legs together and folding forwards at the hips to reach past their toes.",
  plank: "A person holding a straight plank position on their hands and toes.",
};
const one = (pose) => ({ type: "poses", row: true, alt: POSE_ALT[pose], items: [{ pose }] });
const foulBox = pitch("football", { players: [a(9, 38, "A", "an attacker"), b(12, 58, "D", "a defender")], alt: "An attacker and a defender are close together inside the penalty area." });

export const YEAR5_PE_TOPIC_VISUALS = {
  "football-hockey-and-rugby-tag": pitch("football", { labels: [{ at: [26, 84], text: "Penalty area" }, { at: [66, 94], text: "Touchline" }], players: [a(4, 50, "GK", "goalkeeper")], caption: "Every game has rules for hands, restarts and scoring." }),
  "netball-and-basketball": { type: "poses", alt: "Two players. A netball player holds the ball, ready to pass. A basketball player bounces the ball as they move.", items: [{ pose: "catch", ball: [0, -98], lines: ["Netball", "hold the ball,", "pass in 3 seconds"] }, { pose: "crouch", ball: [34, -26], lines: ["Basketball", "bounce the ball", "to move"] }] },
  "attacking-and-defending": pitch("football", { players: [a(34, 30, "A"), a(60, 72, "A"), b(44, 42, "D"), b(72, 48, "D")], arrows: [{ from: [34, 22], to: [56, 14], kind: "run" }], labels: [{ at: [68, 14], text: "space" }, { at: [27, 54], text: "marking" }], caption: "Attackers move into space. Defenders stay close and mark." }),
  "net-and-wall-games": pitch("tennis", { players: [a(6, 30, "A"), b(94, 70, "B")], ball: [66, 52], arrows: [{ from: [12, 32], to: [62, 50], kind: "pass" }], labels: [{ at: [50, 4], text: "net" }], caption: "Send the ball over the net so your opponent cannot return it." }),
  "cricket-and-rounders": pitch("cricket", { players: [a(50, 50, "Bat"), b(34, 50, "B"), b(66, 50, "WK"), b(18, 28, "F"), b(82, 74, "F"), b(30, 82, "F")], caption: "Circle: batting team. Square: fielding team." }),
  "track-and-field-events": { type: "athletics", kind: "events" },
  "times-and-distances": { type: "measure" },
  "gymnastics-and-dance": { type: "poses", alt: "Four gymnastics skills. Balance: a person on one leg. Flexibility: a person folding forwards to reach past their toes. Strength: a person holding a plank. Control: a person holding a still stretch-up shape.", items: [{ pose: "balance", lines: ["Balance", "hold", "steady"] }, { pose: "toeTouch", lines: ["Flexibility", "bends and", "stretches"] }, { pose: "plank", lines: ["Strength", "strong", "muscles"] }, { pose: "reach", lines: ["Control", "move with", "care"] }] },
  "orienteering-and-teamwork": { type: "orienteering", kind: "course", caption: "Follow the line from control to control with your map and compass." },
  "swimming-and-water-safety": { type: "water", kind: "code" },
  "warming-up-and-fitness": { type: "fitness" },
  "fair-play-and-personal-best": { type: "fairplay" },
};

export const YEAR5_PE_QUESTION_VISUALS = {
  "football-hockey-and-rugby-tag": [
    ["How does football restart when the whole ball crosses the touchline?", pitch("football", { ball: [50, -5], alt: "The ball is just outside the long side of the pitch." })],
    ["A defender last touches the ball before it crosses their own goal line. What is awarded?", pitch("football", { players: [b(7, 20, "D", "a defender")], ball: [-3, 20], alt: "The ball is past the goal line, to the side of the goal." })],
    ["An attacker last touches the ball before it crosses the goal line, outside the goal. What is awarded?", pitch("football", { players: [a(9, 76, "A", "an attacker")], ball: [-3, 78], alt: "The ball is past the goal line, to the side of the goal." })],
    ["What is awarded when a defender fouls an attacker inside the penalty area?", foulBox],
    ["Sam is fouled inside the penalty area in football. What is awarded?", foulBox],
    ["Mia is the football goalkeeper and picks up a pass from her own teammate's foot inside the penalty area. Is that fair?", pitch("football", { players: [a(4, 50, "GK", "Mia, the goalkeeper"), a(12, 34, "T", "her teammate")], arrows: [{ from: [12, 38], to: [5, 47], kind: "pass" }] })],
    ["A shot in football goes wide and crosses the goal line. The attacker touched it last. What happens next?", pitch("football", { players: [a(22, 66, "A", "the attacker")], ball: [-3, 80], arrows: [{ from: [25, 68], to: [0, 78], kind: "pass" }] })],
    ["A defender kicks the ball over their own goal line. What happens next?", pitch("football", { players: [b(7, 20, "D", "the defender")], ball: [-3, 20], alt: "The ball is past the goal line, to the side of the goal." })],
    ["Each of 4 tag rugby teams has 7 players. How many players are there altogether?", blocks(4, 7, "players", "team")],
  ],
  "netball-and-basketball": [
    ["What is the area in netball where goals are shot from called?", pitch("netball", { alt: "A shaded semicircle around each goal post." })],
    ["How many points is a basket from outside the three-point line worth?", pitch("basketball", { players: [a(44, 50, "A", "a player outside the curved line")], arrows: [{ from: [47, 50], to: [8, 50], kind: "pass" }] })],
    ["A basketball player scores one shot from outside the three-point line. How many points is that?", pitch("basketball", { players: [a(44, 50, "A", "a player outside the curved line")], arrows: [{ from: [47, 50], to: [8, 50], kind: "pass" }] })],
    ["Amira scores 4 baskets inside the arc and 2 free throws. How many points does she score?", picto("shot", ["inside the arc", 4], ["free throws", 2])],
    ["A netball team scores 3 goals in each of 4 quarters. How many goals is that?", blocks(4, 3, "goals", "quarter")],
    ["A netball match has 4 quarters of 15 minutes. How many minutes of play is that?", blocks(4, 15, "minutes", "quarter")],
  ],
  "attacking-and-defending": [
    ["A defender stands between you and the goal. What can you do as an attacker?", pitch("football", { players: [a(46, 50, "You", "you, the attacker"), b(28, 50, "D", "a defender")] })],
    ["Everyone on Team A runs after the ball in a bunch. What is the problem?", pitch("football", { players: [a(45, 38), a(55, 48), a(42, 60), a(53, 62), a(34, 48)], ball: [47, 50] })],
    ["An attacker keeps running to where a defender stands. What advice helps?", pitch("football", { players: [a(30, 50, "A", "the attacker"), b(64, 50, "D", "the defender")], arrows: [{ from: [36, 50], to: [56, 50], kind: "run" }] })],
    ["Leo stays close to the player he is guarding. What is he doing?", pitch("football", { players: [a(48, 48, "A", "the player he guards"), b(57, 57, "L", "Leo")] })],
    ["A pass is made towards an attacker and Zoe steps in and catches it. What did she do?", pitch("football", { players: [a(18, 72, "A", "the passer"), a(76, 26, "A", "the attacker"), b(46, 50, "Z", "Zoe")], arrows: [{ from: [24, 66], to: [70, 31], kind: "pass" }] })],
    ["A team of 7 has 3 attackers and the rest defend. How many defenders is that?", picto("player", ["attackers", 3])],
    ["A football team has 1 goalkeeper, 4 defenders and 3 midfielders. The rest are attackers. How many attackers are there?", picto("player", ["goalkeeper", 1], ["defenders", 4], ["midfielders", 3])],
  ],
  "net-and-wall-games": [
    ["A tennis ball lands on the line. Is it in or out?", pitch("tennis", { ball: [30, 12], alt: "The ball sits right on the side line." })],
    ["What is it called when a tennis serve touches the net and lands in the correct box?", pitch("tennis", { players: [a(6, 34, "S", "the server")], ball: [66, 68], arrows: [{ from: [12, 38], to: [62, 66], kind: "pass" }] })],
    ["A tennis serve touches the net and lands in the correct box. What happens?", pitch("tennis", { players: [a(6, 34, "S", "the server")], ball: [66, 68], arrows: [{ from: [12, 38], to: [62, 66], kind: "pass" }] })],
    ["Zoe's shuttle lands just outside the side line in singles. Whose point is it?", pitch("badminton", { ball: [30, 10.5], alt: "The shuttle lands between the two side lines at the top." })],
  ],
  "cricket-and-rounders": [
    ["The batter hits the ball and it rolls over the boundary rope. How many runs is that?", pitch("cricket", { players: [a(50, 50, "Bat")], ball: [96, 50], arrows: [{ from: [56, 50], to: [92, 50], kind: "run" }], caption: "The solid arrow shows a ball rolling along the ground." })],
    ["Leo hits the ball over the boundary without it bouncing. How many runs is that?", pitch("cricket", { players: [a(50, 50, "Bat")], ball: [98, 30], arrows: [{ from: [56, 48], to: [92, 32], kind: "pass" }], caption: "The dashed arrow shows a ball flying through the air." })],
    ["Ana runs round all four posts in rounders. What does her team score?", pitch("rounders", { arrows: [{ from: [50, 80], to: [80, 54], kind: "run" }, { from: [80, 54], to: [50, 18], kind: "run" }, { from: [50, 18], to: [20, 54], kind: "run" }, { from: [20, 54], to: [46, 78], kind: "run" }] })],
    ["Mia stands behind the fielder who is about to catch the ball. What is she doing?", pitch("cricket", { players: [b(72, 36, "F", "a fielder"), b(86, 28, "M", "Mia")], ball: [66, 42], arrows: [{ from: [54, 48], to: [64, 43], kind: "pass" }] })],
    ["A team hits 4 fours. How many runs is that?", blocks(4, 4, "runs", "four", "fours")],
    ["Sam has bowled six balls. What has he completed?", picto("ball", ["balls bowled", 6])],
  ],
  "track-and-field-events": [
    ["Beth passes a baton to Chen. Which race is this?", { type: "athletics", kind: "relay" }],
    ["Ali wants to jump as far as he can into sand. Which event is that?", { type: "athletics", kind: "pit" }],
    ["A relay team has 4 runners who each run 100 metres. How many metres does the team run altogether?", blocks(4, 100, "metres", "runner")],
    ["A track is 400 metres round. Mia runs 2 laps. How many metres is that?", blocks(2, 400, "metres", "lap")],
  ],
  "times-and-distances": [
    ["Amy runs in 14 seconds, Ben in 12 seconds and Cara in 13 seconds. Who wins?", bars("seconds", ["Amy", 14], ["Ben", 12], ["Cara", 13])],
    ["Dev jumps 2.4 metres, Eli jumps 2.8 metres and Fay jumps 2.6 metres. Who jumps furthest?", bars("metres", ["Dev", 2.4], ["Eli", 2.8], ["Fay", 2.6])],
    ["Mia runs 100 metres in 18 seconds and Leo runs it in 15 seconds. How many seconds faster is Leo?", bars("seconds", ["Mia", 18], ["Leo", 15])],
    ["A track lap is 200 metres. How many metres is 4 laps?", blocks(4, 200, "metres", "lap")],
  ],
  "gymnastics-and-dance": [
    ["Mia balances on one leg and holds still. Which skill is she showing?", one("balance")],
    ["Dan reaches far past his toes. Which skill is he showing?", one("toeTouch")],
    ["Ana holds a plank for 30 seconds. Which skill is she showing?", one("plank")],
    ["Ben stands with straight legs together and folds forwards at the hips. Which shape is this?", one("toeTouch")],
    ["A group copies the first dancer, each starting one beat later. What is this called?", dancers("Three dancers doing the same move, each one a beat behind the dancer before.", "star", "reach", "stand")],
    ["All the dancers jump together on the beat. What is this called?", dancers("Three dancers all in the same star jump at the same moment.", "star", "star", "star")],
    ["Jo's sequence has 3 balances, 2 rolls and 4 jumps. How many moves is that?", picto("move", ["balances", 3], ["rolls", 2], ["jumps", 4])],
    ["A dance has 4 sections of 8 counts. How many counts is that altogether?", blocks(4, 8, "counts", "section")],
  ],
  "orienteering-and-teamwork": [
    ["Zoe's map shows contour lines very close together. What is the land like?", { type: "orienteering", kind: "steep", alt: "A map with brown contour lines drawn very close together." }],
    ["Zoe's map shows a large blue patch. What is it?", { type: "orienteering", kind: "water", alt: "A map with one large blue patch." }],
    ["Ben faces north and turns left. Which direction does he face now?", compass("N", "N")],
    ["Ana faces east and turns right. Which direction does she face now?", compass("E", "E")],
    ["On a map, 1 centimetre stands for 100 metres. A route measures 5 centimetres on the map. How many metres is the real route?", blocks(5, 100, "metres", "centimetre")],
  ],
  "swimming-and-water-safety": [
    ["Zara falls into a river by mistake. What should she do first?", water("river")],
    ["Mia sees a toy in a deep pond. What should she do?", water("pond")],
    ["Ben sees a friend struggling in a lake. What should he do?", water("lake")],
    ["A pool is 25 metres long. How many metres is 4 lengths?", blocks(4, 25, "metres", "length")],
    ["Ana swims 2 lengths of a 25 metre pool. How many metres has she swum?", blocks(2, 25, "metres", "length")],
    ["Leo swims 3 lengths of a 25 metre pool. How many metres is that?", blocks(3, 25, "metres", "length")],
  ],
  "warming-up-and-fitness": [
    ["Dev exercises for 20 minutes a day for 5 days. How many minutes is that?", blocks(5, 20, "minutes", "day")],
    ["Jo's resting pulse is 70 beats a minute and after jogging it is 130. How many beats a minute did it rise by?", bars("beats a minute", ["resting", 70], ["after jogging", 130])],
    ["The target is 60 minutes a day and Mia did 35 minutes at school. How many more minutes does she need?", bars("minutes", ["target", 60], ["at school", 35])],
  ],
  "fair-play-and-personal-best": [
    ["Last week Amy skipped 40 times. Today she skipped 46 times. What can she say?", bars("skips", ["last week", 40], ["today", 46])],
    ["Ben's best was 12 catches and today he made 15. How many more catches is that?", bars("catches", ["best so far", 12], ["today", 15])],
    ["Last term Mia ran 400 metres in 90 seconds. Now she runs it in 82 seconds. How many seconds quicker is she?", bars("seconds", ["last term", 90], ["now", 82])],
    ["Ana skips 30, 36, 42 and 48 times over four weeks. How many more skips does she do each week?", bars("skips", ["week 1", 30], ["week 2", 36], ["week 3", 42], ["week 4", 48])],
    ["Cara shoots 10 times and scores 6 goals. How many shots miss?", picto("shot", ["shots", 10], ["goals", 6])],
  ],
};
