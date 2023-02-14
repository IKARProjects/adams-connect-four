const container = document.getElementById("container");
const board = document.getElementById("board");
let p1Score = document.getElementById('p1Score')
let p2Score = document.getElementById('p2Score')
let player1Display = document.getElementById('player1Display')
let player2Display = document.getElementById('player2Display')
let pieces = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let player1Name = document.getElementById('player1Name')
let player2Name = document.getElementById('player2Name')
let submit1 = document.getElementById('submit1')
let submit2 = document.getElementById('submit2')
let player1Color = document.getElementById('player1Color')
let player2Color = document.getElementById('player2Color')



addEventListener("onclick", onclickSubmit1())
addEventListener("onclick", onclickSubmit2())



function onclickSubmit1() {
    PLAYER1 = 'RED'
    Name1 = player1Name.value
    player1Display.innerHTML = Name1
    console.log(Name1)

    if (Name1) {
        submit1.style.display = 'none'
    }

}
function onclickSubmit2() {
    PLAYER2 = 'YELLOW'
    Name2 = player2Name.value
    player2Display.innerHTML = Name2
    console.log(Name2)

    if (Name2) {
        submit2.style.display = 'none'
    }

}


playerTurn = PLAYER1




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



function onclickWinModal() {
    //  winModal = document.getElementsByClassName('winModal')
    // winModal.className = 'winModal'

    pieces = pieces.map((m, i) => {
        m = 0
        let removeableChild = document.getElementById(i).firstChild
        if (removeableChild) {
            document.getElementById(i).removeChild(removeableChild)
        }
        return m

    }
    )
    winModal.remove()


    if (playerTurn === PLAYER1) {
        let player2Score = p2Score.innerText
        let result = Number(player2Score)
        p2Score.innerText = result + 1
        result++
        console.log(result)



    }

    if (playerTurn === PLAYER2) {
        let player1Score = p1Score.innerText
        let result = Number(player1Score)
        p1Score.innerText = result + 1
        result++
        console.log(result)


    }

    playerTurn = PLAYER1


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


