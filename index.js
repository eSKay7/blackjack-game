let cards = []
let dealerCards = []
let playerSum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = true
let takenStand = false
let message = ""

let deck = {
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "J":10,
    "K":10,
    "Q":10,
    "A":11,
}

let suits = [
    "H",
    "D",
    "C",
    "S"
]

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


let messageEl = document.getElementById("message-el")

let dealerEl = document.getElementById("dealer-el")

let cardsEl = document.getElementById("cards-el")

function startRound(){
    const firstCard = drawCard()
    const secondCard = drawCard()
    const dealerFirstCard = drawCard()

    cards = [firstCard, secondCard]
    dealerCards = [dealerFirstCard]

    playerSum = firstCard.value + secondCard.value
    dealerSum = dealerFirstCard.value

    hasBlackJack = false
    isAlive = true
    takenStand = false
}

function reset(){
    message = "Game reset. Click Start Game to play another round!"
    messageEl.textContent = message
    dealerEl.textContent = "Dealer's Cards: "
    cardsEl.textContent = "Your Cards: "
    document.getElementById("start-el").hidden = false
    document.getElementById("hit-el").hidden = false
    document.getElementById("stand-el").hidden = false
}

function startGame(){
    startRound()
    updateGame()
}

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

function updateGame(){
    displayCards(dealerEl, "Dealer's Card: \n", dealerCards)
    displayCards(cardsEl, "Your Cards: \n", cards)
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
        document.getElementById("start-el").hidden = true
        document.getElementById("hit-el").hidden = true
        document.getElementById("stand-el").hidden = true
    }
    messageEl.textContent = message
}

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