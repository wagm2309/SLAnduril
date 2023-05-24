//Función que calcula la dimensión del producto
function aforoProduct(weight, height, width) {
  let result = (weight * height * width) / 5000;
  return result;
}

//Función que limpia el formulario
function cleanForm() {
  form.reset();
}

//Función que recibe URL y devuelve el response
async function fetchGet(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
