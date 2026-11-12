// Year 5 Relationships and Health purpose screens. Gentle, general and safe.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });

export default defineIntroductions({ year: 5, subject: "wellbeing",
  subjectIntro: I("Welcome to Relationships and Health", ["Think about kind friends, calm feelings and healthy habits.", "Learn how to look after yourself and others."],
    "These ideas help you get on with people, understand your feelings and stay healthy and safe. Everyone has feelings and worries sometimes. If something troubles you, talk to a trusted grown-up.",
    "A good friend is kind, includes others and listens.",
    pictures("Looking after yourself", [["🤝", "Friends"], ["💛", "Feelings"], ["🛡️", "Staying safe"], ["🍎", "Healthy habits"]], "Four pictures show friends, feelings, staying safe and healthy habits.")),
  quests: {
    "friends-and-families": {
      intro: I("Friends and families", ["Learn what makes families and friendships caring.", "Learn how to sort out disagreements and be respectful."],
        "Caring relationships help us feel safe and happy. Knowing how to be kind, fix a falling out and show respect makes friendships stronger.",
        "How could you help two friends make up?",
        pictures("Caring people", [["🏠", "Family"], ["🤝", "Friends"], ["🗣️", "Talking it through"]], "Three pictures show family, friends and talking things through.")),
      topics: {
        "families-who-care": I("Families who care", ["Learn that families come in many shapes.", "Learn what a caring family does."],
          "Families and people who care for us give love, safety and support. Families can look different from one another and still be caring.", "A caring family spends time together and helps each other, including when things are hard.",
          pictures("Caring families", [["👨‍👩‍👧", "Different families"], ["❤️", "Love"], ["🛡️", "Safety"]], "Three pictures show different families, love and safety.")),
        "good-friends": I("Good friends", ["Learn what a good friend does.", "Learn how to include others."],
          "Friends make us feel happy and secure. Everyone feels lonely sometimes, and kind friends make sure no one is left out.", "A good friend invites someone who is on their own to join in.",
          table("Friendship", ["A good friend", "Not a good friend"], [["Includes others", "Leaves people out"], ["Listens", "Is unkind"]], "A table compares what a good friend and a not-so-good friend do.")),
        "sorting-out-a-falling-out": I("Sorting out a falling out", ["Learn that friends sometimes fall out.", "Learn calm ways to put things right."],
          "Most friendships have ups and downs. Talking calmly can repair them. Hurting someone is never right, and if someone is being bullied, tell a trusted adult.", "Listen to your friend, say how you feel, and say sorry if you were unkind.",
          pictures("Making up", [["🧘", "Calm down"], ["🗣️", "Talk"], ["👂", "Listen"], ["🤝", "Make up"]], "Four pictures show calming down, talking, listening and making up.")),
        "courtesy-and-respect": I("Courtesy and respect", ["Learn good manners.", "Learn to respect people who are different from you."],
          "Manners such as please and thank you show others you care. Respecting differences makes everyone feel welcome, and you deserve respect too.", "Waiting your turn and saying thank you are polite.",
          pictures("Respect", [["🙏", "Please and thank you"], ["🌈", "Respect differences"], ["⏳", "Wait your turn"]], "Three pictures show please and thank you, respecting differences and waiting your turn.")),
      },
    },
    "feelings-and-wellbeing": {
      intro: I("Feelings and wellbeing", ["Learn words for feelings.", "Learn ways to calm down, talk and enjoy being active."],
        "Everyone has all sorts of feelings. Naming them and talking about them helps. Being outdoors, being active and having hobbies can lift our mood.",
        "What could help when you feel worried?",
        pictures("Looking after feelings", [["😊", "Happy"], ["😟", "Worried"], ["🗣️", "Talk"], ["🌳", "Outdoors"]], "Four pictures show a happy face, a worried face, talking and being outdoors.")),
      topics: {
        "naming-feelings": I("Naming feelings", ["Use a wider range of feeling words.", "Learn that all feelings are normal."],
          "Choosing the right word, such as nervous or disappointed, helps others understand how you feel. Feeling worried or sad sometimes is normal.", "Instead of just saying bad, you might say nervous or left out.",
          pictures("Feeling words", [["😀", "Excited"], ["😢", "Sad"], ["😠", "Angry"], ["😨", "Nervous"]], "Four pictures show feelings: excited, sad, angry and nervous.")),
        "calming-down-and-talking": I("Calming down and talking", ["Learn ways to calm down.", "Learn who you can talk to."],
          "When feelings are big, slow breathing or a short break can help. Talking to a trusted grown-up is always a good idea if you are worried.", "Take five slow breaths, then tell someone how you feel.",
          pictures("Calm and talk", [["🌬️", "Slow breaths"], ["🧸", "Quiet time"], ["🧑‍🏫", "Trusted adult"]], "Three pictures show slow breaths, quiet time and a trusted adult.")),
        "active-outdoors-and-hobbies": I("Active outdoors and hobbies", ["Learn how being active and outdoors helps you.", "Learn how hobbies and time with others help."],
          "Moving, fresh air, rest, hobbies and time with family and friends all help us feel good.", "A walk in the park or a favourite hobby can lift your mood.",
          pictures("Feel-good habits", [["🚲", "Be active"], ["🌳", "Time outdoors"], ["🎨", "Hobbies"], ["😴", "Rest"]], "Four pictures show being active, time outdoors, hobbies and rest.")),
      },
    },
    "staying-safe": {
      intro: I("Staying safe", ["Learn how to stay safe online and out and about.", "Learn what to do in an emergency."],
        "Knowing simple safety rules helps you make good choices. If something feels wrong, tell a trusted grown-up straight away.",
        "What would you do if something online felt wrong?",
        pictures("Safety", [["💻", "Online"], ["🚦", "Roads"], ["☀️", "Sun"], ["🚑", "Emergency"]], "Four pictures show online safety, roads, sun safety and an emergency.")),
      topics: {
        "online-safety-and-screen-time": I("Online safety and screen time", ["Learn what personal information to keep private.", "Learn why screen time needs balance."],
          "Keeping private information private and telling a trusted adult when something feels wrong protects you. Balanced screen time leaves room for sleep, play and friends.", "Do not share your address or school online. Ask a grown-up first.",
          pictures("Online rules", [["🔒", "Keep info private"], ["🧑‍🏫", "Tell a grown-up"], ["⏰", "Balanced screen time"]], "Three pictures show keeping information private, telling a grown-up and balanced screen time.")),
        "roads-water-and-sun-safety": I("Roads, water and sun", ["Learn simple rules for roads and railways.", "Learn water and sun safety."],
          "Knowing how to cross safely, stay safe near water and protect your skin from the sun helps you enjoy being outside.", "Stop, look and listen before you cross. Use sun cream and shade on sunny days.",
          pictures("Out and about", [["🚦", "Cross safely"], ["🏊", "Swim with a grown-up"], ["🧴", "Sun cream and shade"]], "Three pictures show crossing safely, swimming with a grown-up and sun cream and shade.")),
        "first-aid-and-999": I("First aid and 999", ["Learn what to do if someone is hurt.", "Learn how to call for help."],
          "Knowing a few first aid ideas and how to call 999 can help someone in real trouble. Always tell an adult if someone is hurt.", "In an emergency, call 999 and say which service you need and where you are.",
          pictures("In an emergency", [["📞", "Call 999"], ["🚑", "Ambulance"], ["🧑‍🏫", "Get an adult"]], "Three pictures show calling 999, an ambulance and getting an adult.")),
      },
    },
    "healthy-habits": {
      intro: I("Healthy habits", ["Learn about healthy eating, sleep and hygiene.", "Learn how small habits help your body."],
        "Healthy food, enough sleep and clean teeth and hands help you grow, learn and keep germs away.",
        "Why does your body need sleep?",
        pictures("Healthy habits", [["🥦", "Healthy food"], ["😴", "Sleep"], ["🪥", "Clean teeth"], ["🧼", "Clean hands"]], "Four pictures show healthy food, sleep, clean teeth and clean hands.")),
      topics: {
        "healthy-eating": I("Healthy eating", ["Learn what makes a balanced diet.", "Learn about a healthy relationship with food."],
          "Your body needs many kinds of food to grow and have energy. Enjoying a mix of foods is healthy.", "A balanced meal includes vegetables or fruit, starchy food and protein.",
          pictures("A balanced plate", [["🥦", "Vegetables and fruit"], ["🍞", "Starchy foods"], ["🍗", "Protein"], ["🥛", "Dairy or alternatives"]], "Four pictures show vegetables and fruit, starchy foods, protein and dairy or alternatives.")),
        "sleep-and-rest": I("Sleep and rest", ["Learn why sleep matters.", "Learn habits that help you sleep."],
          "Good sleep helps your body, mood and learning. Children of your age usually need about ten hours.", "A calm bedtime and no screens in the bedroom help you sleep.",
          pictures("Sleep well", [["📖", "Calm routine"], ["📵", "No screens in bed"], ["😴", "About 10 hours"]], "Three pictures show a calm routine, no screens in bed and about ten hours of sleep.")),
        "teeth-hands-and-germs": I("Teeth, hands and germs", ["Learn how to care for teeth.", "Learn how washing hands stops germs spreading."],
          "Brushing teeth and washing hands protect you and others from illness and tooth decay.", "Brush your teeth twice a day and wash your hands with soap before eating.",
          pictures("Staying clean", [["🪥", "Brush twice a day"], ["🧼", "Wash hands"], ["🦷", "Dentist visits"]], "Three pictures show brushing twice a day, washing hands and dentist visits.")),
      },
    },
  } });
