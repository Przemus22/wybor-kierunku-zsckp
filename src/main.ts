import './style.css'
import axios from 'axios'
import { Dane, Kierunek } from './enumy.js'
import './index.d.ts'

// Elementy
const zal: NodeListOf<HTMLElement> = document.querySelectorAll('.za')
const apiDataElement = document.getElementById('api-data') as HTMLElement
const ocl: NodeListOf<HTMLElement> = document.querySelectorAll('.oc')
const ocel: NodeListOf<HTMLElement> = document.querySelectorAll('.oce')
const poz = document.querySelector('.pok') as HTMLElement
const wejsciaDoc = document.getElementById('wynik') as HTMLElement

// Dane

const aktywne: Dane = {
    tagi: [],
    rozszerzenia: [],
    poziom: 0,
}

//Zainteresowania//
let count = 0

for (let i: number = 0; i < zal.length; i++)
    zal[i].addEventListener('click', () => {
        if (!zal[i].classList.contains('show') && count < 10) {
            zal[i].classList.add('show')
            aktywne.tagi.push(zal[i].id)
            count++
        } else if (zal[i].classList.contains('show')) {
            zal[i].classList.remove('show')
            count--

            aktywne.tagi = aktywne.tagi.filter((za: string) => za != zal[i].id)
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
//rozszerzenia//

let coun = 0

for (let i: number = 0; i < ocel.length; i++)
    ocel[i].addEventListener('click', () => {
        if (!ocel[i].classList.contains('show') && coun < 2) {
            ocel[i].classList.add('show')
            aktywne.rozszerzenia.push(ocel[i].id)
            coun++
        } else if (ocel[i].classList.contains('show')) {
            ocel[i].classList.remove('show')
            coun--

            aktywne.rozszerzenia = aktywne.rozszerzenia.filter(
                (oce: string) => oce != ocel[i].id,
            )
        }
    })

//Pokaż kierunek//

poz.addEventListener('click', function () {
    poz.style.backgroundImage =
        'linear-gradient(to right bottom, #ebee39, #f04726)'

    setTimeout(() => {
        poz.style.backgroundImage =
            'linear-gradient(to right bottom, #4ff4c5f0, #3c35f0d9)'
    }, 50)

    if (
        aktywne.rozszerzenia.length >= 1 &&
        aktywne.tagi.length >= 3 &&
        aktywne.poziom >= 1
    ) {
        fetchData()

        aktywne.rozszerzenia = []
        aktywne.poziom = 0
        aktywne.tagi = []

        setTimeout(() => {
            for (let i: number = 0; i < zal.length; i++) {
                if (zal[i].classList.contains('show')) {
                    zal[i].classList.remove('show')
                    count--
                }
                ocl.forEach((element) => {
                    element.classList.remove('show')
                })

                ocel.forEach((element) => {
                    element.classList.remove('show')
                })
            }
        }, 40)
    } else {
        if (count < 3) {
            apiDataElement.innerHTML =
                '<h3>Proszę wybrać co najmniej 3 zainteresowania.</h3>'
        } else {
            apiDataElement.innerHTML =
                '<h3>Proszę wybrać co najmniej jeden rodzaj przycisku.</h3>'
        }
    }
})

//PODŁĄCZENIE POD API//

async function fetchData() {
    try {
        const odp = await axios.post('https://api.pcreators.pl/api', aktywne)
        if (odp.status == 200) {
            const date: Kierunek = odp.data.dane
            apiDataElement.innerHTML = `<div><h4>${date.nazwa}</h4> <p>${date.informacje}</p> 
        <img class="sde" src="${date.url}" width="100"
        height="100"></img></div>`
        } else {
            apiDataElement.innerHTML = `Wystąpił błąd: ${odp.status}.\n Sprawdź konsole aby zobaczyć tresć błędu.`
        }
    } catch (error) {
        console.error(error)
    }
}

// Wejscia

async function wejscia() {
    if (!localStorage.getItem('wejscie')) {
        localStorage.setItem('wejscie', 'true')
        const liczba = await axios.post('https://api.pcreators.pl/wejscia', {
            wejscia: true,
        })
        wejsciaDoc.textContent = `${liczba.data.dane} odwiedzin`
        return liczba.data.dane
    } else {
        const liczba = await axios.post('https://api.pcreators.pl/wejscia', {
            wejscia: false,
        })
        wejsciaDoc.textContent = `${liczba.data.dane} odwiedzin`
        return liczba.data.dane
    }
}
wejscia()
