---
title: Surface Energy
toc: false
---

```js
import {surfaceEnergyPlot} from "./components/surface-energy_plot.js"
import {surfaceEnergySlicePlot} from "./components/surface-energy_slice.js"
import {surfaceEnergyStaticPlot} from "./components/surface-energy_static.js"
```

```js
const data = await FileAttachment("./data/square-lattice_surface-energy.json").json();
const color_scale = d3.scaleSequential(d3.interpolateTurbo).domain([-7, -2]);
```

<div class="grid grid-cols-2">
  <div>
  <h1> Excess Surface Free Energy </h1>
  <p>
    We'll use the Lennard-Jones interatomic potential model, to investigate the effects of surface-energy.
    We start by placing atoms on a square lattice and coloring them by their total energy, with red being 'higher' energy and dark blue being 'lower' energy.  
    It's evident that the atoms on the surface have a higher energy!
  </p>
  <p>
    We can think about this by counting 'satisfied' and 'dangling' bonds.
    The atoms inside the 'bulk' of the particle all have 4 nearest neighbors (blue), the atoms on the edges of the particle have 3 nearest neighbors (green),
    while the atoms in the corners of the particle only have two nearest neighbors (orange).
  </p>
  <h1> Surface Energy Anisotropy </h1>
  <p>
    We started with a square particle above, and found that its energy is related to the geometry and nearest-neighbor configurations.
    What can this tell us about the directional anisotropy of the particle's facets? E.g. are 90 degree facets higher or lower energy than 45 degree facets? Let's find out!
  </p>
  <p>
  Try moving the slice angle slider below, which splits our square particle down the middle.
  Can you guess which angles will lead to higher/lower energy facets?
  </p>

```js
const theta_in_deg_slider = view(Inputs.range([0, 360], {
  label: "Slice angle",
  value: 60
}));
```
  </div>
  <div class="card">
    ${resize((width)=>surfaceEnergyStaticPlot(data.static_nodes,color_scale,width))}
    ${resize((width)=>Plot.legend({label:"Lennard-Jones energy",width:width/2,color:{domain:[-7,-2]}}))}
  </div>
  <div class="card">
    <h2>Excess Surface Free Energy</h2>
    ${resize((width)=>surfaceEnergySlicePlot(data.square_lattice,theta_in_deg,color_scale,width))}
    ${resize((width)=>Plot.legend({label:"Lennard-Jones energy",width:width/2,color:{domain:[-7,-2]}}))}
  </div>
  <div class="card"> 
    <h2>Surface Energy Polar Plot</h2>
    ${resize((width)=>surfaceEnergyPlot(data.surface_energy_data_polar,closest_index,width))}
  </div>
</div>
  
```js
const theta_in_deg = (theta_in_deg_slider % 180) - 90;
const closest_index = Math.round(theta_in_deg_slider / 7.5) % 48;
```
