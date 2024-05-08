import './style.css'
import axios from 'axios'
import { Dane } from './enumy.js'
import './index.d.ts'

// Elementy
const zal: NodeListOf<HTMLElement> = document.querySelectorAll('.za')
const apiDataElement = document.getElementById('api-data') as HTMLElement
const ocl: NodeListOf<HTMLElement> = document.querySelectorAll('.oc')
const ocel: NodeListOf<HTMLElement> = document.querySelectorAll('.oce')
const poz = document.querySelector('.pok') as HTMLElement

// Dane

const aktywne: Dane = {
    tagi: [],
    opinia: 0,
    poziom: 0,
}

//Zainteresowania//
let count = 0

for (let i: number = 0; i < zal.length; i++)
    zal[i].addEventListener('click', () => {
        if (!zal[i].classList.contains('show') && count < 6) {
            zal[i].classList.add('show')
            aktywne.tagi.push(zal[i].id)
            count++
        } else if (zal[i].classList.contains('show')) {
            zal[i].classList.remove('show')
            count--

            aktywne.tagi = aktywne.tagi.filter((za: string) => za == zal[i].id)
        }
    })

//Trudność Kierunku//

for (let a: number = 0; a < ocl.length; a++) {
    ocl[a].addEventListener('click', () => {
        ocl.forEach((element) => {
            element.classList.remove('show')
        })

        ocl[a].classList.add('show')
        aktywne.poziom = Number(ocl[a].id)
    })
}
//OPINIE//

for (let i: number = 0; i < ocel.length; i++) {
    ocel[i].addEventListener('click', () => {
        ocel.forEach((element) => {
            element.classList.remove('show')
        })

        ocel[i].classList.add('show')

        aktywne.opinia = Number(i + 1)
    })
}

//Pokaż kierunek//

poz.addEventListener('click', function () {
    poz.style.backgroundImage =
        'linear-gradient(to right bottom, #ebee39, #f04726)'
    if (
        aktywne.opinia >= 1 &&
        aktywne.tagi.length >= 1 &&
        aktywne.poziom >= 1
    ) {
        fetchData()
    } else {
        apiDataElement.innerHTML =
            '<h3>Proszę wybrać co najmniej jeden rodzaj przycisku.</h3>'
    }
})

//PODŁĄCZENIE POD API//

async function fetchData() {
    try {
        const odp = await axios.post('https://api.pcreators.pl/api', aktywne)
        console.log(odp)
        if (apiDataElement) {
            apiDataElement.innerText = JSON.stringify(odp.data.dane)
        }
    } catch (error) {
        console.error(error)
    }
}
