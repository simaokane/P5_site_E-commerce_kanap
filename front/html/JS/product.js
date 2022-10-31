
//Recupération de l'id avec les paramètres de l'url
const produitId = (new URL(document.location)).searchParams.get("id");
console.log({produitId});


// fonction pour récuperer les données de l'api avec l'id du produit
 fetch(`http://localhost:3000/api/products/${produitId}`) // on va chercher l'API avec la methode fetch et on ajoute notre variable qui contient l'id
    .then((response) => response.json())
    .then((res) => productDisplay(res)) 
    
// fonction pour lier les élements HTML que l'on va créer avec les données de l'api
function productDisplay(sofa) {
    const {altTxt, colors, description, imageUrl, name, price, _id} = sofa
    createImage(imageUrl, altTxt)
    createTitle(name)
    createPrice(price)
    createDescription(description)
    createColors(colors) 
}
//Fonction pour ajouter les balises img pour y mettre des images
function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if(parent != null) parent.appendChild(image)
}

//Ajout du nom
function createTitle(name) {
    const h1 = document.querySelector("#title")
    if(h1 != null) h1.textContent = name
}

//Ajout du prix
function createPrice(price) {
    const span = document.querySelector("#price")
    if(span != null) span.textContent = price

}

//Ajout de la description
function createDescription(description) {
    const p = document.querySelector("#description")
    if(p != null) p.textContent = description
}

//Ajout des couleurs du tableau colors avec une boucle forEach
function createColors(colors) {
    const select = document.querySelector("#colors")
    if(select != null) {
        colors.forEach(color => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
                     
        });
    }

}









