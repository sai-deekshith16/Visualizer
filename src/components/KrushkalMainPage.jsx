import React from "react";

import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import Krushkal from './Krushkal';

export default class KrushkalMainPage extends React.Component {
	disable;
	constructor(props) {
		super(props);
		this.disable = false;
		this.state = {
			addToEdge: 0,
			addFromEdge: 0,
			removeToEdge: 0,
			removeFromEdge: 0,
			weight: 10000,
			vertices: 0,
			tempVertices: 0,
			edgePair: new Array(0),
			background: ["white", "white", "white"]
		}
	}

	verticesOnChange = (event) => {
		this.setState({ tempVertices: Number(event.target.value) });

	}

	setVertices = () => {
		this.setState({ vertices: this.state.tempVertices });
		let vertices = this.state.tempVertices;
		var ePair = this.state.edgePair;
		var elen = this.state.edgePair.length;
		while (vertices > elen && vertices !== "") {
			ePair.push([]);
			vertices -= 1;
		}
		while (vertices < elen && vertices !== "") {
			ePair.pop();
			elen -= 1;
		}
		this.setState({ edgePair: ePair });
	}

	addEdgeToChange = (event) => {
		var to = Number(event.target.value);
		this.setState({ addToEdge: to });
	}
	print = () => {

		this.setState({ background: ["green"] })
	}

	addEdgeFromChange = (event) => {
		var from = Number(event.target.value);
		this.setState({ addFromEdge: from });
	}

	weightChange = (event) => {
		var newWeight = Number(event.target.value);
		this.setState({ weight: newWeight });
	}

	removeEdgeToChange = (event) => {
		this.setState({ removeToEdge: Number(event.target.value) });
	}

	removeEdgeFromChange = (event) => {
		this.setState({ removeFromEdge: Number(event.target.value) });
	}

	addEdge = () => {
		var ePair = this.state.edgePair;
		var to = this.state.addToEdge;
		var from = this.state.addFromEdge;
		var weight = this.state.weight;
		console.log(ePair);
		ePair[from].push({ node: to, weight: weight, colour: "red" });
		this.setState({ edgePair: ePair });
	}

	removeEdge = () => {
		var to = this.state.removeToEdge;
		var from = this.state.removeFromEdge;
		var ePair = this.state.edgePair[from];
		for (var i = 0; i < ePair.length; i++) {
			if (ePair[i].node === to) {
				ePair.splice(i, 1);
				break;
			}
		}
		this.setState({ edgePair: this.state.edgePair });
	}

	resetClick = () => {
		var testedges = [
			[
				{ node: 1, weight: 7, colour: "red" },
				{ node: 4, weight: 8, colour: "red" }
			],
			[
				{ node: 4, weight: 3, colour: "red" },
				{ node: 2, weight: 6, colour: "red" }
			],
			[
				{ node: 3, weight: 2, colour: "red" },
				{ node: 4, weight: 4, colour: "red" },
				{ node: 5, weight: 5, colour: "red" }
			],
			[
				{ node: 4, weight: 3, colour: "red" },
				{ node: 5, weight: 2, colour: "red" }
			],
			[

			],
			[

			]
		];
		this.setState({ vertices: 6, edgePair: testedges });
	}

	updateAlgo = (count) => {
		var background = []
		switch (count) {
			case 0:
				background.push("green");
				background.push("white");
				background.push("white");
				break;
			case 1:
				background.push("white");
				background.push("green");
				background.push("white");
				break;
			case 2:
				background.push("white");
				background.push("white");
				background.push("green");
				break;
			case 3:
				background.push("white");
				background.push("white");
				background.push("white");
				break;
		}

		this.setState({ background: background });

	}

	render() {
		return (
			<div>
				<div className="justify-center">
					<h1 style={{ textAlign: "center" }}>Krushkal Algorithm</h1>
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-6" style={{ marginBottom: "5px", textAlign: "center" }}>
								<div style={{ marginBottom: "5px", textAlign: "center" }}>
									<div style={{ marginBottom: "5px" }}>
										<h2 style={{ display: "inline" }}>Number of Vertices:</h2>
										<Input placeholder="please enter value" onChange={this.verticesOnChange} />
										<Button onClick={this.setVertices}>set</Button>
									</div>
									<div className="d-flex  justify-content-center" style={{ marginBottom: "5px" }}>
										<h2 style={{ display: "inline", margin: "0px 5px 0px 0px" }}>Add Edge: </h2>
										<Input placeholder="From" style={{ width: "100px" }} onChange={this.addEdgeFromChange} />
										<Input placeholder="to" style={{ width: "100px" }} onChange={this.addEdgeToChange} />
										<Input placeholder="weight" style={{ width: "100px" }} onChange={this.weightChange} />
										<Button onClick={this.addEdge}>add</Button>
									</div>
									<div className="d-flex  justify-content-center" style={{ marginBottom: "5px" }}>
										<h2 style={{ display: "inline", margin: "0px 5px 0px 0px" }}>Remove Edge: </h2>
										<Input placeholder="From" style={{ width: "100px" }} onChange={this.removeEdgeFromChange} />
										<Input placeholder="to" style={{ width: "100px" }} onChange={this.removeEdgeToChange} />
										<Button onClick={this.removeEdge}>remove</Button>
									</div>
									<div style={{ marginBottom: "5px" }}>
										<Button onClick={() => { this.startClick(); }}>Start</Button>
										<Button onClick={() => { this.resetClick(); }}>Reset</Button>
									</div>
									<div>
										<Button onClick={() => { this.resumeClick(); }}>Resume</Button>
										<Button onClick={() => { this.pauseClick(); }}>Pause</Button>
									</div>
								</div>
							</div>
							<div className="col-lg-6" style={{ paddingLeft: "200px", fontSize: "15px" }}>
								<div style={{ backgroundColor: this.state.background[0] }}>
									<p style={{ marginBottom: "0px"}}>T ← ∅</p>
									<p style={{ marginBottom: "0px"}}>queue ← sort {"{u,v}"} edges of E using weight</p>
									<p style={{ marginBottom: "0px"}}>FOREACH v in G.V</p>
									<p style={{ marginLeft: "50px", marginBottom: "0px" }}>make-tree(v);</p>
								</div>
								<div style={{ backgroundColor: this.state.background[1] }}>
									<p style={{ marginBottom: "0px"}}>WHILE queue ≠ ∅ AND trees-count {">"} 1 DO</p>
									<p style={{ marginLeft: "50px", marginBottom: "0px" }}>{"{u,v}"} ← queue.extractMin()</p>
								</div>
								<div style={{ backgroundColor: this.state.background[2] }}>
									<p style={{marginLeft: "50px", marginBottom: "0px"}}>IF (T U {"{u,v}"} does not have cycle)</p>
									<p style={{ marginLeft: "100px", marginBottom: "0px" }}>T.add(u, v)</p>
									<p style={{ marginLeft: "100px", marginBottom: "0px" }}>merge(tree-of(u), tree-of(v))</p>
								</div>
							</div>
						</div>
					</div>
					<div className="container-fluid" style={{ border: "10px 10px 10px 10px" }}>
						<div className="row">
							<div className="col-lg-12" style={{ width: "100%", border: "3px solid grey", overflowX: "scroll" }}>
								<Krushkal
									startButton={click => this.startClick = click}
									resumeButton={click => this.resumeClick = click}
									pauseButton={click => this.pauseClick = click}
									vertices={this.state.vertices}
									edges={this.state.edgePair}
									updateAlgo = {this.updateAlgo}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}