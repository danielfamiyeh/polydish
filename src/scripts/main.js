import Dimension from "./classes/helper/Dimension.js";
import PolyDish from "./classes/PolyDish.js";
import Colour from "./classes/Colour.js";

let canvas = document.getElementById("canvas"),
    saveBtn = document.getElementById("saveBtn");

let dish = new PolyDish(canvas, new Dimension(900,window.innerHeight), "#000000"),
    count = 0;
saveBtn.addEventListener("click", function(e){dish.saveImage()});



function main()
{
    if(count % 600 == 0)
    {
        let newColour = Colour.Random();
        dish = new PolyDish(canvas, new Dimension(window.innerWidth,window.innerHeight),"#000000");
        dish.circInitVals[1] = newColour.rgbAsList();
        dish.squareInitVals[1] = newColour.rgbAsList();
        dish.spinSquareInitVals[1] = newColour.compliment.rgbAsList();
        dish.initSpecies(10,10,10,300,300,550);
    }
    dish.run();
    window.requestAnimationFrame(main);
    count++;
}

main();