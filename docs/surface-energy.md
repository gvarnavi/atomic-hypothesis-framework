---
title: Surface Energy
toc: false
---

```js
import {surfaceEnergyPlot} from "./components/surface-energy_plot.js"
import {surfaceEnergySlicePlot} from "./components/surface-energy_slice.js"
```

```js
const data = await FileAttachment("./data/square-lattice_surface-energy.json").json();
const color_scale = d3.scaleSequential(d3.interpolateTurbo).domain([-7, -2]);
```

```js
const theta_in_deg_slider = view(Inputs.range([0, 360], {
  label: "Slice angle",
  value: 60
}));
```
```js
const theta_in_deg = (theta_in_deg_slider % 180) - 90;
const closest_index = Math.round(theta_in_deg_slider / 7.5) % 48;
```

<div class="grid grid-cols-2">
  <div>
    <h2>Excess Surface Free Energy</h2>
    ${resize((width)=>surfaceEnergySlicePlot(data.square_lattice,theta_in_deg,color_scale,width))}
    ${resize((width)=>Plot.legend({label:"Lennard-Jones energy",width:width/2,color:{domain:[-7,-2]}}))}
  </div>
  <div> 
    <h2>Surface Energy Plot</h2>
    ${resize((width)=>surfaceEnergyPlot(data.surface_energy_data_polar,closest_index,width))}
  </div>
</div>

