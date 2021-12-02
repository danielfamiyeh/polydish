# POLYDISH
## _The POLYgonal petri-DISH_

Link to Visualiser:
https://danielfamiyeh.github.io/polydish/src/

POLYDISH simulates a virtual ecosystem that generates art by having organisms paths traced.
It's a project based on an area of study known as genetic algorithms.
GAs entail finding solutions to problems by thinking of data as 'genes' and groups of data as 'genomes'.
Solutions are found by simulating natural selection on groups of data where the 'fittest', i.e. genomes that more closely represent the solution, have more chance to pass them on.
Genes are selected from either parent and passed down via a crossover function.
A mutation function sometimes alters them to allow for greater variety in the resulting pool.

The organisms in the dish are shapes _Squares_, _Circles_ and _Rotating Squares_.
<br>They survive by consuming food, which changes their colour, producing multi-coloured paths. They all have 'traits' that affect the lines drawn, such as:

* Birth Colour
* Initial Angle of Movement
* Initial Energy
* Radius of Perception
* Ability to Steer towards Food
* Energy Consumption per Frame

Swarm mechanics are a set of algorithms meant to produce movement that mimics the flocking behaviour of birds, commonly used in games and animation. These are used in the ecosystem so that like-shapes near each other flock together, producing similar strokes.
