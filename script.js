const playerWeapon = document.getElementById('pw')
const enemyWeapon = document.getElementById('ew')
const rock = document.getElementById('rock')
const paper = document.getElementById('paper')
const scissors = document.getElementById('scissors')
const loading = document.getElementById('loading')
const scoreBot = document.getElementById('bot')
const scorePlayer = document.getElementById('player')

// sources for the images
const attacks = [
  './images/icons8-rock-100.png', // rock
  './images/icons8-paper-100.png', // paper
  './images/icons8-hand-scissors-100.png' // scissors
]

// sets class for h1 with id loading to center it
loading.classList.add('select-weapon')

const loadingTime = 2000; // 2 seconds
const loadingMessage = 'Loading...' // the loading message

let bot = '' // container for the weapon that the bot use
let player = '' // " " player use

let playerScore = 0 // player score
let botScore = 0 // bot score

let isLoading = false // sets true or false if loading or not

// starts the game
start()


/* ########################################################################## */
/**
 * ROCK PAPER SCISSORS
 * 
 * Optimized: April 1 2020
 * Author: Josh Matthew Talplacido
 */

// initializes everything
function start() {
  setClickEventHandler(rock) // handles click event for rock image
  setClickEventHandler(paper) // " " paper image
  setClickEventHandler(scissors) // " " scissors image
}

function attackHandler(e) { // handler function for incoming click events.
  if (!isLoading) { // will only run if it is not loading to avoid multiple stack of events
    let idx = -1
    let botAttackIdx = Math.floor(Math.random() * 3) // sets the index for bot weapon

    switch (e.target.id) { // sets the index for player weapon
      case 'rock':
        idx = 0
        break
      case 'paper':
        idx = 1
        break
      case 'scissors':
        idx = 2
        break
      default:
        break
    }

    player = getAttack(idx, 1) // sets the value for the player
    initiateLoading(botAttackIdx) // loads the bot attack
  }
}

function loadingSwitcher() { // switches isLoading
  isLoading = !isLoading
}

function initiateLoading(botAttackIdx) { // loads the bot attack
  setTimeout(() => {
    loadingSwitcher() // sets isLoading to false

    bot = getAttack(botAttackIdx, 0)
    loading.innerText = ""
    addScore(didWin()) // add score to bot or player when either wins
    whoWins() // declares who wins according to the maximum score
  }, loadingTime)

  loadingSwitcher() // sets isLoading to true

  loading.innerText = loadingMessage
  enemyWeapon.src = ""
}

function getAttack(idx, player) { // gets the element from the attacks array and set it to bot or player
  player === 0 ? enemyWeapon.src = attacks[idx] : playerWeapon.src = attacks[idx] // bot: 0, player: 1
  return attacks[idx] // returns the element according to the given index
}

function setClickEventHandler(element) { // helper function for click event
  element.addEventListener('click', attackHandler)
}

function addScore(didWIn) { // adds score to either bot or player
  if (didWIn !== null) { // null means draw
    didWIn ? playerScore++ : botScore++
  }
  scoreBot.innerText = `Bot: ${botScore}`
  scorePlayer.innerText = `Player: ${playerScore}`
}

function whoWins() { // checks who wins
  if (playerScore === 3 || botScore === 3) {
    console.log(playerScore > botScore ? 'You Win!' : 'You Loose!')
  }
}

function didWin() { // returns true if player wins over bot. otherwise false

  const win = true, loose = false;

  if (player === bot) {
    return null
  } else {
    switch (player) {
      case attacks[0]:
        if (bot === attacks[1]) {
          return loose
        } else {
          return win
        }
        break
      case attacks[1]:
        if (bot === attacks[0]) {
          return win
        } else {
          return loose
        }
        break
      case attacks[2]:
        if (bot === attacks[1]) {
          return win
        } else {
          return loose
        }
        break
    }
  }
}