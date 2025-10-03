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

function updateDisplay() {
  carDisplay.textContent = player.cars;
  carStatsDisplay.textContent = player.cars;
  document.getElementById("cps").textContent = player.carsPerSecond;
  document.getElementById("cp").textContent = player.clickPower;

  for (const key in upgrades) {
    const upgrade = upgrades[key];
    const btn = document.getElementById(key + "Btn");
    if (player.cars >= upgrade.baseCost) {
      btn.style.backgroundColor = "green";
    } else {
      btn.style.backgroundColor = "";
    }
  }
}

let player = new Player("Kaj");
let carDisplay = document.getElementById("carsMain");
let carStatsDisplay = document.getElementById("carsStats");
let clickBtn = document.getElementById("clickBtn");
clickBtn.addEventListener("click", () => {
  player.click();
  updateDisplay();
});

class Upgrade {
  constructor(name, cost, lvl, type, power = 1) {
    this.name = name;
    this.baseCost = cost;
    this.level = lvl;
    this.type = type;
    this.power = power; // default 1
  }

  buy(costId, levelId) {
    if (player.cars >= this.baseCost) {
      player.cars -= this.baseCost;
      this.level++;

      if (this.type === "click") {
        player.clickPower += this.power;
      } else {
        player.carsPerSecond += this.power;
      }

      this.baseCost = Math.floor(this.baseCost * 1.5);
      document.getElementById(costId).textContent = this.baseCost;
      document.getElementById(levelId).textContent = this.level;
      updateDisplay();
    }
  }
}

const upgrades = {
  turbo: new Upgrade("Turbo Clicker", 10, 0, "click"),
  engine: new Upgrade("Engine", 50, 0, "cps"),
  wheels: new Upgrade("Wheels", 200, 0, "cps"),
  exhaust: new Upgrade("Exhaust", 1000, 0, "cps"),
  suspension: new Upgrade("Suspension", 5000, 0, "cps"),
  brakes: new Upgrade("Brakes", 20000, 0, "cps"),
  chassis: new Upgrade("Chassis", 100000, 0, "cps"),
  nitro: new Upgrade("Nitro Boost", 1000000, 0, "cps")
};

// connect buttons direct met de class methods
document.getElementById("turboBtn").addEventListener("click", () => upgrades.turbo.buy("turboCost", "turboLevel"));
document.getElementById("engineBtn").addEventListener("click", () => upgrades.engine.buy("engineCost", "engineLevel"));
document.getElementById("wheelsBtn").addEventListener("click", () => upgrades.wheels.buy("wheelsCost", "wheelsLevel"));
document.getElementById("exhaustBtn").addEventListener("click", () => upgrades.exhaust.buy("exhaustCost", "exhaustLevel"));
document.getElementById("suspensionBtn").addEventListener("click", () => upgrades.suspension.buy("suspensionCost", "suspensionLevel"));
document.getElementById("brakesBtn").addEventListener("click", () => upgrades.brakes.buy("brakesCost", "brakesLevel"));
document.getElementById("chassisBtn").addEventListener("click", () => upgrades.chassis.buy("chassisCost", "chassisLevel"));
document.getElementById("nitroBtn").addEventListener("click", () => upgrades.nitro.buy("nitroCost", "nitroLevel"));

setInterval(() => {
  player.cars += player.carsPerSecond;
  updateDisplay();
}, 1000);

updateDisplay();
