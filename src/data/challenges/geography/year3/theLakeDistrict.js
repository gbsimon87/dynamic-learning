import { c, lesson, record, sort, topic, visual } from "./authoring.js";
import { LAKE_MAP } from "./maps.js";
const photo=visual("photo","Gatesgarth Farm, Lake District — July 2025","Sheep stand on grassy land beside stone farm buildings. Mountains rise behind the farm. This is one farm view, not the entire National Park.",["The photograph shows sheep, farm buildings and mountain slopes.","The Lake District National Park is a bounded region in England.","People live and work here as well as visiting."],{image:"lake-sheep"});
const work=record(["Lake District sources describe farming and tourism as local work.","Farmers manage grazing land and care for sheep.","Visitors use accommodation, food services and leisure activities.","Local people also live in settlements and use everyday services.","A single farm photograph cannot show every local job."]);
const links=record(["Mountain slopes and lakes attract visitors for walking and scenery.","Visitor spending can support accommodation and food businesses.","Grazing land supports sheep farming and farm work.","Local homes and services are part of this working landscape.","The National Park boundary tells us which region we are studying."]);
export const theLakeDistrict=topic([
 lesson(["We study the Lake District National Park in England.","Its boundary defines our region.","Mountains, valleys, lakes, homes and work are part of this place."],photo,[
 c("Which animals appear in this farm view?","Sheep","Camels","Penguins",photo,["park","lakePhoto"]),
 c("Which physical feature rises behind the farm?","Mountains","A flat desert","Open ocean",photo,["lakePhoto"]),
 c("Which buildings appear in the picture?","Farm buildings","Only skyscrapers","Only a palace",photo,["lakePhoto"]),
 c("Which country contains this National Park?","England","Italy","Spain",photo,["park"]),
 c("Which description fits this region?","People live and work as well as visit","No people live here","Only visitors use this land",photo,["parkWork"]),
 c("Does this photograph show the entire National Park?","No, only one farm view","Yes, every settlement","Yes, every lake",photo,["lakePhoto"]),
 sort("Sort features in the farm photograph.",["Physical feature","Human activity or building"],[["Mountain slopes",0],["Farm buildings",1],["Sheep farming",1]],photo,["lakePhoto","parkWork"]),
 ]),
 lesson(["Read the National Park boundary and labelled places.","Kendal is nearby, outside the park.","Keswick, Ambleside, lakes and peaks appear within our study region."],LAKE_MAP,[
 c("Which marked town is outside the park?","Kendal","Keswick","Ambleside",LAKE_MAP,["parkBoundary"]),
 c("Which marker names a mountain?","Scafell Pike","Kendal","Windermere",LAKE_MAP,["park"]),
 c("Which marker names a lake beside Keswick?","Derwentwater","Kendal","Scafell Pike",LAKE_MAP,["park"]),
 c("Which settlement marker is north of Ambleside?","Keswick","Kendal","Windermere",LAKE_MAP,["parkBoundary"]),
 c("Which lake marker is south of Ambleside?","Windermere","Derwentwater","Scafell Pike",LAKE_MAP,["park"]),
 c("Which evidence defines the studied region?","National Park boundary","Only one farm roof","All of England's boundary",LAKE_MAP,["parkBoundary"]),
 c("Which marker lies west of Kendal?","Scafell Pike","Kendal itself","None of them",LAKE_MAP,["parkBoundary"]),
 ]),
 lesson(["Use the sources to find evidence of local work.","Tourism and farming are both part of local life.","One photograph cannot show every job."],work,[
 c("Which work uses grazing land and sheep?","Farming","Cargo shipping","Only office work",work,["parkWork"]),
 c("Which business can visitors support?","Accommodation","Only mines","Only motorways",work,["parkWork"]),
 c("Which service is linked to visitor spending?","Food services","Only satellite building","Only volcano monitoring",work,["park"]),
 c("Which activity is described in the source?","Leisure activities","No leisure at all","Only desert travel",work,["park"]),
 c("Which evidence challenges the idea that nobody lives here?","Local settlements and everyday services","Only the sky colour","Only one mountain height",work,["parkWork"]),
 c("Which conclusion is supported by these sources?","Both farming and tourism provide work","Every worker is a farmer","Every home is a hotel",work,["parkWork"]),
 c("What cannot a single farm photograph tell us?","Every local job","Whether sheep are visible","Whether buildings are visible",work,["lakePhoto"]),
 ]),
 lesson(["Connect landscape features to people's livelihoods.","Use evidence for each link.","The region includes local homes, work and visiting."],links,[
 c("How can mountains and lakes connect to local work?","Visitors support tourism businesses","All slopes grow identical crops","No people use these landscapes",links,["park","parkWork"]),
 c("Which link connects grazing land and a livelihood?","Land supports sheep farming","Lakes make every resident a sailor","Mountains remove all farming",links,["parkWork"]),
 c("Why include homes and services in our study?","They are part of local life","Only visitors matter","There are no settlements",links,["parkWork"]),
 c("Which visitor activity connects to mountain scenery?","Walking","Only underground mining","Only cargo shipping",links,["park"]),
 c("Which business could serve walkers staying overnight?","Accommodation","Only a shipyard","Only an oil refinery",links,["park"]),
 c("Why keep the National Park boundary in the study?","It defines the region being compared","It contains all of England","It predicts visitor numbers",links,["parkBoundary"]),
 c("Which comparison would be at the same regional scale?","Another bounded region","Every continent at once","Only one sheep",links,["parkBoundary"]),
 ]),
]);
