import { buildTopic } from "../../../topicBank.js";
import { compositionBank } from "./compositionBank.js";

export const RULE = "To précis is to give the important information from a longer passage in a few clear words.";
const hint = "Keep the main idea and the key result. Leave out examples, repeated details and opinions.";
const rows = [
  ["Beavers carry branches into streams and build dams. The dams slow the water and create deep ponds where other animals can live.", "Beavers build dams that change streams into ponds.", "Beavers collect every branch in a stream.", "Ponds are the only homes for animals."],
  ["The school council asked pupils about the playground. Most wanted more shade, so volunteers planted three young trees beside the benches.", "Pupils asked for shade, and trees were planted.", "Every pupil planted three trees.", "The benches were removed from the playground."],
  ["A volcanic eruption can send ash high into the air. Ash may travel a long way and can affect people, animals and flights.", "Volcanic ash can travel far and cause problems.", "Every volcano sends lava into the sea.", "Flights make volcanoes erupt."],
  ["Mangrove trees grow along warm coasts. Their tangled roots protect young fish from waves and provide shelter for many animals.", "Mangrove roots shelter young coastal animals.", "Mangroves only grow in deep oceans.", "Young fish use waves to build roots."],
  ["The first photographs needed people to stay still for a long time. Later cameras made taking photographs much quicker and easier.", "Cameras changed to make photography quicker.", "Early cameras could photograph moving people easily.", "Modern cameras need longer exposures."],
  ["Recycling aluminium uses less energy than making new metal. Empty cans can also be recycled again and again.", "Recycling aluminium saves energy and materials.", "Aluminium cans can only be recycled once.", "Making new metal uses no energy."],
  ["Hedgerows give birds places to nest. They also link habitats so that small animals can move between them more safely.", "Hedgerows support wildlife in more than one way.", "Hedgerows are only garden decorations.", "Birds cannot nest in plants."],
  ["Paper maps use symbols to show features such as paths and rivers. A key explains what each symbol means.", "A map key explains its symbols.", "Maps cannot show rivers.", "Every map uses photographs instead of symbols."],
  ["A seed needs water to begin growing. Later, leaves use sunlight to make food for the plant.", "Plants need different resources as they grow.", "Seeds grow without water or light.", "Leaves only collect rainwater."],
  ["Roman engineers built roads with firm layers of stone. Soldiers, traders and messages could then travel more quickly.", "Roman roads helped people and goods travel.", "Romans travelled only by boat.", "Roads were made from one thin layer of sand."],
  ["Wind turbines use moving air to turn their blades. The turning blades drive a generator that makes electricity.", "Wind turbines turn wind energy into electricity.", "Turbines create wind from electricity.", "Turbine blades only work underwater."],
  ["Coral reefs are built by tiny living animals. The reefs provide food and shelter for many sea creatures.", "Coral reefs are living habitats for sea animals.", "Coral is a lifeless kind of stone.", "Every sea creature lives on a reef."],
  ["Deserts can be very hot during the day. Without clouds to hold heat in, they may become very cold at night.", "Desert temperatures can change greatly.", "Deserts are always hot.", "Clouds make every desert wetter."],
  ["Owls have soft-edged feathers that help them fly quietly. This makes it easier for them to approach prey without being heard.", "Owls' feathers help them hunt quietly.", "Owls use feathers to make loud warnings.", "All birds have silent wings."],
  ["The moon does not make its own light. It reflects sunlight, and its changing position makes its lit part look different from Earth.", "Moon phases are changing views of reflected sunlight.", "The moon makes sunlight every night.", "The moon changes into a new object each month."],
].map(([text, answer, ...wrong]) => ({ text, answer, wrong, more: ["very"] }));

export const topic = compositionBank({
  rule: RULE, hint, rows, bins: ["States the main idea", "Misses or distorts the main idea"],
  prompts: {
    one: () => "Which is the best précis of the passage?",
    two: () => "Sort the possible précis sentences.",
    three: () => "Build the short, accurate précis.",
    four: () => "A reader needs the big idea. Which sentence should be kept?",
  },
});
export const buildPrecisingLongerPassages = buildTopic(topic);
