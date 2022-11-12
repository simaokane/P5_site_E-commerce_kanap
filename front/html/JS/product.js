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

//Ajout des articles dans le panier
// const addProduct = () => {
//   let button = document.getElementById('addToCart');
//   let quantity = document.getElementById('quantity');
//   let id = produitId;
// };

//Ecoute du boutton "Ajouter au panier"
const button = document.querySelector('#addToCart');
button.addEventListener('click', (e) => {
  e.preventDefault;
  const color = document.querySelector('#colors').value;
  const quantity = document.querySelector('#quantity').value;
  if (color == null || color === '' || quantity == null || quantity == 0) {
    alert('Svp, veuillez selectionner une couleur et une quantité');
    return;
  }

  //Fabrication du tableau pour l'envoyer dans le locolstorage
  const containerProduct = {
    id: produitId,
    colors: color,
    quantity: quantity,
  };

  // ********************localStorage*******************************
  localStorage.setItem(produitId, JSON.stringify(containerProduct)); //Transforme l'objet en une chaine de caractère
  window.location.href = 'cart.html'; //Affichage de la page cart.html
});
