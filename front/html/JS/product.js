//Recupération de l'id avec les paramètres de l'url
const produitId = new URL(document.location).searchParams.get('id');

// fonction pour récuperer les données de l'api avec l'id du produit
let product;
const fetchProducts = async () => {
  await fetch(`http://localhost:3000/api/products/${produitId}`)
    .then((res) => res.json().then((json) => (product = json)))

    .catch((error) => console.error(error));
};
fetchProducts(); //On appelle la fonction pour recupérer les données de l'API

// Recuperation des selecteurs css et id
let parent = document.querySelector('.item__img'); // on récupére le selecteur css pour pouvoir mettre l'image plus tard
let title = document.getElementById('title'); // on récupéré l'id title du document HTML
let price = document.getElementById('price'); // on récupére l'id price du document HTML
let description = document.getElementById('description'); // on récupére l'id description du document HTML
let colorsArray = document.getElementById('colors'); // on récupére l'id color du document HTML

// fonction pour lier les élements HTML que l'on va créer avec les données de l'api
const showProduct = async () => {
  await fetchProducts();
  //Ajout des balises img pour stocker les images
  let image = document.createElement('img');
  image.setAttribute('src', product.imageUrl);
  image.setAttribute('alt', product.altTxt);
  parent.appendChild(image);

  //Ajout du nom
  title.innerHTML = product.name;

  //Ajout du price
  price.innerHTML = product.price;

  //Ajout de la description
  description.innerHTML = product.description;

  // Ajout des couleurs du tableau colors avec une boucle
  for (let i = 0; i < product.colors.length; i++) {
    let color = document.createElement('option');
    color.setAttribute('value', product.colors[i]);
    color.innerHTML = product.colors[i];
    colorsArray.appendChild(color);
  }
  fetchProducts(); // Déclaration de la fonction et récupération des parametres
};
showProduct();

//Ajout du produit au panier
const button = document.querySelector('#addToCart');
button.addEventListener('click', buttonClick); //Ecoute du boutton "Ajouter au panier"

//Ajout des caractérisqtiques dans
function buttonClick() {
  //lecture de la couleur et de la quantité depuis le formulaire
  const color = document.querySelector('#colors').value; //Ajout de la couleur selectionnnée
  const quantity = document.querySelector('#quantity').value; //Ajout de la quantité selectionnnée

  if (invalidPurchase(color, quantity)) return; //Si un des deux est invalide, le fonction s'arrete
  putInBasket(color, quantity); //Sinon, va sauvegarder toutes les données qu'on veut
  goToTheCartPage(); //Et rediriger vers la page panier(cart.html)
}

//Fabrication d'un objet pour l'envoyer dans le locolstorage
function putInBasket(color, quantity) {
  const sendProduct = {
    id: produitId,
    colors: color,
    quantity: quantity,
  };
  localStorage.setItem(produitId, JSON.stringify(sendProduct)); //Transforme l'objet en une chaine de caractère
}

//Si le panier est vide
function invalidPurchase(color, quantity) {
  if (color == null || color === '' || quantity == null || quantity == 0) {
    alert('Svp, veuillez selectionner une couleur et une quantité');
    return true;
  }
}

//Affichage de la page cart.html
function goToTheCartPage() {
  window.location.href = 'cart.html';
}

// Recupération des données du lS et les mettre dans la variable cart[]

const cart = [];
recuObjetStorage();

function recuObjetStorage() {
  const numberOfObject = localStorage.length;
  for (let i = 0; i < numberOfObject; i++) {
    const object = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(object);
    cart.push(itemObject);
  }
}

console.log(cart);
