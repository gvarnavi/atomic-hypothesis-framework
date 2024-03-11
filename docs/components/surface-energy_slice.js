import * as d3 from "npm:d3";
import {forceSimulation,forceLennardJonesPotential} from "npm:d3-force-md";
import {drawNodes, sliceParticle} from "./surface-energy_utils.js";

export function surfaceEnergySlicePlot(square_lattice, theta_in_deg, color_scale, width) {

  const svg = d3.create("svg")
   .attr("width",width)
   .attr("height",width);

  const theta = (theta_in_deg / 180) * Math.PI;
  const [nodes, nodesRight] = sliceParticle(square_lattice, theta);

  svg.attr("viewBox", [-10, -11, 20, 21]);

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

  // draw nodes (with uniform radius and no edges)
  nodes.forEach((d) => {
    (d.x -= Math.sin(theta)), (d.y += Math.cos(theta));
  });
  nodesRight.forEach((d) => {
    (d.x += Math.sin(theta)), (d.y -= Math.cos(theta));
  });

  const node = drawNodes(
    svg,
    [...nodes, ...nodesRight],
    color_scale
  );

  svg
    .append("line")
    .style("stroke", "black")
    .style("stroke-width", 0.05)
    .style("stroke-dasharray", 0.25)
    .attr("x1", 11 * Math.cos(theta))
    .attr("y1", 11 * Math.sin(theta))
    .attr("x2", -11 * Math.cos(theta))
    .attr("y2", -11 * Math.sin(theta));

  return svg.node();
}
