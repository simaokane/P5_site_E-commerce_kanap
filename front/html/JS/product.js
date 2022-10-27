
//Recupération de la chaine de requete dans l'url
const produitId = (new URL(document.location)).searchParams.get("id");
console.log(produitId);

const fetchProducts = async () => {
    await fetch(`http://localhost:3000/api/products/${produitId}`) 
        .then(res => res.json())
        .then(data => {
            setDomWithProductInformations(data)
        })    
        .catch((error) => console.error(error));
      
};

fetchProducts(); 

function setDomWithProductInformations(data) {
    console.log(data)
}
//Selection de la classe où je vais injecter le code HTML    
const elementProduit = document.querySelector(".item__img");
console.log(elementProduit);

//La structure html pour l'affichage du produit selectionné


