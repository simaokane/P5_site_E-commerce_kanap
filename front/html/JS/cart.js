// <!-- <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//               <div class="cart__item__img">
//                 <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//               </div>
//               <div class="cart__item__content">
//                 <div class="cart__item__content__description">
//                   <h2>Nom du produit</h2>
//                   <p>Vert</p>
//                   <p>42,00 €</p>
//                 </div>
//                 <div class="cart__item__content__settings">
//                   <div class="cart__item__content__settings__quantity">
//                     <p>Qté : </p>
//                     <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                   </div>
//                   <div class="cart__item__content__settings__delete">
//                     <p class="deleteItem">Supprimer</p>
//                   </div>
//                 </div>
//               </div>
//             </article> -->

//Retirer un produit du panier
function removePanier(product) {
  let panier = getPanier();
  panier = panier.filter((p = p.id != product.id)); //Filter permet de pouvoir supprimer un element
  savePanier(panier);
}

//Changer la quantité(retirer la quantité)
function changeQuantity(product, quantity) {
  let panier = getPanier(); //On recupere le panier complet
  let foundProduct = panier.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removePanier(foundProduct);
    } else {
      savePanier(panier); //On l'enregistre que si le produit n'a pas été supprimé
    }
  }
}

//Calcul de la quantité
function getNumberProduct() {
  //A partir du panier , retourner la qté de product qui se trouve dans le panier
  let panier = getPanier(); //On recupere le panier complet
  let number = 0;
  for (let product of panier) {
    number += product.quantity;
  }
  return number;
}

//Calcul du prix total
function getTotalPrice() {
  let panier = getPanier();
  let total = 0;
  for (let product of panier) {
    total += product.price * product.quantity;
  }
  return total;
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
