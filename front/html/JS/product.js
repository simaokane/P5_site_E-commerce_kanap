
//Recupération de l'id avec les paramètres de l'url
const produitId = (new URL(document.location)).searchParams.get("id");
console.log(produitId);

//Récupération des sélecteurs css et des id du HTML pour après
let picture     = document.querySelector(".item__img"); // on récupére le selecteur css pour pouvoir mettre l'image après
let title       = document.getElementById("title"); // on récupéré l'id title du document HTML
let price       = document.getElementById("price"); // on récupére l'id price du document HTML
let description = document.getElementById("description"); // on récupére l'id description du document HTML
let colorsArray = document.getElementById("colors"); // on récupére l'id description du document HTML

// fonction pour récuperer les données de l'api avec l'id du produit
let product;
const fetchProduct = async() => {
    await fetch(`http://localhost:3000/api/products/${produitId}`) // on va chercher l'API avec la methode fetch et on ajoute notre variable qui contient l'id
    .then((res) => res.json()
    .then(json => product = json));  
    };

fetchProduct(); // On appelle la fonction précédente pour récupérer les données de l'API

// fonction pour lier les élements HTML que l'on va créer avec les données de l'api
const displayProduct = async() => { 
    await fetchProduct(); 

        // on ajoute les balises img pour y mettre les images
        let image = document.createElement("img");
        image.setAttribute('src', product.imageUrl);
        image.setAttribute('alt', product.altTxt);
        picture.appendChild(image);

        // on ajoute le nom
        title.innerHTML = product.name;

        // on ajoute les prix
        price.innerHTML = product.price;

        // on ajout la description
        description.innerHTML = product.description;

        // Couleurs du tableau colors avec une boucle for en créant le HTML
        for (let i=0; i < product.colors.length; i++) {

          let color = document.createElement("option");
          color.setAttribute('value', product.colors[i]);
          color.innerHTML = product.colors[i];
          colorsArray.appendChild(color);
        }

    fetchProduct(product); // Déclaration de la fonction et recupération des parametres 
};
displayProduct();
