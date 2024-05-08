"use strict";

let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");

    let style = window.getComputedStyle(navMenuEl);

    if (style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

const url = "https://mongodb-le01.onrender.com/cvs";

getData();

async function getData() {
    const response = await fetch(url);
    const data = await response.json();

    let mainEvent = document.getElementById("main-container");
    
    if (!mainEvent) {
        return;
    }

    data.forEach(element => {


        const article = document.createElement('article');
        article.innerHTML = `<p> <strong>Företagsnamn: </strong>${element.companyname}<br> 
        <strong>Jobbtitel:</strong> ${element.jobtitle}<br> 
        <strong>Plats: </strong>${element.location}<br>
        <strong>Beskrivning av arbetet:</strong> <br>${element.description}<br> </p>
        <button type="button" class="radera" data-id="${element.id}">Radera</button>`;

        const deleteButton = article.querySelector('.radera');
        deleteButton.addEventListener('click', function() {
            const cvId = deleteButton.getAttribute('data-id');
            deleteCv(cvId);
        });

        mainEvent.appendChild(article);
    });
}

async function deleteCv(id) {
    const response = await fetch(`${url}${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        // Ta bort det aktuella CV-postelementet från DOM:en
        const article = document.querySelector(`[data-id="${id}"]`).parentElement;
        article.parentNode.removeChild(article);
    } else {
        console.log("Kunde inte radera CV-post.");
    }
}

let form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        document.getElementById("container-error").innerHTML = "";

        let companyname = document.getElementById('companyname').value;
        let jobtitle = document.getElementById('jobtitle').value;
        let location = document.getElementById('location').value;

        let description = document.getElementById('description').value;

        if (companyname === "") {
            document.getElementById("container-error").innerHTML += `<li>Skriv in företagsnamn</li><br>`;
        }

        if (jobtitle === "") {
            document.getElementById("container-error").innerHTML += `<li>Skriv in jobbtitel</li><br>`;
        }

        if (location === "") {
            document.getElementById("container-error").innerHTML += `<li>Skriv in plats</li><br>`;
        }

        if (description === "") {
            document.getElementById("container-error").innerHTML += `<li>Skriv in beskrivning</li><br>`;
        }

        let cv = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location,
            description: description
        };

        console.log("cv-objektet:", cv);

        createCv(cv);
    });
}

async function createCv(cv) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cv)
    });
    

    if (response.ok) {
        document.getElementById('companyname').value = "";
        document.getElementById('jobtitle').value = "";
        document.getElementById('location').value = "";
        document.getElementById('description').value = "";
    }


    const data = await response.json();
    console.log(data);
}
