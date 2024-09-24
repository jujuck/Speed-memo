//Affichage du formulaire de personnification
function formulaire() {
    var myRequestFormulaire = new XMLHttpRequest();
    myRequestFormulaire.open('GET', 'html/formulaire.html');
    myRequestFormulaire.onreadystatechange = function () {
        if (myRequestFormulaire.readyState === 4) {
            //header.style.height = "250px";
            //formulaire.style.display = "inline";
            //formulaire.style.height = "150px";
            document.getElementById("formulaire").innerHTML= myRequestFormulaire.responseText;
        }
    };
    myRequestFormulaire.send();
}

formulaire();

