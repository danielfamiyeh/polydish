import Dimension from "./classes/helper/Dimension.js";
import PolyDish from "./classes/PolyDish.js";

let canvas = document.getElementById("canvas");


    /*
    canvas.toBlob(function(blob) {
       // saveAs(blob, "polydish.png");
    });
 */

let dish = new PolyDish(canvas, new Dimension(500,500));
dish.initSpecies(30,30,30,5,50,500);

function main()
{
    dish.run(3);
    window.requestAnimationFrame(main);
}

main();