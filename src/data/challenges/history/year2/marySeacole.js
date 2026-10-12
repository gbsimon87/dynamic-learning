import { lesson as l, sort as s, order as o, portrait, topic } from "./authoring.js";
export const marySeacole = topic([
 "https://www.nam.ac.uk/schools/learning-resources/marvellous-mary-seacole",
 "https://www.maryseacoletrust.org.uk/learn-about-mary/",
], [
 l(["Mary Seacole was a healer from Jamaica.", "She travelled to Crimea during the Crimean War.", "She helped run the British Hotel near the fighting.", "She gave soldiers food, supplies and care."], "🩹", "a bandage", [
 ["Where was Mary from?","Jamaica","London","the Moon","from Jamaica"],
 ["What was her work?","a healer","a pilot","a queen","was a healer"],
 ["Where did she travel?","Crimea","Mars","Pudding Lane","travelled to Crimea"],
 ["Which war was taking place?","the Crimean War","the Great Fire","the Gunpowder Plot","Crimean War"],
 ["What place did she help run?","the British Hotel","St Paul's Cathedral","a printing press","British Hotel"],
 ["What did she give soldiers?","food, supplies and care","video calls","a vote each","food, supplies and care"],
 ], s("Mary's care, or unrelated?", ["Care she gave","Unrelated"], [["food",0],["supplies",0],["care for soldiers",0],["mobile apps",1]], ["food, supplies and care"])),
 l(["First, Mary learned healing skills in Jamaica.", "Next, she travelled to Crimea herself.", "There she helped soldiers at the British Hotel.", "Later, she wrote a book about her life."], "📘", "a book", [
 ["Where did Mary first learn healing?","Jamaica","the Moon","St Paul's","healing skills in Jamaica"],
 ["Where did she go next?","Crimea","a space station","Montgomery","travelled to Crimea"],
 ["Who chose to make the journey?","Mary herself","William Caxton","Rosa Parks","herself"],
 ["Who did she help there?","soldiers","only printers","only pilots","helped soldiers"],
 ["Where did she help soldiers?","the British Hotel","a bus stop","the Monument","British Hotel"],
 ["What did she do later?","wrote a book","invented video calls","built St Paul's","Later, she wrote a book"],
 ], o("Put Mary's story in order.", ["learns healing in Jamaica", "helps soldiers in Crimea", "writes her life story"], ["First", "There", "Later"])),
 portrait("mary-seacole-photo", "Mary Seacole", "a hat and medals", "hat", "her care for soldiers"),
 l(["Mary brought food and care close to the fighting.", "Florence worked in a hospital at Scutari.", "Both helped soldiers during the Crimean War.", "They worked in different places.", "Today, nurses and carers still help sick people."], "🩺", "a stethoscope", [
 ["Who brought food close to the fighting?","Mary","William Caxton","Rosa Parks","Mary brought food"],
 ["Where did Florence work?","a hospital at Scutari","the British Hotel","a bus depot","hospital at Scutari"],
 ["What did both women do?","helped soldiers","flew planes","built printing presses","Both helped soldiers"],
 ["Which war links their work?","the Crimean War","the Gunpowder Plot","the Great Fire","Crimean War"],
 ["Were their workplaces the same?","no, different places","yes, the same room","neither had a workplace","different places"],
 ["What continues today?","helping sick people","only using old lamps","no care at all","still help sick people"],
 ], s("Mary or Florence, in this story?", ["Mary","Florence"], [["food near the fighting",0],["care close to the fighting",0],["Scutari hospital",1],["hospital at Scutari",1]], ["Mary brought food and care", "Florence worked"])),
]);
