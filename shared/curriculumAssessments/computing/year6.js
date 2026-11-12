// Year 6 Computing knowledge checks. These do not assess writing or testing real programs.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";

const prog = (lines, alt = "A short program.") => ({ renderer: "text", data: { title: "Program", lines }, alt });

export default defineAssessmentBank({ year: 6, subject: "computing", quests: {
  "programming-projects": {
    "combining-loops-and-decisions": { objective: "Traces programs that put an if inside a loop (knowledge check).", items: [
      { q: "A loop repeats 5 times and has an if inside it. How many times is the if question asked?", n: 5, practice: 1, why: "The if question is asked once each time round the loop, so 5 times." },
      { q: "How many times does this program say Clap?", n: 2, practice: 2, model: prog(["set n to 1", "repeat 6 times", "  if n is a multiple of 3", "    say Clap", "  add 1 to n"]), why: "n goes 1 to 6. Only 3 and 6 are multiples of 3, so it says Clap twice." },
      { q: "In a loop with an if and an else inside, what happens each time round?", a: "Exactly one of the two branches runs", d: ["Both branches run", "Neither branch runs"], practice: 1, why: "The if part runs when the answer is yes, otherwise the else part runs." },
      { q: "Put the lines in order. The program says Even or Odd for the numbers 1 to 4.", order: ["set n to 1", "repeat 4 times", "  if n is even, say Even, else say Odd", "  add 1 to n"], practice: 3, why: "Set up n first, then loop, decide inside the loop and add 1 each time." },
    ] },
    "variables-that-change": { objective: "Tracks a variable that changes as a loop runs (knowledge check).", items: [
      { q: "What does this program say at the end?", n: 11, practice: 2, model: prog(["set counter to 2", "repeat 3 times", "  add 3 to counter", "say counter"]), why: "2 + 3 + 3 + 3 = 11." },
      { q: "What is a running total?", a: "A variable that adds each new amount to what it already holds", d: ["A variable that is set once and never changes", "The number of lines in a program"], practice: 1, why: "A running total grows each time round the loop." },
      { q: "In a game loop, which variable stays the same each time round?", a: "playerName", d: ["score", "timeLeft"], practice: 3, why: "A name usually stays the same, but score and time change." },
      { q: "A program sets x to 1, then repeats 4 times: multiply x by 2. What is x at the end?", n: 16, practice: 4, why: "1, 2, 4, 8, 16: doubling four times gives 16." },
    ] },
    "procedures": { objective: "Understands defining and calling procedures (knowledge check).", items: [
      { q: "What is a procedure?", a: "A named block of steps that you can use again", d: ["A mistake in a program", "A number stored in a box"], practice: 1, why: "You define it once and call it by name whenever you need it." },
      { q: "What does it mean to call a procedure?", a: "To use its name so its steps run", d: ["To delete it", "To write its steps again"], practice: 1, why: "Calling runs the steps in the definition." },
      { q: "How many squares does the robot move forward altogether?", n: 20, practice: 2, model: prog(["define square size", "  repeat 4 times", "    forward size", "    turn right", "square 3", "square 2"]), why: "square 3 moves 4 × 3 = 12 squares and square 2 moves 4 × 2 = 8 squares. 12 + 8 = 20." },
      { q: "A program draws 6 squares. Which is the best way to write it?", a: "Define a square procedure once and call it 6 times", d: ["Write all 24 sides out line by line", "Draw one square only"], practice: 3, why: "A procedure saves repeating the same steps." },
    ] },
    "debugging-longer-programs": { objective: "Tests, traces and fixes longer programs (knowledge check).", items: [
      { q: "A program should say 20 by adding 5 four times, but says 15. What is the most likely bug?", a: "The loop repeats 3 times instead of 4", d: ["The computer is broken", "The word say is spelt wrong"], practice: 4, why: "Adding 5 three times gives 15, so the repeat number is wrong." },
      { q: "Put the debugging steps in order.", order: ["Run the program and test it", "Spot that the output is wrong", "Trace the lines to find the bug", "Fix the line", "Test it again"], practice: 3, why: "Test, spot, trace, fix and test again." },
      { q: "Why should you trace a longer program line by line?", a: "To find where it first goes wrong", d: ["To make it run faster", "To delete the loops"], practice: 1, why: "The first wrong value points to the line with the bug." },
      { q: "The goal is: add 10 points each time a coin is collected, 5 times. How do you fix the bug in the line set score to 10?", a: "add 10 to score", d: ["set score to 0", "add 1 to score"], practice: 2, model: prog(["set score to 0", "repeat 5 times", "  collect a coin", "  set score to 10", "say score"]), why: "set score to 10 puts score back to 10 every time. add 10 to score makes it grow to 50." },
    ] },
  },
  "physical-systems": {
    "sensors-and-inputs": { objective: "Knows what sensors measure and how programs use readings (knowledge check).", items: [
      { q: "Is a sensor an input or an output?", a: "An input", d: ["An output", "A loop"], practice: 1, why: "A sensor sends a reading into the program." },
      { q: "Which sensor would an automatic door use to notice a person coming?", a: "A motion sensor", d: ["A moisture sensor", "A temperature sensor"], practice: 4, why: "A motion sensor detects movement." },
      { q: "Why do sensor programs often use a loop?", a: "So they keep checking the reading again and again", d: ["So they only check once", "So the sensor gets bigger"], practice: 1, why: "Readings change, so the program keeps checking." },
      { q: "Sort these into sensors (inputs) and things the computer controls (outputs).", sort: { bins: ["Sensor: input", "Controlled: output"], cards: [["Light sensor", "Sensor: input"], ["Temperature sensor", "Sensor: input"], ["Lamp", "Controlled: output"], ["Motor", "Controlled: output"]] }, practice: 2, why: "Sensors measure. Lamps and motors are switched by the program." },
    ] },
    "controlling-devices": { objective: "Follows programs that control outputs (knowledge check).", items: [
      { q: "An automatic door opens when someone comes near. Which is the output?", a: "The motor that opens the door", d: ["The motion sensor", "The person"], practice: 1, why: "The output is what the program switches: the motor." },
      { q: "The fan turns on if the temperature is above 25. It is 30 degrees. What does the fan do?", a: "It turns on", d: ["It turns off", "It breaks"], practice: 2, why: "30 is above 25, so the if part runs." },
      { q: "Put the steps in order for an automatic door.", order: ["The motion sensor notices a person", "The program decides to open", "The motor opens the door", "The program waits, then closes it"], practice: 3, why: "Input, decision, output, then reset." },
      { q: "The buzzer beeps 2 times inside a loop that repeats 3 times. How many beeps altogether?", n: 6, practice: 4, why: "3 repeats of 2 beeps is 6." },
    ] },
    "simulations": { objective: "Understands what simulations are used for (knowledge check).", items: [
      { q: "Why do pilots practise in a flight simulator?", a: "It is safe to make mistakes there", d: ["Real planes are too small", "Simulators can fly to space"], practice: 2, why: "Mistakes in a simulation cause no real danger." },
      { q: "Is a simulation always exactly right?", a: "No, it is only as good as its rules", d: ["Yes, computers never get it wrong", "Yes, if the screen is big"], practice: 1, why: "A simulation copies real life using rules, so poor rules give poor results." },
      { q: "Put the steps for using a simulation in order.", order: ["Choose the starting values", "Run the simulation", "Look at the results", "Change a value and test again"], practice: 3, why: "Start, run, look, then change and repeat." },
      { q: "A simulation starts with 3 rabbits and the number doubles every month. How many rabbits after 3 months?", n: 24, practice: 4, why: "3, 6, 12, 24: doubling three times gives 24." },
    ] },
  },
  "algorithms": {
    "searching-algorithms": { objective: "Explains linear and halving searches (knowledge check).", items: [
      { q: "What does a linear search do?", a: "Checks each item in turn from the start", d: ["Checks only the middle item", "Sorts the list first"], practice: 1, why: "It goes through the items one at a time." },
      { q: "What must be true before you can use a halving search?", a: "The list must be sorted", d: ["The list must be short", "The list must start at 0"], practice: 1, why: "Halving only works if you know which half the item is in." },
      { q: "Put the steps of a halving search in order.", order: ["Check the middle item", "If it is the one you want, stop", "If not, throw away the half it cannot be in", "Repeat with the half that is left"], practice: 3, why: "Check the middle, then keep only the useful half." },
      { q: "A linear search looks for 9 in the list 4, 7, 9, 12, 15. How many numbers does it check?", n: 3, practice: 4, why: "It checks 4, then 7, then 9 and stops: 3 checks." },
    ] },
    "sorting-algorithms": { objective: "Follows a bubble sort (knowledge check).", items: [
      { q: "What is one pass of a bubble sort?", a: "One walk along the list comparing neighbours", d: ["Sorting the list in one step", "Swapping the first and last items"], practice: 1, why: "A pass compares each pair of neighbours once." },
      { q: "A bubble sort puts the smallest first. After ONE pass on 5, 2, 4, what is the list?", a: "2, 4, 5", d: ["5, 2, 4", "4, 2, 5"], practice: 2, why: "5 swaps with 2, then 5 swaps with 4, giving 2, 4, 5." },
      { q: "Sort these words into alphabetical order.", order: ["apple", "kite", "moon", "robot", "zebra"], practice: 3, why: "Alphabetical order follows the first letter: a, k, m, r, z." },
      { q: "A bubble sort puts 3, 1, 2 smallest first. How many swaps does it make in total?", n: 2, practice: 4, why: "3 and 1 swap, then 3 and 2 swap, giving 1, 2, 3: 2 swaps." },
    ] },
    "comparing-algorithms": { objective: "Compares algorithms by counting steps (knowledge check).", items: [
      { q: "Two programs give the same answer. One takes 10 steps and one takes 100. Which is more efficient?", a: "The one that takes 10 steps", d: ["The one that takes 100 steps", "They are equally efficient"], practice: 1, why: "Fewer steps for the same result is more efficient." },
      { q: "Which is usually faster for finding a word in a sorted dictionary?", a: "A halving search", d: ["A linear search from page 1", "Reading every page twice"], practice: 2, why: "Halving throws away half the pages each time." },
      { q: "Put the searches in order from fewest to most checks for the last item in a sorted list of 100.", order: ["Halving search (at most 7 checks)", "Linear search from the start (100 checks)", "Checking every item twice (200 checks)"], practice: 3, why: "Halving throws away half the list each time, so it never needs more than 7 checks for 100 items. A linear search checks all 100." },
      { q: "An algorithm has a loop of 4 steps that repeats 5 times. How many steps is that altogether?", n: 20, practice: 4, why: "4 steps times 5 repeats is 20 steps." },
    ] },
  },
  "data-and-information": {
    "collecting-data": { objective: "Plans clear data collection (knowledge check).", items: [
      { q: "Which survey question gives answers that are easiest to count?", a: "Which is your favourite fruit: apple, banana or orange?", d: ["Tell me about food.", "What do you think?"], practice: 2, why: "Set choices make answers easy to count and compare." },
      { q: "What should you decide first when collecting data?", a: "The question you want to answer", d: ["The colour of the chart", "The font for the title"], practice: 1, why: "The question decides what you need to collect." },
      { q: "Put the steps of a data project in order.", order: ["Choose a question to answer", "Decide what data to collect", "Collect the data", "Look for patterns in the data"], practice: 3, why: "Plan before you collect, then analyse." },
      { q: "A data logger saves 4 readings every hour. How many readings after 6 hours?", n: 24, practice: 4, why: "4 readings times 6 hours is 24." },
    ] },
    "databases-and-spreadsheets": { objective: "Uses records, filters, sorting and simple formulas (knowledge check).", items: [
      { q: "What does a filter do in a database?", a: "Shows only the records that match a rule", d: ["Deletes the whole database", "Adds up every number"], practice: 1, why: "Filtering hides records that do not match." },
      { q: "In a spreadsheet, what is the cell B3?", a: "Column B, row 3", d: ["Row B, column 3", "The third sheet"], practice: 1, why: "The letter is the column and the number is the row." },
      { q: "Put the steps in order to find who scored most in chess.", order: ["Open the club database", "Filter to show only chess", "Sort by points, highest first", "Read the top record"], practice: 3, why: "Filter first, then sort, then read the top record." },
      { q: "B2 holds 6 and C2 holds 4. What does =B2*C2 show?", n: 24, practice: 4, why: "The formula multiplies the two cells: 6 x 4 = 24." },
    ] },
    "presenting-data": { objective: "Chooses honest, suitable charts (knowledge check).", items: [
      { q: "Which chart is best to show a puppy's weight every month for a year?", a: "A line graph", d: ["A pie chart", "A tally"], practice: 1, why: "A line graph shows change over time." },
      { q: "A bar chart's axis starts at 90, not 0. What could go wrong?", a: "Small differences look huge", d: ["Nothing at all", "The bars disappear"], practice: 2, why: "A cut-off axis can make a chart misleading." },
      { q: "Put the steps for making a chart in order.", order: ["Collect the data", "Choose the right type of chart", "Draw the axes and scale", "Add a title and labels"], practice: 3, why: "Collect, choose, draw, then label." },
      { q: "On a bar chart each square is worth 5. A bar is 7 squares tall. What does it show?", n: 35, practice: 4, why: "7 squares times 5 is 35." },
    ] },
  },
  "online-world": {
    "how-email-and-messaging-work": { objective: "Knows how email and messaging use the internet (knowledge check).", items: [
      { q: "Is email the same as the World Wide Web?", a: "No, they are different services that both use the internet", d: ["Yes, they are the same thing", "No, email does not use the internet"], practice: 1, why: "The internet carries many services, including email and the web." },
      { q: "Why can you get an email while your computer is switched off?", a: "A mail server keeps it until you look", d: ["The email waits in the cable", "It cannot be done"], practice: 1, why: "The mail server stores your email until you open it." },
      { q: "Put the journey of an email in order.", order: ["You press send", "The email is split into packets", "Routers pass the packets across the internet", "The mail server stores the email"], practice: 3, why: "Send, split, travel, store." },
      { q: "You want your teacher to get a copy of an email to your friend. What do you use?", a: "CC", d: ["An attachment", "The inbox"], practice: 4, why: "CC sends a copy to another person." },
    ] },
    "smart-searching": { objective: "Chooses strong searches and spots adverts (knowledge check).", items: [
      { q: "Which search is best to find out how tall giraffes grow?", a: "giraffe height", d: ["I want to know about some animals please", "tall things"], practice: 2, why: "A few strong keywords work best." },
      { q: "A result at the top says Sponsored. What does that mean?", a: "Someone paid for it to be shown there", d: ["It is the most truthful answer", "It was written by the search engine"], practice: 1, why: "Sponsored results are paid adverts." },
      { q: "Put the steps of a smart search in order.", order: ["Decide what you want to find out", "Choose a few strong keywords", "Skip results marked Sponsored", "Check the result on a second site"], practice: 3, why: "Plan, search, skip adverts, then check." },
      { q: "A results page shows 10 results and 3 are marked Sponsored. How many are not adverts?", n: 7, practice: 4, why: "10 take away 3 is 7." },
    ] },
    "fact-or-fake": { objective: "Judges whether online content is trustworthy (knowledge check).", items: [
      { q: "What is the best way to check a surprising fact you read online?", a: "See if other trusted sites say the same", d: ["Believe it if it has a picture", "Share it to ask your friends"], practice: 3, why: "Comparing trusted sources shows whether it is reliable." },
      { q: "A headline says YOU WON'T BELIEVE WHAT THIS CAT DID! What is it most likely to be?", a: "Clickbait", d: ["A science report", "A dictionary entry"], practice: 1, why: "Shouting headlines try to get clicks." },
      { q: "Sort these into trustworthy signs and warning signs.", sort: { bins: ["Trustworthy sign", "Warning sign"], cards: [["A named, expert author", "Trustworthy sign"], ["Other trusted sites agree", "Trustworthy sign"], ["No author or date", "Warning sign"], ["Asks for your password", "Warning sign"]] }, practice: 2, why: "Reliable content is clear about who made it and agrees with other sources." },
      { q: "A friend shares a story you are not sure is true. What is the kind and sensible thing to do?", a: "Check it before sharing it any further", d: ["Share it to everyone quickly", "Add something to make it exciting"], practice: 4, why: "Checking stops false stories spreading." },
    ] },
    "digital-footprint-and-reporting": { objective: "Knows what a digital footprint is and how to report worries (knowledge check).", items: [
      { q: "How long can a photo you post online last?", a: "A very long time, even if you delete it", d: ["Only one minute", "Only until you log off"], practice: 1, why: "Others may have saved or shared it." },
      { q: "Something you see online makes you feel worried. What is the first thing to do?", a: "Tell a trusted adult", d: ["Keep it secret", "Reply to it"], practice: 2, why: "A trusted adult can help you." },
      { q: "Put the steps in order if an online message upsets you.", order: ["Stop and do not reply", "Tell a trusted adult", "Together, block and report the account"], practice: 3, why: "Stop, tell, then block and report." },
      { q: "A game asks for your home address to give you a prize. What should you do?", a: "Do not give it, and tell a trusted adult", d: ["Give it quickly", "Give your school address instead"], practice: 4, why: "Never share personal details for a prize." },
    ] },
  },
} });
