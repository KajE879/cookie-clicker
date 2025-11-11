// localStorage.clear()

// Player
class Player {
    constructor(name) {
        this.name = name;
        this.cars = 0;
        this.clickPower = 1;
        this.carsPerSecond = 0;
    }

    click() {
        this.cars += this.clickPower;
    }
}

// Upgrade
class Upgrade {
    constructor(name, cost, lvl, type, power = 1) {
        this.name = name;
        this.baseCost = cost;
        this.level = lvl;
        this.type = type;
        this.power = power;
    }

    Buy(costId, levelId) {
        if (player.cars >= this.baseCost) {
            player.cars -= this.baseCost;
            this.level++;

            if (this.type === "click") {
                player.clickPower += this.power;
            } else {
                player.carsPerSecond += this.power;
            }

            this.baseCost = Math.floor(this.baseCost * 1.35);
            this.power = Math.floor(this.power * 1.15);

            document.getElementById(costId).innerHTML = this.baseCost;
            document.getElementById(levelId).innerHTML = this.level;
            updateDisplay();
            saveGame();
        }
    }
}

let player = new Player("Kaj");
let carDisplay = document.getElementById("carsMain");
let carStatsDisplay = document.getElementById("carsStats");
let clickBtn = document.getElementById("clickBtn");

// On Button Click
clickBtn.addEventListener("click", function() {
    player.click();
    updateDisplay();
    saveGame();
});

// All Upgrades
const upgrades = {
    turbo: new Upgrade("Turbo Clicker", 15, 0, "click", 1),
    engine: new Upgrade("Engine", 100, 0, "cps", 3),
    wheels: new Upgrade("Wheels", 600, 0, "cps", 8),
    exhaust: new Upgrade("Exhaust", 3500, 0, "cps", 20),
    suspension: new Upgrade("Suspension", 20000, 0, "cps", 50),
    brakes: new Upgrade("Brakes", 100000, 0, "cps", 125),
    chassis: new Upgrade("Chassis", 500000, 0, "cps", 300),
    nitro: new Upgrade("Nitro Boost", 3500000, 0, "cps", 700)
};

// Upgrade Button To Buy
const upgradeBtn = ["turbo", "engine", "wheels", "exhaust", "suspension", "brakes", "chassis", "nitro"];
for (let upgradeName of upgradeBtn) {
    let btn = document.getElementById(upgradeName + "Btn");
    btn.addEventListener("click", function() {
        upgrades[upgradeName].Buy(upgradeName + "Cost", upgradeName + "Level");
    });
}

// Display Update
function updateDisplay() {
    carDisplay.innerHTML = player.cars.toLocaleString();
    carStatsDisplay.innerHTML = player.cars.toLocaleString();
    document.getElementById("cps").innerHTML = player.carsPerSecond.toLocaleString();
    document.getElementById("cp").innerHTML = player.clickPower.toLocaleString();

    for (let upgradeName in upgrades) {
        let upgrade = upgrades[upgradeName];
        document.getElementById(upgradeName + "Cost").innerHTML = upgrade.baseCost.toLocaleString();
        document.getElementById(upgradeName + "Level").innerHTML = upgrade.level.toLocaleString();
        let btn = document.getElementById(upgradeName + "Btn");
        if (player.cars >= upgrade.baseCost) {
            btn.classList.add("upgrade-available");
        } else {
            btn.classList.remove("upgrade-available");
        }
    }
}

// Game Save
function saveGame() {
    const data = {
        player: {
            cars: player.cars,
            clickPower: player.clickPower,
            carsPerSecond: player.carsPerSecond
        },
        upgrades: {}
    };
    for (let key in upgrades) {
        data.upgrades[key] = {
            baseCost: upgrades[key].baseCost,
            level: upgrades[key].level,
            power: upgrades[key].power
        };
    }
    localStorage.setItem("save", JSON.stringify(data));
}

// Game Load
function loadGame() {
    const saved = JSON.parse(localStorage.getItem("save"));
    if (!saved) return;
    player.cars = saved.player.cars;
    player.clickPower = saved.player.clickPower;
    player.carsPerSecond = saved.player.carsPerSecond;
    for (let key in saved.upgrades) {
        if (upgrades[key]) {
            upgrades[key].baseCost = saved.upgrades[key].baseCost;
            upgrades[key].level = saved.upgrades[key].level;
            upgrades[key].power = saved.upgrades[key].power;
        }
    }
    updateDisplay();
}

// Load Game On Start-Up
window.addEventListener("load", loadGame);

// Cars per second loop
setInterval(function() {
    player.cars += player.carsPerSecond;
    saveGame();
    updateDisplay();
}, 1000);

updateDisplay();
