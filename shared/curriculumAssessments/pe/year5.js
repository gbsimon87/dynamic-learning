// Year 5 PE knowledge checks. These do not assess movement, fitness or swimming.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });

export default defineAssessmentBank({ year: 5, subject: "pe", quests: {
  "team-games": {
    "football-hockey-and-rugby-tag": { objective: "Knows basic rules of football, hockey and tag rugby (knowledge check, not a movement assessment).", items: [
      { q: "Which player may handle the ball inside their own penalty area in football?", a: "The goalkeeper", d: ["Any defender", "The captain"], practice: 1, why: "Only the goalkeeper may use their hands in the penalty area." },
      { q: "In tag rugby, how is a player stopped instead of being tackled?", a: "A defender pulls off a tag", d: ["A defender grabs their shirt", "A defender knocks them over"], practice: 1, why: "Tag rugby has no tackling. A defender pulls off a tag." },
      { q: "Sort the rules by the game they belong to.", sort: { bins: ["Football", "Hockey"], cards: [["Throw-in", "Football"], ["Goal kick", "Football"], ["Shooting circle", "Hockey"], ["Only the flat side of the stick hits the ball", "Hockey"]] }, practice: 2, why: "Throw-ins and goal kicks belong to football. The shooting circle and flat stick side belong to hockey." },
    ] },
    "netball-and-basketball": { objective: "Knows rules for moving with the ball in netball and basketball (knowledge check).", items: [
      { q: "How many players are in a netball team on court?", a: "7", d: ["5", "11"], practice: 1, why: "Netball teams have seven players on court. Basketball has five." },
      { q: "How do you move with the ball in basketball?", a: "Bounce it as you move (dribble)", d: ["Run holding it", "Throw it and chase it"], practice: 1, why: "In basketball you dribble the ball. Running holding it is travelling." },
      { q: "Which is allowed in netball?", a: "Pivoting on your landing foot", d: ["Running with the ball", "Bouncing the ball as you walk"], practice: 4, why: "In netball you may pivot but not run with the ball." },
    ] },
    "attacking-and-defending": { objective: "Chooses attacking and defending ideas (knowledge check).", items: [
      { q: "Which is a good attacking idea?", a: "Move into a free space", d: ["Stand beside a defender", "Hide behind the goalpost"], practice: 4, why: "Free space gives a teammate a clear pass." },
      { q: "Sort these into attacking and defending ideas.", sort: { bins: ["Attacking", "Defending"], cards: [["Pass to a free teammate", "Attacking"], ["Move into space", "Attacking"], ["Mark an opponent", "Defending"], ["Block the shot", "Defending"]] }, practice: 2, why: "Attackers create chances to score. Defenders stop them." },
      { q: "A defender should stay between the attacker and what?", a: "The goal", d: ["The bench", "The halfway line"], practice: 1, why: "Staying between the attacker and the goal makes scoring harder." },
    ] },
    "net-and-wall-games": { objective: "Knows features of net and wall games (knowledge check).", items: [
      { q: "What must a ball or shuttle go over in tennis and badminton?", a: "The net", d: ["The wall", "The bench"], practice: 1, why: "These are net games. The ball or shuttle goes over the net." },
      { q: "Sort the equipment by sport.", sort: { bins: ["Tennis", "Badminton"], cards: [["Racket and ball", "Tennis"], ["Racket and shuttle", "Badminton"], ["Yellow felt ball", "Tennis"], ["Feathered shuttle", "Badminton"]] }, practice: 2, why: "Tennis uses a ball. Badminton uses a shuttle." },
      { q: "Which is a good plan in a net game?", a: "Hit the ball to a space away from your opponent", d: ["Hit it straight at your opponent", "Never hit it over the net"], practice: 4, why: "Hitting into an empty space makes it hard for the other side to return the ball." },
    ] },
    "cricket-and-rounders": { objective: "Knows the jobs of players in striking and fielding games (knowledge check).", items: [
      { q: "In cricket and rounders, which player delivers the ball to the batter?", a: "The bowler", d: ["The wicket-keeper", "The umpire"], practice: 1, why: "The bowler delivers the ball to the batter. The umpire makes decisions." },
      { q: "Sort the jobs by team.", sort: { bins: ["Batting team", "Fielding team"], cards: [["Hit the ball", "Batting team"], ["Run between posts", "Batting team"], ["Catch the ball", "Fielding team"], ["Bowl", "Fielding team"]] }, practice: 2, why: "The batting team tries to score. The fielding team tries to stop runs." },
      { q: "A fielder catches the ball cleanly before it bounces. What happens to the batter?", a: "The batter is out", d: ["The batter scores extra runs", "The batter bats again"], practice: 4, why: "In cricket and rounders, a clean catch before the ball bounces gets the batter out." },
    ] },
  },
  "athletics-gymnastics-and-dance": {
    "track-and-field-events": { objective: "Tells track events from field events (knowledge check).", items: [
      { q: "Sort the events into track and field.", sort: { bins: ["Track", "Field"], cards: [["Sprint", "Track"], ["Relay", "Track"], ["Long jump", "Field"], ["Javelin", "Field"]] }, practice: 2, why: "Track events are races. Field events are jumps and throws." },
      { q: "Which event is a jump?", a: "High jump", d: ["Shot put", "Relay"], practice: 1, why: "The high jump is a jumping event. Shot put is a throw and a relay is a race." },
      { q: "Which event is a throw?", a: "Javelin", d: ["Hurdles", "Long jump"], practice: 1, why: "A javelin is thrown. Hurdles is a race and long jump is a jump." },
    ] },
    "times-and-distances": { objective: "Reads times and distances to compare results (knowledge check).", items: [
      { q: "What is a sprint race usually measured in?", a: "Seconds", d: ["Metres", "Kilograms"], practice: 1, why: "Races are timed in seconds, minutes and hours for longer ones." },
      { q: "Mia jumped 3.2 m last week and 3.5 m today. What is this?", say: "Mia jumped 3.2 metres last week and 3.5 metres today. What is this?", a: "A new personal best", d: ["A worse result", "The same result"], practice: 4, why: "3.5 m is longer than 3.2 m, so she improved." },
      { q: "Use the table. Who ran fastest?", a: "Sam", d: ["Ola", "Priya"], practice: 3,
        model: table("Example 60 m race times", ["Runner", "Time (seconds)"], [["Ola", "10.4"], ["Sam", "9.8"], ["Priya", "10.1"]], "A table of three runners and their race times in seconds."),
        why: "The smallest time is the fastest. 9.8 seconds is the smallest." },
    ] },
    "gymnastics-and-dance": { objective: "Knows words that describe gymnastics and dance (knowledge check, not a performance assessment).", items: [
      { q: "What word means holding your body steady without falling?", t: "balance", practice: 1, why: "Balance is staying steady." },
      { q: "Put the parts of a gymnastics sequence in order.", order: ["Start still", "Move through the actions", "Finish still"], practice: 4, why: "A sequence has a clear start, middle and end." },
      { q: "Which word means bending and stretching your body easily?", a: "Flexibility", d: ["Speed", "Volume"], practice: 1, why: "Flexibility is how far your joints and muscles can bend and stretch." },
    ] },
  },
  "outdoors-and-swimming": {
    "orienteering-and-teamwork": { objective: "Knows how maps and teamwork help in outdoor challenges (knowledge check).", items: [
      { q: "What do orienteers use to find their way?", a: "A map and compass", d: ["A stopwatch only", "A football"], practice: 1, why: "A map shows the route and a compass shows direction." },
      { q: "Which is good teamwork on a challenge?", a: "Listen to everyone's ideas", d: ["One person does everything", "Run off alone"], practice: 4, why: "Good teams share jobs and listen to each other." },
      { q: "On a map, what does the key tell you?", a: "What the symbols mean", d: ["Who won", "How fast to run"], practice: 2, why: "The key explains the symbols used on the map." },
    ] },
    "swimming-and-water-safety": { objective: "Knows swimming strokes and water safety rules (knowledge check, not a swimming assessment).", items: [
      { q: "Which is a swimming stroke?", a: "Backstroke", d: ["Backflip", "Backstop"], practice: 1, why: "Backstroke is swum on your back." },
      { q: "Which is the safest place to swim?", a: "A pool with a lifeguard on duty", d: ["A fast river", "A deep quarry lake"], practice: 2, why: "Always swim where a lifeguard or a grown-up is watching. Rivers and quarries can be cold, deep and fast." },
      { q: "If you fall into deep water, what is a good first thing to do?", a: "Float on your back and call for help", d: ["Swim away fast", "Hold your breath and sink"], practice: 4, why: "Floating helps you stay calm and keep your head up while you call for help." },
    ] },
  },
  "fitness-and-fair-play": {
    "warming-up-and-fitness": { objective: "Knows why we warm up and how to stay healthy (knowledge check).", items: [
      { q: "Why do we warm up before exercise?", a: "To get muscles ready and reduce injury", d: ["To make the game shorter", "To get tired first"], practice: 1, why: "A warm-up raises your heart rate and loosens muscles." },
      { q: "Put these in order.", order: ["Warm up", "Play the game", "Cool down"], practice: 3, why: "We warm up first, play, then cool down." },
      { q: "Sort these into good and unhelpful habits for an active life.", sort: { bins: ["Helpful", "Unhelpful"], cards: [["Drink water", "Helpful"], ["Stretch after exercise", "Helpful"], ["Skip warm-ups", "Unhelpful"], ["Never move around", "Unhelpful"]] }, practice: 2, why: "Water and stretching help. Skipping warm-ups and never moving do not." },
    ] },
    "fair-play-and-personal-best": { objective: "Knows what fair play and personal best mean (knowledge check).", items: [
      { q: "What is a personal best?", a: "Your own best result so far", d: ["The world record", "The best result in your class"], practice: 1, why: "A personal best compares you with your own earlier results." },
      { q: "Your team loses a match. What is the fair play thing to do?", a: "Shake hands and say well played", d: ["Blame a team-mate", "Say the referee cheated"], practice: 4, why: "Fair play means respect for opponents, team-mates and the referee." },
      { q: "Sort these into fair play and not fair play.", sort: { bins: ["Fair play", "Not fair play"], cards: [["Follow the rules", "Fair play"], ["Encourage a team-mate", "Fair play"], ["Cheat to win", "Not fair play"], ["Laugh at a mistake", "Not fair play"]] }, practice: 2, why: "Fair play is honest and kind." },
    ] },
  },
} });
