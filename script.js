// TODO création des const et des let
const container = document.querySelector('.container-cars');
const url = "http://localhost:3000/cars";
let allCars = [];

// TODO récupération de l'api crée 
async function getCars() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Erreur", error);
        return [];
    }
}

// TODO fonction d'affichage de l'api des voitures
function renderCars(cars) {
    container.innerHTML = "";
    cars.forEach(car => {
        const div = document.createElement('div');
        div.setAttribute('class', 'mb-5 mt-3');
        div.innerHTML = `
            <div class="d-flex gap-5 p-5 p-sm-1">
                <div class="d-flex align-items-center gap-3">
                    <i class="bi bi-caret-left-fill"></i>
                    <img src="${car.picture}" alt="Peugeot 208" class="img-fluid">
                    <i class="bi bi-caret-right-fill"></i>
                </div>
                <div class="ms-5 d-flex flex-column justify-content-center">
                    <div class="d-sm-none d-lg-flex flex-column">
                        <h3>${car.name}</h3>
                        <p>${car.description}</p>
                        <p>${car.price} - Agence de ${car.agency}</p>
                    </div>
                    <div class="d-flex ">
                        <button class="btn btn-reservation d-flex text-nowrap">Réserver et payer</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// TODO Affichage des voitures qui s'actualise avec le système de tri
async function initCars() {
    allCars = await getCars();
    renderCars(allCars);

    const select = document.getElementById('price');
    select.addEventListener('change', function() {
        let sortedCars = [...allCars];
        if (this.value === "croissant") {
            sortedCars.sort((a, b) => a.price - b.price);
        } else if (this.value === "decroissant") {
            sortedCars.sort((a, b) => b.price - a.price);
        }
        renderCars(sortedCars);
    });
}

document.addEventListener('DOMContentLoaded', initCars);