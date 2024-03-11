export function sliceParticle(particle, theta) {

  const particle_copy = structuredClone(particle);
  const left = particle_copy.filter((d) => Math.tan(theta % Math.PI) * (d.x + 1e-6) < d.y);
  const right = particle_copy.filter((x) => !left.includes(x));
  return [left, right];
}

export function drawNodes(svg, node_data, colorScale) {
  
  if (colorScale == null) {
    colorScale = (e) => null;
  }

  const node = svg
    .selectAll(".node")
    .data(node_data)
    .enter()
    .append("circle")
    .classed("node", true)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("fill", (d) => colorScale(d.energy))
    .attr("r", 0.5);

  return node;
}

