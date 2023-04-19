//Este array va a contener la(s) cotizacione(s) que genere el usuario
let myQuotes = [];

let searchCities = "";
const lowPrice = "300 pesos";
const mediumPrice = "600 pesos";
const maxPrice = "1000 pesos";

//Este array de objetos sera usado junto con el Front en un select de ciudades de origen y destino.
const CITIES = [
    { id: "1", name: "CABA" },
    { id: "2", name: "SAN JUAN" },
    { id: "3", name: "CORDOBA" },
    { id: "4", name: "ROSARIO" },
    { id: "5", name: "TUCUMAN" },
    { id: "6", name: "SALTA" },
    { id: "7", name: "NEUQUEN" },
    { id: "8", name: "SANTIAGO DEL ESTERO" },
    { id: "9", name: "MAR DEL PLATA" },
    { id: "10", name: "MENDOZA" },
    { id: "11", name: "LA PLATA" },
    { id: "12", name: "FORMOSA" },
]

class Quote {
    constructor(originCity, originStreet, originStreetNumber, originPostalCode, destinationCity, destinationStreet, destinationStreetNumber, destinationPostalCode, weightProduct, heightProduct, widthProduct, price) {
        this.quoteNumber = (Math.floor(Math.random() * 1000000)).toString();
        this.originCity = originCity;
        this.originStreet = originStreet.toUpperCase(originStreet);
        this.originStreetNumber = originStreetNumber;
        this.originPostalCode = originPostalCode;
        this.destinationCity = destinationCity;
        this.destinationStreet = destinationStreet.toUpperCase(destinationStreet);
        this.destinationStreetNumber = destinationStreetNumber;
        this.destinationPostalCode = destinationPostalCode;
        this.weightProduct = weightProduct;
        this.heightProduct = heightProduct;
        this.widthProduct = widthProduct;
        this.price = price;
    }
    toString() {
        return "Cotización: " + this.quoteNumber + " Con origen en: " + this.originCity + " --> y destino: " + this.destinationCity + ", tiene un costo aproximado de $ " + this.price.toString();
    }
}

//Función para ingresar a las diferentes opciones de la pagina
function dataCustomer() {
    let actionsCustomer = 0;
    actionsCustomer = prompt("Para cotizar un envío ingrese 1, para salir ingrese 3");
    while (actionsCustomer >= 0) {
        if (actionsCustomer == 1) {
            newQuote();
            actionsCustomer = prompt("Para cotizar otro envío ingrese 1, para imprimir sus cotizaciones ingrese 2, para salir ingrese 3");
        }
        else if (actionsCustomer == 2) {
            displayQuotes(myQuotes);
            break;
        }
        else if (actionsCustomer == 3) {
            alert("Muchas gracias por usar nuestros servicios");
            break;
        }
        else {
            alert("Usted introdujo una opción no válida");
            actionsCustomer = prompt("Para cotizar un envío ingrese 1, para cualquier otra transacción ingrese 2, para salir ingrese 3");
        }
    }
}

//Función que permite solicitar los datos del cliente y realizar una cotización
function newQuote() {
    searchCities = prompt("A cotinuación ingrese la ciudad desde donde se enviará el producto: " + listCities());
    let originCity = this.searchCity(searchCities);
    let originStreet = prompt("Ingrese calle desde donde se enviará el producto");
    let originStreetNumber = prompt("Ingrese numero de calle desde donde se enviará el producto");
    let originPostalCode = prompt("Ingrese codigo postal desde donde se enviará el producto");
    searchCities = prompt("Ingrese ciudad a donde se enviará el producto " + listCities());
    let destinationCity = this.searchCity(searchCities);
    let destinationStreet = prompt("Ingrese calle de destino del producto");
    let destinationStreetNumber = prompt("Ingrese numero de calle de destino del producto");
    let destinationPostalCode = prompt("Ingrese codigo postal de destino del producto");
    let weightProduct = parseFloat(prompt("Ingrese el peso de su producto"));
    let heightProduct = parseFloat(prompt("Ingrese el alto de su producto"));
    let widthProduct = parseFloat(prompt("Ingrese la anchura de su producto"));


    if (weightProduct > 0 && heightProduct > 0 && widthProduct > 0) {
        aforoProduct(weightProduct, heightProduct, widthProduct);
    }
    else {
        alert("Los datos ingresados no son válidos");
        dataCustomer();
    };

    let resultAforoQuote = 0;
    resultAforoQuote = aforoProduct(weightProduct, heightProduct, widthProduct);

    if (resultAforoQuote > 0 && resultAforoQuote <= 100) {
        addQuote(originCity, originStreet, originStreetNumber, originPostalCode, destinationCity, destinationStreet, destinationStreetNumber, destinationPostalCode, weightProduct, heightProduct, widthProduct, lowPrice);

    }
    else if (resultAforoQuote > 100 && resultAforoQuote <= 200) {
        addQuote(originCity, originStreet, originStreetNumber, originPostalCode, destinationCity, destinationStreet, destinationStreetNumber, destinationPostalCode, weightProduct, heightProduct, widthProduct, mediumPrice);
    }
    else if (resultAforoQuote > 200 && resultAforoQuote <= 300) {
        addQuote(originCity, originStreet, originStreetNumber, originPostalCode, destinationCity, destinationStreet, destinationStreetNumber, destinationPostalCode, weightProduct, heightProduct, widthProduct, maxPrice);
    }
    else {
        alert("Disculpe, su producto supera el limite de volumen para los tipos de envios que realizamos.");
    }
}


//Función que permite buscar la ciudad introducida por el usuario
function searchCity(searchCity) {
    let city = CITIES.find((oneCity) => oneCity.name === searchCity.toUpperCase());
    if (city) {
        let customerCity = city.name;
        return customerCity;
    }
    else {
        alert("La ciudad que ha ingresado no existe. Le recordamos que brindamos nuestros servicios a las siguientes ciudades: " + listCities());
        searchCities = prompt("Ingrese una ciudad válida");
        return this.searchCity(searchCities);
    }
}

//Función que muestra listado de paises en los que se brinda servicio
function listCities() {
    const newCities = CITIES.map((el) => el.name);
    let joinCities = newCities.join(" // ");
    return joinCities;
}

//Función que calcula la dimensión del producto
function aforoProduct(weight, height, width) {
    let result = (weight * height * width) / 5000;
    return result;
}

//Función que agrega la cotización en el objeto myQuotes
function addQuote(originCity, originStreet, originStreetNumber, originPostalCode, destinationCity, destinationStreet, destinationStreetNumber, destinationPostalCode, weightProduct, heightProduct, widthProduct, price) {
    const oneQuote = new Quote(originCity, originStreet, originStreetNumber, originPostalCode, destinationCity, destinationStreet, destinationStreetNumber, destinationPostalCode, weightProduct, heightProduct, widthProduct, price);
    myQuotes.push(oneQuote);
}


//Función que imprime la(s) cotización(es)
function displayQuotes(myQuotes) {
    for (const propiedad of myQuotes) {
        alert(propiedad.toString());
    }
}

alert("Esta pagina aún se encuentra en construcción");

//Función que le indica al cliente las opciones que puede utilizar
dataCustomer();

alert("Muchas gracias por usar nuestros servicios. Hasta luego.");