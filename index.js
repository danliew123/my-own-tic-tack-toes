let arr = ['','','',
           '','','',
           '','','']


const gameboard = document.querySelector('#gameboard')
const box = document.querySelectorAll('.box')
const message = document.querySelector('.message')
const startbtn = document.querySelector('#start')
const restartbtn = document.querySelector('#restart')

const checkWin = (board) => {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (let i = 0; i < winningCombinations.length; i++) {
        let [a,b,c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            console.log('hi')
            return true
        }   
    }
}

const checkTie = (arr) => {
    return arr.every(square => square !== '')
}


const createPlayer = (name, mark) => {
    return {name, mark}
}

const Game = (() => {
    let players;
    let gameOver;
    let currentPlayer;
    const update = (arr) => {
        for (let i = 0; i < box.length; i++) {
            if (box[i] !== '') {
                arr[i] = box[i].textContent;
            }
        }
    }
    const start = () => {
        players = [
            createPlayer(document.querySelector('#player1').value,'X'),
            createPlayer(document.querySelector('#player2').value, 'O')
        ]
        gameOver = false;
        currentPlayer = 0;
        box.forEach(square => {
            square.addEventListener('click', () => {
                if (gameOver === true) {
                    return
                }
                if (square.innerHTML !== '') {
                    return
                } else if (currentPlayer === 0) {
                    square.innerHTML = `X`;
                    update(arr)
                    if (checkWin(arr) === true) {
                        gameOver = true;
                        message.innerHTML = `${players[currentPlayer].name} won!`
                        return
                    } else if (checkTie(arr) === true) {
                        gameOver = true;
                        message.innerHTML = "It's a tie!"
                        return
                    }
                    message.innerHTML = `${players[1].name}'s turn`
                    currentPlayer = 1;
                } else if (currentPlayer === 1) {
                    square.innerHTML = 'O'
                    update(arr)
                    if (checkWin(arr) === true) {
                        gameOver = true
                        message.innerHTML = `${players[currentPlayer].name} won!`
                        return
                    } else if (checkTie(arr) === true) {
                        gameOver = true;
                        message.innerHTML = "It's a tie!"
                        return
                    }
                    message.innerHTML = `${players[0].name}'s turn`
                    currentPlayer = 0;
                }

                
                
            })
        });

    }

    startbtn.addEventListener('click', () => {
        if (gameOver === false) {
            return
        }
        if (gameOver === true) {
            box.forEach(square => {
                square.textContent = ''
            });
            arr = ['','','',
                   '','','',
                   '','',''];
            message.textContent = '';
        }
        start()
        alert('start')
    })

    restartbtn.addEventListener('click', () => {
        gameOver = false
        box.forEach(square => {
            square.textContent = ''
        });
        arr = ['','','',
               '','','',
               '','',''];
        message.textContent = '';
    })

    return {
        start,
    }
})()




