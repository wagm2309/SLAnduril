//Función que crea un numero random entre 0 y 100001, que se podria repetir
function createRandom() {
  return Math.round(Math.random() * 100001);
}

//Función que genera número random, no repetido (evalua que el número generado no exista dentro dela collection que recibe por parametro)
function randomNumber(collection = []) {
  let pseudorandomNumber = createRandom();
  while (collection.some((element) => element === pseudorandomNumber)) {
    pseudorandomNumber = createRandom();
  }
  return pseudorandomNumber;
}

//Función que limpia el formulario
function cleanForm() {
  form.reset();
}

//Función para el uso de las alert de Sweet Alert
function sweetAlert(message1, message2, icon) {
  swal(message1, message2, icon);
}
