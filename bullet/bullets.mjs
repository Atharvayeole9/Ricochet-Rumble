import { globalstate, globalstate_untouched } from "../index.mjs";
import { turn } from "../Events/global.mjs";
import { turn1 } from "../Events/global.mjs";
import { initGame } from "../Datas/data.mjs";
import { initGameRender } from "../Render/render.mjs";
import { GlobalEvent } from "../Events/global.mjs";
import { pieceallocation } from "../Render/render.mjs";
import { piecerender } from "../Render/render.mjs";
import { restoreturn } from "../Events/global.mjs";
import { settimer } from "../Events/global.mjs";
import { pause } from "../Events/global.mjs";
import { restorepause } from "../Events/global.mjs";

export let currentbulletid = null;
let direction = null;
let newbulletdivid = null;

let speed = 6;
let lastPainttime = 0;

export function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPainttime) / 1000 < 1 / speed) {
        return;
    }
    //console.log(ctime);
    lastPainttime = ctime;
    if (pause == false) {
        movebulletred();
    }
}

export function bullet(turn) {
    if (turn == "red") {
        const bullet = document.createElement("div")
        bullet.id = "bullet";
        bullet.classList.add("bullet")
        const redcanonsquare = globalstate.flat().find(element => element.piece.specific == "redcanon");
        //console.log(redcanonsquare.id);
        const bulletstartid = redcanonsquare.id[0] + (Number(redcanonsquare.id[1]) - 1);
        //console.log(bulletstartid);
        const bulletstartsquare = globalstate.flat().find(element => element.id == bulletstartid)
        const bulletstartsquareid_duplicate = bulletstartid;
        if (bulletstartsquare.piece != "null") {
            if (bulletstartsquare.piece.piecename == "tank" || bulletstartsquare.piece.img == "assets/redsemiricochet-left.png" || bulletstartsquare.piece.img == "assets/redsemiricochet-right.png") {
                // do nothing
            }
            else if (bulletstartsquare.piece.piecename == "titan") {
                const kingcolor = bulletstartsquare.piece.color;
                alert("game over " + kingcolor + "lost");
                restartgame();
            }
            else if (bulletstartsquare.piece.img == "assets/bluericochet-left.png" || bulletstartsquare.piece.img == "assets/redricochet-left.png") {
                direction = "left";
                newbulletdivid = String.fromCharCode(((redcanonsquare.id[0]).charCodeAt(0) - 1)) + (Number(redcanonsquare.id[1]) - 1)
                collisonextracasechecking(bulletstartsquareid_duplicate);
            }
            else if (bulletstartsquare.piece.img == "assets/bluericochet-right.png" || bulletstartsquare.piece.img == "assets/redricochet-right.png") {
                direction = "right";
                newbulletdivid = String.fromCharCode(((redcanonsquare.id[0]).charCodeAt(0) + 1)) + (Number(redcanonsquare.id[1]) - 1)
                collisonextracasechecking(bulletstartsquareid_duplicate);
            }
            else if (bulletstartsquare.piece.img == "assets/bluesemiricochet-right.png") {
                direction = "right";
                newbulletdivid = String.fromCharCode(((redcanonsquare.id[0]).charCodeAt(0) + 1)) + (Number(redcanonsquare.id[1]) - 1)
                collisonextracasechecking(bulletstartsquareid_duplicate);
            }
            else if (bulletstartsquare.piece.img == "assets/bluesemiricochet-left.png") {
                direction = "left";
                newbulletdivid = String.fromCharCode(((redcanonsquare.id[0]).charCodeAt(0) - 1)) + (Number(redcanonsquare.id[1]) - 1)
                collisonextracasechecking(bulletstartsquareid_duplicate);
            }
        }
        else {
            const bulletstartdiv = document.getElementById(bulletstartid);
            bullet.style.backgroundColor = "red";
            //console.log(bullet.style.backgroundColor);
            bulletstartdiv.appendChild(bullet)
            //console.log(turn);
            currentbulletid = bulletstartdiv.id;
            direction = "down";
            //if any piece is just below redcanon
            // collison logic
        }
    }
    else {
        const bullet = document.createElement("div")
        bullet.id = "bullet";
        bullet.classList.add("bullet")
        const bluecanonsquare = globalstate.flat().find(element => element.piece.specific == "bluecanon");
        //console.log(bluecanonsquare.id);
        const bulletstartid = bluecanonsquare.id[0] + (Number(bluecanonsquare.id[1]) + 1);
        //console.log(bulletstartid);
        const bulletstartsquare = globalstate.flat().find(element => element.id == bulletstartid)
        if (bulletstartsquare.piece != "null") {
            if (bulletstartsquare.piece.piecename == "tank" || bulletstartsquare.piece.img == "assets/redsemiricochet-left.png" || bulletstartsquare.piece.img == "assets/redsemiricochet-right.png") {
                // do nothing
            }
            else if (bulletstartsquare.piece.piecename == "titan") {
                const kingcolor = bulletstartsquare.piece.color;
                alert("game over " + kingcolor + "lost");
                restartgame();
            }
            else if (bulletstartsquare.piece.img == "assets/bluericochet-left.png" || bulletstartsquare.piece.img == "assets/redricochet-left.png") {
                direction = "left";
                newbulletdivid = String.fromCharCode(((redcanonsquare.id[0]).charCodeAt(0) - 1)) + (Number(redcanonsquare.id[1]) - 1)
                collisonextracasechecking(bulletstartsquareid_duplicate);
            }
            else if (bulletstartsquare.piece.img == "assets/bluericochet-right.png" || bulletstartsquare.piece.img == "assets/redricochet-right.png") {
                direction = "right";
                newbulletdivid = String.fromCharCode(((redcanonsquare.id[0]).charCodeAt(0) + 1)) + (Number(redcanonsquare.id[1]) - 1)
                collisonextracasechecking(bulletstartsquareid_duplicate);
            }
            else if (bulletstartsquare.piece.img == "assets/bluesemiricochet-right.png") {
                direction = "right";
                newbulletdivid = String.fromCharCode(((redcanonsquare.id[0]).charCodeAt(0) + 1)) + (Number(redcanonsquare.id[1]) - 1)
                collisonextracasechecking(bulletstartsquareid_duplicate);
            }
            else if (bulletstartsquare.piece.img == "assets/bluesemiricochet-left.png") {
                direction = "left";
                newbulletdivid = String.fromCharCode(((redcanonsquare.id[0]).charCodeAt(0) - 1)) + (Number(redcanonsquare.id[1]) - 1)
                collisonextracasechecking(bulletstartsquareid_duplicate);
            }
        }
        else {
            const bulletstartdiv = document.getElementById(bulletstartid);
            bullet.style.backgroundColor = "#2ec5f7";
            bulletstartdiv.appendChild(bullet)
            currentbulletid = bulletstartdiv.id;
            direction = "up"
        }
    }
}

function assignnewbulletdivid() {
    if (currentbulletid != null) {
        if (direction == "left" && 96 < (currentbulletid[0].charCodeAt(0) - 1)) {
            newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) - 1)) + (Number(currentbulletid[1]));
        }
        else if (direction == "right" && (currentbulletid[0].charCodeAt(0) + 1) < 105) {
            newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) + 1)) + (Number(currentbulletid[1]));
        }
        else if (direction == "down" && 0 < (Number(currentbulletid[1]) - 1)) {
            newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0))) + (Number(currentbulletid[1]) - 1);
            //console.log(Number(currentbulletid[1] - 1));
        }
        else if (direction == "up" && (Number(currentbulletid[1]) + 1) < 9) {
            newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0))) + (Number(currentbulletid[1]) + 1);
            //console.log(Number(currentbulletid[1]) + 1);
        }
        else {
            newbulletdivid = null;
        }
    }
}

function movebulletred() {
    assignnewbulletdivid();
    if (newbulletdivid == null && currentbulletid != null) {
        const currentbulletdiv = document.getElementById(currentbulletid); //first time the remove child is called successfully but movebulletred is called again and again so, second time currentbulletid has become null, so it gives error 
        const currentbulletappearance = document.getElementById("bullet");
        if (currentbulletdiv != null && currentbulletdiv.firstChild == currentbulletappearance && currentbulletappearance!=null) {
            currentbulletdiv.removeChild(currentbulletappearance);
        }
        currentbulletid = newbulletdivid;
        return;
    }
    // console.log(currentbulletid);
    // console.log(newbulletdivid);
    const newbulletdiv = document.getElementById(newbulletdivid);
    const newbulletsquare = globalstate.flat().find(element => element.id == newbulletdivid);
    //console.log(newbulletdivid);
    //console.log(newbulletsquare.piece);
    const newbulletdivid_duplicate = newbulletdivid;
    //const currentbulletid_duplicate = currentbulletid;
    if (newbulletsquare != null) {
        console.log(newbulletsquare.piece);
        if (newbulletsquare.piece == "null") {
            //console.log("yes");
            bulletrender(turn1);
        }
        else if ((newbulletsquare.piece.img == "assets/bluericochet-left.png" || newbulletsquare.piece.img == "assets/redricochet-left.png")) {
            //console.log("yes")
            if (direction == "down") {
                direction = "left";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) - 1)) + (Number(currentbulletid[1]) - 1)
                collisonextracasechecking(newbulletdivid_duplicate);
            }
            else if (direction == "up") {
                direction = "right";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) + 1)) + (Number(currentbulletid[1]) + 1)
                collisonextracasechecking(newbulletdivid_duplicate);
            }
            else if (direction == "left") {
                direction = "down";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) - 1)) + (Number(currentbulletid[1]) - 1)
                collisonextracasechecking(newbulletdivid_duplicate);
            }
            else if (direction == "right") {
                direction = "up";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) + 1)) + (Number(currentbulletid[1]) + 1)
                collisonextracasechecking(newbulletdivid_duplicate);
            }
            bulletrender(turn1);
        }
        else if (newbulletsquare.piece.img == "assets/bluericochet-right.png" || newbulletsquare.piece.img == "assets/redricochet-right.png") {
            //console.log("redright");
            if (direction == "down") {
                //console.log("down");
                direction = "right";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) + 1)) + (Number(currentbulletid[1]) - 1)
                collisonextracasechecking(newbulletdivid_duplicate);
            }
            else if (direction == "up") {
                //console.log("up");
                direction = "left";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) - 1)) + (Number(currentbulletid[1]) + 1)
                collisonextracasechecking(newbulletdivid_duplicate);
            }
            else if (direction == "left") {
                direction = "up";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) - 1)) + (Number(currentbulletid[1]) + 1)
                collisonextracasechecking(newbulletdivid_duplicate);
            }
            else if (direction == "right") {
                direction = "down";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) + 1)) + (Number(currentbulletid[1]) - 1)
                collisonextracasechecking(newbulletdivid_duplicate);
            }
            // if (entercheckcollisonextracase == true) {
            //     entercheckcollisonextracase = false;
            // }
            // else {
            bulletrender(turn1);
            //}
        }
        else if (newbulletsquare.piece.img == "assets/bluesemiricochet-right.png") {
            //console.log("yes")
            if (direction == "down") {
                direction = "right";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) + 1)) + (Number(currentbulletid[1]) - 1)
                collisonextracasechecking(newbulletdivid_duplicate);
                bulletrender(turn1);
            }
            else if (direction == "left") {
                direction = "up";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) - 1)) + (Number(currentbulletid[1]) + 1)
                collisonextracasechecking(newbulletdivid_duplicate);
                bulletrender(turn1);
            }
            else {
                const currentbulletdiv = document.getElementById(currentbulletid);
                const currentbulletappearance = document.getElementById("bullet");
                if (currentbulletdiv != null && currentbulletdiv.firstChild == currentbulletappearance && currentbulletappearance!=null) {
                    currentbulletdiv.removeChild(currentbulletappearance);
                }
                currentbulletid = null;
                newbulletdivid = null;
            }
        }
        else if (newbulletsquare.piece.img == "assets/bluesemiricochet-left.png") {
            //console.log("yes")
            if (direction == "down") {
                direction = "left";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) - 1)) + (Number(currentbulletid[1]) - 1)
                collisonextracasechecking(newbulletdivid_duplicate);
                bulletrender(turn1);
            }
            else if (direction == "right") {
                direction = "up";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) + 1)) + (Number(currentbulletid[1]) + 1)
                collisonextracasechecking(newbulletdivid_duplicate);
                bulletrender(turn1);
            }
            else {
                const currentbulletdiv = document.getElementById(currentbulletid);
                const currentbulletappearance = document.getElementById("bullet");
                if (currentbulletdiv != null && currentbulletdiv.firstChild == currentbulletappearance && currentbulletappearance!=null) {
                    currentbulletdiv.removeChild(currentbulletappearance);
                }
                currentbulletid = null;
                newbulletdivid = null;
            }
        }
        else if ((newbulletsquare.piece.img == "assets/redsemiricochet-left.png")) {
            //console.log("redricoleft")
            if (direction == "up") {
                direction = "right";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) + 1)) + (Number(currentbulletid[1]) + 1)
                collisonextracasechecking(newbulletdivid_duplicate);
                bulletrender(turn1);
            }
            else if (direction == "left") {
                console.log("2");
                direction = "down";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) - 1)) + (Number(currentbulletid[1]) - 1)
                collisonextracasechecking(newbulletdivid_duplicate);
                bulletrender(turn1);
            }
            else {
                const currentbulletdiv = document.getElementById(currentbulletid);
                const currentbulletappearance = document.getElementById("bullet");
                if (currentbulletdiv != null && currentbulletdiv.firstChild == currentbulletappearance && currentbulletappearance != null) {
                    currentbulletdiv.removeChild(currentbulletappearance);
                }
                currentbulletid = null;
                newbulletdivid = null;
            }
        }
        else if (newbulletsquare.piece.img == "assets/redsemiricochet-right.png") {
            console.log("yes")
            if (direction == "up") {
                direction = "left";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) - 1)) + (Number(currentbulletid[1]) + 1)
                collisonextracasechecking(newbulletdivid_duplicate);
                bulletrender(turn1);
            }
            else if (direction == "right") {
                direction = "down";
                newbulletdivid = String.fromCharCode(((currentbulletid[0]).charCodeAt(0) + 1)) + (Number(currentbulletid[1]) - 1)
                collisonextracasechecking(newbulletdivid_duplicate);
                bulletrender(turn1);
            }
            else {
                const currentbulletdiv = document.getElementById(currentbulletid);
                const currentbulletappearance = document.getElementById("bullet");
                if (currentbulletdiv != null && currentbulletdiv.firstChild == currentbulletappearance && currentbulletappearance!=null) {
                    currentbulletdiv.removeChild(currentbulletappearance);
                }
                currentbulletid = null;
                newbulletdivid = null;
            }
        }
        else if (newbulletsquare.piece.piecename == "canon" || newbulletsquare.piece.piecename == "tank" || newbulletsquare.piece.piecename == "titan") {
            //console.log(newbulletdivid);
            collision();
        }
        else {
            return;
        }
    }

    //bulletrender();
}

function bulletrender(turn) {
    const newbulletdiv = document.getElementById(newbulletdivid);
    //console.log(currentbulletid);
    const currentbulletdiv = document.getElementById(currentbulletid);
    const currentbulletappearance = document.getElementById("bullet");
    if (currentbulletdiv != null && currentbulletdiv.firstChild == currentbulletappearance && currentbulletappearance!=null) {
        currentbulletdiv.removeChild(currentbulletappearance);
    }
    const bullet = document.createElement("div")
    bullet.id = "bullet";
    bullet.classList.add("bullet");
    if (turn == "red") {
        // console.log(turn);
        bullet.style.backgroundColor = "red";  
    }
    else {
        //console.log(turn);
        bullet.style.backgroundColor = "#2ec5f7";  
    }
    if (newbulletdiv.innerHTML == "") {
        newbulletdiv.appendChild(bullet);
    }
    currentbulletid = newbulletdivid;
}

function collision() {
    const newbulletsquarediv = document.getElementById(newbulletdivid);
    let newbulletsquare = null;
    //newbulletsquare= globalstate.flat().find(element => element.id == newbulletdivid)
    globalstate.forEach(row => {
        row.forEach(square => {
            if (square.id == newbulletdivid) {
                newbulletsquare = square;
            }
        });
    });
    // console.log(newbulletsquare);
    // console.log(newbulletsquare.piece.piecename);
    if (newbulletsquare.piece.piecename == "tank" || newbulletsquare.piece.piecename == "canon") {
        //console.log("yes");
        const currentbulletdiv = document.getElementById(currentbulletid);
        //console.log(currentbulletdiv);
        //currentbulletdiv.innerHTML = "";
        const currentbulletappearance = document.getElementById("bullet");
        //console.log(currentbulletappearance);
        if (currentbulletdiv!=null && currentbulletdiv.firstChild == currentbulletappearance && currentbulletappearance != null ) {
            currentbulletdiv.removeChild(currentbulletappearance);
        }
        currentbulletid = null;
        newbulletdivid = null;
    }
    else {
        const kingcolor = newbulletsquare.piece.color;
        //console.log(kingcolor + " lost");
        const currentbulletdiv = document.getElementById(currentbulletid);
        const currentbulletappearance = document.getElementById("bullet");
        if (currentbulletdiv!=null && currentbulletdiv.firstChild == currentbulletappearance && currentbulletappearance != null) {
            currentbulletdiv.removeChild(currentbulletappearance);
        }
        currentbulletid = null;
        newbulletdivid = null;
        alert("game over : " + kingcolor + " lost");
        restartgame();

        // initGameRender(globalstate);
        // GlobalEvent();
        //confirm("game over: " + kingcolor + " lost");
        //console.log("yes");

        //options for restarting the game or exit
    }
}

function restoreglobalstate() {
    globalstate_untouched.forEach(row => {
        row.forEach(square => {
            pieceallocation(square);
        });
    });
    for (let i = 8; i >= 1; i--) {
        for (let j = 97; j <= 104; j++) {
            const globalsquare = globalstate.flat().find(element => element.id == String.fromCharCode(j) + i)
            const global_untouchsquare = globalstate_untouched.flat().find(element => element.id == String.fromCharCode(j) + i)
            globalsquare.piece = global_untouchsquare.piece;
            globalsquare.highlighted = global_untouchsquare.highlighted;
        }
    }
}

export function restartgame() {
    globalstate.forEach(row => {
        row.forEach(square => {
            const squarediv = document.getElementById(square.id);
            squarediv.innerHTML = "";
        });
    });
    restoreglobalstate();
    piecerender(globalstate);
    restoreturn(turn);
    currentbulletid = null;
    newbulletdivid = null;
    direction = null;
    lastPainttime = null;
    restorepause();
    const turnspan = document.getElementById("turn");
    turnspan.innerHTML = "RED";
    turnspan.style.color = "red";
    settimer();
}

function collisonextracasechecking(newbulletdivid_duplicate) {
    if (newbulletdividexists() == true) {
        const newbulletsquarediv = document.getElementById(newbulletdivid);
        const newbulletsquare = globalstate.flat().find(element => element.id == newbulletdivid);
        if (newbulletsquare.piece != "null") {
            //entercheckcollisonextracase = true;
            const currentbulletdiv = document.getElementById(currentbulletid);
            const currentbulletappearance = document.getElementById("bullet");
            if (currentbulletdiv != null && currentbulletdiv.firstChild == currentbulletappearance && currentbulletappearance!=null) {
                currentbulletdiv.removeChild(currentbulletappearance);
            }
            collisonextracase(newbulletdivid_duplicate);
        }
    }
}

function newbulletdividexists() {
    if (96 < (((newbulletdivid[0]).charCodeAt(0))) && (((newbulletdivid[0]).charCodeAt(0))) < 105 && 0 < (Number(newbulletdivid[1])) && Number(newbulletdivid[1]) < 9) {
        return true;
    }
    else {
        newbulletdivid = null;
        return false;
    }
}

function collisonextracase(newbulletdivid_duplicate) {
    //currentbulletid_duplicate = currentbulletid;
    currentbulletid = newbulletdivid_duplicate;
    movebulletred();
}

