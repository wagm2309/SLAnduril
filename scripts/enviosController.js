const form = document.getElementById("myForm");
let myShippingsJSON = [];
let myShippings = [];
let resultAforoShipping = 0;
const URLCITIES = "../data/cities.json";

//Función que agrega en la tabla cada nuevo envío, además modifica en el HTML la tabla.
function addShippingToTable(collection = []) {
  let shippingTable = document.getElementById("custom-table");
  shippingTable.innerHTML = "";
  collection.forEach((element) => {
    let aShipping = document.createElement("tr");
    aShipping.innerHTML = `
        <td scope="row">${element.documentClient}</td>
        <td>${element.shippingNumber}</td>
        <td>${element.nameProduct}</td>
        <td>${element.originCity}</td>
        <td>${element.destinationCity}</td>
        <td>${element.priceShipping}</td>
        `;
    shippingTable.append(aShipping);
  });
}

//Se llama a la función addShippingToTable para agregar los datos a la tabla
if (localStorage.getItem("envios")) {
  myShippingsJSON = JSON.parse(localStorage.getItem("envios"));
  myShippings = myShippingsJSON.map(
    (element) =>
      new Shipping(
        element.documentClient,
        element.nameClient,
        element.lastNameClient,
        element.emailClient,
        element.phoneClient,
        element.shippingNumber,
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
        element.widthProduct,
        element.productPrice,
        element.priceShipping
      )
  );
  addShippingToTable(myShippings);
}

//Función que toma el texto de los selectores de ciudad
function selectTextCities(id) {
  const select = document.getElementById(id);
  const optionSelected = select.options[select.selectedIndex];
  const textSelected = optionSelected.textContent || optionSelected.innerText;
  return textSelected;
}

//Estructura que permite cargar las ciudades en el Select de ciudades
fetchGet(URLCITIES)
  .then((cities) => {
    let selectOriginCity = document.getElementById("select-origin-city");
    let selectDestinationCity = document.getElementById(
      "select-destination-city"
    );
    cities.forEach(function (oneCity) {
      const option = document.createElement("option");
      const option1 = document.createElement("option");
      option.value = oneCity.id;
      option.innerText = oneCity.name.toUpperCase();
      option1.value = oneCity.id;
      option1.innerText = oneCity.name.toUpperCase();
      selectOriginCity.append(option);
      selectDestinationCity.append(option1);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Función que agrega el envío en el objeto myShippings
function addShipping(
  documentClient,
  nameClient,
  lastNameClient,
  emailClient,
  phoneClient,
  shippingNumber,
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
  priceShipping
) {
  const oneShipping = new Shipping(
    documentClient,
    nameClient,
    lastNameClient,
    emailClient,
    phoneClient,
    shippingNumber,
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
    priceShipping
  );
  myShippings.push(oneShipping);
  localStorage.setItem("envios", JSON.stringify(myShippings));
  addShippingToTable(myShippings);
  sweetAlert(
    "Envío generado con éxito. Número envío: " +
      shippingNumber.toString() +". "+
      " En breve estaremos visitando tu domicilio.",
    "A continuación los detalles.",
    "success"
  );
  cleanForm();
  return true;
}

//Función que toma los datos ingresados, los válida y llama a la función que calcula aforo
form.addEventListener("submit", validateForm);
function validateForm(event) {
  event.preventDefault();
  const shippingNumber = randomNumber(
    myShippings.map((element) => element.shippingNumber)
  );
  const documentClient = document.getElementById("document-client").value;
  const nameClient = document.getElementById("name-client").value;
  const lastNameClient = document.getElementById("lastname-client").value;
  const emailClient = document.getElementById("email-client").value;
  const phoneClient = document.getElementById("phone-client").value;
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
    documentClient == "" ||
    nameClient === "" ||
    lastNameClient === "" ||
    emailClient === "" ||
    phoneClient === "" ||
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
    resultAforoShipping = aforoProduct(
      weightProduct,
      heightProduct,
      widthProduct
    );
  }

  if (resultAforoShipping > 0 && resultAforoShipping <= MIN_AFORO_LIMIT) {
    addShipping(
      documentClient,
      nameClient,
      lastNameClient,
      emailClient,
      phoneClient,
      shippingNumber,
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
    resultAforoShipping > MIN_AFORO_LIMIT &&
    resultAforoShipping <= MEDIUM_AFORO_LIMIT
  ) {
    addShipping(
      documentClient,
      nameClient,
      lastNameClient,
      emailClient,
      phoneClient,
      shippingNumber,
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
    resultAforoShipping > MEDIUM_AFORO_LIMIT &&
    resultAforoShipping <= MAX_AFORO_LIMIT
  ) {
    addShipping(
      documentClient,
      nameClient,
      lastNameClient,
      emailClient,
      phoneClient,
      shippingNumber,
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

const formSearch = document.getElementById("formSearch");
formSearch.addEventListener("submit", validateSearch);
function validateSearch(event) {
  event.preventDefault();
  let dato = document.getElementById("custom-search").value;
  if (dato === "") {
    console.log(dato);
    sweetAlert(
      "Debe ingresar datos para realizar la busqueda",
      "Por favor verificar",
      "error"
    );
    return false;
  }
  let resultSearch = myShippings.find((el) => el.shippingNumber == dato);
  if (resultSearch == undefined) {
    sweetAlert("El envío ingresado no existe", "Por favor verificar", "error");
    return false;
  } else {
    sweetAlert(
      "El detalle de su envío: " + dato,
      "Producto: " +
        resultSearch.nameProduct +
        "," +
        " Origen envío: " +
        resultSearch.originCity +
        "," +
        " Destino Envío: " +
        resultSearch.destinationCity +
        "," +
        " Costo: " +
        resultSearch.priceShipping,
      "success"
    );
  }
}
