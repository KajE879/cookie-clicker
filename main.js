class Player{
  name;
  cars;
  clickPower;
  carsPerSecond;
    constructor(name){
      this.name = name;
      this.cars = 0;
      this.clickPower = 1;
      this.carsPerSecond = 0;
    }
    click(){ 
      this.cars += this.clickPower; 
    }
}

function updateDisplay(){
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

class Upgrade{
  name;
  baseCost;
  level;
  type;
  power;
  constructor(name, cost, lvl, type, power){
    this.name = name;
    this.baseCost = cost;
    this.level = lvl;
    this.type = type;
    this.power = power;
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
function buyUpgrade(upgrade, costId, levelId) {
  if (player.cars >= upgrade.baseCost) {
    player.cars -= upgrade.baseCost;
    upgrade.level++;
    if (upgrade.type === "click") {
      player.clickPower++;
    } else {
      player.carsPerSecond += upgrade.level;
    }
    upgrade.baseCost = Math.floor(upgrade.baseCost * 1.5);
    document.getElementById(costId).textContent = upgrade.baseCost;
    document.getElementById(levelId).textContent = upgrade.level;
    updateDisplay();
  }
}
document.getElementById("turboBtn").addEventListener("click", () => buyUpgrade(upgrades.turbo, "turboCost", "turboLevel"));
document.getElementById("engineBtn").addEventListener("click", () => buyUpgrade(upgrades.engine, "engineCost", "engineLevel"));
document.getElementById("wheelsBtn").addEventListener("click", () => buyUpgrade(upgrades.wheels, "wheelsCost", "wheelsLevel"));
document.getElementById("exhaustBtn").addEventListener("click", () => buyUpgrade(upgrades.exhaust, "exhaustCost", "exhaustLevel"));
document.getElementById("suspensionBtn").addEventListener("click", () => buyUpgrade(upgrades.suspension, "suspensionCost", "suspensionLevel"));
document.getElementById("brakesBtn").addEventListener("click", () => buyUpgrade(upgrades.brakes, "brakesCost", "brakesLevel"));
document.getElementById("chassisBtn").addEventListener("click", () => buyUpgrade(upgrades.chassis, "chassisCost", "chassisLevel"));
document.getElementById("nitroBtn").addEventListener("click", () => buyUpgrade(upgrades.nitro, "nitroCost", "nitroLevel"));

setInterval(() => {
  player.cars += player.carsPerSecond;
  updateDisplay();
}, 1000);

updateDisplay();