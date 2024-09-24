//création des variables
var tour = 1;
var points = 0;
var nbTry = 0;
var numBoucle = 0;
var canPlay = true; //Enable et disable l'appel au onclick
var carteJouée1;
var carteJouée2;
var secondes = 0;
var minutes = 0;

//Définition des élements d'affichage à modifier
var pointsElt = document.getElementById("points");
var nbTryElt = document.getElementById("nbTry");
var difficulteElt;
var tpsJeuxElt = document.getElementById("tpsJeux");
var formulaireElt = document.getElementById("formulaire");
var recommencerElt = document.getElementById("recommencer");
var tpsMemorisation;
var themes;

//fonction de mise à jour de l'affihcage du score
function affichageScore(points, nbTry) {
  pointsElt.innerHTML = points;
  nbTryElt.innerHTML = nbTry;
  if (points === (4 + difficulteElt * 4) / 2) {
    clearInterval();
    alert("féliciations, vous avez réussi!!!");
    window.location.reload();
  }
  return;
}

//fonction chrono
function chrono() {
  setInterval(function () {
    secondes++;
    if (secondes === 60) {
      minutes++;
      secondes = 0;
    }
    tpsJeuxElt.innerHTML = minutes + " : " + secondes;
  }, 1000);
}

//function de jouer
function jouer(IdCarte, Value) {
  //Sélection des 2 cartes
  if (tour === 1 && canPlay === true) {
    exposition1 = document.getElementById("expostition" + IdCarte);
    exposition1.classList.remove("dos");
    exposition1.classList.add("vu");
    carteJouée1 = document.getElementById("carte" + IdCarte);
    carteJouée1.value = Value;
    tour++;
  } else if (tour === 2 && canPlay === true) {
    canPlay = false;
    exposition2 = document.getElementById("expostition" + IdCarte);
    exposition2.classList.remove("dos");
    exposition2.classList.add("vu");
    carteJouée2 = document.getElementById("carte" + IdCarte);
    carteJouée2.value = Value;

    //Vérification des cartes et temps de mémorisation
    setTimeout(function () {
      if (carteJouée1.value === carteJouée2.value) {
        points++;
        carteJouée1.classList.add("validee");
        carteJouée2.classList.add("validee");
        carteJouée1.onclick = null;
        carteJouée2.onclick = null;
      } else {
        exposition1.classList.remove("vu");
        exposition1.classList.add("dos");
        exposition2.classList.remove("vu");
        exposition2.classList.add("dos");
      }
      //Mise à jour de l'affichage
      nbTry++;
      affichageScore(points, nbTry);
      canPlay = true;
    }, tspMemorisation);
    tour = 1;
  }
}

//Création du menu central
function initCarte(numJeux) {
  var myRequestCarte = new XMLHttpRequest();
  myRequestCarte.open("GET", `data/${themes}.json`);

  myRequestCarte.onreadystatechange = function () {
    if (myRequestCarte.readyState === 4) {
      var carte = JSON.parse(myRequestCarte.responseText);
      var carteList = '<div class="container">';

      for (var i = 0; i < 4 + difficulteElt * 4; i++) {
        var y = Math.floor(Math.random() * (4 + difficulteElt * 4 - numBoucle));
        if (y !== -1) {
          carteList +=
            '<div class="cartes carte' +
            '" onclick="jouer(' +
            carte[y].num +
            "," +
            carte[y].value +
            ')" id="carte' +
            carte[y].num +
            '">';
          carteList += "<div id=expostition" + carte[y].num + ' class="dos">';
          carteList += '<h3 class="cartename">' + carte[y].name + "</h3>";
          carteList += "</div>";
          carteList += "</div>";
          carte.splice(y, 1);
          numBoucle++;
        }
      }
      carteList += "</div>";
      document.getElementById("jeux").innerHTML = carteList;
    }
  };
  myRequestCarte.send();
}

function distribution() {
  formulaireElt.style.display = "none";
  recommencerElt.style.display = "inline";
  difficulteElt = document.getElementById("difficulte").value;
  tspMemorisation = document.getElementById("vitesse").value;
  themes = document.getElementById("theme").value;
  initCarte(1);
  affichageScore(points, nbTry);
  chrono();
}

function recommencer() {
  window.location.reload();
}
