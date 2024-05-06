import "./style.css";
import axios from "axios";
import "./main1.js";
import "./index.d.ts";
//Zainteresowania//
const zal: NodeListOf<HTMLElement> = document.querySelectorAll(".za");
let count = 0;

for (let i: number = 0; i < zal.length; i++) {
  zal[i].addEventListener("click", () => {
    if (!zal[i].classList.contains("sho") && count < 6) {
      zal[i].classList.add("sho");
      count++;
    } else if (zal[i].classList.contains("sho")) {
      zal[i].classList.remove("sho");
      count--;
    }
  });
}

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

//Pokaż kierunek//
const poz = document.querySelector(".pok") as HTMLElement;

poz.addEventListener("click", function () {
  const dsa = (poz.style.backgroundImage =
    "linear-gradient(to right bottom, #ebee39, #f04726)");
  console.log(dsa);
});

//PODŁĄCZENIE POD API//
class Dane {
  constructor(
    public tagi: string[],
    public rozszrzenia: string[],
    public opinia: number,
    public ilosc: number
  ) {}
}

const dane = new Dane(["informatyka"], ["matematyka"], 5, 2);

const odp = await axios
  .post("https://api.pcreators.pl/api", dane)
  .catch((error) => {
    console.error(error);
  });
console.log(odp);
