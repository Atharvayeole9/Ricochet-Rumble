import { initGame } from "../Datas/data.mjs";
import { ROOT_DIV } from "../Helper/costants.mjs";
import { globalstate } from "../index.mjs";
import { renderhighlight } from "../Render/render.mjs";
import { main } from "../bullet/bullets.mjs";
import { bullet } from "../bullet/bullets.mjs";
import { currentbulletid } from "../bullet/bullets.mjs";
import { restartgame } from "../bullet/bullets.mjs";



export let turn = "red";
export let turn1 = turn;
export let movingpiece = null;
let count = 30;
let lastPainttime_countdown = 0;
export let pause = false;

function GlobalEvent() {
    ROOT_DIV.addEventListener("click", function (event) {
        //console.log(globalstate);
        if (event.target.localName === "img" && numberofhighlights() == 0 && currentbulletid == null && pause == false) {
            let targetpiececolor = null;
            globalstate.forEach(row => {
                row.forEach(square => {
                    if (square.id == event.target.parentNode.id) {
                        //console.log(square.piece);
                        targetpiececolor = square.piece.color
                    }
                });
            });
            //console.log(targetpiececolor);
            if (targetpiececolor == turn) {
                clearhighlight();
                const parentsquarediv = event.target.parentNode;
                const parentsquareid = parentsquarediv.id;
                const parentsquare = globalstate.flat().find(square => square.id == parentsquareid);
                const parentpiece = parentsquare.piece;
                movingpiece = parentpiece;
                const name = parentpiece.piecename;
                renderhighlight(clickhighlight(parentsquare));
                //console.log(movingpiece);
            }
        }
        else if (currentbulletid == null && movingpiece != null && event.target.classList[0] == "highlight" && event.target.parentNode.id != movingpiece.current_position && pause == false) {
            turn1 = turn;
            // console.log(turn);
            const targetid = event.target.parentNode.id;
            clearhighlight();
            move(movingpiece, targetid)
            bullet(turn1);
            window.requestAnimationFrame(main);
            if (turn == "red") {
                //console.log("yesred");
                turn = "blue";
                //console.log(turn);
                const turnspan = document.getElementById("turn");
                turnspan.innerHTML = turn.toUpperCase();
                turnspan.style.color = "#2ec5f7";
                const timerdiv = document.getElementById("timer");
                timerdiv.style.backgroundImage = "linear-gradient(blue,rgba(46, 44, 44, 0.133))";
            }
            else {
                //console.log("yesblue");
                turn = "red";
                const turnspan = document.getElementById("turn");
                turnspan.innerHTML = turn.toUpperCase();
                turnspan.style.color = "red";
                const timerdiv = document.getElementById("timer");
                timerdiv.style.backgroundImage = "linear-gradient(red,rgba(46, 44, 44, 0.133))";
            }
            settimer();
        }
        else if (currentbulletid == null && movingpiece != null && event.target.localName === "img" && event.target.parentNode.id == movingpiece.current_position && (movingpiece.piecename == "ricochet" || movingpiece.piecename == "semiricochet") && numberofhighlights() != 0 && pause == false) { // review currentbulletid
            turn1 = turn;
            clearhighlight();
            flip(movingpiece);
            bullet(turn1);
            window.requestAnimationFrame(main);
            if (turn == "red") {
                //console.log("yesred");
                turn = "blue";
                const turnspan = document.getElementById("turn");
                turnspan.innerHTML = turn.toUpperCase();
                turnspan.style.color = "#2ec5f7";
                const timerdiv = document.getElementById("timer");
                timerdiv.style.backgroundImage = "linear-gradient(blue,rgba(46, 44, 44, 0.133))";
                //console.log(turn);
            }
            else {
                //console.log("yesblue");
                turn = "red";
                const turnspan = document.getElementById("turn");
                turnspan.innerHTML = turn.toUpperCase();
                turnspan.style.color = "red";
                const timerdiv = document.getElementById("timer");
                timerdiv.style.backgroundImage = "linear-gradient(red,rgba(46, 44, 44, 0.133))";
            }
            const turnspan = document.getElementById("turn");
            turnspan.innerHTML = turn.toUpperCase();
            settimer();
        }
        else if (event.target.localName === "button" && event.target.id == "restart") {
            restartgame();
        }
        else if (event.target.localName === "button" && event.target.id == "pause-play" && event.target.innerHTML == "pause") {
            pause = true;
            event.target.innerHTML = "play";
        }
        else if (event.target.localName === "button" && event.target.id == "pause-play" && event.target.innerHTML == "play") {
            pause = false;
            event.target.innerHTML = "pause";
        }
    })
}

export function clickhighlight(parentsquare) {
    if (parentsquare.piece.piecename == "titan" || parentsquare.piece.piecename == "tank" || parentsquare.piece.piecename == "ricochet" || parentsquare.piece.piecename == "semiricochet") {
        const currentid = parentsquare.piece.current_position;
        const highlight = [];
        for (let i = 0; i <= 1; i++) {
            for (let j = 0; j <= 1; j++) {
                if (96 < (currentid[0].charCodeAt(0) + Math.pow(-1, i)) && (currentid[0].charCodeAt(0) + Math.pow(-1, i)) < 105 && 0 < (Number(currentid[1]) + Math.pow(-1, j)) && (Number(currentid[1]) + Math.pow(-1, j)) < 9)
                    highlight.push(String.fromCharCode(((currentid[0]).charCodeAt(0) + Math.pow(-1, i))) + (Number(currentid[1]) + Math.pow(-1, j)))
            }
        }
        if ((currentid[0].charCodeAt(0) + 1) < 105) {
            highlight.push(String.fromCharCode(((currentid[0]).charCodeAt(0) + 1)) + (Number(currentid[1])))
        }
        if (96 < (currentid[0].charCodeAt(0) - 1)) {
            highlight.push(String.fromCharCode(((currentid[0]).charCodeAt(0) - 1)) + (Number(currentid[1])))
        }
        if ((Number(currentid[1]) + 1) < 9) {
            highlight.push(String.fromCharCode(((currentid[0]).charCodeAt(0))) + (Number(currentid[1]) + 1))
        }
        if (0 < (Number(currentid[1]) - 1)) {
            highlight.push(String.fromCharCode(((currentid[0]).charCodeAt(0))) + (Number(currentid[1]) - 1))
        }
        return highlight;
    }
    else if (parentsquare.piece.piecename == "canon") {
        const currentid = parentsquare.piece.current_position;
        const highlight = [];
        if ((currentid[0].charCodeAt(0) + 1) < 105) {
            highlight.push(String.fromCharCode(((currentid[0]).charCodeAt(0) + 1)) + (Number(currentid[1])))
        }
        if (96 < (currentid[0].charCodeAt(0) - 1)) {
            highlight.push(String.fromCharCode(((currentid[0]).charCodeAt(0) - 1)) + (Number(currentid[1])))
        }
        return highlight;
    }
}

function move(piece, id) {
    //moving the piece
    //console.log(globalstate);
    const currentdivid = piece.current_position;
    const currentdiv = document.getElementById(currentdivid);
    const targetdiv = document.getElementById(id);
    targetdiv.innerHTML = currentdiv.innerHTML;
    currentdiv.innerHTML = "";

    //updating the data
    globalstate.forEach(row => {
        row.forEach(square => {
            if (square.id == currentdivid) {
                const parentsquare = square;
                parentsquare.piece = "null";
            }
            if (square.id == id) {
                const newparentsquare = square;
                newparentsquare.piece = piece;
                piece.current_position = id;
            }
        });
    });
    movingpiece = null;
}

// flipping of semiricochet and ricochet
function flip(piece) {
    //console.log(piece.current_position);
    const targetdiv = document.getElementById(piece.current_position);
    targetdiv.innerHTML = "";
    const image = document.createElement("img");
    image.classList.add("piece");
    if (piece.img == "assets/redsemiricochet-left.png") {
        image.src = "assets/redsemiricochet-right.png";
        piece.img = "assets/redsemiricochet-right.png"
    }
    else if (piece.img == "assets/redsemiricochet-right.png") {
        image.src = "assets/redsemiricochet-left.png";
        piece.img = "assets/redsemiricochet-left.png"
    }
    else if (piece.img == "assets/bluesemiricochet-left.png") {
        image.src = "assets/bluesemiricochet-right.png";
        piece.img = "assets/bluesemiricochet-right.png"
    }
    else if (piece.img == "assets/bluesemiricochet-right.png") {
        image.src = "assets/bluesemiricochet-left.png";
        piece.img = "assets/bluesemiricochet-left.png"
    }
    else if (piece.img == "assets/redricochet-left.png") {
        image.src = "assets/redricochet-right.png";
        piece.img = "assets/redricochet-right.png"
    }
    else if (piece.img == "assets/redricochet-right.png") {
        image.src = "assets/redricochet-left.png";
        piece.img = "assets/redricochet-left.png"
    }
    else if (piece.img == "assets/bluericochet-left.png") {
        image.src = "assets/bluericochet-right.png";
        piece.img = "assets/bluericochet-right.png"
    }
    else if (piece.img == "assets/bluericochet-right.png") {
        image.src = "assets/bluericochet-left.png";
        piece.img = "assets/bluericochet-left.png"
    }
    targetdiv.appendChild(image);
    //console.log(targetdiv);
}

function clearhighlight() {
    //console.log(globalstate);
    globalstate.forEach(row => {
        row.forEach(square => {
            if (square.highlighted == true) {
                document.getElementById(square.id).innerHTML = "";
                square.highlighted = false;
            }
        });
    });
    //console.log(globalstate);
}

function numberofhighlights() {
    let sum = 0;
    globalstate.forEach(row => {
        row.forEach(square => {
            if (square.highlighted == true) {
                sum += 1;
            }
        });
    });
    return sum;
}

export function restoreturn() {
    turn = "red";
}

export function settimer() {
    count = 30;
    lastPainttime_countdown = 0;
    window.requestAnimationFrame(countdown);
}

function countdown(ctime) {
    window.requestAnimationFrame(countdown);
    if (ctime - lastPainttime_countdown < 1000) {
        return;
    }
    //console.log(ctime);
    lastPainttime_countdown = ctime;
    if (currentbulletid == null && pause == false) {
        if (count > 0) {
            count--;
        }
        else {
            alert("Game over: timer count exceed \n" + turn + " lost");
            restartgame();
        }
        //console.log(count);
        const tensplaceof_seconds_span = document.getElementById("tens");
        const unitsplaceof_seconds_span = document.getElementById("units");
        tensplaceof_seconds_span.innerHTML = (count - (count % 10)) / 10;
        unitsplaceof_seconds_span.innerHTML = count % 10;
    }
}

export function restorepause() {
    pause = false;
}

export { GlobalEvent };