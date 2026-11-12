// Year 5 Relationships and Health knowledge checks. General, gentle questions only.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";

export default defineAssessmentBank({ year: 5, subject: "wellbeing", quests: {
  "friends-and-families": {
    "families-who-care": { objective: "Knows what caring families do (knowledge check).", items: [
      { q: "Which is true about families?", a: "Families can look different and still be caring", d: ["All families look the same", "Only big families care"], practice: 1, why: "Families come in many shapes, and what matters is that they care." },
      { q: "Which is something a caring family does?", a: "Looks after each other, including in hard times", d: ["Ignores each other", "Only helps when it is easy"], practice: 1, why: "Caring families give love and support, especially in difficult times." },
      { q: "Sort these into caring and not caring.", sort: { bins: ["Caring", "Not caring"], cards: [["Spend time together", "Caring"], ["Help when someone is ill", "Caring"], ["Never listen to each other", "Not caring"], ["Ignore a child who is upset", "Not caring"]] }, practice: 2, why: "Caring families show love and support." },
    ] },
    "good-friends": { objective: "Knows what good friends do (knowledge check).", items: [
      { q: "Which is something a good friend does?", a: "Includes others in games", d: ["Leaves people out", "Tells secrets to everyone"], practice: 2, why: "Good friends are kind and welcoming." },
      { q: "You see a child on their own at playtime. What kind thing could you do?", a: "Invite them to join in", d: ["Walk past", "Laugh at them"], practice: 3, why: "Inviting them in helps them feel included." },
      { q: "Is it normal to feel lonely sometimes?", a: "Yes, most people do and it is fine to talk about it", d: ["No, it means something is wrong", "Only children feel lonely"], practice: 1, why: "Most people feel lonely sometimes, and talking to someone helps." },
    ] },
    "sorting-out-a-falling-out": { objective: "Chooses kind ways to repair a falling out (knowledge check).", items: [
      { q: "Two friends have fallen out. What could help them make up?", a: "Calm down, listen and talk", d: ["Hit each other", "Stop speaking forever"], practice: 4, why: "Calm talking and listening can repair a friendship. Hurting someone is never right." },
      { q: "Put these in order for sorting out an argument.", order: ["Calm down", "Listen to each other", "Say sorry if needed"], practice: 3, why: "Calming first helps you listen and then put things right." },
      { q: "You see someone being bullied. What should you do?", a: "Tell a trusted adult", d: ["Join in", "Pretend you saw nothing"], practice: 1, why: "Telling a trusted adult helps the person get help." },
    ] },
    "courtesy-and-respect": { objective: "Knows polite and respectful behaviour (knowledge check).", items: [
      { q: "Which is polite?", a: "Saying thank you", d: ["Pushing in a queue", "Interrupting someone"], practice: 1, why: "Manners like thank you show respect." },
      { q: "A classmate has a different belief from you. What is a respectful response?", a: "Listen kindly and treat them fairly", d: ["Laugh at them", "Tell them they are wrong to be different"], practice: 4, why: "Everyone deserves respect, including people who are different from us." },
      { q: "Sort these into respectful and disrespectful.", sort: { bins: ["Respectful", "Disrespectful"], cards: [["Wait your turn", "Respectful"], ["Listen to others", "Respectful"], ["Call people names", "Disrespectful"], ["Take things without asking", "Disrespectful"]] }, practice: 2, why: "Respect means treating others kindly and fairly." },
    ] },
  },
  "feelings-and-wellbeing": {
    "naming-feelings": { objective: "Names feelings and knows they are normal (knowledge check).", items: [
      { q: "Which word best describes feeling a little worried before a test?", a: "Nervous", d: ["Furious", "Sleepy"], practice: 4, why: "Nervous means feeling a bit worried or uneasy." },
      { q: "Is it normal to feel sad or worried sometimes?", a: "Yes, everyone does at different times", d: ["No, never", "Only adults do"], practice: 1, why: "Everyone has these feelings sometimes." },
      { q: "Sort the feelings.", sort: { bins: ["Pleasant feelings", "Difficult feelings"], cards: [["Happy", "Pleasant feelings"], ["Calm", "Pleasant feelings"], ["Frustrated", "Difficult feelings"], ["Lonely", "Difficult feelings"]] }, practice: 2, why: "All feelings are normal. Some feel pleasant and some feel difficult, and it helps to talk about them." },
    ] },
    "calming-down-and-talking": { objective: "Chooses ways to calm down and get support (knowledge check).", items: [
      { q: "Which can help when you feel upset?", a: "Take slow breaths", d: ["Hold your breath", "Shout at someone"], practice: 1, why: "Slow breathing helps your body calm down." },
      { q: "You are feeling worried. Who is a good person to tell?", a: "A trusted grown-up", d: ["Nobody", "A stranger online"], practice: 4, why: "A trusted adult can listen and help." },
      { q: "Sort the ideas into helpful and unhelpful.", sort: { bins: ["Helpful", "Unhelpful"], cards: [["Talk to someone", "Helpful"], ["Take a break", "Helpful"], ["Keep it secret", "Unhelpful"], ["Slam doors", "Unhelpful"]] }, practice: 2, why: "Talking and taking a break help. Keeping worries secret or slamming doors does not." },
    ] },
    "active-outdoors-and-hobbies": { objective: "Knows how activity, outdoors and hobbies help wellbeing (knowledge check).", items: [
      { q: "Which can help you feel good?", a: "Playing outdoors", d: ["Staying up all night", "Never seeing friends"], practice: 1, why: "Fresh air and being active lift our mood." },
      { q: "Why is a hobby good for you?", a: "It is enjoyable and can help you relax", d: ["It uses up all your time", "It makes you tired for no reason"], practice: 2, why: "Hobbies are enjoyable and help us relax." },
      { q: "Sort these into healthy habits and less helpful habits.", sort: { bins: ["Helpful", "Less helpful"], cards: [["Walk in the park", "Helpful"], ["Time with friends", "Helpful"], ["Hours of screen time", "Less helpful"], ["Skipping rest", "Less helpful"]] }, practice: 3, why: "Activity, friends and rest help. Too much screen time and no rest do not." },
    ] },
  },
  "staying-safe": {
    "online-safety-and-screen-time": { objective: "Knows what to keep private and when to tell a grown-up (knowledge check).", items: [
      { q: "Which should you keep private online?", a: "Your home address", d: ["Your favourite colour", "Your favourite animal"], practice: 1, why: "Never share your address or where you are." },
      { q: "You see something online that makes you feel uncomfortable. What should you do?", a: "Tell a trusted adult", d: ["Share it with friends", "Keep it a secret"], practice: 4, why: "A trusted adult can help you deal with it." },
      { q: "What is the minimum age to join most social media sites in the UK?", a: "13", d: ["8", "10"], practice: 3, why: "Most social media sites say users must be at least 13. The age limit helps protect children." },
    ] },
    "roads-water-and-sun-safety": { objective: "Knows simple road, water and sun safety (knowledge check).", items: [
      { q: "What should you do before crossing a road?", a: "Stop, look and listen", d: ["Run across", "Look at your phone"], practice: 1, why: "Stop, look and listen helps you cross safely." },
      { q: "Which helps protect your skin on a sunny day?", a: "Sun cream, a hat and shade", d: ["Staying in direct sun all day", "No water"], practice: 2, why: "Sun cream, shade and a hat help prevent sun damage." },
      { q: "In the Water Safety Code, what does Stay together mean?", a: "Never go near water alone", d: ["Swim away from your friends", "Dive in first"], practice: 3, why: "Always go near water with a grown-up or friend, so someone can help if things go wrong." },
    ] },
    "first-aid-and-999": { objective: "Knows how to call for help (knowledge check).", items: [
      { q: "Which number do you call in a serious emergency in the UK?", a: "999", d: ["123", "100"], practice: 1, why: "999 is the UK emergency number." },
      { q: "When the 999 operator answers, what should you say first?", a: "Which service you need", d: ["Your favourite colour", "A long story about your day"], practice: 3, why: "Say which service you need: police, fire, ambulance or coastguard." },
      { q: "Someone has been hurt. What should you do?", a: "Get a trusted adult and call for help if needed", d: ["Film it", "Ignore it"], practice: 4, why: "Reporting and getting help matters more than filming." },
    ] },
  },
  "healthy-habits": {
    "healthy-eating": { objective: "Knows what makes a balanced diet (knowledge check).", items: [
      { q: "Which is a good source of protein?", a: "Beans", d: ["Sweets", "Fizzy drink"], practice: 1, why: "Beans, fish, eggs and meat provide protein." },
      { q: "Sort the foods.", sort: { bins: ["Eat plenty", "Eat less often"], cards: [["Vegetables", "Eat plenty"], ["Fruit", "Eat plenty"], ["Sweets", "Eat less often"], ["Crisps", "Eat less often"]] }, practice: 2, why: "Fruit and vegetables are great every day. Sweets and crisps are treats." },
      { q: "Why does your body need food?", a: "For energy and to grow", d: ["To stay awake all night", "To make you tired"], practice: 2, why: "Food gives energy and helps your body grow and repair." },
    ] },
    "sleep-and-rest": { objective: "Knows why sleep matters and how to sleep well (knowledge check).", items: [
      { q: "About how many hours of sleep does a child aged 9 or 10 need each night?", a: "About 10 hours", d: ["About 5 hours", "About 14 hours"], practice: 1, why: "Children of your age need about 10 hours of sleep to feel well and learn." },
      { q: "Which helps you sleep well?", a: "A calm bedtime routine", d: ["A screen in bed", "A big sugary drink"], practice: 2, why: "A calm routine helps your body get ready to sleep." },
      { q: "What can too little sleep affect?", a: "Mood and learning", d: ["Eye colour", "Shoe size"], practice: 4, why: "Poor sleep can make us grumpy and make it harder to learn." },
    ] },
    "teeth-hands-and-germs": { objective: "Knows how to care for teeth and hands (knowledge check).", items: [
      { q: "How often should you brush your teeth?", a: "Twice a day", d: ["Once a week", "Only when they hurt"], practice: 1, why: "Brushing twice a day with fluoride toothpaste protects teeth." },
      { q: "When should you wash your hands?", a: "Before eating and after using the toilet", d: ["Only on Sundays", "Never"], practice: 4, why: "Washing with soap removes germs." },
      { q: "Sort these into good habits and poor habits.", sort: { bins: ["Good habit", "Poor habit"], cards: [["Brush for two minutes", "Good habit"], ["Wash with soap", "Good habit"], ["Sneeze into your hands", "Poor habit"], ["Skip the dentist", "Poor habit"]] }, practice: 2, why: "Good habits stop germs and protect teeth." },
    ] },
  },
} });
