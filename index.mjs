import { initGame } from "./Datas/data.mjs"
import { initGameRender } from "./Render/render.mjs"
import { GlobalEvent } from "./Events/global.mjs";
import { settimer } from "./Events/global.mjs";

export const globalstate = initGame()
export const globalstate_untouched = initGame()
const timerdiv = document.getElementById("timer");
timerdiv.style.backgroundImage = "linear-gradient(red,rgba(46, 44, 44, 0.133))";
initGameRender(globalstate);
settimer();
GlobalEvent();