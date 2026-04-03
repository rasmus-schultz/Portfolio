import { getJson } from "./getJson.js";

const WorkList = await getJson("./work.json");
const EduList = await getJson("./edu.json");

const Exp = document.querySelector(".exp");
const WorkSec = Exp.querySelector(".work");
const WorkOutput = WorkSec.querySelector("ul");
const EduSec = Exp.querySelector(".edu");
const EduOutput = EduSec.querySelector("ul");

const Switches = document.querySelector(".switches");
const WorkButton = Switches.querySelector(".work");
const EduButton = Switches.querySelector(".edu");

WorkList.forEach((Item) => {
  const Template = `
<li>
    <h3 class="place">${Item.place}</h3>
    <p class="date">(${Item.start_date} - ${Item.end_date})</p>
    <p class="position">${Item.position}</p>
    <p class="tasks">
    ${Item.tasks}
    </p>
</li>
`;
  WorkOutput.insertAdjacentHTML("beforeend", Template);
});

EduList.forEach((Item) => {
  const Template = `
<li>
    <h3 class="place">${Item.place}</h3>
    <p class="date">(${Item.start_date} - ${Item.end_date})</p>
    <p class="position">${Item.position}</p>
</li>
`;
  EduOutput.insertAdjacentHTML("beforeend", Template);
});

function toggleSection(section, button) {
  section.classList.toggle("hidden");
  button.classList.toggle("off");
}

WorkButton.addEventListener("click", () => {
  toggleSection(WorkSec, WorkButton);
});

EduButton.addEventListener("click", () => {
  toggleSection(EduSec, EduButton);
});
