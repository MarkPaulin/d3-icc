const width = 800,
		height = 400;

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

function drawICC(a, b, c) {
	const x = d3.range(-8, 8.1, 0.05);
	
	const y = x.map(d => icc(d, a, b, c));

	const data = Object.assign(d3.range(0, x.length).map(d => ({x: x[d], y: y[d]})));

	const chart = d3.select("#chart");

	chart.selectAll("path.line")
		.data([data])
		.join(enter => enter.append("path").attr("class", "line"))
		.attr("stroke", "#1f618d")
		.attr("fill", "none")
	  	.attr("d", line);
}

function drawDiscrimination(a, b, c) {
	const discrimination = [
		{x: b - 0.5, y: icc(b, a, b, c) - 0.5 * a * (1 - c) / 4},
		{x: b + 0.5, y: icc(b, a, b, c) + 0.5 * a * (1 - c) / 4},
		{x: b - 0.5, y: icc(b, a, b, c) + 0.5 * a * (1 - c) / 4},
		{x: b - 0.5, y: icc(b, a, b, c) - 0.5 * a * (1 - c) / 4}
	];

	const chart = d3.select("#chart");

	chart.selectAll("path.discrim")
		.data([discrimination])
		.join(enter => enter.append("path").attr("class", "discrim"))
		.attr("fill", "none")
		.attr("stroke", "black")
		.attr("stroke-width", 0.5)
		.attr("d", line);

	chart.selectAll("text.label#discrim")
		.data([{x: xScale(b - 0.5) - 5, y: yScale(icc(b, a, b, c))}])
		.join(
			enter => enter.append("text")
				.attr("class", "label")
				.attr("id", "discrim")
		)
		.attr("x", d => d.x)
		.attr("y", d => d.y)
		.attr("text-anchor", "end")
		.text("discrimination");
}

function drawDifficulty(a, b, c) {
	const difficulty = [{x: b, y: 0}, {x: b, y: icc(b, a, b, c)}];

	const chart = d3.select("#chart");

	chart.selectAll("path.diff")
		.data([difficulty])
		.join(enter => enter.append("path").attr("class", "diff"))
		.attr("fill", "none")
		.attr("stroke", "black")
		.attr("stroke-width", 0.5)
		.attr("stroke-dasharray", 2)
		.attr("d", line);

	chart.selectAll("text.label#diff")
		.data([{x: xScale(b) + 5, y: yScale(icc(b, a, b, c) / 2)}])
		.join(
			enter => enter.append("text")
				.attr("class", "label")
				.attr("id", "diff")
		)
		.attr("x", d => d.x)
		.attr("y", d => d.y)
		.attr("text-anchor", "beginning")
		.text("difficulty");
}

function drawGuessing(a, b, c) {
	const guessing = [
		{x: xRange[0] - (xRange[1] - xRange[0]) / 5, y: c},
		{x: xRange[0] + (xRange[1] - xRange[0]) / 5, y: c}
	];

	const chart = d3.select("#chart");

	chart.selectAll("path.guess")
		.data([guessing])
		.join(enter => enter.append("path").attr("class", "guess"))
		.attr("fill", "none")
		.attr("stroke", "black")
		.attr("stroke-width", 0.5)
		.attr("stroke-dasharray", 2)
		.attr("d", line);
	
	chart.selectAll("text.label#guess")
		.data([{x: xScale(xRange[0] + (xRange[1] - xRange[0]) / 10), y: yScale(c) - 5}])
		.join(
			enter => enter.append("text")
				.attr("class", "label")
				.attr("id", "guess")
		)
		.attr("x", d => d.x)
		.attr("y", d => d.y)
		.attr("text-anchor", "middle")
		.text("guessing");
}

function draw() {
	let a = +d3.select("input#discrimination").node().value;
	let b = +d3.select("input#difficulty").node().value;
	let c = +d3.select("input#guess").node().value;

	drawICC(a, b, c);
	drawDiscrimination(a, b, c);
	drawDifficulty(a, b, c);
	drawGuessing(a, b, c);
}