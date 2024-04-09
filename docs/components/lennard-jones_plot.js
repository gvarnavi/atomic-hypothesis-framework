import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

export function lennardJonesPlot(lj_data, lj_plot_inputs, spring_svgs, width) {
  let marks = [
    Plot.ruleX([1], { stroke: "black" }),
    Plot.ruleY([0], { stroke: "black" })
  ];

  if (lj_plot_inputs.includes("show schematics")) {
    marks = [
      ...marks,
      [
        Plot.image(spring_svgs, {
          x: "x",
          y: "y",
          src: "src",
          width: 200
        })
      ]
    ];
  }

  if (lj_plot_inputs.includes("plot energy")) {
    marks = [
      ...marks,
      [
        Plot.line(lj_data, {
          x: "rho",
          y: "energy",
          stroke: "#4e79a7"
          //tip: true
        }),
        Plot.crosshairX(lj_data, {
          x: "rho",
          y: "energy",
          ruleStroke: "#4e79a7",
          ruleStrokeWidth: 2,
          ruleStrokeOpacity: 0.25
        }),
        Plot.text(lj_data.slice(lj_data.length - 1), {
          x: "rho",
          y: "energy",
          text: ["Energy"],
          fill: "#4e79a7",
          dy: 10
        })
      ]
    ];
  }

  if (lj_plot_inputs.includes("plot force")) {
    marks = [
      ...marks,
      [
        Plot.line(lj_data, {
          x: "rho",
          y: "force",
          stroke: "#e15759"
          //tip: true
        }),
        Plot.crosshairX(lj_data, {
          x: "rho",
          y: "force",
          ruleStroke: "#e15759",
          ruleStrokeWidth: 2,
          ruleStrokeOpacity: 0.25
        }),
        Plot.text(lj_data.slice(lj_data.length - 1), {
          x: "rho",
          y: "force",
          text: ["Force"],
          fill: "#e15759",
          dy: 15
        })
      ]
    ];
  }

  return Plot.plot({
    width: width,
    aspectRatio: 12.5,
    x: {
      domain: [0.75, 1.5],
      label: "interatomic distance"
    },
    y: {
      domain: [-2.75, 2.75],
      grid: true,
      label: "potential"
    },
    style: { fontSize: "12px" },
    marks: marks
  });
}

