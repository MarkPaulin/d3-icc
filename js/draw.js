function drawICC(a, b, c) {
	const width = 800,
		height = 400;

	const x = d3.range(-8, 8.1, 0.05);
	
	const y = x.map(d => icc(d, a, b, c));

	const data = Object.assign(d3.range(0, x.length).map(d => ({x: x[d], y: y[d]})));

	const chart = d3.select("#chart");

	const xRange = [-8, 8],
		yRange = [0, 1];

	const xScale = d3.scaleLinear()
		.domain(xRange)
		.range([0, width]);
	
	const yScale = d3.scaleLinear()
		.domain(yRange)
		.range([height, 0]);

	const line = d3.line()
		.x(d => xScale(d.x))
		.y(d => yScale(d.y));

	chart.selectAll("path.line")
		.data([data])
		.join(enter => enter.append("path").attr("class", "line"))
		.attr("stroke", "#1f618d")
		.attr("fill", "none")
	  	.attr("d", line);
}

function draw() {
	let a = d3.select("input#discrimination").node().value;
	let b = d3.select("input#difficulty").node().value;
	let c = d3.select("input#guess").node().value;

	drawICC(+a, +b, +c);
}