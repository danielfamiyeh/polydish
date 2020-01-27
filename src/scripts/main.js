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
    if(count % 450 == 0)
    {
        let newColour = Colour.Random();
        dish = new PolyDish(canvas, new Dimension(window.innerWidth,window.innerHeight),"#000000");
        dish.circInitVals[1] = newColour.rgbAsList();
        dish.squareInitVals[1] =  Math.floor(Math.random() * 2 < 1) ? [255,255,255] : newColour.rgbAsList();
        dish.spinSquareInitVals[1] = (Math.random() * 10 < 5) ? newColour.compliment.rgbAsList() : [255,255,255];
        dish.initSpecies(10,10,10,300,300,400);
    }
    dish.run(1);
    window.requestAnimationFrame(main);
    count++;
}

main();