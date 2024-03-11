import * as d3 from "d3";
import {forceSimulation, forceLennardJonesPotential} from "d3-force-md";
import {sliceParticle} from "../components/surface-energy_utils.js";

const square_lattice = [...Array((8 * 2 + 1) ** 2)].map((d, i) => ({
  x: 0.975 * ((i % 17) - 8),
  y: 0.975 * (Math.floor(i / 17) - 8)
}));

const static_nodes = structuredClone(square_lattice);
forceSimulation(static_nodes)
  .force("lennard-jones-BH", forceLennardJonesPotential().theta(0))
  .alphaDecay(0)
  .velocityDecay(0)
  .dt(0.0125)
  .tick()
  .stop();

const static_bulk_energy = d3.sum(static_nodes.map((d)=>d.energy));

function computeAverageEnergy(particle, theta_in_deg) {
  const theta = (theta_in_deg / 180) * Math.PI;
  const [nodes, nodesRight] = sliceParticle(square_lattice, theta);

  forceSimulation(nodes)
    .force("lennard-jones-BH", forceLennardJonesPotential().theta(0))
    .alphaDecay(0)
    .velocityDecay(0)
    .dt(0)
    .tick()
    .stop();

  forceSimulation(nodesRight)
    .force("lennard-jones-BH", forceLennardJonesPotential().theta(0))
    .alphaDecay(0)
    .velocityDecay(0)
    .dt(0)
    .tick()
    .stop();

  return (
    (d3.sum([...nodes, ...nodesRight].map((d) => d.energy)) -
      static_bulk_energy) /
    2
  );
}

const surface_energy_data_quarter = d3
  .range(0, 90, 7.5)
  .map((d) => ({ theta: d, energy: computeAverageEnergy(square_lattice, d) }))

const surface_energy_data_polar = d3.range(0, 360, 7.5).map((d, i) => ({
  theta: `${d}°`,
  energy:
    surface_energy_data_quarter[i % surface_energy_data_quarter.length].energy /
    d3.max(surface_energy_data_quarter.map((d) => d.energy))
}))

const data = {
  square_lattice: square_lattice,
  static_nodes: static_nodes,
  surface_energy_data_polar: surface_energy_data_polar
}

process.stdout.write(JSON.stringify(data))
