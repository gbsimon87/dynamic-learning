// Year 5 Computing knowledge checks. These do not assess writing or testing real programs.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";

const prog = (lines) => ({ renderer: "text", data: { title: "Program", lines }, alt: "A short program." });
const GRID = "The robot starts at (0, 0) facing north. x grows going east and y grows going north.";

export default defineAssessmentBank({ year: 5, subject: "computing", quests: {
  "programming-basics": {
    "sequences-of-instructions": { objective: "Understands that order matters in a sequence (knowledge check).", items: [
      { q: `${GRID} It runs: forward 2, turn right, forward 3. Where does it end?`, a: "(3, 2)", d: ["(2, 3)", "(0, 5)", "(3, 0)"], practice: 1, why: "Forward 2 goes north to (0, 2). Turning right faces east, so forward 3 ends at (3, 2)." },
      { q: `${GRID} Which program ends at (1, 3)?`, a: "forward 3, turn right, forward 1", d: ["forward 1, turn right, forward 3", "forward 3, turn left, forward 1"], practice: 2, why: "Forward 3 reaches (0, 3), then right and forward 1 reaches (1, 3). The same steps in another order end somewhere else." },
      { q: "Put these in a sensible order for making a sandwich.", order: ["Get two slices of bread", "Add the filling", "Put the slices together"], practice: 3, why: "You need the bread first, then the filling, then join it." },
      { q: "A robot starts facing north. It turns right, then moves forward. Which way does it move?", a: "East", d: ["North", "West", "South"], practice: 4, why: "Turning right from north makes it face east, so it moves east." },
    ] },
    "repeat-loops": { objective: "Reads and uses repeat loops (knowledge check).", items: [
      { q: "Repeat 3 times: clap. How many claps is that?", n: 3, practice: 1, why: "The loop runs three times with one clap each time." },
      { q: "The robot draws a square. How many squares does it move forward altogether?", n: 12, practice: 4, model: prog(["repeat 4 times", "  forward 3", "  turn right"]), why: "Each of the 4 repeats moves forward 3 squares: 4 × 3 = 12." },
      { q: "What does a loop do?", a: "Repeats instructions", d: ["Stops the program", "Deletes the program"], practice: 1, why: "Loops repeat instructions, so we do not write them again and again." },
    ] },
    "if-and-else-decisions": { objective: "Follows if and else decisions (knowledge check).", items: [
      { q: "If it is raining, take an umbrella. Else, wear sunglasses. It is sunny. What do you take?", a: "Wear sunglasses", d: ["Take an umbrella", "Stay inside"], practice: 1, why: "It is not raining, so the else part happens." },
      { q: "In an if and else, how many parts are chosen each time?", a: "One", d: ["Two", "None"], practice: 1, why: "The program does the if part or the else part, not both." },
      { q: "The program says T-shirt if temperature > 25, else it says Coat. Sort the temperatures by what it says.", sort: { bins: ["Says T-shirt", "Says Coat"], cards: [["27", "Says T-shirt"], ["32", "Says T-shirt"], ["18", "Says Coat"], ["25", "Says Coat"]] }, practice: 3, why: "27 and 32 are more than 25. 25 is not more than 25, so it says Coat, like 18." },
    ] },
    "variables": { objective: "Understands variables that store and change values (knowledge check).", items: [
      { q: "What does a variable do?", a: "Stores a value that can change", d: ["Draws a picture", "Switches off the computer"], practice: 1, why: "A variable is like a labelled box that holds a value." },
      { q: "score starts at 2. The game adds 5 points after each level. What is score after level 3?", n: 17, practice: 2, why: "2 + 5 + 5 + 5 = 17." },
      { q: "What does the program say?", n: 20, practice: 4, model: prog(["set x to 3", "add 2 to x", "multiply x by 4", "say x"]), why: "x is 3, then 3 + 2 = 5, then 5 × 4 = 20." },
    ] },
    "inputs-and-outputs": { objective: "Tells inputs from outputs (knowledge check).", items: [
      { q: "Sort these into inputs and outputs.", sort: { bins: ["Input", "Output"], cards: [["Keyboard", "Input"], ["Mouse", "Input"], ["Speaker", "Output"], ["Screen", "Output"]] }, practice: 3, why: "Inputs send information in. Outputs show or play it." },
      { q: "You press the space bar and a sprite jumps. What is pressing the space bar?", a: "Input", d: ["Output", "A bug"], practice: 3, why: "Pressing a key sends information into the program." },
      { q: "Which of these is an output device?", a: "Printer", d: ["Microphone", "Scanner"], practice: 2, why: "A printer puts information out onto paper. A microphone and a scanner send information in." },
      { q: "A program asks for a number, multiplies it by 4 and says the answer. The user types 6. What does the program say?", n: 24, practice: 4, why: "The input is 6. The program works out 6 × 4 = 24 and says it as output." },
    ] },
    "finding-and-fixing-bugs": { objective: "Finds and corrects errors in simple programs (knowledge check).", items: [
      { q: "What is a bug?", a: "A mistake in a program", d: ["A tiny insect in the computer", "A way of saving a program"], practice: 1, why: "A bug is a mistake that makes a program not work as planned." },
      { q: "The goal is: draw a square. This program has a bug. How do you fix it?", a: "Change repeat 3 times to repeat 4 times", d: ["Change forward 4 to forward 3", "Delete turn right"], practice: 2, model: prog(["repeat 3 times", "  forward 4", "  turn right"]), why: "A square has 4 sides, so the loop must repeat 4 times." },
      { q: "Put the debugging steps in order.", order: ["Run the program", "Find the bug", "Fix it", "Test again"], practice: 3, why: "Run, find, fix and test is the debugging cycle." },
      { q: "A program adds 4 each time round a loop, starting from 0. It should say 20 but it says 16. How many times should it repeat?", n: 5, practice: 4, why: "20 ÷ 4 = 5, so the loop should repeat 5 times. It only repeated 4 times." },
    ] },
  },
  "algorithms-and-logic": {
    "breaking-problems-into-parts": { objective: "Splits a problem into smaller parts (knowledge check).", items: [
      { q: "What is breaking a big problem into smaller parts called?", a: "Decomposition", d: ["Deletion", "Duplication"], practice: 1, why: "Decomposition makes problems easier to solve." },
      { q: "Which big problem does the part **Send the invitations** belong to?", a: "Plan a birthday party", d: ["Make a robot draw a square", "Write a story"], practice: 2, why: "Sending invitations is one small job inside planning a party." },
      { q: "Why is decomposing helpful?", a: "Each small part is easier to solve", d: ["It makes the problem bigger", "It removes the problem"], practice: 1, why: "Small parts are easier to plan and test." },
      { q: "Sort the parts into the right problem.", sort: { bins: ["Run a bake sale", "Make a quiz game"], cards: [["Bake the cakes", "Run a bake sale"], ["Count the money", "Run a bake sale"], ["Write the questions", "Make a quiz game"], ["Keep the score", "Make a quiz game"]] }, practice: 3, why: "Cakes and money belong to the bake sale. Questions and score belong to the quiz game." },
    ] },
    "how-algorithms-work": { objective: "Explains and follows simple algorithms (knowledge check).", items: [
      { q: "What is an algorithm?", a: "A set of steps to do a task", d: ["A type of computer", "A website"], practice: 1, why: "An algorithm is clear steps in order." },
      { q: "Which word means following a program step by step to see what it does?", a: "trace", d: ["debug", "loop"], practice: 2, why: "To trace is to follow each step. To debug is to find and fix mistakes, and a loop repeats steps." },
      { q: "Which is an algorithm?", a: "A recipe", d: ["A photo", "A song title"], practice: 3, why: "A recipe lists steps in order, like an algorithm." },
      { q: "An algorithm says: if it is raining, take an umbrella. Which idea is it using?", a: "Selection", d: ["A loop", "Decomposition"], practice: 4, why: "If makes a choice. Choosing between steps is called selection." },
    ] },
    "logic-with-and-or-and-not": { objective: "Uses and, or and not to decide if something is true (knowledge check).", items: [
      { q: "You can go out if it is dry AND you finished homework. It is dry but homework is not done. Can you go out?", a: "No", d: ["Yes"], practice: 4, why: "AND needs both parts to be true, and homework is not done." },
      { q: "score is 40 and sunny is true. Is the condition **score > 50 OR sunny** true or false?", a: "True", d: ["False"], practice: 2, why: "score > 50 is false, but sunny is true. OR needs at least one part to be true." },
      { q: "What is NOT true?", a: "False", d: ["True", "It depends"], practice: 1, why: "NOT flips true to false and false to true." },
    ] },
  },
  "networks-and-the-web": {
    "computer-networks": { objective: "Knows what a network is and why it is useful (knowledge check).", items: [
      { q: "What is a computer network?", a: "Devices connected so they can share things", d: ["A single computer", "A type of keyboard"], practice: 1, why: "A network joins devices so they can share information." },
      { q: "Which can be shared on a school network?", a: "A printer", d: ["A pencil", "A lunch box"], practice: 4, why: "Many computers can use one printer over the network." },
      { q: "Sort these into things that use a network and things that do not.", sort: { bins: ["Uses a network", "Does not need one"], cards: [["Sending an email", "Uses a network"], ["Video call", "Uses a network"], ["Typing a note offline", "Does not need one"], ["Drawing on paper", "Does not need one"]] }, practice: 3, why: "Email and video calls need a network. Offline typing and paper do not." },
    ] },
    "how-data-travels": { objective: "Knows data is sent in packets (knowledge check).", items: [
      { q: "What are the small pieces that data is split into called?", a: "Packets", d: ["Pockets", "Pages"], practice: 1, why: "Data is split into packets that travel separately." },
      { q: "Put these in order for sending a photo.", order: ["Photo is split into packets", "Packets travel across the network", "Packets are joined back together"], practice: 3, why: "It is split, sent and then rebuilt." },
      { q: "What happens to packets when they arrive?", a: "They are joined back together", d: ["They are deleted", "They are printed"], practice: 4, why: "The device puts the packets back in the right order." },
    ] },
    "the-internet-and-the-web": { objective: "Tells the internet from the web (knowledge check).", items: [
      { q: "Which is the web?", a: "Pages you open in a browser", d: ["The cables under the sea", "A computer screen"], practice: 1, why: "The web is the collection of pages. The internet is the network that carries them." },
      { q: "Aisha sends an email to her aunt. Is that the World Wide Web?", a: "No, it is another internet service", d: ["Yes, email is the web", "No, email does not use the internet"], practice: 4, why: "Email uses the internet but it is not the web. The web is pages you open in a browser." },
      { q: "Sort these.", sort: { bins: ["The internet", "The web"], cards: [["Network of networks", "The internet"], ["Cables and routers", "The internet"], ["Web pages", "The web"], ["Websites you browse", "The web"]] }, practice: 3, why: "The internet is the network. The web is pages that run on it." },
    ] },
  },
  "search-and-information": {
    "using-search-engines": { objective: "Chooses effective search keywords (knowledge check).", items: [
      { q: "Which search is best for finding out why a volcano blows up?", a: "volcano eruption causes", d: ["stuff about hot mountain maybe", "tell me everything"], practice: 3, why: "Clear keywords give better results." },
      { q: "What is a keyword?", a: "An important word you type into a search", d: ["The first result on the page", "A password for a website"], practice: 1, why: "Keywords are the specific words that matter, such as Mars or volcano." },
      { q: "Search results do not help. What should you try?", a: "Change the keywords", d: ["Give up", "Click anything"], practice: 4, why: "Try different or clearer words." },
    ] },
    "how-results-are-ranked": { objective: "Understands that results are ranked and may include adverts (knowledge check).", items: [
      { q: "Is the first search result always the best?", a: "No, you should check more than one", d: ["Yes, it is always the most correct page", "Yes, search engines check every fact"], practice: 4, why: "Ranking is not the same as being the best or true, and the top result may be an advert." },
      { q: "What might a word like Ad next to a result mean?", a: "It is a paid advert", d: ["It is the most true page", "It is hidden"], practice: 2, why: "Companies can pay for adverts to appear in results." },
      { q: "Why do search engines rank results?", a: "To show the most likely useful results first", d: ["To hide every page", "To delete pages"], practice: 1, why: "They try to guess which pages are most useful." },
      { q: "Does it help a page rank higher?", sort: { bins: ["Helps ranking", "Does not help"], cards: [["Matches your keywords well", "Helps ranking"], ["Many pages link to it", "Helps ranking"], ["It has a long title", "Does not help"], ["It uses bright colours", "Does not help"]] }, practice: 3, why: "Search engines rank pages that match the keywords and that many other pages link to." },
    ] },
    "judging-websites": { objective: "Judges whether a website is trustworthy (knowledge check).", items: [
      { q: "Which question helps you judge a website?", a: "Who wrote it?", d: ["What colour is it?", "How many buttons does it have?"], practice: 1, why: "Knowing the author helps you decide how far to trust it." },
      { q: "Sort these into signs of a trustworthy page and signs to be careful.", sort: { bins: ["Good sign", "Be careful"], cards: [["Names the author", "Good sign"], ["Other sites agree", "Good sign"], ["No author or date", "Be careful"], ["Asks for personal details", "Be careful"]] }, practice: 3, why: "Reliable pages are clear about who made them and agree with other sources." },
      { q: "Which source is usually most reliable for facts about space?", a: "A space agency website", d: ["An anonymous post", "A joke page"], practice: 4, why: "Expert organisations usually check their facts." },
    ] },
  },
  "safe-and-responsible-use": {
    "keeping-information-safe": { objective: "Knows what to keep private and how to use passwords safely (knowledge check).", items: [
      { q: "Which should you keep private online?", a: "Your password", d: ["Your favourite book", "A hobby you enjoy"], practice: 3, why: "A password protects your account, so keep it private." },
      { q: "Which is the strongest password?", a: "Blue7!Tiger%Cloud", d: ["password", "12345", "dog123"], practice: 4, why: "A long mix of words, numbers and symbols is hard to guess." },
      { q: "A stranger online asks where you live. What do you do?", a: "Do not answer and tell a trusted adult", d: ["Tell them", "Send a photo of your house"], practice: 4, why: "Never share personal details with people you do not know." },
    ] },
    "kind-and-responsible-online": { objective: "Knows kind online behaviour and how to report concerns (knowledge check).", items: [
      { q: "You see an unkind message about a classmate. What should you do?", a: "Tell a trusted adult", d: ["Share it", "Add to it"], practice: 4, why: "Reporting helps stop it and keeps people safe." },
      { q: "Before you post, what should you think?", a: "Is it kind and safe to share?", d: ["How can I get more likes?", "Can I make someone angry?"], practice: 4, why: "Think before posting." },
      { q: "Sort these into kind and unkind online behaviour.", sort: { bins: ["Kind", "Unkind"], cards: [["Say well done", "Kind"], ["Include everyone", "Kind"], ["Make fun of someone", "Unkind"], ["Share a private photo", "Unkind"]] }, practice: 3, why: "Kind behaviour makes the online world better for everyone." },
    ] },
  },
} });
