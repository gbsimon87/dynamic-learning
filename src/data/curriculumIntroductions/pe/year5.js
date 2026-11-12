// Year 5 PE purpose screens. Knowledge only: Bix does not assess movement or fitness.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });

export default defineIntroductions({ year: 5, subject: "pe",
  subjectIntro: I("Welcome to Year 5 PE", ["Learn the rules, words and ideas behind team games, athletics, outdoor challenges and fitness.", "Think about fair play and beating your own best."],
    "Knowing the rules and ideas helps you join in games safely and fairly. Bix teaches the thinking only. It cannot check how you move, so keep playing at school, at clubs and with friends, with a grown-up close for equipment or water.",
    "A good team player moves into a space where a teammate can pass to them, and plays fairly.",
    pictures("Ways to be active", [["⚽", "Team games"], ["🏃", "Athletics"], ["🧭", "Outdoors"], ["🏊", "Swimming"]], "Four pictures show team games, athletics, outdoor challenges and swimming.")),
  quests: {
    "team-games": {
      intro: I("Team games", ["Learn how attacking and defending work in team games.", "Compare football, hockey, netball, basketball, cricket and rounders."],
        "Each game has rules that keep play fair and safe. Knowing them helps you plan where to run and how to work with your team.",
        "Where could you move so a teammate can pass to you?",
        pictures("Team games", [["⚽", "Football"], ["🏑", "Hockey"], ["🏀", "Basketball"], ["🏏", "Cricket"]], "Four pictures show football, hockey, basketball and cricket.")),
      topics: {
        "football-hockey-and-rugby-tag": I("Football, hockey and tag rugby", ["Learn key rules in football, hockey and tag rugby.", "See how each game keeps players safe."],
          "Knowing a rule, such as keeping a hockey stick low, keeps you and others safe.", "In tag rugby, a defender pulls off a tag instead of tackling.",
          table("Three games", ["Game", "A key idea"], [["Football", "Only the goalkeeper handles the ball in the penalty area"], ["Hockey", "Keep the stick low and use the flat side"], ["Tag rugby", "Pull a tag instead of tackling"]], "A table gives one key idea for football, hockey and tag rugby.")),
        "netball-and-basketball": I("Netball and basketball", ["Learn how players move with the ball in each game.", "Know where goals are scored."],
          "These games have different rules about moving with the ball, so you need to know which game you are playing.", "In basketball you bounce the ball to move. In netball you may not run with it.",
          pictures("Court games", [["🏀", "Basketball: dribble"], ["🥅", "Netball: pass within 3 seconds"]], "Two pictures show basketball, where you dribble, and netball, where you pass within three seconds.")),
        "attacking-and-defending": I("Attacking and defending", ["Learn simple ideas for attacking and for defending.", "Choose where to move in a game."],
          "In almost every team game one team attacks to score and the other defends. Good teams keep changing roles quickly.", "An attacker finds a free space. A defender stays between the attacker and the goal.",
          table("Two jobs", ["Job", "Idea"], [["Attack", "Move into space and pass"], ["Defend", "Mark a player and block the way"]], "A table gives one idea each for attacking and defending.")),
        "net-and-wall-games": I("Net and wall games", ["Learn about games like tennis and badminton.", "Learn how a point is won."],
          "In net games a ball or shuttle must go over a net into the other side. Knowing how points are won helps you plan your shots.", "In badminton, a rally is won when the shuttle lands in court or the other side makes an error.",
          pictures("Net games", [["🎾", "Tennis"], ["🏸", "Badminton"], ["🏓", "Table tennis"]], "Three pictures show tennis, badminton and table tennis.")),
        "cricket-and-rounders": I("Cricket and rounders", ["Learn the jobs of bowler, batter and fielder.", "Learn how runs and rounders are scored."],
          "These striking and fielding games need you to know what each player does so you can work together.", "A batter hits the ball and runs. Fielders try to stop the ball and get the batter out.",
          table("Striking games", ["Job", "What they do"], [["Bowler", "Bowls the ball to the batter"], ["Batter", "Hits the ball and runs"], ["Fielder", "Catches or collects the ball"]], "A table gives the job of a bowler, a batter and a fielder.")),
      },
    },
    "athletics-gymnastics-and-dance": {
      intro: I("Athletics, gymnastics and dance", ["Learn about running, jumping and throwing events.", "Learn how to measure and improve, and how gymnastics and dance use control."],
        "These activities help you build strength, balance and control. Knowing what is measured helps you set goals and see your own progress.",
        "A long jump is measured in metres, a sprint in seconds.",
        pictures("Moving well", [["🏃", "Running"], ["🦘", "Jumping"], ["🤸", "Gymnastics"], ["💃", "Dance"]], "Four pictures show running, jumping, gymnastics and dance.")),
      topics: {
        "track-and-field-events": I("Track and field", ["Tell track events from field events.", "Name running, jumping and throwing events."],
          "Each event tests a different skill, so athletes often train for the one that suits them.", "The 100 metres is a track event. The long jump and javelin are field events.",
          table("Events", ["Type", "Examples"], [["Track", "Sprint, relay, hurdles"], ["Field", "Long jump, high jump, shot put, javelin"]], "A table lists track events and field events.")),
        "times-and-distances": I("Times and distances", ["Learn that races are measured in time and jumps and throws in distance.", "Compare results to see improvement."],
          "Reading times and distances lets you compare what you did this week with last week.", "A faster time is a smaller number of seconds. A longer jump is a bigger number of metres.",
          table("Measuring", ["Event", "Measured in"], [["Sprint", "Seconds"], ["Long jump", "Metres"]], "A table shows that a sprint is measured in seconds and a long jump in metres.")),
        "gymnastics-and-dance": I("Gymnastics and dance", ["Learn words such as balance, flexibility and control.", "Learn how a sequence has a start, middle and end."],
          "Strong, balanced and flexible bodies help you in every sport. A planned sequence helps you remember a routine.", "A gymnastics sequence can be a balance, a roll and a jump, finished with a still ending.",
          pictures("Key words", [["⚖️", "Balance"], ["🤸", "Flexibility"], ["💪", "Strength"], ["🎯", "Control"]], "Four pictures show the words balance, flexibility, strength and control.")),
      },
    },
    "outdoors-and-swimming": {
      intro: I("Outdoors and swimming", ["Learn how to work as a team on outdoor challenges.", "Learn swimming strokes and how to stay safe in water."],
        "Outdoor challenges build teamwork and planning. Swimming is a life skill, and knowing the water safety rules helps keep you safe. Always have a grown-up with you near water.",
        "Who should be with you when you swim?",
        pictures("Outdoors and water", [["🧭", "Orienteering"], ["🏊", "Swimming"], ["🛟", "Water safety"]], "Three pictures show orienteering, swimming and water safety.")),
      topics: {
        "orienteering-and-teamwork": I("Orienteering and teamwork", ["Learn how maps, compass points and symbols help you find your way.", "Learn how a team solves a challenge."],
          "Reading a map and sharing jobs in a team helps you get to the right place together and safely.", "A team reads the map, picks a route and checks each control point.",
          pictures("Finding the way", [["🗺️", "Map"], ["🧭", "Compass"], ["🤝", "Teamwork"]], "Three pictures show a map, a compass and teamwork.")),
        "swimming-and-water-safety": I("Swimming and water safety", ["Name the main swimming strokes.", "Learn simple rules for staying safe in water."],
          "Knowing the strokes and the water safety code helps you swim confidently. Swim only where there is a lifeguard or a grown-up watching.", "Front crawl, backstroke and breaststroke are three strokes. If you fall in, float on your back.",
          pictures("Strokes", [["🏊", "Front crawl"], ["🛟", "Backstroke"], ["🐸", "Breaststroke"]], "Three pictures show the swimming strokes front crawl, backstroke and breaststroke.")),
      },
    },
    "fitness-and-fair-play": {
      intro: I("Fitness and fair play", ["Learn why we warm up and stay active.", "Learn what fair play and a personal best mean."],
        "Warming up keeps your body ready, and fair play makes games fun for everyone. Improving on your own results is a good goal for every child.",
        "Why do we warm up first?",
        pictures("Playing well", [["🔥", "Warm up"], ["💪", "Fitness"], ["🤝", "Fair play"]], "Three pictures show warming up, fitness and fair play.")),
      topics: {
        "warming-up-and-fitness": I("Warming up and fitness", ["Learn why we warm up and cool down.", "Learn what makes up fitness."],
          "A warm-up raises your heart rate and loosens your muscles so you are ready to move safely.", "A warm-up can start with a gentle jog, then some stretches.",
          pictures("Before and after", [["🏃", "Warm up"], ["⚽", "Play"], ["🧘", "Cool down"]], "Three pictures show warm up, play and cool down in order.")),
        "fair-play-and-personal-best": I("Fair play and personal best", ["Learn what fair play means.", "Learn how to compare with your own earlier results."],
          "Fair play means respecting rules, team-mates and opponents. A personal best compares you with yourself, not with other people.", "You beat your personal best when you do better than you did before.",
          table("Fair play", ["Do", "Do not"], [["Shake hands", "Cheat"], ["Follow the rules", "Argue with the referee"]], "A table shows fair play actions to do and not to do.")),
      },
    },
  } });
