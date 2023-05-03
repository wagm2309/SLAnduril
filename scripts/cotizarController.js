const form = document.getElementById("myForm");
let myQuotesJSON = [];
let myQuotes = [];
let resultAforoQuote = 0;

//Función que agrega en la tabla cada nueva cotización, además modifica en el HTML la tabla.
function addQuoteToTable(collection = []) {
  let quotesTable = document.getElementById("custom-table");
  quotesTable.innerHTML = "";
  collection.forEach((element) => {
    let aQuote = document.createElement("tr");
    aQuote.innerHTML = `<tr> 
        <td scope="row">${element.quoteNumber}</td>
        <td>${element.nameProduct}</td>
        <td>${element.originCity}</td>
        <td>${element.destinationCity}</td>
        <td>${element.priceQuote}</td>
        </tr>`;
    quotesTable.append(aQuote);
  });
}

if (localStorage.getItem("cotizaciones")) {
  myQuotesJSON = JSON.parse(localStorage.getItem("cotizaciones"));
  myQuotes = myQuotesJSON.map(
    (element) =>
      new Quote(
        element.quoteNumber,
        element.originCity,
        element.originStreet,
        element.originStreetNumber,
        element.originPostalCode,
        element.destinationCity,
        element.destinationStreet,
        element.destinationStreetNumber,
        element.destinationPostalCode,
        element.nameProduct,
        element.weightProduct,
        element.heightProduct,
        element.weightProduct,
        element.productPrice,
        element.priceQuote
      )
  );
  addQuoteToTable(myQuotes);
}

//Función que toma el texto de los selectores de ciudad
function selectTextCities(id) {
  const select = document.getElementById(id);
  const optionSelected = select.options[select.selectedIndex];
  const textSelected = optionSelected.textContent || optionSelected.innerText;
  return textSelected;
}

//Estructura que permite cargar las ciudades en el Select de ciudades
let selectOriginCity = document.getElementById("select-origin-city");
let selectDestinationCity = document.getElementById("select-destination-city");
CITIES.forEach(function (oneCity) {
  const option = document.createElement("option");
  const option1 = document.createElement("option");
  option.value = oneCity.id;
  option.innerText = oneCity.name.toUpperCase();
  option1.value = oneCity.id;
  option1.innerText = oneCity.name.toUpperCase();
  selectOriginCity.append(option);
  selectDestinationCity.append(option1);
});

//Función que agrega la cotización en el objeto myQuotes
function addQuote(
  quoteNumber,
  originCity,
  originStreet,
  originStreetNumber,
  originPostalCode,
  destinationCity,
  destinationStreet,
  destinationStreetNumber,
  destinationPostalCode,
  nameProduct,
  weightProduct,
  heightProduct,
  widthProduct,
  productPrice,
  priceQuote
) {
  const oneQuote = new Quote(
    quoteNumber,
    originCity,
    originStreet,
    originStreetNumber,
    originPostalCode,
    destinationCity,
    destinationStreet,
    destinationStreetNumber,
    destinationPostalCode,
    nameProduct,
    weightProduct,
    heightProduct,
    widthProduct,
    productPrice,
    priceQuote
  );
  myQuotes.push(oneQuote);
  localStorage.setItem("cotizaciones", JSON.stringify(myQuotes));
  addQuoteToTable(myQuotes);
  sweetAlert(
    "Se ha generado la cotización de forma exitosa",
    "En la tabla podrá ver el detalle de su cotización",
    "success"
  );
  cleanForm();
  return true;
}

//Función que calcula la dimensión del producto
function aforoProduct(weight, height, width) {
  let result = (weight * height * width) / 5000;
  return result;
}

//Función que toma los datos ingresados, los válida y llama a la función que calcula aforo
form.addEventListener("submit", validateForm);
function validateForm(event) {
  event.preventDefault();
  const quoteNumber = randomNumber(
    myQuotes.map((element) => element.quoteNumber)
  );
  const originStreet = document.getElementById("origin-street").value;
  const originStreetNumber = document.getElementById(
    "origin-street-number"
  ).value;
  const originPostalCode = document.getElementById("origin-postal-code").value;
  const originCity = selectTextCities("select-origin-city");
  const destinationStreet = document.getElementById("destination-street").value;
  const destinationStreetNumber = document.getElementById(
    "destination-street-number"
  ).value;
  const destinationPostalCode = document.getElementById(
    "destination-postal-code"
  ).value;
  const destinationCity = selectTextCities("select-destination-city");
  const nameProduct = document.getElementById("name-product").value;
  const weightProduct = parseFloat(
    document.getElementById("weight-product").value
  );
  const heightProduct = parseFloat(
    document.getElementById("height-product").value
  );
  const widthProduct = parseFloat(
    document.getElementById("width-product").value
  );
  const productPrice = parseFloat(
    document.getElementById("product-price").value
  );

  if (
    originStreet === "" ||
    originStreetNumber === "" ||
    originPostalCode === "" ||
    originCity === "" ||
    destinationStreet === "" ||
    destinationStreetNumber === "" ||
    destinationPostalCode === "" ||
    destinationCity === "" ||
    nameProduct === ""
  ) {
    sweetAlert(
      "Por favor verifique los datos ingresados",
      "Debe completar los campos requeridos",
      "error"
    );
    return false;
  } else if (weightProduct <= 0 || heightProduct <= 0 || widthProduct <= 0) {
    sweetAlert(
      "Por favor verifique los datos ingresados",
      "Datos del producto deben ser mayor a 0",
      "error"
    );
    return false;
  } else {
    resultAforoQuote = aforoProduct(weightProduct, heightProduct, widthProduct);
  }

  if (resultAforoQuote > 0 && resultAforoQuote <= MIN_AFORO_LIMIT) {
    addQuote(
      quoteNumber,
      originCity,
      originStreet,
      originStreetNumber,
      originPostalCode,
      destinationCity,
      destinationStreet,
      destinationStreetNumber,
      destinationPostalCode,
      nameProduct,
      weightProduct,
      heightProduct,
      widthProduct,
      productPrice,
      LOW_PRICE
    );
  } else if (
    resultAforoQuote > MIN_AFORO_LIMIT &&
    resultAforoQuote <= MEDIUM_AFORO_LIMIT
  ) {
    addQuote(
      quoteNumber,
      originCity,
      originStreet,
      originStreetNumber,
      originPostalCode,
      destinationCity,
      destinationStreet,
      destinationStreetNumber,
      destinationPostalCode,
      nameProduct,
      weightProduct,
      heightProduct,
      widthProduct,
      productPrice,
      MEDIUM_PRICE
    );
  } else if (
    resultAforoQuote > MEDIUM_AFORO_LIMIT &&
    resultAforoQuote <= MAX_AFORO_LIMIT
  ) {
    addQuote(
      quoteNumber,
      originCity,
      originStreet,
      originStreetNumber,
      originPostalCode,
      destinationCity,
      destinationStreet,
      destinationStreetNumber,
      destinationPostalCode,
      weightProduct,
      nameProduct,
      heightProduct,
      widthProduct,
      productPrice,
      MAX_PRICE
    );
  } else {
    sweetAlert(
      "Por favor verifique los datos ingresados",
      "El producto supera el volumen para los tipos de envíos que manejamos",
      "warning"
    );
    return false;
  }
}
