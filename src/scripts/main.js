import Dimension from "./classes/helper/Dimension.js";
import PolyDish from "./classes/PolyDish.js";

let canvas = document.getElementById("canvas"),
    saveBtn = document.getElementById("saveBtn");

let dish = new PolyDish(canvas, new Dimension(900,window.innerHeight), "#000000"),
    count = 0;
let compCols = [[[255,255,0],[0,255,255]],
                [[255,255,0],[191,0,22]],
            [[104,255,207],[255,104,102]],
        [[255,0,85],[0,255,170]]];

                

saveBtn.addEventListener("click", function(e){dish.saveImage()});


function main()
{
    if(count % 700 == 0)
    {
        dish = new PolyDish(canvas, new Dimension(900,window.innerHeight),"#000000");
        dish.circInitVals[1] = compCols[3][0];
        dish.squareInitVals[1] = compCols[3][0];
        dish.spinSquareInitVals[1] = compCols[3][1];
        dish.initSpecies(20,20,20,300,300,900);
    }
    dish.run(3);
    window.requestAnimationFrame(main);
    count++;
}

main();