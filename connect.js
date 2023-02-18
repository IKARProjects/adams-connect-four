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
 color1=player1Color.value
let player2Color = document.getElementById('player2Color')
 color2=player2Color.value
const submit2 = document.getElementById('submit2')
// const submitColor1 = document.getElementById('submitColor1')
// const submitColor2 = document.getElementById('submitColor2')
const reset = document.getElementById('reset')

PLAYER1 = color1
PLAYER2 = color2
playerTurn = PLAYER1

function changeColor1(selectedObject){

    playerTurn=selectedObject.value
    console.log(selectedObject.value)


}

function changeColor2(selectedobject){
    playerTurn=selectedObject.value
    console.log(selectedObject.value)
}

//addEventListener("onclick", onclickSubmit1())
function onclickSubmit1() {

    Name1 = player1Name.value
    player1Display.innerHTML = Name1

    if (Name1) {
        submit1.style.display = 'none'
    }
    console.log(Name1)
}

// addEventListener("onclick", onclickSubmit2())
function onclickSubmit2() {

    Name2 = player2Name.value
    player2Display.innerHTML = Name2

    if (Name2) {
        submit2.style.display = 'none'
    }
    console.log(Name2)
}


// addEventListener("onclick", onclickSubmitColor1())
// function onclickSubmitColor1() {

//     let color1 = player1Color.value
//     if (color1) {
//         submitColor1.style.display = 'none'
//     }
//     console.log(color1)

// }

// addEventListener("onclick", onclickSubmitColor2())
// function onclickSubmitColor2() {
//     let color2 = player1Color.value
//     if (color2) {
//         submitColor2.style.display = 'none'
//     }
//     console.log(color2)

// }

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
    console.log(pieces)


    checkForWinner()
    if (playerTurn === PLAYER1) {
        playerTurn = PLAYER2
        document.body.style.backgroundColor = playerTurn
        player2Display.style.backgroundColor = playerTurn
        player1Display.style.backgroundColor = null
        console.log(PLAYER2)
    }
    else if
        (playerTurn === PLAYER2) {
        playerTurn = PLAYER1
        document.body.style.backgroundColor = playerTurn
        player1Display.style.backgroundColor = playerTurn
        player2Display.style.backgroundColor = null
        console.log(PLAYER1)

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
    if (playerTurn === PLAYER1) {
        winModal.style.color = 'black'
        winModal.style.backgroundColor = PLAYER1
        winModal.innerText = player1Display.innerHTML + " " + "WINS!!"
    } else if (playerTurn === PLAYER2) {
        winModal.style.color = 'black'
        winModal.style.backgroundColor = PLAYER2
        winModal.innerText = player2Display.innerHTML + " " + "WINS!!"
    }
    board.append(winModal)
    winModal.onclick = () => {
        onclickWinModal()
    }

}

addEventListener("onclick", onclickReset())
function onclickWinModal() {
    onclickReset()
    winModal.remove()

    if (playerTurn === PLAYER1) {
        let player2Score = p2Score.innerText
        let result = Number(player2Score)
        p2Score.innerText = result + 1
        result++

    }

    if (playerTurn === PLAYER2) {
        let player1Score = p1Score.innerText
        let result = Number(player1Score)
        p1Score.innerText = result + 1
        result++

    }

    if (result === Number(player1Score)) {
        playerTurn = PLAYER1
    }

    else if (result === Number(player2Score)) {
        playerTurn = PLAYER2
    }
}


addEventListener("onclick", onclickReset())
function onclickReset() {
    pieces = pieces.map((m, i) => {
        m = 0
        let removeableChild = document.getElementById(i).firstChild
        if (removeableChild) {
            document.getElementById(i).removeChild(removeableChild)
        }
        return m
    }
    )

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
    location.reload()
}


