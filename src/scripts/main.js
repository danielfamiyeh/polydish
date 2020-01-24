import Dimension from "./classes/helper/Dimension.js";
import PolyDish from "./classes/PolyDish.js";

let canvas = document.getElementById("canvas"),
    saveBtn = document.getElementById("saveBtn");

let dish = new PolyDish(canvas, new Dimension(window.innerWidth,window.innerHeight));
dish.circInitVals[1] = [255,255,255];
dish.squareInitVals[1] = [255,255,255];
dish.spinSquareInitVals[1] = [255,255,255];
dish.initSpecies(30,30,30,100,50,500);

saveBtn.addEventListener("click", function(e){dish.saveImage()});


function main()
{
    dish.run(2);
    window.requestAnimationFrame(main);
}

main();