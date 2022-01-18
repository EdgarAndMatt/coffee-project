"use strict"

// Adds div-table to html
function renderCoffee(coffee) {
    let html = '<div class="hidden">' + coffee.id + '</div>';
    html += '<div class="coffee-name col-6">' + coffee.name + '</div>';
    html += '<div class="col-6">' + coffee.roast + '</div>';
    return html;
}

// Adds coffees to div-table
function renderCoffees(coffees) {
    let html = '';
    for (let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
            // Select all roasts
        } else if (roastSelection.value === "all") {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// Live search function
let searchInput = document.querySelector('#coffee-search');

function searchCoffee() {
    let filter = searchInput.value.toUpperCase();
    let filteredCoffees = [];
    console.log(filter); // TEST LOG
    coffees.forEach(function (coffee) {
        if (coffee.name.toUpperCase().includes(filter)) {
            filteredCoffees.push(coffee);
            console.log(filteredCoffees);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}


// ADD NEW COFFEE
let newCoffeeName = document.querySelector('#new-coffee');
let newCoffeeRoast = document.querySelector('#which-roast');
let submitCoffee = document.getElementById("submitNewCoffee");
submitCoffee.addEventListener("click", addNewCoffee);

function addNewCoffee(newCoffeeProduct) {
    newCoffeeProduct.preventDefault();
    let addNewID = coffees.length+1;
    let addNewName = newCoffeeName.value.toString();
    let addNewRoast = newCoffeeRoast.value.toString();
    newCoffeeProduct = {id: addNewID, name: addNewName, roast: addNewRoast,};
    coffees.push(newCoffeeProduct);
    localStorage.setItem('newCoffee', JSON.stringify(newCoffeeProduct));
    tbody.innerHTML = renderCoffees(coffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
//added local storage to store new coffee add atm only stores last coffee added
let addedCoffees = JSON.parse(localStorage.getItem('newCoffee'));

coffees.push(addedCoffees);

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);


