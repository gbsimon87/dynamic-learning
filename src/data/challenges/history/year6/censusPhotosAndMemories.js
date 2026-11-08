import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const censusPhotosAndMemories = year6Topic(["https://www.nationalarchives.gov.uk/education/", "https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.ons.gov.uk/census"], [
  lesson("📋", "Census pages", [
    ["The census counts the people in the country about every ten years.", "How often is a census taken?", "about every ten years", "every single year", "every hundred years"],
    ["First taken in 1801, the census began recording names in 1841.", "Which census first recorded ordinary people's names?", "the census of 1841", "the census of 1801", "the census of 1901"],
    ["A census page lists each person's name, age, job and address.", "Which of these does a census page list?", "each person's job", "each person's favourite food", "each person's best friend"],
    ["Census records stay private for 100 years, so 1921 is the newest open one.", "Why can we not read the names in a recent census?", "records stay private for 100 years", "the pages were all lost", "nobody filled them in"],
    ["The 1939 Register was taken because of the war.", "Why was the 1939 Register taken?", "because of the war", "because of a royal wedding", "because of a bad harvest"],
    ["Photos and memories are other sources for local history.", "Which are also sources for local history?", "photos and memories", "only census pages", "only street signs"]],
    sort("On a census page or not?", ["On a census page", "Not on a census page"], [["Name", 0], ["Job", 0], ["Favourite food", 1], ["Best friend", 1]], ["name, age, job and address"])),
  lesson("📅", "Census years", [
    ["The first census was taken in 1801.", "When was the first census taken?", "1801", "1901", "1701"],
    ["In 1841, the census began recording ordinary people's names.", "What began in 1841?", "recording ordinary people's names", "counting only the farm animals", "taking photos of every family"],
    ["A census has been taken every ten years since, except in 1941.", "Which of these years had no census?", "1941", "1951", "1931"],
    ["The 1921 census is the newest one open to the public.", "Which census is the newest open to the public?", "the 1921 census", "the 1931 census", "the 2001 census"],
    ["The 1939 Register was taken soon after the war began.", "What had just begun when the 1939 Register was taken?", "the war", "a new reign", "the Olympic Games"],
    ["Putting census years in order helps us trace how a family changed.", "What does putting census years in order help us trace?", "how a family changed", "which shop was cheapest", "the weather each year"]],
    order("Order the records, oldest first.", ["First census · 1801", "Names recorded · 1841", "Newest open census · 1921", "The 1939 Register"], ["1801", "1841", "1921", "1939"]), false),
  detective(["A photo of a village street is kept in the local archive.", "It shows a horse and cart, but no cars.", "The people in it stand still and look at the camera.", "The photographer asked them to pose.", "The photo does not show what happened outside the picture.", "A woman aged ninety remembers the street from her childhood.", "Her brother remembers it differently, because memories can fade or differ."],
    [
    ["Where is the photo kept?", "in the local archive", "in a toy shop", "at the railway station", "kept in the local archive"],
    ["Which clue helps us date the photo?", "a horse and cart, but no cars", "people looking at the camera", "the archive it is kept in", "a horse and cart, but no cars"],
    ["Why do the people look at the camera?", "the photographer asked them to pose", "they were running away", "they were selling things", "The photographer asked them to pose."],
    ["What does the photo not show?", "what happened outside the picture", "a horse and a cart", "people standing still", "does not show what happened outside the picture"],
    ["Who remembers the street from childhood?", "a woman aged ninety", "a man aged ten", "the photographer", "A woman aged ninety remembers the street"],
    ["How does her brother's memory compare?", "he remembers it differently", "he remembers it exactly the same", "he has no memory at all", "remembers it differently"],
    ["What can happen to memories?", "they can fade or differ", "they never change at all", "they are always exact", "memories can fade or differ"]], { picture: "📷", pictureLabel: "An old street photo" }),
  lesson("🔍", "Primary and secondary", [
    ["A primary source was made at the time, such as a census page or photo.", "Which of these is a primary source?", "a census page", "a modern history book", "a film made last year"],
    ["A secondary source is made later, such as a history book.", "What is a secondary source?", "one made later", "one made at the time", "one that is always wrong"],
    ["An oral history is a memory told aloud by someone who was there.", "What is an oral history?", "a memory told aloud", "a map drawn by hand", "a list in a census"],
    ["Posed photos show what people wanted us to see.", "What do posed photos show?", "what people wanted us to see", "everything that really happened", "only the weather that day"],
    ["Historians compare sources to see if they agree.", "Why do historians compare sources?", "to see if they agree", "to find the prettiest one", "to count all the pages"],
    ["When sources disagree, a historian says how sure they are.", "What does a historian do when sources disagree?", "says how sure they are", "ignores every source", "picks the one they like"]],
    sort("Primary or secondary?", ["Primary source", "Secondary source"], [["Census page", 0], ["Photo from the time", 0], ["History book", 1], ["A book written later", 1]], ["census page or photo", "history book", "made later"])),
]);
