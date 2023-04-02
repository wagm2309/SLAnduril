const lowPrice = "300 pesos";
const mediumPrice = "600 pesos";
const maxPrice = "1000 pesos";

//Función para ingresar a las diferentes opciones de la pagina
function data(){
        let action = 0
        action = prompt("Para cotizar un envío ingrese 1, para cualquier otra transacción ingrese 2, para salir presione 3");
        while (action >= 0){
        if (action == 1){
            quote();
            action = prompt("Para cotizar otro envío ingrese 1, para cualquier otra transacción ingrese 2, para salir presione 3");
        }
        else if (action == 2){
            alert("Pronto podrá realizar mas acciones en nuestro site");
            break            
        }  
        else if (action == 3){
            alert("Muchas gracias por usar nuestros servicios");
            break
        } 
        else {
            alert ("Usted introdujo una opción no válida")
            action = prompt("Para cotizar un envío ingrese 1, para cualquier otra transacción ingrese 2, para salir presione 3");
        }
    }  
}

//Función que permite solicitar los datos del cliente y realizar una cotización
function quote(){
        let originCity = prompt("Ingrese ciudad desde donde se enviará el producto");
        let originStreet = prompt("Ingrese calle desde donde se enviará el producto");
        let originStreetNumber = prompt ("Ingrese numero de calle desde donde se enviará el producto");
        let originPostalCode = prompt ("Ingrese codigo postal desde donde se enviará el producto")
        let destinationCity= prompt("Ingrese ciudad de destino del producto");
        let destinationStreet = prompt("Ingrese calle de destino del producto");
        let destinationStreetNumber = prompt ("Ingrese numero de calle de destino del producto");
        let destinationPostalCode = prompt ("Ingrese codigo postal de destino del producto");
        let weightProduct = parseFloat(prompt("Ingrese el peso de su producto"));
        let heightProduct = parseFloat(prompt("Ingrese el alto de su producto"));
        let widtProduct = parseFloat(prompt("Ingrese la anchura de su producto"));

        if (weightProduct > 0 && heightProduct > 0 && widtProduct > 0){
        aforo(weightProduct, heightProduct, widtProduct)
        }
        else {
            alert("Los datos ingresados no son validos");
            data();
        };
        
        let result = 0;
        result = aforo(weightProduct,heightProduct,widtProduct)

        if (result > 0 && result <= 100){
            displayFinalPrice(originCity, originStreet, originStreetNumber, originPostalCode, destinationCity, destinationStreet, destinationStreetNumber, destinationPostalCode, lowPrice)
        }
        else if (result > 100 && result <= 200){
            displayFinalPrice(originCity, originStreet, originStreetNumber, originPostalCode, destinationCity, destinationStreet, destinationStreetNumber, destinationPostalCode, mediumPrice)
        }
        else if (result > 200 && result <= 300){
            displayFinalPrice(originCity, originStreet, originStreetNumber, originPostalCode, destinationCity, destinationStreet, destinationStreetNumber, destinationPostalCode, maxPrice)
        }
        else {
            alert("Disculpe, su producto supera el limite de volumen para los tipos de envios que realizamos.")
        }        
}

//Función que calcula la dimensión del producto
function aforo(weight, height, widt){
    let result = (weight * height * widt) / 5000;
    return result;

}

//Función que imprime la cotización
function displayFinalPrice(originCity, originStreet, originStreetNumber, originPostalCode, destinationCity, destinationStreet, destinationStreetNumber, destinationPostalCode, price){
    alert("El costo de su cotización desde la dirección: " .concat(originCity + ", " + originStreet + ", " + originStreetNumber+ ", " + originPostalCode) + " con destino: " .concat(destinationCity + ", " +  destinationStreet + ", " + destinationStreetNumber + ", " + destinationPostalCode) + " es de: " .concat(price))
}

alert("Esta pagina aún se encuentra en construcción");

data();