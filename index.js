/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    const gamesContainer = document.getElementById("games-container");

    // loop over each item in the data

    const games_id = document.getElementById("games-container");

    for (let i = 0; i < games.length; i++){
        const game = games[i];

        const g_card = document.createElement("div");

        g_card.classList.add('game-card');

        g_card.innerHTML = ` 
        <img src="${game.img}" alt="${game.name}" class="game-img">
        <h5>${game.name}</h5>
        <p>${game.about}</p>`;

        gamesContainer.appendChild(g_card);
    }


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");


// use reduce() to count the number of total contributions by summing the backers
const contributions = GAMES_JSON.reduce((total_backers, game) => {
    return total_backers + game.backers;
},0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${contributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const pledgers = GAMES_JSON.reduce((total_pledgers,game) => {
    return total_pledgers + game.pledged;
},0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${pledgers.toLocaleString()}`;

// grab number of games card and set its inner HTML
const games_element = document.getElementById("num-games");

const total_games = GAMES_JSON.length;

games_element.innerHTML = `${total_games}`;
games_element.innerHTML = `${total_games.toLocaleString()}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    // use filter() to get a list of games that have not yet met their goal
    const games_not_at_goal = GAMES_JSON.filter((game) => game.pledged < game.goal);



    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(games_not_at_goal);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const games_met_goal = GAMES_JSON.filter((game) => game.pledged >= game.goal);


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(games_met_goal);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click",showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfunded_games_json = GAMES_JSON.filter(game => game.pledged < game.goal);

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${pledgers.toLocaleString()} has been raised for ${total_games} game${total_games !== 1 ? 's' : ''}. Currently, ${unfunded_games_json.length} game${unfunded_games_json.length !== 1 ? 's' : ''} remain unfunded.`;


// create a new DOM element containing the template string and append it to the description container

const p_element = document.createElement('p');
p_element.textContent = displayStr

descriptionContainer.appendChild(p_element);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

function checkGames() {
    const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
    const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
    
    console.log("Unfunded games count: " + unfundedGames.length);
    console.log("Funded games count: " + fundedGames.length);
    console.log("Without deleteChildElements, games list grows.");
}

checkGames();



// use destructuring and the spread operator to grab the first and second games

const [first,second] = sortedGames;


// create a new element to hold the name of the top pledge game, then append it to the correct element


const first_element = document.createElement("p")
first_element.textContent = `Top pledged game: ${first.name}`;
firstGameContainer.appendChild(first_element);

const second_element = document.createElement("p");
second_element.textContent = `Second most pledged game: ${second.name}`;
secondGameContainer.appendChild(second_element);

console.log("First word of top pledged game: ",first.name);
console.log("First word of second top pledged game ", second.name);





// do the same for the runner up item
