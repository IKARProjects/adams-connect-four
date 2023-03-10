const container = document.getElementById("container");
const board = document.getElementById("board");
let p1Score = document.getElementById('p1Score')
let p2Score = document.getElementById('p2Score')
let player1Display = document.getElementById('player1Display')
let player2Display = document.getElementById('player2Display')
let pieces = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let player1Name = document.getElementById('player1Name')
let player2Name = document.getElementById('player2Name')
const submit1 = document.getElementById('submit1')
let player1Color = document.getElementById('player1Color')
color1 = player1Color.value
let player2Color = document.getElementById('player2Color')
color2 = player2Color.value
const submit2 = document.getElementById('submit2')
 reset = document.getElementById('reset')
let currentPlayer = 1

PLAYER1 = color1
PLAYER2 = color2
playerTurn = PLAYER1

function changeColor1(selectedObject) {

    color1 = selectedObject.value
    console.log(selectedObject.value)

}

function changeColor2(selectedObject) {
    color2 = selectedObject.value
    console.log(selectedObject.value)
}

function onclickSubmit1() {

    Name1 = player1Name.value
    player1Display.innerHTML = Name1

    if (Name1) {
        submit1.style.display = 'none'
    }
    console.log(Name1)
}

function onclickSubmit2() {

    Name2 = player2Name.value
    player2Display.innerHTML = Name2

    if (Name2) {
        submit2.style.display = 'none'
    }
    console.log(Name2)
}




for (let i = 0; i < 42; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.id = i
    board.append(cell)


    cell.onclick = () => {
        onclickColumn(i % 7)
    }
}


function onclickColumn(column) {
    if (currentPlayer === 1) {
        playerTurn = color1
    } else {
        playerTurn === color2
    }

    let availableSpace = pieces.filter((_, index) => index % 7 === column).lastIndexOf(0)
    pieces[(availableSpace * 7) + column] = playerTurn
    let cell = board.children[(availableSpace * 7) + column]
    if (availableSpace === -1) {
        return
    }

    let piece = document.createElement('div')
    piece.className = 'piece'
    piece.dataset.player = playerTurn
    cell.append(piece)


    checkForWinner()
    if (currentPlayer === 1) {
        currentPlayer = 2
        playerTurn = color2
        document.body.style.backgroundColor = playerTurn
        player2Display.style.backgroundColor = playerTurn
        player1Display.style.backgroundColor = null
        console.log(PLAYER2)
        document.getElementById('player1Color').disabled = true
    }
    else if
        (currentPlayer === 2) {
        currentPlayer = 1
        playerTurn = color1
        document.body.style.backgroundColor = playerTurn
        player1Display.style.backgroundColor = playerTurn
        player2Display.style.backgroundColor = null
        console.log(PLAYER1)
        document.getElementById('player2Color').disabled = true

    }

    checkForWinner()

}


function checkForWinner() {

    //horizontal
    for (let i = 0; i < 42; i++) {
        if (i % 7 < 4 &&
            pieces[i] === playerTurn &&
            pieces[i + 1] === playerTurn &&
            pieces[i + 2] === playerTurn &&
            pieces[i + 3] === playerTurn
        ) {
            winner()
        }

        // vertical

        if (i % 7 >= 0 &&
            pieces[i] === playerTurn &&
            pieces[i + 7] === playerTurn &&
            pieces[i + 14] === playerTurn &&
            pieces[i + 21] === playerTurn
        ) {
            winner()
        }
        //diagonal BL to TR

        if (i % 7 >= 3 && i % 7 < 21) {
            if (pieces[i] === playerTurn &&
                pieces[i + 6] === playerTurn &&
                pieces[i + 12] === playerTurn &&
                pieces[i + 18] === playerTurn
            ) {
                winner()
            }
        }

        // diagonal TL to BR
        if (i % 7 < 4 &&
            i % 7 < 18 &&
            pieces[i] === playerTurn &&
            pieces[i + 8] === playerTurn &&
            pieces[i + 16] === playerTurn &&
            pieces[i + 24] === playerTurn
        ) {
            winner()
        }
    }

    //draw
    if (!pieces.includes(0)) {
        draw()
    }

}


function winner() {
    winModal = document.createElement('div')
    winModal.className = 'winModal'
    winModal.style = "text-transform: uppercase"
    if (currentPlayer === 1) {
        winModal.style.color = 'black'
        winModal.style.backgroundColor = color1
        winModal.innerText = player1Display.innerHTML + " " + "WINS!!"
    } else if (currentPlayer === 2) {
        winModal.style.color = 'black'
        winModal.style.backgroundColor = color2
        winModal.innerText = player2Display.innerHTML + " " + "WINS!!"
    }
    board.append(winModal)
    winModal.onclick = () => {
        onclickWinModal()
    }

}

function onclickWinModal() {
  
    winModal.remove()

    if (playerTurn === PLAYER1) {
        let player2Score = p2Score.innerText
         result = Number(player2Score)
        p2Score.innerText = result + 1

    }

    if (playerTurn === PLAYER2) {
        let player1Score = p1Score.innerText
         result = Number(player1Score)
        p1Score.innerText = result + 1

    }


    resetBoard()
}


function resetBoard() {
    
    pieces = pieces.map((m, i) => {
        m = 0
        let removeableChild = document.getElementById(i).firstChild
        if (removeableChild) {
            document.getElementById(i).removeChild(removeableChild)
        }
        return m
    }
    )
    document.getElementById('player1Color').disabled = false
    document.getElementById('player2Color').disabled = false
    document.body.style.backgroundColor = 'black'

}

function draw() {
    let drawModal = document.createElement('div')
    drawModal.className = 'drawModal'
    drawModal.innerText = 'DRAW!!'
    board.appendChild(drawModal)
    drawModal.onclick = () => {
        onclickDrawModal()
    }
}


function onclickDrawModal() {
    resetBoard()
}


