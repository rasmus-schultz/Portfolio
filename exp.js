import { getJson } from "./getJson.js";

const ExpList = await getJson("./exp.json");

const Output = document.querySelector(".exp");

ExpList.forEach((Item) => {
  const Tasks = Item.tasks.map((task) => `<p>${task}</p>`).join("");

  const Template = `
<li>
    <h2>${Item.place}</h2>
    <p>(${Item.start_date} - ${Item.end_date})</p>
    <p>${Item.position}</p>
    <div>
    ${Tasks}
    </div>
</li>
`;

  Output.insertAdjacentHTML("beforeend", Template);
});
