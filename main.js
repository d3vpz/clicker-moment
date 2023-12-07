const button = document.getElementById('button');
const score_counter = document.getElementById('score_count');
const per_second_counter = document.getElementById('per_second_count');
const save_button = document.getElementById('save_button');
const load_button = document.getElementById('load_button');

let stats = {
    score: 0,
    score_per_click: 1,
    score_per_second: 0,
};

let upgrades = {
    wheat: {
        data: new Upgrade('wheat', 'Wheat', 'Wheet', 1, 1),
    },
    cheese: {
        data: new Upgrade('cheese', 'Cheese', 'C H E Z', 10, 2),
    },
    bread: {
        data: new Upgrade('bread', 'Bread', 'wheat but more', 50, 4),
    },
};

function Upgrade(id, name, desc, cost, profit) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.cost = cost;
    this.profit = profit;
}

window.addEventListener('load', main);

function main() {
    load();
    add_buttons();
    toggle_button_desc();
    button_presses();
    setInterval(loop, 10);
    setInterval(update_money, 1000);
    setInterval(save, milli_to_whole(30));
}

function loop() {
    update_stats_disp();
}

function update_money() {
    stats.score += stats.score_per_second;
    stats.score = Math.floor(stats.score);
}

button.onmousedown = function () {
    button.style.scale = 0.9;
    let sound = new Audio('resources/sounds/click.wav');
    sound.play();
};

button.onmouseup = function () {
    stats.score += stats.score_per_click;
    button.style.scale = 1.0;
};

button.onmouseover = function () {
    button.style.scale = 1.1;
};

button.onmouseout = function () {
    button.style.scale = 1;
};

save_button.onclick = function () {
    save();
    alert('Game saved.');
};

load_button.onclick = function () {
    load();
};

function add_buttons() {
    let upgrades_div = document.getElementById('upgrade_div');
    for (i in upgrades) {
        let upgrade = upgrades[i].data;

        let upgrade_element = document.createElement('button');
        upgrade_element.id = upgrade.id;
        upgrade_element.innerText = upgrade.name + ': $' + upgrade.cost;

        upgrades_div.appendChild(upgrade_element);
    }
}

function toggle_button_desc() {
    for (i in upgrades) {
        let button = upgrades[i].data;
        let button_id = button.id;
        let button_obj = document.getElementById(button_id);
        button_obj.onmouseover = function () {
            button_obj.innerText = button.desc;
            button_obj.style = 'background-color: #303030; font-size: 12px';
        };
        button_obj.onmouseout = function () {
            button_obj.innerText = button.name + ': $' + button.cost;
            button_obj.style = 'background-color: #202020; font-size: 20px';
        };
    }
}

function button_presses() {
    for (i in upgrades) {
        let button = upgrades[i].data;
        let button_id = button.id;
        let button_obj = document.getElementById(button_id);
        button_obj.onclick = function () {
            if (stats.score >= button.cost) {
                stats.score -= button.cost;
                button.cost *= 1.5;
                button.cost = Math.ceil(button.cost);
                stats.score_per_second += button.profit;
            }
        };
    }
}

function update_stats_disp() {
    score_counter.textContent = 'Money: $' + stats.score.toString();
    per_second_counter.textContent =
        'Per Second: $' + stats.score_per_second.toString();
}

function save() {
    localStorage.setItem('gameData', JSON.stringify({
        stats: stats,
        upgrades: upgrades
    }));
    console.log('Game saved.');
}

function load() {
    if (localStorage.gameData) {
        let data = JSON.parse(localStorage.gameData);
        stats = data.stats;
        upgrades = data.upgrades;
        alert('Game loaded successfully.');
        console.log('Game loaded.');
    }
}

function check_invalid_save(user) {
    let invalid_save = false;

    switch (user.score) {
        case null || undefined:
            invalid_save = true;
            user.score = 0;
    }
    switch (user.score_per_click) {
        case null || undefined:
            invalid_save = true;
            user.score_per_click = 0;
    }
    switch (user.score_per_second) {
        case null || undefined:
            invalid_save = true;
            user.score_per_second = 0;
    }

    if (invalid_save) {
        alert('Corrupted save data; resetting corrupted values');
    }

    return invalid_save;
}

function milli_to_whole(x) {
    return x * 1000;
}
