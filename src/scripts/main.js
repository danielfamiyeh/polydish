import Dimension from "./classes/helper/Dimension.js";
import PolyDish from "./classes/PolyDish.js";
import RGB from "./classes/Colour/RGB.js";

let canvas = document.getElementById("canvas");

let dish = new PolyDish(canvas, new Dimension(900,window.innerHeight), "#000000"),
    count = 0;
//saveBtn.addEventListener("click", function(e){dish.saveImage()});

let red = new RGB(0,128,0);
console.log(red);
console.log(red.triadic());

function main()
{
    if(count % 600 == 0)
    {
        let newColour = RGB.Random();
        dish = new PolyDish(canvas, new Dimension(window.innerWidth,window.innerHeight),"#000000");
        dish.circInitVals[1] = newColour.rgbAsList();
        dish.squareInitVals[1] = newColour.rgbAsList();
        dish.spinSquareInitVals[1] = newColour.compliment.rgbAsList();
        dish.initSpecies(9,9,9,300,300,550);
    }
    dish.run();
    window.requestAnimationFrame(main);
    count++;
}

main();