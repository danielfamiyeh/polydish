//Abstract Autonomous Agent Class
import Vector from "./Vector.js";
import Tools from "./helper/Tools.js";
import Circle from "./Circle.js";

export default class Agent
{
    constructor(pos, vel, energy, colour, maxSpeed, energyConsump, radOfPerep, steerForce, mutRate)
    {
        if(this.constructor === Agent) // So an 'agent' cannot be instantiated.
        {
            throw new TypeError("Abstract class Agent can not be instantiated directly.");
        }

        if(this.render === undefined) //Enforcing abstract 'render' method.
        {
            throw new TypeError("Objects implementing Agent class must have render method.");
        }

        this._timeAlive = 0;
        this._position = pos;
        this._velocity = vel;
        this._initialEnergy = energy;
        this._maxSpeed = maxSpeed;
        this._acceleration = new Vector(0,0);
        this._trueColour = [colour[0],colour[1],colour[2]];
        this._colour = colour;
        this._energy = energy;
        this._size = 1 * this._timeAlive;
        this._consumption = energyConsump;
        this._shouldReproduce = false;
        this._rop = radOfPerep;
        this._size = 0.01;
        this._steeringForce = steerForce;
        this._mutationRate = mutRate;
        this._shouldSwarm = true;
        this._faceHeading = true;
    }

    update(antList) //Update function to be called every frame for an AA.
    {
        if(this._shouldSwarm) this.swarm(antList);

        if(this._energy > 0)
        {
            this._velocity.add(this._acceleration);
            this._velocity.constrain(this._maxSpeed);
            this._position.add(this._velocity);
            this._acceleration.scale(0);

            this._shouldReproduce = (Math.random() * 100 < 1  && this._timeAlive > 250) ? true : false;
            if(this._shouldReproduce) this.reproduce(antList);

            this._energy-=this._consumption;
            this._timeAlive++;
        }
    }

    seek(target) //Seek targets given as vectors
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

    swarm(agentList) //Swarm Mechanics
    {
        this.align(agentList);
        this.cohesion(agentList);
        this.separation(agentList);
    }

    align(agentList) //alignment
    {
        let tot = 0,
            avgVel = new Vector(0,0);
        for(let agent in agentList)
        {
            let dir = Vector.Sub(agentList[agent].position, this._position),
                dist = dir.mag;
            if(dist<this._rop && dist>0 && agentList[agent].constructor === this.constructor)
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
                steeringForce.scale(0.5);
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
            if(dist<10*this._rop && dist>0 && this.constructor === agentList[agent].constructor)
            {
                avgPos.add(agentList[agent].position);
                tot++;
            }
        }
        if(tot > 0)
        {
            avgPos.scale(1/tot);
            let targetVelocity = Vector.Scale(Vector.Normalise(Vector.Sub(avgPos, this._position)), this._maxSpeed),
                steeringForce = Vector.Sub(targetVelocity, this._velocity);

                steeringForce.constrain(this._steeringForce);
                steeringForce.scale(0.9);
                this.addForce(steeringForce);
        }
    }

    separation(agentList) //Not working?
    {
        let tot = 0,
            avgVel = new Vector(0,0);

        for(let agent in agentList)
        {
            let dir = Vector.Sub(agentList[agent].position, this._position),
                dist = dir.mag;
            if(dist < this._rop && dist > 0)
            {
                avgVel.add(agentList[agent].velocity);
                tot++;
            }

            if(tot > 0)
            {
                avgVel.scale(1/tot);
                let targetVel = Vector.Scale(Vector.Normalise(avgVel), this._maxSpeed),
                    steer = Vector.Sub(this._velocity, targetVel);

                steer.constrain(this._steeringForce);
                this.addForce(steer);
            }
        }

    }
    
    changeColour(food) //Changing colour based on food eaten
    {
        let deltaR = (food.colour[0] - this._colour[0])/4,
            deltaG = (food.colour[1] - this._colour[1])/4,
            deltaB = (food.colour[2] - this._colour[2])/4;

        this._colour[0] += deltaR;
        this._colour[1] += deltaG;
        this._colour[2] += deltaB;
    }
    
    addForce(f) //Adding forces to movement
    {
        this._acceleration.add(f);
    }

    keepInBounds(WIDTH, HEIGHT) //Keep agent in screen
    {
        let dist = Vector.Mag(Vector.Sub(new Vector(WIDTH/2,HEIGHT/2), this._position));
        if(dist >= HEIGHT/2)
        {
            let dir = Vector.Normalise(Vector.Sub(new Vector(WIDTH/2, HEIGHT/2), this._position)),
                desiredVel = Vector.Scale(dir,this._maxSpeed),
                steerForce = Vector.Sub(desiredVel, this._velocity);

                steerForce.constrain(0.05*this.maxSpeed);
                this.addForce(steerForce);
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

    get heading()
    {
        return Vector.Normalise(this.velocity);
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