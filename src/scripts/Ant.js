import Vector from "./Vector.js";
import Tools from "./Tools.js";

export default class Ant
{
    constructor(p,v,e,c,ms = 0.5, ec=0.2,rop=10,sf=0.01)
    {
        this._timeAlive = 0;
        this._position = p;
        this._velocity = v;
        this._maxSpeed = 0.5;
        this._acceleration = new Vector(0,0);
        this._trueColour = [c[0],c[1],c[2]];
        this._colour = c;
        this._energy = e;
        this._size = 1 * this._timeAlive;
        this._consumption = ec;
        this._shouldReproduce = false;
        this._rop = rop;
        this._size = 0.001;
        this._steeringForce = sf;

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

            this._shouldReproduce = (Math.random * 100 < 10) ? true : false;
            if(this._shouldReproduce && this._timeAlive > 50) this.reproduce(antList);

            this._energy-=this._consumption;
            this._timeAlive++;
        }
    }

    reproduce(antList)
    {
        let reproduced = false;
        if(antList.length < 200)
        {
            antList.forEach(ant => {
                let dist = Vector.Sub(ant.position, this._position).mag;
                if(dist > 0 && dist < 10)
                {
                    let thisGenome = [this._position, this._velocity, this._maxSpeed, this._trueColour, this._consumption, this._rop, this._steeringForce],
                        otherGenome = [ant.position, ant.velocity, ant.maxSpeed, ant.trueColour, ant.rop, ant.consumption, ant.steeringForce],
                        midPoint = Tools.randNumFloor(0,8);
                    let childGenome = this.crossover(thisGenome, otherGenome, midPoint);
                    let newAnt = new Ant(childGenome[0], childGenome[1], 200, childGenome[3], childGenome[2], childGenome[4], childGenome[5], childGenome[6]);
                    antList.push(newAnt);
                    reproduced = true;
                }
            })
            if(!reproduced)
            {
                antList.push(new Ant(new Vector(this._position.x, this._position.y), new Vector(this._velocity.x, this._velocity.y), 200, this._trueColour, this._maxSpeed));
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
                steer.constrain(this._steeringForce);
                steer.normalise();
                this.addForce(steer);
            }
        }
    }

    changeColour(food)
    {
        let deltaR = (food.colour[0] - this._colour[0]) / 2,
            deltaG = (food.colour[1] - this._colour[1]) / 2,
            deltaB = (food.colour[2] - this._colour[2]) / 2;

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

    get consumption()
    {
        return this._consumption;
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