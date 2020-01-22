//Abstract Agent Class
import Vector from "./Vector.js";
import Tools from "./Tools.js";
import Circle from "./Circle.js";
export default class Agent
{
    constructor(p, v, e, c, ms, ec, rop, sf, mr)
    {
        if(this.constructor === Agent)
        {
            throw new TypeError("Abstract class Agent can not be instantiated directly.");
        }
        if(this.render === undefined)
        {
            throw new TypeError("Objects implementing Agent class must have render method.");
        }

        this._timeAlive = 0;
        this._position = p;
        this._velocity = v;
        this._initialEnergy = e;
        this._maxSpeed = ms;
        this._acceleration = new Vector(0,0);
        this._trueColour = [c[0],c[1],c[2]];
        this._colour = c;
        this._energy = e;
        this._size = 1 * this._timeAlive;
        this._consumption = ec;
        this._shouldReproduce = false;
        this._rop = rop;
        this._size = 0.01;
        this._steeringForce = sf;
        this._mutationRate = mr;
        this._shouldSwarm = true;
    }

    update(antList)
    {
        if(this._shouldSwarm) this.swarm(antList);

        if(this._energy > 0)
        {
            this._velocity.add(this._acceleration);
            this._velocity.constrain(this._maxSpeed);
            this._position.add(this._velocity);
            this._acceleration.scale(0);

            this._shouldReproduce = (Math.random() * 100 < 50) ? true : false;
            if(this._shouldReproduce && this._timeAlive > 60) this.reproduce(antList);

            this._energy-=this._consumption;
            this._timeAlive++;
        }
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
                this.addForce(steer);
            }
        }
    }

    //Swarm Mechanics - Make Variable
    swarm(agentList)
    {
        this.align(agentList);
        this.cohesion(agentList);
    }

    align(agentList) //alignment
    {
        let tot = 0,
            avgVel = new Vector(0,0);
        for(let agent in agentList)
        {
            let dir = Vector.Sub(agentList[agent].position, this._position),
                dist = dir.mag;
            if(dist<this._rop && dist>0)
            {
                tot++;
                avgVel.add(agentList[agent].velocity);
            }
            if(tot > 0)
            {
                avgVel.scale(1/tot);
                let targetVelocity = Vector.Scale(Vector.Normalise(avgVel),this._maxSpeed),
                    steeringForce = Vector.Sub(targetVelocity, this.velocity);
                
                steeringForce.constrain(this._steeringForce);
                steeringForce.scale(0.05);
                this.addForce(steeringForce);
            }
        }
    }

    cohesion(agentList) //cohesion
    {
        let tot = 0,
            avgPos = new Vector(0,0);
        for(let agent in agentList)
        {
            let dir = Vector.Sub(agentList[agent].position, this._position),
                dist = dir.mag;
            if(dist<this._rop && dist>0)
            {
                avgPos.add(agentList[agent].position);
                tot++;
            }
        }
        if(tot > 0)
        {
            avgPos.scale(1/tot);
            let targetVelocity = Vector.Scale(Vector.Normalise(Vector.Sub(avgPos, this.position)), this._maxSpeed),
                steeringForce = Vector.Sub(targetVelocity, this._velocity);

                steeringForce.constrain(this._steeringForce);
                steeringForce.scale(0.9);
                this.addForce(steeringForce);
        }
    }

    //Changing colour based on food eaten
    changeColour(food)
    {
        let deltaR = (food.colour[0] - this._colour[0]) / 10,
            deltaG = (food.colour[1] - this._colour[1]) / 10,
            deltaB = (food.colour[2] - this._colour[2]) / 10;

        this._colour[0] += deltaR;
        this._colour[1] += deltaG;
        this._colour[2] += deltaB;
    }
    
    //Adding forces to movement
    addForce(f)
    {
        this._acceleration.add(f);
    }

    //Keep agent in screen
    keepInBounds(WIDTH, HEIGHT)
    {
        if(this._position.x <= 0)
        {
            let target = new Vector(this._maxSpeed, this._velocity.y),
            steer = Vector.Sub(target, this._velocity);
            steer.constrain(this._steeringForce);
            this.addForce(steer);
        }
        if(this._position.x >= WIDTH)
        {
            let target = new Vector(-this._maxSpeed, this._velocity.y),
            steer = Vector.Sub(target, this._velocity);
            steer.constrain(this._steeringForce);
            this.addForce(steer);
        }
        if(this._position.y <= 0)
        {
            let target = new Vector(this._maxSpeed, this._velocity.y),
            steer = Vector.Sub(target, this._velocity);
            steer.constrain(this._steeringForce);
            this.addForce(steer);
        }
        if(this._position.y >= HEIGHT)
        {
            let target = new Vector(-this._maxSpeed, this._velocity.y),
            steer = Vector.Sub(target, this._velocity);
            steer.constrain(this._steeringForce);
            this.addForce(steer);
        }
    }

    //Reproductive Functions

    reproduce(antList)
    {
        if(antList.length < 150) //make max ants variable
        {
            antList.forEach(ant => {
                let dist = Vector.Sub(ant.position, this._position).mag;

                if(dist > 0 && dist <= 10 && ant != this && this.constructor === ant.constructor)
                {
                    let midPoint = Tools.randNumFloor(0,this.genome.length);   
                    let childGenome = this.crossover(this.genome, ant.genome, midPoint);
                    if(Math.random() * 100 <= this._mutationRate * 100) this.mutate(childGenome);
                    let newAnt = new Circle(childGenome[0], childGenome[1], childGenome[2], childGenome[3], childGenome[4], childGenome[5], childGenome[6], childGenome[7], this._mutationRate);
                    antList.push(newAnt);
                    this._energy-=50;
                }
            })
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


   mutate(genome)
   {
       let num = Math.floor(Math.random() * genome.length + 1); //Number of genes to mutate
       let indexes = [];
       for(let i=0; i<num; i++)
       {
           indexes.push(Math.floor(Math.random() * 9)); //Gene indexes to mutate
       }
       indexes.forEach(i => {
           switch (i)
           {
               case 1: //Initial Velocity Mutation
                   genome[i] = Vector.UnitVec();
               break;

               case 2: //Initial Energy Mutation
                   genome[i] +=  (0.1*genome[i])*((Math.floor((Math.random() * 2)) > 0) ? 1 : -1);
               break;
               case 3: //True Colour Mutation
                   genome[i] = Tools.mutatedRGB(genome[i][0], genome[i][1], genome[i][2]);
               break;
               case 4: //Max Speed
               case 5: //Energy Consumption
                   genome[i] = Math.random();
               break;
               case 6: //Radius of Perception
                   genome[i] = Math.random() * 500;
               break;
               case 7: //Steering Force
                   genome[i] = Math.random();
               break;
           }
       });
   }


    //Getters and Setters
    get genome()
    {
        return [new Vector(this._position.x, this._position.y), new Vector(this._velocity.x, this._velocity.y),this._initialEnergy, [this._trueColour[0], this._trueColour[1], this._trueColour[2]], this._maxSpeed , this._consumption, this._rop, this._steeringForce];
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

    get initialEnergy()
    {
        return this._initialEnergy;
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