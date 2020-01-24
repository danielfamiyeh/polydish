import Dimension from "./classes/helper/Dimension.js";
import PolyDish from "./classes/PolyDish.js";

let canvas = document.getElementById("canvas");

    /*
    canvas.toBlob(function(blob) {
       // saveAs(blob, "polydish.png");
    });
 */

let dish = new PolyDish(canvas, new Dimension(window.innerWidth,window.innerHeight));
dish.initSpecies(30,30,30,100,50,500);


function main()
{
    dish.run();
    window.requestAnimationFrame(main);
}

main();