import { Blue_Canon } from "../Datas/pieces.mjs";
import { Red_Canon } from "../Datas/pieces.mjs";
import { Red_ricochet } from "../Datas/pieces.mjs";
import { Red_semi_ricochet } from "../Datas/pieces.mjs";
import { Red_tank } from "../Datas/pieces.mjs";
import { Red_titan } from "../Datas/pieces.mjs";
import { Blue_ricochet } from "../Datas/pieces.mjs";
import { Blue_semi_ricochet } from "../Datas/pieces.mjs";
import { Blue_tank } from "../Datas/pieces.mjs";
import { Blue_titan } from "../Datas/pieces.mjs";
import { globalstate } from "../index.mjs";
import { currentbulletid } from "../bullet/bullets.mjs";
const root_div = document.getElementById("board")

// initiation
// will be called once durng start
export function initGameRender(data) {
    data.forEach(element => {
        const rowDiv = document.createElement("div")
        rowDiv.classList.add("rowDiv")
        element.forEach(square => {
            const squareDiv = document.createElement("div")
            squareDiv.classList.add("square", square.color)
            squareDiv.id = square.id
            pieceallocation(square)
            rowDiv.appendChild(squareDiv)
        });
        root_div.appendChild(rowDiv)
    });
    piecerender(data)
    //console.log(globalstate);
}

// used for rendering pieces on board 
export function piecerender(data) {
    data.forEach(row => {
        row.forEach(square => {
            if (square.piece != "null") {
                const square_element = document.getElementById(square.id)
                const piece_image = document.createElement("img");
                piece_image.src = square.piece.img
                piece_image.classList.add("piece")
                square_element.appendChild(piece_image)
            }
        });
    });
}

export function pieceallocation(square) {
    //console.log("yes");
    if (square.id[1] == 1 && square.id[0] == 'g') {
        square.piece = Blue_Canon(square.id);
    }
    else if (square.id[1] == 8 && square.id[0] == 'b') {
        square.piece = Red_Canon(square.id);
    }
    else if (square.id[1] == 8 && square.id[0] == 'g') {
        square.piece = Red_ricochet(square.id);
    }
    else if (square.id[1] == 8 && square.id[0] == 'f') {
        square.piece = Red_semi_ricochet(square.id);
    }
    else if (square.id[1] == 7 && square.id[0] == 'e') {
        square.piece = Red_tank(square.id);
    }
    else if (square.id[1] == 1 && square.id[0] == 'b') {
        square.piece = Blue_ricochet(square.id);
    }
    else if (square.id[1] == 1 && square.id[0] == 'c') {
        square.piece = Blue_semi_ricochet(square.id);
    }
    else if (square.id[1] == 2 && square.id[0] == 'd') {
        square.piece = Blue_tank(square.id);
    }
    else if (square.id[1] == 8 && square.id[0] == 'd') {
        square.piece = Red_titan(square.id);
    }
    else if (square.id[1] == 1 && square.id[0] == 'e') {
        square.piece = Blue_titan(square.id);
    }
}

//highlighting the pieces
export function renderhighlight(highlightid) {
    //console.log(highlightid);
    highlightid.forEach(element => {
        const highlightdiv = document.createElement("div")
        highlightdiv.classList.add("highlight")
        const parentsquarediv = document.getElementById(element);
        const parentsquare = globalstate.flat().find(square => square.id == parentsquarediv.id)
        //console.log(parentsquare);
        //console.log(parentsquare.id);
        if (parentsquare.piece == "null") {
            // console.log(parentsquare.id);
            parentsquarediv.appendChild(highlightdiv);
            parentsquare.highlighted = true;
            // console.log(parentsquare);
        }
        //console.log(globalstate);
    });
    //renderhighlight(extrahighlight);
}

