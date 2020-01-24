import Dimension from "./classes/helper/Dimension.js";
import PolyDish from "./classes/PolyDish.js";

let canvas = document.getElementById("canvas");
//    saveBtn = document.getElementById("saveBtn");

let dish = new PolyDish(canvas, new Dimension(window.innerWidth,window.innerHeight), "#000000"),
    count = 0;
let compCols = [[[255,255,0],[0,255,255]]];

//saveBtn.addEventListener("click", function(e){dish.saveImage()});


function main()
{
    if(count % 700 == 0)
    {
        dish = new PolyDish(canvas, new Dimension(window.innerWidth,window.innerHeight),"#000000");
        dish.circInitVals[1] = [255,48,11];
        dish.squareInitVals[1] = [11,255,153];
        dish.spinSquareInitVals[1] = [255,48,11];
        dish.initSpecies(30,30,30,300,300,1500);
    }
    dish.run(3);
    window.requestAnimationFrame(main);
    count++;
}

main();