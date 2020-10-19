import define1 from "./450051d7f1174df8@252.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Item characteristic curves`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Item characteristic curves show the probability of an individual responding to a dichotomous item as a function of the latent trait. The shape of the curve is determined by the three parameters: 
* Discrimination, which represents how well the item distinguishes between individuals with different values of the latent trait. It is the maximum gradient of the curve, here denoted a
* Location or difficulty, which is the value of the latent trait at which the curve is steepest, here denoted b
* Guessing, which is the probability of responding to the item as the latent trait tends towards negative infinity, here denoted c

In the case where the guessing probability is 0, the difficulty is the value of the latent trait at which a person has equal chances of responding in either category (right/wrong, yes/no etc).`
)});
  main.variable(observer()).define(["a"], function(a){return(
a
)});
  main.variable(observer("viewof a")).define("viewof a", ["d3"], function(d3)
{

  const slider = d3.sliderBottom()
      .min(0)
      .max(5)
      .default(1)
      .step(0.1)
      .displayValue(false)
      .width(300)
      .on("onchange", () => svg.dispatch("input"));

  const svg = d3.create("svg")
      .attr("viewBox", [-20, -20, 340, 60])
      .attr("width", 340)
      .attr("height", 60)
      .call(slider);

  return Object.defineProperty(
    svg.node(), 
    "value", 
    {get: () => slider.value()}
  );
}
);
  main.variable(observer("a")).define("a", ["Generators", "viewof a"], (G, _) => G.input(_));
  main.variable(observer()).define(["b"], function(b){return(
b
)});
  main.variable(observer("viewof b")).define("viewof b", ["d3","xRange"], function(d3,xRange)
{

  const slider = d3.sliderBottom()
      .min(xRange[0])
      .max(xRange[1])
      .default(1)
      .step(0.1)
      .displayValue(false)
      .width(300)
      .on("onchange", () => svg.dispatch("input"));

  const svg = d3.create("svg")
      .attr("viewBox", [-20, -20, 340, 60])
      .attr("width", 340)
      .attr("height", 60)
      .call(slider);

  return Object.defineProperty(
    svg.node(), 
    "value", 
    {get: () => slider.value()}
  );
}
);
  main.variable(observer("b")).define("b", ["Generators", "viewof b"], (G, _) => G.input(_));
  main.variable(observer()).define(["c"], function(c){return(
c
)});
  main.variable(observer("viewof c")).define("viewof c", ["d3"], function(d3)
{

  const slider = d3.sliderBottom()
      .min(0)
      .max(1)
      .default(0)
      .step(0.01)
      .width(300)
      .displayValue(false)
      .on("onchange", () => svg.dispatch("input"));

  const svg = d3.create("svg")
      .attr("viewBox", [-20, -20, 340, 60])
      .attr("width", 340)
      .attr("height", 60)
      .call(slider);

  return Object.defineProperty(
    svg.node(), 
    "value", 
    {get: () => slider.value()}
  );
}
);
  main.variable(observer("c")).define("c", ["Generators", "viewof c"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","xAxis","yAxis","data","line","difficulty","xScale","b","yScale","icc","discrimination","guessing","xRange","c"], function(d3,width,height,xAxis,yAxis,data,line,difficulty,xScale,b,yScale,icc,discrimination,guessing,xRange,c)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("font", "10px sans-serif");

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line);
  
  svg.append("path")
      .datum(difficulty)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 0.5)
      .attr("stroke-dasharray", 5)
      .attr("d", line);
  
  svg.append("text")
      .attr("class", "label")
      .attr("x", xScale(b) + 5)
      .attr("y", yScale(icc(b) / 2))
      .attr("text-anchor", "beginning")
      .text("difficulty");
  
  svg.append("path")
      .datum(discrimination)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 0.5)
      .attr("d", line);
  
  svg.append("text")
      .attr("class", "label")
      .attr("x", xScale(b - 0.5) - 5)
      .attr("y", yScale(icc(b)))
      .attr("text-anchor", "end")
      .text("discrimination");
  
  svg.append("path")
      .datum(guessing)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 0.5)
      .attr("stroke-dasharray", 5)
      .attr("d", line);
  
  svg.append("text")
      .attr("class", "label")
      .attr("x", xScale(xRange[0] + (xRange[1] - xRange[0]) / 10))
      .attr("y", yScale(c) -5)
      .attr("text-anchor", "middle")
      .text("guessing");
  
  return svg.node();
}
);
  main.variable(observer("icc")).define("icc", ["c","a","b"], function(c,a,b){return(
ability => (c + (1 - c) * (1 / (1 + Math.exp(-a * (ability - b)))))
)});
  main.variable(observer("xRange")).define("xRange", function(){return(
[-8, 8]
)});
  main.variable(observer("xStep")).define("xStep", function(){return(
0.1
)});
  main.variable(observer("x")).define("x", ["d3","xRange","xStep"], function(d3,xRange,xStep){return(
d3.range(xRange[0], xRange[1] + xStep, xStep)
)});
  main.variable(observer("y")).define("y", ["x","icc"], function(x,icc){return(
x.map(icc)
)});
  main.variable(observer("data")).define("data", ["d3","x","y"], function(d3,x,y){return(
Object.assign(d3.range(0, x.length).map(d => ({x: x[d], y: y[d]})))
)});
  main.variable(observer("line")).define("line", ["d3","xScale","yScale"], function(d3,xScale,yScale){return(
d3.line()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y))
)});
  main.variable(observer("difficulty")).define("difficulty", ["b","icc"], function(b,icc){return(
[{x: b, y: 0}, {x: b, y: icc(b)}]
)});
  main.variable(observer("guessing")).define("guessing", ["xRange","c"], function(xRange,c){return(
[{x: xRange[0], y: c}, {x: xRange[0] + (xRange[1] - xRange[0]) / 5, y: c}]
)});
  main.variable(observer("discrimination")).define("discrimination", ["b","icc","a","c"], function(b,icc,a,c){return(
[
  {x: b - 0.5, y: icc(b) - 0.5 * a * (1 - c) / 4},
  {x: b + 0.5, y: icc(b) + 0.5 * a * (1 - c) / 4},
  {x: b - 0.5, y: icc(b) + 0.5 * a * (1 - c) / 4},
  {x: b - 0.5, y: icc(b) - 0.5 * a * (1 - c) / 4}
]
)});
  main.variable(observer("xScale")).define("xScale", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleLinear()
  .domain(d3.extent(data, d => d.x))
  .range([margin.left, width - margin.right])
)});
  main.variable(observer("yScale")).define("yScale", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
  .domain([0, 1])
  .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","xScale"], function(height,margin,d3,xScale){return(
g => g
  .attr("transform", `translate(0, ${height - margin.bottom})`)
  .call(d3.axisBottom(xScale))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","yScale"], function(margin,d3,yScale){return(
g => g
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(yScale))
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 30, bottom: 30, left: 40}
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("width")).define("width", function(){return(
800
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6", "d3-simple-slider@1")
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  return main;
}
