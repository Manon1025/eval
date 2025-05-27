// TODO Récupération du container
const container = document.querySelector('.container-cars')

// TODO récupération de l'API
const url = "http://localhost:3000/cars"

async function getCars() {
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log("Erreur", error)
    }
}


// TODO Affichage
async function affiCars() {
    const cars = await getCars()

    // !Création de la boucle qui génére chaque voiture
    cars.forEach(car => {

        // !Creation d'un div
        const div = document.createElement('div')
        div.setAttribute('class', 'mb-5 mt-3')
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

        // !Incoporation du contenu de la div dans le container
        container.appendChild(div)
    });
}

// TODO appelle de la fonction qui permet l'affichage
affiCars()