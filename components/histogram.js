class Histogram {
    margin = {
        top: 10, right: 40, bottom: 40, left: 40
    }

    constructor(svg, width = 550, height = 500) {
        this.svg = svg;
        this.width = width;
        this.height = height;
		
		this.handlers = {};
    }

    initialize() {
        this.svg = d3.select(this.svg);
        this.container = this.svg.append("g");
        this.xAxis = this.svg.append("g");
        this.yAxis = this.svg.append("g");
        this.legend = this.svg.append("g");

        this.xScale = d3.scaleBand();
		//this.xScale = d3.scaleLinear();
        this.yScale = d3.scaleLinear();
		//this.zScale = d3.scaleOrdinal().range(d3.schemeCategory10)

        this.svg
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        this.container.attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
    }

    update(data, xVar) {
        const categories = [...new Set(data.map(d => d[xVar]))]
        const counts = {}
		
        categories.forEach(c => {
            counts[c] = data.filter(d => d[xVar] === c).length;
			
        })
		categories.sort(function (a, b) {
		return a - b;
		});

        //this.xScale.domain(categories).range([0, this.width]).padding(0.3);
		this.xScale.domain(categories).range([0, this.width]).padding(0.3);
        this.yScale.domain([0, d3.max(Object.values(counts))]).range([this.height, 0]);
		//this.zScale.domain([...new Set(data.map(d => d[colorVar]))])

        // TODO: draw a histogram
		this.container.selectAll("rect")
			.data(categories)
			.join("rect")
			.attr("x", d => this.xScale(d))
			.attr("y", d => this.yScale(counts[d]))
			.attr("width", this.xScale.bandwidth())
			.attr("height", d => this.height - this.yScale(counts[d]))
			.attr("fill", "lightgray")

        this.xAxis
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));

        this.yAxis
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
            .call(d3.axisLeft(this.yScale));
    }
	

}