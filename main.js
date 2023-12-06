const button = document.getElementById('button');
const score_counter = document.getElementById('score_count');

let stats = {
  score: 0,
  score_per_click: 1,
};

let upgrades = {
  wheat: {
    id: 'wheat',
    name: 'Wheat',
    desc: 'Generates $1 every 10s.',
  },
  cheese: {
    id: 'cheese',
    name: 'Cheese',
    desc: 'C H E Z',
  },
};

document.addEventListener('load', main());

function main() {
  let upgrades_div = document.getElementById('upgrade_div');
  for (i in upgrades) {
    let upgrade = upgrades[i];

    let upgrade_element = document.createElement('button');
    upgrade_element.id = upgrade.id;
    upgrade_id.innerText = upgrade.name;

    upgrades_div.appendChild(upgrade_element);
  }
}

button.onclick = function () {
  stats.score += stats.score_per_click;
  score_counter.textContent = 'Score: ' + stats.score.toString();
};
