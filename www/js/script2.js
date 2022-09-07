"use strict";

/* 
API keys :
openweathermap.org : 181ab832c4d14359aee27158d520bc9f
opencagedata.com : 1d35aab1fca86e01352be284dcde9b5a
 */

/* -------------------------------------------------------------------------- */
/*                                  variables                                 */
/* -------------------------------------------------------------------------- */

const choices = document.getElementById("choseDays"); //récuération de la séléction du nombre de jour à affichés (séléction dans l'input déroulant)
const parentContainer = document.getElementById("parent-container"); // récupèration de la div où la météo va être display
const Week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const weekMeteo = new Object();
const arrayDay = [];
const arrayWeather = [];

/* -------------------------------------------------------------------------- */
/*                             fonction evenement                             */
/* -------------------------------------------------------------------------- */

form.addEventListener("submit", (e) => {
  //let form = document.getElementById("form"); //récupération de l'input submit du form
  arrayWeather.length = 0; // nettoie le array pour éviter que les météos de la recherche suivante se stock dedans et empèche la maj de l'affichage
  arrayDay.length = 0; // nettoie le array pour éviter que les jours de la recherche suivante se stock dedans et empèche la maj de l'affichage
  const cityInput = document.getElementById("cityInput").value; //récupération de l'input ville
  const urlLocation =
    "https://api.opencagedata.com/geocode/v1/json?q=" +
    cityInput +
    "&key=181ab832c4d14359aee27158d520bc9f";

  let choice = parseInt(choices.value); // transformation en INT de l'input (menu à choix multiple)
  e.preventDefault();
  removeAllChildNodes(parentContainer);
  fetch(urlLocation) // appel api localisation
    .then((response) => response.json())
    .catch(function (error) {
      console.log(
        "Il y a eu un problème avec l'opération fetch: " + error.message
      );
    })
    .then(function (data) {
      let lat = data.results[0].geometry.lat; // récupération latitude
      let lng = data.results[0].geometry.lng; // récupération longitude
      let urlWeather = // injection de la latitude & longitude dans le lien de l'api meteo
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lng +
        "&exclude=&appid=1d35aab1fca86e01352be284dcde9b5a";
      return fetch(urlWeather); // appel api meteo
    })
    .then((response) => response.json())
    .then(function (data) {
      let arrayWeatherAndDays = data.daily; // récupération des données dans les 7 jours
      getWeather(arrayWeatherAndDays);
      getDay(arrayWeatherAndDays);
      getWeekMeteo();
      display(choice);
    });
});

/* -------------------------------------------------------------------------- */
/*                     mise en forme des données de l'api                     */
/* -------------------------------------------------------------------------- */

/* ---------------------- mise en forme dans les array ---------------------- */

/**
 * rempli le array de clef day
 * @param {array} arrayWeatherAndDays extrait de l'api : array contenant des objets
 *
 */
function getDay(arrayWeatherAndDays) {
  for (let i = 0; i < arrayWeatherAndDays.length; i++) {
    let daysRaw = arrayWeatherAndDays[i].dt; // récupère les jours en unix timestamp
    let daysConverter = new Date(daysRaw * 1000).getDay(); //converti les jours en chiffre de 1 à 7
    let day = Week[daysConverter]; // converti les jours en toutes lettres
    arrayDay.push(day);
  }
}

/**
 * rempli le array de clef weather
 * @param {array} arrayWeatherAndDays extrait de l'api : array contenant des objets
 */
function getWeather(arrayWeatherAndDays) {
  for (let i = 0; i < arrayWeatherAndDays.length; i++) {
    let cloudiness = arrayWeatherAndDays[i].clouds;
    let weatherRaw = arrayWeatherAndDays[i].weather[0].main;
    let weather = weatherSorting(cloudiness, weatherRaw); // appel la fonction permettant de trier le weather en 5 types
    arrayWeather.push(weather);
  }
}

/* ------------------------- mise en forme en objet ------------------------- */

/**
 * rempli les l'objet weekMeteo avec 2 arrays (days & weather)
 */
function getWeekMeteo() {
  weekMeteo["day"] = arrayDay; // remplissage de l'objet weekMeteo avec la clef 'day' et l'array des jours
  weekMeteo["weather"] = arrayWeather; // remplissage de l'objet weekMeteo avec la clef 'meteo' et l'array des meteo
}

/* -------------------------------------------------------------------------- */
/*                            affichage des données                           */
/* -------------------------------------------------------------------------- */

/* --------------------- mise en forme de l'output image -------------------- */

/**
 * permet d'afficher dans le html les div
 * @param {int} choice imput de l'utilisateur dans le bouton à choix multiples
 */
function display(choice) {
  for (let i = 0; i < choice; i++) {
    let sliceMeteo = weekMeteo.weather[i]; // slice l'objet weekMeteo et récupère la meteo
    let sliceDay = weekMeteo.day[i]; // slice l'objet weekMeteo et récupère le day
    let childContainer = document.createElement("div"); // crée une div
    parentContainer.appendChild(childContainer); // insère la div dans le container parent préexistant
    childContainer.classList.add("meteo-block"); // ajoute une classe au container enfant
    let img = document.createElement("img"); // crée un élément img
    let txt = document.createElement("span"); // crée un élément span
    img.src = "img/" + sliceMeteo.toLowerCase() + ".svg"; // mise en forme du lien de l'image
    childContainer.appendChild(img); // ajout de l'image au conainer parent
    txt.append(sliceDay); // ajout du jour au span
    childContainer.appendChild(txt); // ajout du span au container parent
  }
}

/* ------------------------ mise en forme de l'output ----------------------- */

/**
 * permet de classer la meteo en 5 types
 * @param {int} cloudiness  pourcentage de nuage
 * @param {string} weatherRaw ensemble des météos possible (plus des 5 necessaires)
 * @returns string
 */
function weatherSorting(cloudiness, weatherRaw) {
  if (weatherRaw == "Clear") {
    return "Clear";
  } else if (weatherRaw == "Snow") {
    return "Snow";
  } else if (cloudiness > 50) {
    return "Clouds";
  } else if (cloudiness <= 50) {
    return "Cloudy";
  } else {
    return "Rain";
  }
}

/**
 * Supprime la météo affichée
 * @param {div} parentContainer
 */
function removeAllChildNodes(parentContainer) {
  while (parentContainer.firstChild) {
    parentContainer.removeChild(parentContainer.firstChild);
  }
}
