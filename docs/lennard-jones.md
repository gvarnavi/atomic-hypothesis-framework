---
title: Lennard Jones Potential
toc: false
---

```js
import {lennardJonesPlot} from "./components/lennard-jones_plot.js"
```

```js
const spring_svgs = [
  {
    x: 0.875,
    y: -2,
    src: "https://raw.githubusercontent.com/gvarnavi/2024-teaching-seminar/main/static/img/spring_compressed.svg"
  },
  {
    x: 1.1,
    y: 2,
    src: "https://raw.githubusercontent.com/gvarnavi/2024-teaching-seminar/main/static/img/spring_equilibrium.svg"
  },
  {
    x: 1.375,
    y: 1,
    src: "https://raw.githubusercontent.com/gvarnavi/2024-teaching-seminar/main/static/img/spring_expanded.svg"
  }
];

const lj_data = d3.range(0.75, 1.5, 0.00125).map((d) => ({
  rho: d,
  energy: Math.pow(d, -12) - 2 * Math.pow(d, -6),
  force: 12 * Math.pow(d, -13) - 12 * Math.pow(d, -7)
}))

const glj_data = d3.range(0.75, 1.5, 0.00125).map((d) => ({
  rho: d,
  energy:
    (user_inputs.n * Math.pow(d, -user_inputs.m) -
      user_inputs.m * Math.pow(d, -user_inputs.n)) /
    (user_inputs.m - user_inputs.n),
  force:
    (user_inputs.m * user_inputs.n * Math.pow(d, -1 - user_inputs.m) -
      user_inputs.m * user_inputs.n * Math.pow(d, -1 - user_inputs.n)) /
    (user_inputs.m - user_inputs.n)
}))
```
## Lennard Jones Potential

The [Lennard-Jones potential](https://en.wikipedia.org/wiki/Lennard-Jones_potential) is a model for a particle's potential energy when it is separated from another particle. 

The model is simple - particles attract each other when they are far apart and repel when they are very near.
Nevertheless, the information that we will compute and visualize is enormous - especially when there are many interacting particles.

All of the physics and its consequences derive from the shape of the potential:

```js
const lj_plot_inputs = view(
  Inputs.checkbox(
    ["show schematics", "plot energy", "plot force"],
    {
      value: ["show schematics", "plot energy"]
    }
  )
);
```

${resize((width)=>lennardJonesPlot(lj_data,lj_plot_inputs, spring_svgs,500))}

When the distance is small, the potential **energy** decreases with increasing distance. The **force** is positive and repulsive because force is minus the gradient of potential energy.

When the distance is large, the potential **energy** slope is positive and so the **force** is negative: the particles attract.  

We could construct many functions that behave like this; the Lennard-Jones potential is a simple choice.

### Non-Dimensional Form
Mathematically, the Lennard-Jones potential is given by a linear combination of two terms:
- An attractive term that goes to zero as ${tex `-\frac{1}{r^6}`} as ${tex `r \rightarrow \infty`}
- A repulsive term that goes to infinity as ${tex `\frac{1}{r^{12}}`} as ${tex `r \rightarrow 0`}

```tex
U_{ljp} = \frac{a}{r^{12}} + \frac{b}{r^6}
```
with ${tex`a`} and ${tex`b`} being material-properties we could extract using experimental observations.

While this form is useful in investigating material-specific behaviour, we wish to understand the dynamics of materials with this **family** of interatomic potentials. To do this, we can instead derive a general form by non-dimensionalizing our potential by:
1. introducing a non-dimensional length ${tex `\rho = \frac{r}{r_{min}}`}
2. dividing the potential by an energy minimum ${tex `e_{min}`}

```tex
\tilde{U}_{ljp} = \frac{1}{\rho^{12}}-\frac{2}{\rho^6}
```

## Beyond Lennard-Jones Potentials

The Lennard-Jones potential is just a model to guide our exploration of simple physics.
There is no (real) justification for its precise form.  

In fact, the choice of the function won't affect the results very much - any potential function with the repulsive/attractive shape above will produce similar consequences.

Let's test that!

### Generalized Lennard-Jones Potential
Sometimes the Lennard-Jones Potential is called a 6-12 potential because of the exponents used.
This generalizes nicely to _nm_-potentials, where _n_ and _m_ refer to the exponents in the interatomic potential:

```tex
\tilde{U}_{g-ljp}(\rho) = \frac{n \rho^{-m}-m \rho^{-n}}{m-n}
```

```js
const glj_plot_inputs = view(
  Inputs.checkbox(
    ["show schematics", "plot energy", "plot force"],
    {
      value: ["show schematics", "plot energy"]
    }
  )
);
```

${resize((width)=>lennardJonesPlot(glj_data,glj_plot_inputs, spring_svgs,500))}

```js
const user_inputs = view(
  Inputs.form({
    n: Inputs.range([3, 8], { value: 6, step: 1, label: "Attractive Power, n:" }),
    m: Inputs.range([9, 16], { value: 12, step: 1, label: "Repulsive Power, m:" })
  })
);
```
