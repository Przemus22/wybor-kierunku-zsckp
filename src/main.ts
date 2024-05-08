import "./style.css";
import axios from "axios";
import "./main1.js";
import "./index.d.ts";
//Zainteresowania//
const zal: NodeListOf<HTMLElement> = document.querySelectorAll(".za");
let count = 0;

for (let i: number = 0; i < zal.length; i++)
  zal[i].addEventListener("click", () => {
    if (!zal[i].classList.contains("sho") && count < 6) {
      zal[i].classList.add("sho");
      count++;
    } else if (zal[i].classList.contains("sho")) {
      zal[i].classList.remove("sho");
      count--;
    }
  });

const buttons = document.querySelectorAll(".za") as NodeListOf<HTMLElement>;
class Data {
  constructor(
    public tags: string[],
    public level: number,
    public opinion: number
  ) {}
}
let clickedButtons = 0;
buttons.forEach((button) => {
  button.addEventListener("click", async function () {
    button.classList.add("active");

    clickedButtons++;
    if (clickedButtons <= 6) {
      const data = new Data(["informatyka"], 5, 2);
      try {
        const response = await axios.post("https://api.pcreators.pl/api", data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    button.classList.remove("active");
  });
});

//Trudność Kierunku//
const ocl: NodeListOf<HTMLElement> = document.querySelectorAll(".oc");

for (let a: number = 0; a < ocl.length; a++) {
  ocl[a].addEventListener("click", () => {
    ocl.forEach((element) => {
      element.classList.remove("sow");
    });

    ocl[a].classList.add("sow");
  });
}
// Przycisk
const button = document.querySelector(".oc") as HTMLElement;

// Klasa dla danych do wysłania
class Data1 {
  constructor(
    public tags: string[],
    public level: number,
    public opinion: number
  ) {}
}

button.addEventListener("click", async function () {
  button.classList.add("active");
  const data = new Data1(["informatyka"], 5, 2);
  try {
    const response = await axios.post("https://api.pcreators.pl/api", data);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  button.classList.remove("active");
});

//OPINIE//
const ocel: NodeListOf<HTMLElement> = document.querySelectorAll(".oce");

for (let i: number = 0; i < ocel.length; i++) {
  ocel[i].addEventListener("click", () => {
    ocel.forEach((element) => {
      element.classList.remove("show");
    });
    ocel[i].classList.add("show");
  });
}

const button1 = document.querySelector(".oce") as HTMLElement;
class Data2 {
  constructor(
    public tags: string[],
    public level: number,
    public opinion: number
  ) {}
}
button1.addEventListener("click", async function () {
  button1.classList.add("active");
  const data = new Data2(["informatyka"], 5, 2);
  try {
    const response = await axios.post("https://api.pcreators.pl/api", data);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  button1.classList.remove("active");
});

//Pokaż kierunek//
const poz = document.querySelector(".pok") as HTMLElement;

poz.addEventListener("click", function () {
  const dsa = (poz.style.backgroundImage =
    "linear-gradient(to right bottom, #ebee39, #f04726)");
  console.log(dsa);

  fetchData();
});
class Dane3 {
  constructor(
    public tagi: string[],
    public poziom: number,
    public opinia: number
  ) {}
}
const dane3 = new Dane3(["informatyka"], 5, 2);

const poz1 = document.querySelector(".pok") as HTMLElement;
const apiDataElement = document.getElementById("api-data");

poz1.addEventListener("click", function () {
  fetchData();
});

async function fetchData() {
  try {
    const odp = await axios.post("https://api.pcreators.pl/api", dane3);
    console.log(odp);
    if (apiDataElement) {
      apiDataElement.innerText = JSON.stringify(odp.data);
    }
  } catch (error) {
    console.error(error);
  }
}

//PODŁĄCZENIE POD API//
class Dane {
  constructor(
    public tagi: string[],
    public poziom: number,
    public opinia: number
  ) {}
}

const dane = new Dane(["informatyka"], 5, 2);

const odp = await axios
  .post("https://api.pcreators.pl/api", dane)
  .catch((error) => {
    console.error(error);
  });
console.log(odp);
