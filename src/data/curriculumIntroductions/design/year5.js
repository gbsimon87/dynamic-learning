// Year 5 Design & Technology purpose screens. Ideas, safety and vocabulary; making is done with a grown-up.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const pics = (title, items, alt) => ({ renderer: "pictures", data: { title, items }, alt });
const steps = (title, list, alt) => ({ renderer: "lesson", data: { type: "steps", title, steps: list }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });

export default defineIntroductions({ year: 5, subject: "design",
  subjectIntro: I("Welcome to Year 5 Design and Technology", ["Design, test and improve things people need.", "Explore structures, gears, circuits and healthy food."],
    "Designers and engineers solve everyday problems, from a safer bike helmet to a better lunch box. Thinking like them helps you plan, make and improve your own ideas.",
    "Before building a bridge, an engineer sketches it and tests a model.",
    pics("Design and make", [{ icon: "✏️", label: "Design" }, { icon: "🔧", label: "Make" }, { icon: "✅", label: "Test" }], "Three pictures with labels: a pencil for designing, a spanner for making and a tick for testing.")),
  quests: {
    "designing-and-evaluating": {
      intro: I("Designing and evaluating", ["Plan a design to meet what people need.", "Sketch, test and improve products."],
        "A good design starts with who it is for and what it must do. Checking how well it works shows you how to improve it.",
        "A school bag must be strong, light and comfortable.",
        steps("The design cycle", ["Find out what is needed.", "Sketch ideas.", "Make a model.", "Test and improve."], "Four steps of designing: find out what is needed, sketch ideas, make a model, then test and improve.")),
      topics: {
        "design-criteria-and-research": I("Design criteria and research", ["Ask people what they need.", "Write a list of things your design must do."],
          "Design criteria stop you forgetting something important, like making a lunch box easy for small hands to open.", "A criterion could be: the box must keep food cool.",
          steps("Before designing", ["Ask users.", "Look at similar products.", "Write criteria.", "Start sketching."], "Four steps before designing: ask users, look at similar products, write criteria and start sketching.")),
        "sketches-and-models": I("Sketches and models", ["Use labelled sketches and exploded drawings.", "Make a model to test an idea cheaply."],
          "Sketches and models let you share and test ideas before you spend time and materials on the real thing.", "A cardboard model of a chair shows if it is the right height.",
          pics("Ways to show ideas", [{ icon: "📝", label: "Annotated sketch" }, { icon: "📦", label: "Model" }, { icon: "💻", label: "Computer drawing" }], "Three pictures with labels: an annotated sketch, a model and a computer drawing.")),
        "evaluating-products": I("Evaluating products", ["Test a product against your criteria.", "Listen to what other people think."],
          "Testing and feedback show what works and what to change, as when a company improves a toy after children try it.", "If the lid is hard to open, the design needs to change.",
          table("Evaluation", ["Criterion", "Test"], [["Strong", "Does it hold weight?"], ["Easy to use", "Can a child use it?"]], "A table of two criteria with a test for each: strong, does it hold weight, and easy to use, can a child use it.")),
        "inventors-and-designers": I("Inventors and designers", ["Meet people who changed the world with new ideas.", "See how inventions build on earlier ones."],
          "Knowing how inventions began helps you see that problems can be solved with imagination.", "Tim Berners-Lee invented the World Wide Web.",
          table("Inventors", ["Person", "Invention"], [["James Dyson", "Bagless vacuum cleaner"], ["Tim Berners-Lee", "World Wide Web"], ["Alexander Graham Bell", "Telephone"]], "A table matching people to inventions: James Dyson with the bagless vacuum cleaner, Tim Berners-Lee with the World Wide Web and Alexander Graham Bell with the telephone.")),
      },
    },
    "making": {
      intro: I("Making", ["Choose the right tool and use it safely.", "Pick materials and ways to join them."],
        "Using the right tool and material makes your product work and keeps you safe. A grown-up should always help with sharp tools.",
        "A saw cuts wood, and scissors cut card.",
        pics("Making", [{ icon: "✂️", label: "Cut" }, { icon: "🧰", label: "Tools" }, { icon: "🧤", label: "Safety" }], "Three pictures with labels: scissors for cutting, a toolbox and gloves for safety.")),
      topics: {
        "tools-and-safety": I("Tools and safety", ["Choose a tool for cutting, shaping and joining.", "Follow safety rules and ask for help."],
          "Safe habits stop accidents in school, at home and at work.", "Always cut away from your body and wear goggles if told to.",
          steps("Staying safe", ["Choose the right tool.", "Clamp or hold your work.", "Wear safety kit.", "Tidy up."], "Four steps for staying safe: choose the right tool, clamp or hold your work, wear safety kit and tidy up.")),
        "materials-and-joining": I("Materials and joining", ["Match materials to their properties.", "Choose glue, nails, stitches or tape to suit."],
          "The right material and joint make a product last, like waterproof fabric for a raincoat.", "Wood is strong and stiff, and fabric is flexible.",
          table("Joining", ["Material", "Way to join"], [["Card", "Glue or tape"], ["Fabric", "Stitching"], ["Wood", "Glue or nails"]], "A table of materials and ways to join them: card with glue or tape, fabric with stitching and wood with glue or nails.")),
      },
    },
    "technical-knowledge": {
      intro: I("Technical knowledge", ["Learn how structures, levers, gears and circuits work.", "See how computers can control products."],
        "Bridges, bikes and lights all use these ideas. Knowing how they work helps you design things that work well.",
        "A bicycle uses gears, levers and strong frames.",
        pics("How things work", [{ icon: "🌉", label: "Structure" }, { icon: "⚙️", label: "Gear" }, { icon: "💡", label: "Circuit" }], "Three pictures with labels: a bridge, a gear and a light bulb.")),
      topics: {
        "strong-structures": I("Strong structures", ["Learn ways to make a frame stiff.", "Know why triangles are strong."],
          "Pylons, cranes and bridges use triangles to stay strong with less material.", "Adding a diagonal strut stops a square frame wobbling.",
          pics("Strong shapes", [{ icon: "🔺", label: "Triangle" }, { icon: "🌉", label: "Bridge" }, { icon: "🏗️", label: "Crane" }], "Three pictures with labels: a triangle, a bridge and a crane.")),
        "levers-and-linkages": I("Levers and linkages", ["Find the pivot, effort and load.", "Learn how linkages change a movement."],
          "Levers make jobs easier, like a spade lifting soil, and linkages make pop-up cards move.", "A seesaw is a lever with the pivot in the middle.",
          table("Parts of a lever", ["Part", "Job"], [["Pivot", "The point it turns on"], ["Effort", "The push or pull you give"], ["Load", "The thing being moved"]], "A table of lever parts: the pivot is the point it turns on, the effort is the push or pull you give and the load is the thing being moved.")),
        "gears-pulleys-and-cams": I("Gears, pulleys and cams", ["Learn how gears turn each other.", "See how pulleys lift and cams move parts."],
          "Gears help bikes climb hills, pulleys lift loads on building sites and cams make toys move up and down.", "Two meshed gears turn in opposite directions.",
          pics("Machines", [{ icon: "⚙️", label: "Gears" }, { icon: "🏗️", label: "Pulley" }, { icon: "🔄", label: "Cam" }], "Three pictures with labels: gears, a pulley and a cam.")),
        "electrical-systems": I("Electrical systems", ["Build a series circuit with a switch.", "Know what bulbs, buzzers and motors do."],
          "Circuits power torches, alarms and toys. Always use low-voltage cells and never mains electricity.", "A switch breaks the circuit and turns the bulb off.",
          steps("A simple circuit", ["Cell gives energy.", "Wires carry it.", "Switch closes the loop.", "Bulb lights."], "Four parts of a simple circuit: the cell gives energy, wires carry it, the switch closes the loop and the bulb lights.")),
        "computing-to-monitor-and-control": I("Computing to monitor and control", ["Learn about sensors and programs in products.", "See how inputs lead to outputs."],
          "Automatic doors, street lights and thermostats use sensors and programs to work by themselves.", "A light sensor can switch a lamp on when it gets dark.",
          table("Input and output", ["Input", "Output"], [["Light sensor", "Lamp"], ["Button", "Buzzer"], ["Temperature sensor", "Fan"]], "A table matching inputs to outputs: light sensor with lamp, button with buzzer and temperature sensor with fan.")),
      },
    },
    "cooking-and-nutrition": {
      intro: I("Cooking and nutrition", ["Learn what makes a healthy, varied diet.", "Learn where food comes from and how to cook safely."],
        "Knowing about food helps you choose meals that keep you healthy and cook safely with a grown-up.",
        "A balanced meal has starchy food, protein, fruit and vegetables.",
        pics("Food", [{ icon: "🥦", label: "Vegetables" }, { icon: "🍞", label: "Starchy food" }, { icon: "🐟", label: "Protein" }], "Three pictures with labels: vegetables, bread as starchy food and fish as protein.")),
      topics: {
        "a-healthy-and-varied-diet": I("A healthy and varied diet", ["Name the food groups.", "Plan a balanced meal."],
          "A varied diet gives your body what it needs to grow, learn and play.", "Fruit and vegetables should be just over a third of what you eat each day.",
          table("Food groups", ["Group", "Example"], [["Starchy food", "Rice"], ["Protein", "Beans"], ["Dairy", "Yoghurt"], ["Fruit and vegetables", "Carrots"]], "A table of food groups with an example for each: starchy food rice, protein beans, dairy yoghurt and fruit and vegetables carrots.")),
        "seasonality-and-food-sources": I("Seasonality and food sources", ["Know which foods grow in which season.", "Learn if food is grown, reared or caught."],
          "Eating food in season can taste better and travels fewer miles to your plate.", "In the UK, strawberries are ready in summer.",
          table("Food sources", ["Food", "Source"], [["Wheat", "Grown"], ["Chicken", "Reared"], ["Cod", "Caught"]], "A table of foods and their sources: wheat is grown, chicken is reared and cod is caught.")),
        "cooking-skills-and-kitchen-hygiene": I("Cooking skills and kitchen hygiene", ["Learn skills such as chopping, boiling and baking.", "Keep food safe by washing, separating and chilling."],
          "Clean hands and safe cooking stop germs making people ill.", "Wash your hands for 20 seconds before cooking.",
          steps("Kitchen hygiene", ["Wash your hands.", "Keep raw meat apart.", "Cook food thoroughly.", "Chill leftovers."], "Four hygiene steps: wash your hands, keep raw meat apart, cook food thoroughly and chill leftovers.")),
      },
    },
  } });
