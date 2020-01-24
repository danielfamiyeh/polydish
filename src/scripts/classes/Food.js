import Tools from "./helper/Tools.js";
import Vector from "./Vector.js";
export default class Food
{
    constructor(pos, col)
    {
        this._position = pos;
        this._eaten = false;
        this._colour = col;
    }

    static genFood(size, num)
    {
        let foodList = new Array(num);
        for(let i = 0; i< num; i++)
        {
           foodList[i] = (new Food(new Vector(Math.random() * size.w, Math.random() * size.h), Tools.randRGB()));
        }
        return foodList;
    }

    render(ctx)
    {
        if(!this._eaten)
        {
            ctx.fillStyle = `rgba(${this._colour[0]}, ${this._colour[1]}, ${this._colour[2]}, 1)`;
            ctx.fillRect(this._position.x, this._position.y, 5,5);
        }
    }

    get eaten()
    {
        return this._eaten;
    }

    set eaten(bool)
    {
        this._eaten = bool;
    }

    get position()
    {
        return this._position;
    }
    
    get colour()
    {
        return this._colour;
    }
}