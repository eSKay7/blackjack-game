/**
 * ========================
 * Global Game Variables
 * ========================
 * These variables keep track of the current state of the game.
 * They are reset or updated as the game progresses.
 */
let cards = []              // Stores player's drawn cards as objects {key, value} pair. 
let dealerCards = []        // Stores dealer's drawn cards as objects {key, value} pair.
let playerSum = 0           // Total of player's card values.
let dealerSum = 0           // Total od dealer's card values.
let isAlive = true          // Checks if the player is still in the round.
let takenStand = false      // Checks if the player has chosen to stand. 
let message = ""            // Stores game message to be shown in the UI.

// Deck used for drawing card ranks (values).
let deck = {
    "2":2, "3":3, "4":4, "5":5,
    "6":6, "7":7, "8":8, "9":9,
    "10":10, "J":10, "K":10, "Q":10, "A":11,
}

// Used for checking card suit (Hearts, Diamonds, Clubs, Spades).
let suits = ["H", "D", "C", "S"]


/**
 * Draws a random card from the deck. 
 * Steps:
 * 1. Selects a random rank (2 - 10, J, K, Q, A) from the deck object and stores it in the card variable. 
 * 2. Selects a random suit (Hearts, Diamonds, Clubs, Spades) and stores it in the suitValue variable.
 * 3. Gets the corresponding value of the selected rank and stores it in the cardValue variable
 * 4. Combines the rank and suit to create a string and stores it in the displayCard variable (e.g., "2H" for 2 of Clubs).
 * 
 * @returns {object} An object representing the card:
 *      - key: displayCard variable which is used for image mapping.
 *      - value: cardValue variable which is used for the game logic ("A" is counted as 11 by default)
 */
function drawCard(){
    let randomRank = Math.floor(Math.random()*(Object.keys(deck).length))
    //Card Pulled.
    let card = Object.keys(deck)[randomRank]
    //Suit Pulled.
    let randomSuit = Math.floor(Math.random()*suits.length)
    let suitValue = suits[randomSuit]
    //Value of the Card.
    let cardValue = Object.values(deck)[randomRank]
    let displayCard = card + suitValue
    return {key : displayCard, value : cardValue}
}


/**
 * Controls the visibility of the game buttons.
 * The function shows or hides the "Start Game", "Hit", "Stand", and "Reset" buttons 
 * based on the boolean values passed in the parameter object.
 * 
 * @param {object} param0 - An object specifying which buttons should be visible.
 * @param {boolean} [param0.start=false] - If true, shows the "Start Game" button; otherwise hides it.
 * @param {boolean} [param0.hit=false] - If true, shows the "Hit" button; otherwise hides it.
 * @param {boolean} [param0.stand=false] - If true, shows the "Stand" button; otherwise hides it.
 * @param {boolean} [param0.reset=false] - If true, shows the "Reset" button; otherwise hides it.
 * 
 * The function works by updating the "hidden" property of each button's HTML element:
 *      - true: element is hidden
 *      - false: element is visible 
 */
function buttonDisplay({start = false, hit = false, stand = false, reset = false}){
    document.getElementById("start-el").hidden = !start
    document.getElementById("hit-el").hidden = !hit
    document.getElementById("stand-el").hidden = !stand
    document.getElementById("reset-el").hidden = !reset
}


/**
 * Initial UI Setup:
 * Show only the "Start Game" button when the page loads.
 * Other buttons ("Hit", "Stand", "Reset") remain hidden until a round begins.
 */
buttonDisplay({start : true})


/**
 * DOM Element References
 * The following variables store references to HTML elements
 * where messages, dealer's cards, and player's cards
 * will be displayed.
 */
let messageEl = document.getElementById("message-el")
let dealerEl = document.getElementById("dealer-el")
let cardsEl = document.getElementById("cards-el")


/**
 * Starts a new round by drawing two cards for the player and one for the dealer.
 * Resets game state variables to default values.
 */
function startRound(){
    const firstCard = drawCard()
    const secondCard = drawCard()
    const dealerFirstCard = drawCard()

    cards = [firstCard, secondCard]
    dealerCards = [dealerFirstCard]

    playerSum = firstCard.value + secondCard.value
    dealerSum = dealerFirstCard.value

    isAlive = true
    takenStand = false
}


/**
 * Resets the game state and UI.
 * Clears cards, sums, messages, and displays only the "Start Game" button.
 */
function reset(){
    message = "Game reset. Click Start Game to play another round!"
    messageEl.textContent = message
    dealerEl.textContent = "Dealer's Cards: "
    cardsEl.textContent = "Your Cards: "
    buttonDisplay({start : true})
}


/**
 * Starts the game when "Start Game" is clicked.
 * Updates the button visibility and initializes a new round.
 */
function startGame(){
    buttonDisplay({hit : true, stand : true, reset : true})
    startRound()
    updateGame()
}


/**
 * Displays a list of cards in the HTML element.
 * Creates image elements for each card and appends them to the player element.
 * 
 * @param {HTMLElement} player - Container element for Player or Dealer Cards.
 * @param {string} prefix - Message to show before cards ("Your Cards: " or "Dealer's Cards: ").
 * @param {Array} array - Array of cards to be displayed.
 */
function displayCards(player, prefix, array){
    player.textContent = prefix
    player.appendChild(document.createElement("br"))
    for (let card of array){
        let img = document.createElement("img")
        img.src = "images/cards/" + card.key + ".png"
        img.classList.add("card-img")
        player.appendChild(img)
    }
}


/**
 * Updates the game UI after each action (hit, stand, or round start).
 * Displays cards, updates the message, and manages button visibility based on game state.
 */
function updateGame(){
    displayCards(dealerEl, "Dealer's Card: ", dealerCards)
    displayCards(cardsEl, "Your Cards: ", cards)
    if (playerSum === 21){
        message = "You've got Blackjack"
        isAlive = false
    }
    else if (playerSum < 21 && !takenStand){
        message = "Do you want to draw a new card?"
    }
    else if (takenStand){
        if (dealerSum > 21){
            message = "Dealer's out of the game. You Win!"
            isAlive = false
        }
        else{
            winner()
        }
    }
    else {
        message = "You're out of the game. Dealer Wins!"
        isAlive = false
    }

    if (!isAlive){
        buttonDisplay({reset : true})
    }
    messageEl.textContent = message
}


/**
 * Draws a new card for the player.
 * Handles Ace value adjustment (1 if adding 11 would bust).
 */
function newCard(){
    let newCard = drawCard()
    cards.push(newCard)
    if (newCard.key[0] === "A" && playerSum + newCard.value > 21){
        playerSum += 1
    }
    else{
        playerSum += newCard.value
    }
    updateGame()
}


/**
 * Executes the dealer's turn when the player stands.
 * Dealer draws until reaching at least 17.
 * Handles Ace value adjustment for dealer (1 if adding 11 would bust).
 */
function stand(){
    takenStand = true
    while (dealerSum < 17){
        let newDealerCard = drawCard()
        dealerCards.push(newDealerCard)
        if (newDealerCard.key[0] === "A" && dealerSum + newDealerCard.value > 21){
            dealerSum += 1
        }
        else{
            dealerSum += newDealerCard.value
        }
    }
    updateGame()
}


/**
 * Determines the winner of the game based on player and dealer sums.
 * Updates the message and sets the game as finished.
 */
function winner(){
    if (playerSum > dealerSum){
        message = "You win!"
        isAlive = false
    }
    else if (playerSum < dealerSum){
        message = "Dealer wins!"
        isAlive = false
    }
    else{
        message = "It's a tie!"
        isAlive = false
    }
}