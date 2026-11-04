import { fact as f, groups as g, sentence as s, sequence as o, measurement as n } from "./engine.js";
import { rule } from "../figures.js";

// Year 6 "Animals, including humans". The topic pictures only set the scene: none labels a
// body part or shows an answer. Diagrams that need the double loop carry it on the question.
// drugs-medicines-and-lifestyle is read by children alone: it frames how substances affect the
// way bodies work, always points to a trusted adult, and never names illegal drugs or doses.
const scene = (backdrop, alt, items, extra = {}) => ({ type: "scene", backdrop, alt, items, ...extra });
const loops = { type: "circulation", labels: true, alt: "A diagram of the double loop. The heart is in the middle. One loop of arrows goes up to the lungs and back, and one goes down to the body and back." };

const pulseTable = { headings: ["Activity", "Pulse (beats per minute)"], rows: [["Sitting", 70], ["Walking", 96], ["Jogging", 130], ["Sprinting", 168]] };
const recoveryTable = { headings: ["Minutes after exercise", "Pulse (beats per minute)"], rows: [["0 minutes (just stopped)", 150], ["2 minutes", 118], ["4 minutes", 92], ["6 minutes", 78]] };
const vesselTable = { headings: ["Blood vessel", "What it does"], rows: [["Vessel X", "Carries blood away from the heart"], ["Vessel Y", "Carries blood back to the heart"], ["Vessel Z", "Is very tiny and passes oxygen to the cells"]] };
const dietTable = { headings: ["Food group", "Portions Ellie ate in a week"], rows: [["Fruit and vegetables", 21], ["Carbohydrates", 28], ["Protein", 14], ["Sweets", 7]] };
const screenTable = { headings: ["Screen time before bed", "Average time to fall asleep (minutes)"], rows: [["None", 10], ["30 minutes", 20], ["2 hours", 40]] };
const celeryTable = { headings: ["Hours in coloured water", "Height the colour reached up the stem (cm)"], rows: [["1 hour", 2], ["2 hours", 4], ["4 hours", 8], ["6 hours", 12]] };

export const animals = {
  "the-circulatory-system": {
    rule: "The circulatory system is the heart, the blood vessels and the blood. The heart pumps blood in a double loop: to the lungs to pick up oxygen, and round the body to deliver it. Blood vessels are the tubes that carry the blood.",
    hint: "Think of a loop. The heart pumps, the vessels are the tubes, and the blood is the liquid that travels round.",
    facts: [
      f("Which three parts make up the circulatory system?", "Heart, blood vessels and blood", "Stomach, gullet and intestines", "Skull, spine and ribs"),
      f("What is the main job of the heart?", "To pump blood round the body", "To digest food", "To make bones stronger"),
      f("What are blood vessels?", "Tubes that carry blood round the body", "Muscles that make the heart beat", "Bags that store food"),
      f("Which organs does blood travel to so it can pick up oxygen?", "The lungs", "The stomach", "The teeth"),
      f("Why does blood travel round the body?", "To carry things the body needs and take waste away", "To keep the bones in place", "To make the skin colourful"),
      f("Blood makes a loop to the lungs and a loop to the body. Which organ sits at the middle of both loops?", "The heart", "The brain", "The liver"),
      f("Blood that has come from the lungs is rich in which gas?", "Oxygen", "Carbon dioxide", "Helium"),
      f("Which waste gas does blood drop off in the lungs to be breathed out?", "Carbon dioxide", "Oxygen", "Hydrogen"),
      f("Which part of the circulatory system is the liquid?", "The blood", "The heart", "The blood vessels"),
      f("What is the heart mostly made of?", "Muscle", "Bone", "Fat"),
      f("Where in your body is your heart?", "In your chest", "In your head", "In your leg"),
      f("Which of these is part of the circulatory system?", "A blood vessel", "The gullet", "A rib"),
    ],
    sorts: [
      g("Which part of the circulatory system does each description fit?", ["Heart", "Blood vessels", "Blood"], [["A muscle that pumps", 0], ["Squeezes and relaxes again and again", 0], ["Tubes that carry blood", 1], ["Include arteries and veins", 1], ["A red liquid", 2], ["Carries oxygen round the body", 2]]),
      g("Which of these are part of the circulatory system?", ["Part of the circulatory system", "Not part of it"], [["Heart", 0], ["Artery", 0], ["Blood", 0], ["Stomach", 1], ["Skull", 1], ["Gullet", 1]]),
      g("Is each statement about the heart true or false?", ["True", "False"], [["The heart is a muscle", 0], ["The heart pumps blood", 0], ["The heart is in the chest", 0], ["The heart is a bone", 1], ["The heart sits in the head", 1], ["The heart digests food", 1]]),
    ],
    structures: [
      s("Build a sentence about the heart.", "The heart pumps blood round the body."),
      s("Build a sentence about blood.", "Blood carries oxygen to the body."),
      o("Order the journey of blood, starting at the heart.", ["Heart pumps blood to the lungs", "Blood picks up oxygen in the lungs", "Blood returns to the heart", "Heart pumps blood round the body"]),
      o("Order what happens to the oxygen you breathe in, starting with the first step.", ["You breathe air into your lungs", "Oxygen passes into the blood", "The heart pumps the blood round the body", "The body uses the oxygen"]),
      { ...g("Look at the diagram. Which parts does it show, and which does it not show?", ["Shown in the diagram", "Not shown in the diagram"], [["Heart", 0], ["Lungs", 0], ["Body", 0], ["Stomach", 1], ["Skull", 1], ["Bones", 1]]), visual: loops },
    ],
    enquiries: [
      { ...f("Look at the diagram. Blood is pumped from the heart on the top loop. Which organs does it travel to?", "The lungs", "The stomach", "The skull"), visual: loops },
      { ...n("Look at the diagram. How many places does the heart pump blood to?", 2), visual: loops },
      f("Leo cuts his finger and it bleeds. What does this show?", "There are blood vessels in his skin", "His heart is in his finger", "Blood is stored in the skin"),
      f("Maya says the circulatory system is a loop. Which fact supports this?", "Blood returns to the heart after going round the body", "Blood stays in the legs", "Blood leaves the body at the lungs"),
      f("In the 1600s, which English doctor showed that the heart pumps blood in a circuit round the body?", "William Harvey", "Charles Darwin", "Carl Linnaeus"),
      f("Leo says the heart is a bag of blood. Which observation shows it is a muscle?", "It squeezes to push blood out", "It is red", "It is in the chest"),
      f("A doctor listens to Ellie's chest with a stethoscope. What can the doctor hear?", "Her heart beating", "Her bones growing", "Her food being swallowed"),
      f("Why do scientists draw diagrams of the circulatory system?", "To show where the blood goes so they can explain it", "To make blood flow faster", "To replace the heart"),
      o("Order what happens when Leo's blood returns to his heart from his body, starting with the first step.", ["Blood leaves the body's cells", "Blood flows back through blood vessels", "Blood enters the heart", "The heart pumps the blood to the lungs"]),
      s("Maya writes a conclusion about the circulatory system.", "Blood travels in a double loop."),
      g("Leo sorts statements about the circulatory system.", ["Correct", "Incorrect"], [["Blood vessels carry blood", 0], ["The heart is a muscle", 0], ["Blood goes to the lungs and the body", 0], ["Blood stays in the heart", 1], ["The heart is made of bone", 1], ["Blood does not travel round the body", 1]]),
      g("Maya sorts these jobs between two parts of the circulatory system.", ["Job of the heart", "Job of the blood"], [["Pumps", 0], ["Squeezes to push blood along", 0], ["Beats all day and night", 0], ["Carries oxygen", 1], ["Carries away waste", 1], ["Carries nutrients", 1]]),
    ],
  },

  "the-heart-and-pulse": {
    rule: "The heart is a muscle that squeezes to pump blood. Each squeeze makes a pulse that you can feel at your wrist or neck, and your heart rate is the number of beats in a minute. Heart rate goes up in exercise so that muscles get more oxygen, then slows down again at rest.",
    hint: "Exercise makes muscles need more oxygen, so the heart beats faster. At rest it slows down again.",
    facts: [
      f("What is a pulse?", "The beat you can feel as the heart pumps blood", "The sound of breathing", "The warmth of the body"),
      f("Where can you feel your pulse?", "On your wrist or neck", "On your fingernail", "On your hair"),
      f("What does heart rate measure?", "The number of heartbeats in a minute", "How fast you can run", "The number of breaths in an hour"),
      f("Which unit is heart rate measured in?", "Beats per minute", "Metres per second", "Grams per day"),
      f("What happens to your heart rate when you exercise?", "It goes up", "It goes down", "It stops"),
      f("What happens to your heart rate when you rest after exercise?", "It slows back down", "It stays fast for ever", "It speeds up more"),
      f("Why does the heart beat faster during exercise?", "The muscles need more oxygen, so more blood is pumped", "The heart has run out of blood", "To make the muscles smaller"),
      f("What does the heart do each time it beats?", "It squeezes to push blood out", "It sucks in food", "It makes air"),
      f("About how many beats per minute is a normal resting heart rate for a child?", "About 80 beats per minute", "About 8 beats per minute", "About 800 beats per minute"),
      f("Which tool could you use to time your pulse for one minute?", "A stopwatch", "A thermometer", "A ruler"),
      f("Which muscle never gets to rest during your life?", "The heart", "The muscle that lifts your arm", "The muscle that moves your eyebrows"),
      f("Which activity would give the highest heart rate?", "Sprinting", "Sleeping", "Sitting reading"),
    ],
    sorts: [
      g("Sort each activity by how it changes heart rate.", ["Raises heart rate", "Keeps heart rate low"], [["Running", 0], ["Skipping", 0], ["Fast swimming", 0], ["Sleeping", 1], ["Sitting quietly", 1], ["Lying down to rest", 1]]),
      g("Is each statement about the pulse true or false?", ["True", "False"], [["You can feel it at your wrist", 0], ["It is caused by the heart pumping", 0], ["It is measured in beats per minute", 0], ["It is caused by your lungs", 1], ["It stops when you run", 1], ["It is measured in kilograms", 1]]),
      g("Which pulse reading fits each situation best?", ["At rest", "Gentle walking", "Hard running"], [["68 beats a minute", 0], ["72 beats a minute", 0], ["95 beats a minute", 1], ["105 beats a minute", 1], ["165 beats a minute", 2], ["180 beats a minute", 2]]),
    ],
    structures: [
      s("Build a sentence about the heart muscle.", "The heart is a strong muscle."),
      s("Build a sentence about exercise.", "Exercise makes the heart beat faster."),
      o("Order these activities from the lowest heart rate to the highest heart rate.", ["Sleeping", "Sitting still", "Walking", "Sprinting"]),
      o("Order what happens to Leo's heart rate during a race, starting with the first step.", ["Leo rests with a slow heart rate", "Leo starts running", "His heart rate goes up", "He rests and his heart rate slows down"]),
      g("Which of these happen during exercise, and which happen during rest?", ["During exercise", "During rest"], [["Heart beats faster", 0], ["Breathing gets quicker", 0], ["Muscles need more oxygen", 0], ["Heart rate slows down", 1], ["Breathing slows down", 1], ["Muscles need less oxygen", 1]]),
    ],
    enquiries: [
      { ...f("Look at Leo's results. What pattern do they show?", "The harder the activity, the higher the pulse", "The harder the activity, the lower the pulse", "The activity made no difference"), table: pulseTable },
      { ...n("Look at Leo's results. How many more beats per minute was his pulse when sprinting than when sitting?", 98), table: pulseTable },
      { ...n("Look at Leo's results. How many more beats per minute was his pulse when walking than when sitting?", 26), table: pulseTable },
      { ...f("Look at Maya's results after she stopped exercising. What happens to her pulse as she rests?", "It slowly falls back", "It rises higher", "It stays the same"), table: recoveryTable },
      { ...n("Look at Maya's results. How many beats per minute did her pulse fall in the first 2 minutes of rest?", 32), table: recoveryTable },
      f("Ellie wants to find out how speed changes pulse. Which variable should she change?", "The speed of the activity", "The person whose pulse is measured", "The length of time she counts for"),
      f("Ellie counts a pulse for 15 seconds instead of a minute. How can she work out the beats per minute?", "Multiply her count by 4", "Divide her count by 4", "Add 4 to her count"),
      n("Leo counts 20 beats in 15 seconds. What is his pulse in beats per minute?", 80),
      o("Order Ellie's steps to measure a pulse, starting with the first step.", ["Sit quietly for a minute", "Find the pulse on the wrist with two fingers", "Count the beats for a set time", "Work out the beats per minute"]),
      { ...s("Build a conclusion from Leo's results.", "Pulse rose as the activity got harder."), table: pulseTable },
      { ...g("Maya reviews claims about her recovery results.", ["Supported by the results", "Not supported"], [["Her pulse was highest just after exercise", 0], ["Her pulse fell every two minutes", 0], ["Her pulse was 78 after 6 minutes", 0], ["Her pulse stayed the same while resting", 1], ["Her pulse was lowest just after exercise", 1], ["Her pulse rose while she rested", 1]]), table: recoveryTable },
      g("Ellie plans a fair test of how speed changes pulse. Sort each factor.", ["Keep the same", "Change on purpose"], [["Counting for the same length of time", 0], ["Using the same person", 0], ["Measuring at the same place on the wrist", 0], ["The speed of the activity", 1], ["The type of activity", 1], ["How hard Ellie works", 1]]),
    ],
  },

  "blood-and-blood-vessels": {
    rule: "Arteries carry blood away from the heart, veins carry it back to the heart, and capillaries are tiny vessels that link them and pass things to and from the cells. Blood carries oxygen, nutrients and water to the cells, and takes away waste such as carbon dioxide.",
    hint: "Arteries take blood Away, veins bring it back to the heart. Capillaries are tiny. Blood delivers what cells need and collects waste.",
    facts: [
      f("Which blood vessels carry blood away from the heart?", "Arteries", "Veins", "Capillaries"),
      f("Which blood vessels carry blood back to the heart?", "Veins", "Arteries", "Capillaries"),
      f("Which blood vessels are the tiniest?", "Capillaries", "Arteries", "Veins"),
      f("What is the job of capillaries?", "To pass oxygen and nutrients to cells and take waste away", "To pump blood", "To store blood"),
      f("Which gas does blood carry from the lungs to the cells?", "Oxygen", "Carbon dioxide", "Hydrogen"),
      f("Which waste gas does blood carry from the cells back to the lungs?", "Carbon dioxide", "Oxygen", "Hydrogen"),
      f("In which type of blood vessel can you feel a pulse?", "An artery", "A capillary", "A vein"),
      f("Why do arteries have thick, strong walls?", "Blood is pushed through them with force", "So they can store food", "To make the blood cold"),
      f("What does blood carry to every cell, as well as oxygen?", "Nutrients and water", "Rocks", "Bones"),
      f("Which liquid in the body carries oxygen, nutrients and waste?", "Blood", "Saliva", "Sweat"),
      f("Which cells in the blood carry oxygen?", "Red blood cells", "Skin cells", "Hair cells"),
      f("Which cells in the blood help to fight germs?", "White blood cells", "Red blood cells", "Bone cells"),
    ],
    sorts: [
      g("Which blood vessel does each description fit?", ["Artery", "Vein", "Capillary"], [["Carries blood away from the heart", 0], ["Has thick, strong walls", 0], ["Carries blood back to the heart", 1], ["Has thinner walls than an artery", 1], ["The tiniest blood vessels", 2], ["Pass oxygen and nutrients to cells", 2]]),
      g("Sort what the blood delivers to cells and what it takes away.", ["Delivered to cells", "Taken away from cells"], [["Oxygen", 0], ["Nutrients", 0], ["Water", 0], ["Carbon dioxide", 1], ["Waste made by the cells", 1], ["Waste that is breathed out", 1]]),
      g("Is each statement about blood vessels true or false?", ["True", "False"], [["Arteries carry blood away from the heart", 0], ["Veins carry blood to the heart", 0], ["Capillaries are very tiny", 0], ["Veins carry blood away from the heart", 1], ["Capillaries are the widest vessels", 1], ["Arteries carry blood back to the heart", 1]]),
    ],
    structures: [
      s("Build a sentence about arteries.", "Arteries carry blood away from the heart."),
      s("Build a sentence about veins.", "Veins carry blood back to the heart."),
      s("Build a sentence about blood.", "Blood carries oxygen and nutrients to cells."),
      o("Order the journey of oxygen, starting in the lungs.", ["Oxygen enters the blood in the lungs", "The heart pumps the blood into arteries", "Capillaries pass oxygen to the cells", "Veins carry the blood back to the heart"]),
      g("Which blood vessel does each fact describe, an artery or a vein?", ["Artery", "Vein"], [["Carries blood away from the heart", 0], ["Has strong, thick walls", 0], ["You can feel a pulse in it", 0], ["Carries blood towards the heart", 1], ["Has thinner walls", 1], ["Blood in it flows with less force", 1]]),
    ],
    enquiries: [
      { ...f("Look at Ellie's table. Which vessel is a vein?", "Vessel Y", "Vessel X", "Vessel Z"), table: vesselTable },
      { ...f("Look at Ellie's table. Which vessel is a capillary?", "Vessel Z", "Vessel X", "Vessel Y"), table: vesselTable },
      n("Maya's model shows 3 arteries, 2 veins and 5 capillaries. How many blood vessels does it show altogether?", 10),
      n("Ellie models oxygen delivery with 12 red beads. Each cell gets 3 beads. How many cells can she serve?", 4),
      f("Ellie feels a pulse in her wrist. Which type of blood vessel is it in?", "An artery", "A vein", "A capillary"),
      f("Leo cuts his finger and blood oozes slowly from lots of tiny places. Which blood vessels are damaged?", "Capillaries", "Large arteries", "Large veins"),
      f("Maya says veins carry blood away from the heart. What should Leo tell her?", "Arteries do that, and veins carry blood back to the heart", "She is right", "Only capillaries carry blood"),
      f("Ellie says blood only carries oxygen. Which fact shows she is incomplete?", "It also carries nutrients, water and waste", "It is red", "It is made in the stomach"),
      o("Order the journey of carbon dioxide, starting in a muscle cell.", ["Carbon dioxide leaves a muscle cell", "It passes into a capillary", "Veins carry it back towards the heart", "It is breathed out from the lungs"]),
      s("Maya describes what capillaries do.", "Capillaries link the arteries to the veins."),
      g("Leo sorts what travels in the blood. Is each journey made by oxygen or carbon dioxide?", ["Oxygen", "Carbon dioxide"], [["Picked up in the lungs", 0], ["Delivered to the cells", 0], ["Used by muscles to release energy", 0], ["Carried from the cells to the lungs", 1], ["Breathed out", 1], ["A waste gas", 1]]),
      g("Maya checks claims about blood.", ["Correct", "Incorrect"], [["Blood carries water to cells", 0], ["Blood takes away waste", 0], ["Blood flows in a loop", 0], ["Blood only stays in the heart", 1], ["Blood carries oxygen from cells to the lungs", 1], ["Blood vessels are made of bone", 1]]),
    ],
  },

  "diet-exercise-and-health": {
    rule: "A balanced diet has the right amounts of different food groups: carbohydrates for energy, protein for growth and repair, a little fat, vitamins and minerals, fibre and water. Exercise keeps the heart and muscles strong, and sleep gives the body time to rest and repair.",
    hint: "Think about what each food group does for the body, and what happens if you have too much or too little.",
    facts: [
      f("Which food group is the body's main source of energy, such as in bread and pasta?", "Carbohydrates", "Vitamins", "Water"),
      f("Which food group helps the body to grow and repair itself?", "Protein", "Fibre", "Water"),
      f("Which food is a good source of protein?", "Fish", "Lemonade", "Sugar"),
      f("Which food group helps digestion by keeping food moving?", "Fibre", "Sugar", "Salt"),
      f("Why do we need vitamins and minerals?", "Small amounts help the body work well and stay healthy", "To give us energy for running", "To make food taste sweet"),
      f("Why is water important for the body?", "Blood and cells need water to work", "It gives us energy like sugar", "It builds muscle"),
      f("What is a balanced diet?", "Eating the right amounts of different food groups", "Eating only fruit", "Never eating any fat"),
      f("What can happen if someone often eats far too much sugary food?", "Their teeth can decay and their health can suffer", "Their bones turn to jelly", "They grow taller overnight"),
      f("Which activity is good exercise for the heart?", "Cycling", "Lying still", "Watching television"),
      f("Why is sleep important for children?", "The body rests and repairs, and children grow", "It makes blood stop flowing", "It burns more energy than any other activity"),
      f("About how much exercise is recommended for children each day?", "About an hour", "Five minutes", "Ten hours"),
      f("Which food group should we eat only in small amounts, such as in butter and chips?", "Fats", "Water", "Vitamins"),
    ],
    sorts: [
      g("Which food group is each food mostly?", ["Carbohydrate", "Protein", "Fruit and vegetables"], [["Pasta", 0], ["Bread", 0], ["Chicken", 1], ["Eggs", 1], ["Carrots", 2], ["Apples", 2]]),
      g("Are these choices good for your health?", ["Helps health", "Harms health if done a lot"], [["Playing outside for an hour", 0], ["Drinking water", 0], ["Sleeping enough", 0], ["Eating sweets all day", 1], ["Staying up all night", 1], ["Never moving about", 1]]),
      g("What is each food mostly for?", ["Gives energy", "Helps growth and repair"], [["Rice", 0], ["Bread", 0], ["Potatoes", 0], ["Fish", 1], ["Chicken", 1], ["Lentils", 1]]),
    ],
    structures: [
      s("Build a sentence about diet.", "A balanced diet has many food groups."),
      s("Build a sentence about exercise.", "Exercise keeps the heart and muscles strong."),
      s("Build a sentence about sleep.", "Sleep helps the body rest and repair."),
      o("Order these amounts of daily exercise from the least to the most.", ["5 minutes", "20 minutes", "60 minutes", "3 hours"]),
      g("Which foods belong in a balanced diet most days, and which only a little?", ["Eat plenty", "Eat only a little"], [["Vegetables", 0], ["Fruit", 0], ["Wholegrain bread", 0], ["Sweets", 1], ["Fizzy drinks", 1], ["Cakes", 1]]),
    ],
    enquiries: [
      { ...f("Look at Ellie's food diary. Which food group did she eat least of?", "Sweets", "Protein", "Carbohydrates"), table: dietTable },
      { ...n("Look at Ellie's food diary. How many more portions of carbohydrates than protein did she eat?", 14), table: dietTable },
      { ...n("Look at Ellie's food diary. How many portions did she eat altogether?", 70), table: dietTable },
      n("Maya should be active for about 60 minutes a day. She has played for 25 minutes. How many more minutes does she need?", 35),
      f("Leo eats only chips and sweets for a week. What is the best advice?", "Eat a wider range of food groups, including fruit and vegetables", "Eat even more chips", "Stop drinking water"),
      f("Ellie is thirsty after football. What is the best drink?", "Water", "A large sugary fizzy drink", "Nothing at all"),
      f("Maya says sleep is a waste of time. Which fact helps show she is wrong?", "Sleep gives the body time to rest, repair and grow", "Sleep burns lots of energy", "Sleep makes children shorter"),
      f("A scientist studies 1,000 people. Those who exercise regularly have healthier hearts. What does this suggest?", "Regular exercise helps to keep the heart healthy", "Exercise harms the heart", "Heart health never depends on anything"),
      o("Order Leo's steps to plan a balanced meal, starting with the first step.", ["Choose a food that gives energy", "Add a protein food", "Add fruit or vegetables", "Add a glass of water"]),
      { ...s("Build a conclusion from Ellie's food diary.", "Ellie ate the most carbohydrates."), table: dietTable },
      g("Maya sorts what she has read. Is each statement a fact or an opinion?", ["Fact", "Opinion"], [["Water keeps cells working", 0], ["Exercise strengthens the heart", 0], ["Sleep helps the body repair", 0], ["Fruit is boring", 1], ["Football is the best exercise", 1], ["Vegetables are horrible", 1]]),
      { ...g("Maya reviews claims about Ellie's food diary.", ["Supported by the diary", "Not supported"], [["Ellie ate 28 portions of carbohydrates", 0], ["Ellie ate fewer sweets than protein", 0], ["Ellie ate 21 portions of fruit and vegetables", 0], ["Ellie ate more sweets than fruit and vegetables", 1], ["Protein was Ellie's biggest food group", 1], ["Ellie ate no sweets", 1]]), table: dietTable },
    ],
  },

  "drugs-medicines-and-lifestyle": {
    rule: "Some substances change the way the body works. Medicines help when a doctor, pharmacist or trusted grown-up gives them to you and you use them as directed, and you must never take a medicine or an unknown substance without a trusted adult. Smoking harms the lungs and heart, and alcohol can harm the body.",
    hint: "Ask: is this safe, and who is the trusted adult who can check?",
    facts: [
      f("Who should give you a medicine?", "A doctor, pharmacist or trusted grown-up", "A friend at school", "Nobody, you can choose for yourself"),
      f("What should you do if you find some tablets or an unknown substance?", "Leave them alone and tell a trusted adult", "Taste a little to check", "Keep them in your bag"),
      f("What can a medicine do?", "Help the body fight an illness or ease pain when it is used as directed", "Make you taller", "Make you stronger overnight"),
      f("Why should a medicine only be used as directed?", "Used wrongly it can harm the body", "Medicines are tasty", "It changes the colour of the medicine"),
      f("Which parts of the body does smoking harm?", "The lungs and the heart", "The nails", "The hair"),
      f("Which of these is a harmful substance in cigarette smoke?", "Tar", "Fresh air", "Clean water"),
      f("Alcohol is not safe for children. Why?", "It can harm a growing body and brain", "It makes bones stronger", "It helps children grow"),
      f("Which drink contains caffeine?", "Cola", "Water", "Milk"),
      f("Why are energy drinks not suitable for children?", "They contain a lot of caffeine, which can affect sleep and heart rate", "They contain too much water", "They are always frozen"),
      f("Which habit helps the body to work well?", "Getting enough sleep", "Staying up very late every night", "Sitting still all day"),
      f("How can too much screen time affect the body?", "It can take time away from sleep, play and exercise", "It makes bones grow quickly", "It makes you taller"),
      f("Who is a trusted adult who can help if you are worried about a substance?", "A parent, carer, teacher or doctor", "Someone you have just met online", "A stranger in the street"),
    ],
    sorts: [
      g("Is each action safe or not safe?", ["Safe", "Not safe"], [["Taking medicine given by a parent or carer as directed", 0], ["Telling an adult about tablets you find", 0], ["Asking a doctor or pharmacist about a medicine", 0], ["Taking medicine without telling anyone", 1], ["Trying a substance a stranger offers", 1], ["Sharing your medicine with a friend", 1]]),
      g("How does each one affect the body?", ["Can harm the body", "Helps the body work well"], [["Smoking cigarettes", 0], ["Alcohol drunk by children", 0], ["Too many energy drinks", 0], ["Enough sleep", 1], ["Exercise every day", 1], ["Drinking water", 1]]),
      g("Which of these is a medicine used with an adult, and which is a harmful substance?", ["Medicine used with an adult", "Harmful substance"], [["Cough syrup from a pharmacy", 0], ["Antibiotics from a doctor", 0], ["An asthma inhaler a doctor has prescribed", 0], ["Cigarette smoke", 1], ["Alcohol for a child", 1], ["Unknown tablets found on the floor", 1]]),
    ],
    structures: [
      s("Build a sentence about medicines.", "Medicines help when used as directed."),
      s("Build a sentence about safety.", "Never take medicine without a trusted adult."),
      s("Build a sentence about smoking.", "Smoking harms the lungs and heart."),
      o("Order what to do if you find some tablets, starting with the first step.", ["Notice the tablets", "Do not touch or taste them", "Tell a trusted adult straight away", "Let the adult deal with them"]),
      g("Is each statement about substances true or false?", ["True", "False"], [["Smoking can harm the lungs", 0], ["Medicines should be used as directed", 0], ["Cola can contain caffeine", 0], ["Alcohol helps children grow", 1], ["Smoking is good for the heart", 1], ["Any tablet is safe to take", 1]]),
    ],
    enquiries: [
      { ...f("Look at the class survey. What pattern do the results show?", "More screen time before bed meant longer to fall asleep", "More screen time before bed meant a quicker sleep", "Screen time made no difference"), table: screenTable },
      { ...n("Look at the class survey. How many more minutes did children take to fall asleep after 2 hours of screen time than after none?", 30), table: screenTable },
      { ...n("Look at the class survey. How many more minutes did children take to fall asleep after 30 minutes of screen time than after none?", 10), table: screenTable },
      f("Ellie feels poorly and wants some medicine from the cupboard. What should she do?", "Tell a trusted adult and let them decide", "Take some and tell nobody", "Ask a friend to choose one"),
      f("A friend offers Leo a tablet he does not know. What should Leo do?", "Say no, walk away and tell a trusted adult", "Take it so that he fits in", "Keep it for later"),
      f("Maya reads that smoking makes the lungs work less well. Which activity would be harder for someone whose lungs are damaged?", "Running for the bus", "Reading quietly", "Sitting down"),
      f("Why do scientists study how substances affect the body?", "To find out how to keep people healthy", "To make the substances taste better", "To sell them to children"),
      f("A doctor says that people who stop smoking help their lungs and heart. What does this show?", "Stopping smoking can help the body to recover", "Smoking has no effect on the body", "Only children's lungs can recover"),
      o("Order the steps for taking a medicine safely, starting with the first step.", ["A trusted adult checks the label", "The adult gets the right amount ready", "Maya takes it as directed", "The adult puts it away safely"]),
      { ...s("Build a conclusion from the class survey.", "More screen time was linked to later sleep."), table: screenTable },
      g("Ellie sorts people to ask for help with medicines. Who is a good person to ask?", ["Good person to ask", "Not a good person to ask"], [["A doctor", 0], ["A pharmacist", 0], ["A parent or carer", 0], ["A stranger", 1], ["Someone online", 1], ["A classmate who is guessing", 1]]),
      { ...g("Leo checks claims about the class survey.", ["Supported by the results", "Not supported"], [["No screen time gave the shortest time to fall asleep", 0], ["Two hours of screen time gave the longest time", 0], ["It took 20 minutes after 30 minutes of screen time", 0], ["Screen time made children fall asleep faster", 1], ["Two hours of screen time gave the shortest time", 1], ["All children took 10 minutes to fall asleep", 1]]), table: screenTable },
    ],
  },

  "transporting-nutrients-and-water": {
    rule: "Digestion breaks food down, and the nutrients pass through the wall of the small intestine into the blood. The blood carries nutrients and water to every cell in the body. A plant also moves water, up its stem from the roots to the leaves.",
    hint: "Follow the food: it is digested, passes into the blood, and is delivered to every cell.",
    facts: [
      f("Where do nutrients from food pass into the blood?", "The small intestine", "The windpipe", "The heart"),
      f("What carries nutrients to every cell in the body?", "Blood", "Air", "Bones"),
      f("What is digestion?", "Breaking food down so the body can use it", "Making food hot", "Swallowing air"),
      f("Why do cells need nutrients?", "For energy, growth and repair", "To make blood vessels disappear", "To change colour"),
      f("How does water get from the digestive system into the body?", "It passes into the blood", "It stays in the stomach for ever", "It goes into the lungs"),
      f("What do we call the useful parts of food that the body can use?", "Nutrients", "Waste", "Germs"),
      f("What happens to the parts of food that the body cannot use?", "They leave the body as waste", "They pass into the blood to be used", "They stay in the small intestine for ever"),
      f("Which organ pumps the blood that carries nutrients?", "The heart", "The stomach", "The lungs"),
      f("What can happen if the body does not get enough water?", "It cannot work well, and you may feel tired and thirsty", "You grow taller", "Your blood turns solid"),
      f("How do plants move water from their roots to their leaves?", "Through tubes in the stem", "Through the petals", "Through the soil only"),
      f("Where does food go after it is swallowed?", "Down the gullet to the stomach", "Into the lungs", "Straight into the heart"),
      f("Which fact about the human body is true?", "Most of it is water", "There is no water in it", "Only the blood has water in it"),
    ],
    sorts: [
      g("Which body system does each part belong to?", ["Digestive system", "Circulatory system"], [["Stomach", 0], ["Small intestine", 0], ["Gullet", 0], ["Heart", 1], ["Blood vessels", 1], ["Blood", 1]]),
      g("What passes into the blood, and what leaves the body as waste?", ["Passes into the blood", "Leaves as waste"], [["Nutrients", 0], ["Water", 0], ["Sugars from digested food", 0], ["Parts of food that cannot be used", 1], ["Solid waste", 1], ["Undigested fibre", 1]]),
      g("Is each statement about nutrients and water true or false?", ["True", "False"], [["Blood carries nutrients to every cell", 0], ["Nutrients pass into the blood in the small intestine", 0], ["Plants move water through their stems", 0], ["Nutrients pass into the blood in the mouth", 1], ["Blood carries nutrients only to the heart", 1], ["Plants move water through their petals only", 1]]),
    ],
    structures: [
      s("Build a sentence about nutrients.", "Nutrients pass into the blood."),
      s("Build a sentence about blood.", "Blood carries nutrients to every cell."),
      s("Build a sentence about water.", "The body needs water to work."),
      o("Order the journey of a sandwich through the body, starting with the first step.", ["The sandwich is chewed and swallowed", "The stomach and small intestine digest it", "Nutrients pass into the blood", "Blood carries the nutrients to the cells"]),
      g("Is each fact about humans or about plants?", ["Humans", "Plants"], [["Blood carries nutrients", 0], ["A heart pumps the liquid", 0], ["Digestion happens in the stomach", 0], ["Water travels up the stem", 1], ["Roots take in water", 1], ["Water reaches the leaves", 1]]),
    ],
    enquiries: [
      { ...f("Look at Maya's results. What pattern do they show?", "The longer the stem was in water, the higher the colour travelled", "The longer the stem was in water, the lower the colour travelled", "The colour did not move"), table: celeryTable },
      { ...n("Look at Maya's results. How many more centimetres did the colour travel in 6 hours than in 2 hours?", 8), table: celeryTable },
      { ...n("The colour keeps travelling at the same speed as in Maya's results. How many centimetres will it have reached after 8 hours?", 16), table: celeryTable },
      f("Leo's celery stem turns blue at the top. What does this show?", "The stem carries water up from the bottom", "The leaves made the water blue", "The stem makes its own colour"),
      f("In the human body, which parts do the same job as a celery stem in carrying liquid?", "The blood vessels", "The stomach", "The skull"),
      f("Ellie runs a long way and sweats. Why should she drink water?", "To replace the water the body has lost", "To make her sweat more", "To make her stop breathing"),
      f("Maya eats a banana. Where do nutrients from it pass into her blood?", "The small intestine", "The mouth", "The heart"),
      f("A doctor explains that blood carries digested food to the muscles. Why do the muscles need it?", "For energy to work and to grow and repair", "To make the muscles lighter", "To stop the blood flowing"),
      o("Order Maya's steps to test how a stem carries water, starting with the first step.", ["Stand a celery stick in coloured water", "Wait for an hour", "Cut the stem to see where the colour is", "Measure how far the colour has gone"]),
      { ...s("Build a conclusion from Maya's results.", "Colour travelled up the stem over time."), table: celeryTable },
      g("Which job belongs to a plant stem, and which to human blood vessels?", ["Plant stem", "Human blood vessels"], [["Carries water up to the leaves", 0], ["Starts at the roots", 0], ["Carries water up from the soil", 0], ["Carries blood", 1], ["Connects to the heart", 1], ["Carries oxygen and nutrients round the body", 1]]),
      { ...g("Leo reviews claims about Maya's celery test.", ["Supported by the results", "Not supported"], [["The colour went higher as time passed", 0], ["After 4 hours it had gone 8 cm", 0], ["After 2 hours it had gone 4 cm", 0], ["The colour went down the stem", 1], ["The colour stayed at the bottom", 1], ["After 1 hour it had gone 12 cm", 1]]), table: celeryTable },
    ],
  },
};

// Topic pictures set the scene only. None labels a body part or shows a level 1 answer.
export const animalsVisuals = {
  "the-circulatory-system": scene("meadow", "A child running through a park with trees.", [["🌳", 70, 130, 80], ["🏃", 200, 150, 84], ["🌳", 340, 135, 74]]),
  "the-heart-and-pulse": scene("meadow", "A runner on a track with a stopwatch.", [["🏃", 150, 150, 84], ["⏱️", 290, 130, 72]]),
  "blood-and-blood-vessels": scene("room", "A child with a plaster on a knee beside a first aid box.", [["🧒", 130, 140, 80], ["🩹", 250, 150, 56], ["🧰", 330, 150, 60]]),
  "diet-exercise-and-health": scene("room", "A table with an apple, broccoli, a glass of milk and a loaf of bread.", [["🍎", 90, 150, 56], ["🥦", 170, 150, 56], ["🥛", 250, 150, 56], ["🍞", 330, 150, 56]]),
  "drugs-medicines-and-lifestyle": scene("room", "A bed, a bicycle and a bowl of salad, showing sleep, play and food.", [["🛏️", 90, 150, 66], ["🚲", 205, 150, 66], ["🥗", 320, 150, 62]]),
  "transporting-nutrients-and-water": scene("room", "A sandwich and a glass of water on a table.", [["🥪", 140, 150, 70], ["🥤", 270, 150, 66]]),
};

// Question rules draw only what the question says. They never show or label an answer.
export const animalsRules = {
  "the-circulatory-system": [
    rule(/^Leo cuts his finger and it bleeds/, scene("room", "A child holding up a finger with a plaster.", [["🧒", 150, 140, 80], ["🩹", 270, 150, 56]]), [4]),
    rule(/^A doctor listens to Ellie's chest/, scene("room", "A doctor with a stethoscope.", [["🧑‍⚕️", 150, 135, 86], ["🩺", 270, 150, 60]]), [4]),
  ],
  "the-heart-and-pulse": [
    rule(/^Ellie counts a pulse for 15 seconds/, scene("room", "A stopwatch on a table.", [["⏱️", 200, 140, 90]]), [4]),
    rule(/^Leo counts 20 beats in 15 seconds/, scene("room", "A stopwatch on a table.", [["⏱️", 200, 140, 90]]), [4]),
  ],
  "blood-and-blood-vessels": [
    rule(/^Leo cuts his finger and blood oozes/, scene("room", "A child holding up a finger with a plaster.", [["🧒", 150, 140, 80], ["🩹", 270, 150, 56]]), [4]),
  ],
  "diet-exercise-and-health": [
    rule(/^Leo eats only chips and sweets/, scene("room", "A plate with chips and some sweets.", [["🍟", 140, 145, 70], ["🍬", 270, 150, 56]]), [4]),
    rule(/^Ellie is thirsty after football/, scene("meadow", "A football on the grass in the sunshine.", [["⚽", 190, 150, 70], ["☀️", 310, 80, 56]]), [4]),
  ],
  "drugs-medicines-and-lifestyle": [
    rule(/^Ellie feels poorly and wants some medicine/, scene("room", "A girl who is unwell, resting in bed.", [["🛏️", 150, 150, 72], ["🤒", 270, 140, 70]]), [4]),
  ],
  "transporting-nutrients-and-water": [
    rule(/^Maya eats a banana/, scene("room", "A banana on a table.", [["🍌", 200, 145, 84]]), [4]),
    rule(/^Leo's celery stem turns blue/, scene("lab", "A celery stick standing in a glass.", [["🥬", 160, 135, 76], ["🥤", 280, 150, 62]]), [4]),
  ],
};
