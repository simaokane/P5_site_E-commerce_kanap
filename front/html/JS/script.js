let items = document.getElementById('items');

//Recupération des données de l'API

const fetchProducts = async () => {
  await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => (products = data))
    .catch((error) => console.error(error));
};
fetchProducts();

// Liaison  du HTMl avec l'API
const productsDisplay = async () => {
  await fetchProducts();

  //La boucle pour afficher tous les produits dans la page web
  for (let i = 0; i < products.length; i++) {
    let items = document.getElementById('items');

    // Ajout des liens
    let link = document.createElement('a');
    link.setAttribute('href', 'product.html?id=' + products[i]._id);
    items.appendChild(link);

    // Création des balises article
    let article = document.createElement('article');
    link.appendChild(article);

    // Ajout des images
    let images = document.createElement('img');
    images.setAttribute('src', products[i].imageUrl);
    images.setAttribute('alt', products[i].altTxt);
    article.appendChild(images);

    // Création des titres h3
    let title = document.createElement('h3');
    title.innerHTML = products[i].name;
    article.appendChild(title);

    // Création des paragraphes
    let description = document.createElement('p');
    article.appendChild(description);
    description.innerHTML = products[i].description;
  }
};
productsDisplay();
