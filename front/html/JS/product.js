//Recupération de l'id avec les paramètres de l'url
const produitId = new URL(document.location).searchParams.get('id');

// fonction pour récuperer les données de l'api avec l'id du produit
let selectProduct;
const fetchProducts = async () => {
  await fetch(`http://localhost:3000/api/products/${produitId}`)
    .then((res) => res.json().then((json) => (selectProduct = json)))

    .catch((error) => console.error(error));
};
fetchProducts(); //On appelle la fonction pour recupérer les données de l'API

// Recuperation des selecteurs css et id
let parent = document.querySelector('.item__img'); // on récupére le selecteur css pour pouvoir mettre l'image plus tard
let title = document.getElementById('title'); // on récupéré l'id title du document HTML
let price = document.getElementById('price'); // on récupére l'id price du document HTML
let description = document.getElementById('description'); // on récupére l'id description du document HTML
let colorsArray = document.getElementById('colors'); // on récupére l'id color du document HTML
let quantity = document.getElementById('quantity');

// fonction pour lier les élements HTML que l'on va créer avec les données de l'api
const showProduct = async () => {
  await fetchProducts();
  //Ajout des balises img pour stocker les images
  let image = document.createElement('img');
  image.setAttribute('src', selectProduct.imageUrl);
  image.setAttribute('alt', selectProduct.altTxt);
  parent.appendChild(image);

  //Ajout du nom
  title.innerHTML = selectProduct.name;

  //Ajout du price
  price.innerHTML = selectProduct.price;

  //Ajout de la description
  description.innerHTML = selectProduct.description;

  // Ajout des couleurs du tableau colors avec une boucle
  for (let i = 0; i < selectProduct.colors.length; i++) {
    let color = document.createElement('option');
    color.setAttribute('value', selectProduct.colors[i]);
    color.innerHTML = selectProduct.colors[i];
    colorsArray.appendChild(color);
  }
  fetchProducts(); // Déclaration de la fonction et récupération des parametres
};
showProduct();

clickBtn();

//Fonction de gestion de l'ajout au panier au click du bouton
function clickBtn() {
  let btnAddTocart = document.getElementById('addToCart');

  //Ecoute du bouton 'Ajouter au panier'
  btnAddTocart.addEventListener('click', (e) => {
    e.preventDefault;
    if (
      colorsArray.value === '' ||
      quantity.value == null ||
      quantity.value <= 0
    ) {
      alert('Veuillez choisir une couleur et une quantité');
    } else if (quantity.value > 0 && quantity.value <= 100) {
      //Creation d'un objet à envoyer dans le localstorage
      const panier = {
        id: produitId,
        color: colorsArray.value,
        quantity: quantity.value,
      };
      addPanier(panier);
    }
  });
}

//Fonction de sauvegarde dans le localstorage
function savePanier(panier) {
  localStorage.setItem('panier', JSON.stringify(panier));
  alert('Le produit a bien été enregistré');
}

//Recuperation du panier
function getPanier() {
  let panier = localStorage.getItem('panier');
  if (panier == null) {
    return [];
  } else {
    return JSON.parse(panier);
  }
}

//Fonction d'ajout au panier
function addPanier(product) {
  let panier = getPanier();
  let foundProduct = panier.find(function (p) {
    //find() est une fonction qui travaille dans les tableaux, et qui permet de chercher un élement sur un tableau par rapport à une condition(s'il trouve l'élément, il le retourne, sinon => undifined)
    return p.id == product.id && p.color == product.color;
  });
  if (foundProduct != undefined) {
    let newQuantity = Number(
      parseInt(foundProduct.quantity) + parseInt(product.quantity)
    ); //parseInt convertit le premier argument en une chaine et renvoie un nombre entier
    foundProduct.quantity = newQuantity;
    if (newQuantity >= 100) {
      alert('Vous ne pouvez pas prendre plus de 100 articles');
    } else {
      savePanier(panier);
    }
  } else {
    panier.push(product);
    savePanier(panier);
  }
  window.location.href = 'cart.html';
}
