import Vector from "./Vector.js";
import Tools from "./Tools.js";

export default class Ant
{
    constructor(p,v,e,c,ms = 0.5, ec=0.2,rop=30)
    {
        this._timeAlive = 0;
        this._position = p;
        this._velocity = v;
        this._maxSpeed = ms;
        this._acceleration = new Vector(0,0);
        this._trueColour = c;
        this._colour = c;
        this._energy = e;
        this._size = 1 * this._timeAlive;
        this._consumption = ec;
        this._shouldReproduce = false;
        this._rop = rop;
        this._size = 0.001;
        this._steeringForce = 0.01;

    }

    render(ctx)
    {
        if(this._energy > 0)
        {
            if(this._size < 3)
            {
                this._size += 0.0001 * this._timeAlive;
            }
            
            ctx.strokeStyle = `rgba(${this._colour[0]},${this._colour[1]},${this.colour[2]},${this._energy/1000})`;
            ctx.beginPath();
            ctx.arc(this._position.x, this._position.y, this._size, 0, 2*Math.PI);
            ctx.stroke();
        }
    }

    update(antList)
    {
        if(this._energy > 0)
        {
            this._velocity.add(this._acceleration);
            this._velocity.constrain(this._maxSpeed);
            this._position.add(this._velocity);
            this._acceleration.scale(0);

            this._shouldReproduce = (Math.random() * 100 <= 1) ? true : false;
            if(this._shouldReproduce) this.reproduce(antList);

            this._energy-=this._consumption;
            this._timeAlive++;
        }
    }

    reproduce(antList)
    {
        let reproduced = false;
        if(antList.length < 100)
        {
            antList.forEach(ant => {
                let dist = Vector.Sub(ant.position, this._position).mag;
                if(dist > 0 && dist < 10)
                {
                    let thisGenome = [this._position, this._velocity, this._maxSpeed, this._trueColour[0], this._trueColour[1], this._trueColour[2], this._rop, this._steeringForce],
                        otherGenome = [ant.position, ant.velocity, ant.maxSpeed, ant.trueColour[0], ant.trueColour[1], ant.trueColour[2], ant.rop, ant.steeringForce],
                        midPoint = Tools.randNumFloor(0,8);
                    let childGenome = this.crossover(thisGenome, otherGenome, midPoint);
                    console.log(midPoint, childGenome);
                    reproduced = true;
                }
            })
            if(!reproduced)
            {
             //   antList.push(new Ant(this._position, this._velocity, 200, this._trueColour, this._maxSpeed));
                reproduced = true;
            }
        }
    }

    crossover(g1, g2, m)
    {
        let newGenome = []
        for(let i=0; i<m; i++)
        {
            newGenome.push(g1[i]);
        }
        for(let i=m; i<g2.length; i++)
        {
            newGenome.push(g2[i]);
        }
        return newGenome;
    }

    seek(target)
    {

        if(target.x != null && target.y != null)
        {
            let dir = Vector.Sub(target, this._position),
                dist = dir.mag;
            if(dist <= this._rop)
            {
                dir.normalise();
                dir.scale(this._maxSpeed);
                let steer = Vector.Sub(dir, this._velocity);
                steer.normalise();
                steer.scale(this._steeringForce);
                this.addForce(steer);
            }
        }
    }

    changeColour(food)
    {
        let deltaR = (food.colour[0] - this._colour[0]) / 3.5,
            deltaG = (food.colour[1] - this._colour[1]) / 3.5,
            deltaB = (food.colour[2] - this._colour[2]) / 3.5;

        this._colour[0] += deltaR;
        this._colour[1] += deltaG;
        this._colour[2] += deltaB;
    }
    
    addForce(f)
    {
        this._acceleration.add(f);
    }

    get position()
    {
        return this._position;
    }

    get velocity()
    {
        return this._velocity;
    }

    get colour()
    {
        return this._colour;
    }

    get trueColour()
    {
        return this._trueColour;
    }

    get steeringForce()
    {
        return this._steeringForce;
    }

    get shouldReproduce()
    {
        return this._shouldReproduce;
    }

    get energy()
    {
        return this._energy;
    }

    get maxSpeed()
    {
        return this._maxSpeed;
    }

    get rop()
    {
        return this._rop;
    }

    set energy(int)
    {
        this._energy = int;
    }

    set steeringForce(f)
    {
        this._steeringForce = f;
    }
}