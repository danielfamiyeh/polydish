# POLYDISH
## _The POLYgonal petri-DISH_
Simulates a virtual ecosystem that generates art by having organisms paths traced.
It's a project based on an area of study known as genetic algorithms.
GAs entail finding solutions to problems by thinking of data as 'genes' and groups of data as 'genomes'.
Solutions are found by simulating 'natural selection' on the genomes where the 'fittest'
(the ones with genes that are most like the solution to the problem) have more chance to pass on their genes.
By continually doing so we end up with a population of genomes that have genes that largely or totally represent the
solution to the problem.
When passing down genes a DNA crossover function is used to select traits from either parent to pass down. A mutation function is sometimes used to alter the data's genes to allow for greater variety in the resulting pool.

The 'organisms' in the dish are shapes _Squares_, _Circles_ and _Rotating Squares_.
<br>They survive by consuming food for energy and as they eat their colour changes produceing multi-coloured paths.They all have 'traits' that affect the lines they produce such as:
* Birth Colour
* Initial Angle of Movement
* Initial Energy
* Radius of Perception
* Ability to Steer towards Food
* Energy Consumption per Frame

If two mate, they are able to pass on these traits via a crossover function.
A mutation function and a hereditary mutation rate mean that there is a chance that any of these genes could change during crossover.
All of these variables mean a wide variety in the paintings produced.
Swarm mechanics are a set of algorithms that are meant to produce movement that mimics the flocking behaviour of birds, commonly used in games and animation.
These are used in the ecosystem so that like-shapes that are near each other flock toghether producing similar strokes.

Link to Visualiser:
danielfamiyeh.github.io/polydish/src/
