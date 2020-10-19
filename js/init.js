function init() {
	const canvas = d3.select("#canvas"),
		width = 800,
		height = 400,
		margins = {"top": 20, "right": 50, "bottom": 20, "left": 50};

	const svg = canvas.append("svg")
		.attr("height", height + margins.top + margins.bottom)
		.attr("width", width + margins.left + margins.right);
	
	const chart = svg.append("g")
		.attr("id", "chart")
		.attr("transform", `translate(${margins.left}, ${margins.top})`);

	const xRange = [-8, 8],
		yRange = [0, 1];

	const xScale = d3.scaleLinear()
		.domain(xRange)
		.range([0, width]);
	
	const yScale = d3.scaleLinear()
		.domain(yRange)
		.range([height, 0]);

	const xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(17);

	const yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(5);

	chart.append("g")
		.attr("class", "axis xAxis")
		.attr("transform", `translate(0, ${height})`)
		.call(xAxis);
	
	chart.append("g")
		.attr("class", "axis yAxis")
		.call(yAxis);
}
