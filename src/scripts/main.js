import Dimension from "./classes/helper/Dimension.js";
import PolyDish from "./classes/PolyDish.js";

let canvas = document.getElementById("canvas"),
    saveBtn = document.getElementById("saveBtn");

let dish = new PolyDish(canvas, new Dimension(900,window.innerHeight), "#ffffff"),
    count = 0;
let compCols = [[[255,255,0],[0,255,255]]];

saveBtn.addEventListener("click", function(e){dish.saveImage()});


function main()
{
    if(count % 700 == 0)
    {
        dish = new PolyDish(canvas, new Dimension(900,window.innerHeight),"#ffffff");
        dish.circInitVals[1] = [255,48,11];
        dish.squareInitVals[1] = [11,255,153];
        dish.spinSquareInitVals[1] = [255,48,11];
        dish.initSpecies(20,20,20,300,300,700);
    }
    dish.run(5);
    window.requestAnimationFrame(main);
    count++;
}

main();