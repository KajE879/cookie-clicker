class Player {
  name;
  cars;
  clickPower;
  carsPerSecond;
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


function formatNumber(num) {
  const suffixes = ["", "K", "M", "B", "T", "Q", "Qi", "S", "Sp", "O"];
  let i = 0;
  while (num >= 1000 && i < suffixes.length - 1) {
    num /= 1000;
    i++;
  }
  if (i === 0) {
    return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return num.toFixed(2).replace(".", ",") + suffixes[i];
  }
}



function updateDisplay() {
  carDisplay.textContent = formatNumber(player.cars);
  carStatsDisplay.textContent = formatNumber(player.cars);
  document.getElementById("cps").textContent = formatNumber(player.carsPerSecond);
  document.getElementById("cp").textContent = formatNumber(player.clickPower);
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
  name;
  baseCost;
  level;
  type;
  power;
  constructor(name, cost, lvl, type, power = 1) {
    this.name = name;
    this.baseCost = cost;
    this.level = lvl;
    this.type = type;
    this.power = power;
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

      this.baseCost = Math.floor(this.baseCost * 1.35);
      this.power = Math.floor(this.power * 1.15);
      document.getElementById(costId).textContent = formatNumber(this.baseCost);
      document.getElementById(levelId).textContent = formatNumber(this.level);
      updateDisplay();
    }
  }
}

const upgrades = {
  turbo: new Upgrade("Turbo Clicker", 15, 0, "click", 1),
  engine: new Upgrade("Engine", 100, 0, "cps", 3),
  wheels: new Upgrade("Wheels", 600, 0, "cps", 8),
  exhaust: new Upgrade("Exhaust", 3500, 0, "cps", 20),
  suspension: new Upgrade("Suspension", 20000, 0, "cps", 50),
  brakes: new Upgrade("Brakes", 100000, 0, "cps", 125),
  chassis: new Upgrade("Chassis", 500000, 0, "cps", 300),
  nitro: new Upgrade("Nitro Boost", 2500000, 0, "cps", 700)
};

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
