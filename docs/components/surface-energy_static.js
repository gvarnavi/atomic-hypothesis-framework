import * as d3 from "npm:d3";
import {drawNodes} from "./surface-energy_utils.js";

export function surfaceEnergyStaticPlot(nodes, color_scale, width) {

  const svg = d3.create("svg")
   .attr("width",width)
   .attr("height",width);

  svg.attr("viewBox", [-10, -10, 20, 20]);

  const node = drawNodes(
    svg,
    nodes,
    color_scale
  );

  return svg.node();
}
