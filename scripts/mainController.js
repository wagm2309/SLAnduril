//Funcion que agrega las ciudad en el main:
const URLCITIES = "./data/cities.json";

fetchGet(URLCITIES)
  .then((cities) => {
    let citiesList = document.getElementById("custom-table-cities");
    citiesList.innerHTML = "";
    cities.forEach((element) => {
      let city = document.createElement("tr");
      city.innerHTML = `<tr>
    <td scoper = "row">${element.name}</td>
    </tr>`;
      citiesList.append(city);
    });
  })
  .catch((error) => {
    console.log(error);
  });
