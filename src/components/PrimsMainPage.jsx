import React from "react";

import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import PrimsPath from "./PrimsPath";

export default class PrimsMainPage extends React.Component{
    disable;
    constructor(props){
		super(props);
		this.disable = false;
	 	 this.state = {
			addToEdge : 0,
			addFromEdge: 0,
			removeToEdge : 0,
			removeFromEdge: 0,
			weight : 10000,
			vertices : 0,
			tempVertices: 0,
			edgePair: new Array(0),
			background: ["white","white","white","white","white"]
    	}
  	}

 verticesOnChange = (event) =>{
   this.setState({tempVertices : Number(event.target.value)});

  }

  setVertices = ()=>{
    this.setState({vertices : this.state.tempVertices});
    let vertices = this.state.tempVertices;
    var ePair = this.state.edgePair;
    var elen = this.state.edgePair.length;
     while(vertices > elen && vertices !== ""){
       ePair.push([]);
       vertices -=1;
     }
     while(vertices < elen && vertices !== ""){ 
       ePair.pop();
       elen -=1;
     }
     this.setState({edgePair : ePair});
  }

  addEdgeToChange = (event) => {
	  var to = Number(event.target.value);
	  this.setState({addToEdge : to});
  }
  print = ()=>{
	  
	  this.setState({background : ["green"]})
  }

	updateAlgo = (count) =>{
		var background = []
		switch (count){
			case 0 :
				background.push("green");
				background.push("white");
				background.push("white");
				background.push("white");
				background.push("white");
				break;
			case 1 :
				background.push("white");
				background.push("green");
				background.push("white");
				background.push("white");
				background.push("white");
				break;
			case 2 :
				background.push("white");
				background.push("white");
				background.push("green");
				background.push("white");
				background.push("white");
				break;
			case 3 :
				background.push("white");
				background.push("white");
				background.push("white");
				background.push("green");
				background.push("white");
				break;
			case 4 :
				background.push("white");
				background.push("white");
				background.push("white");
				background.push("white");
				background.push("green");
				break;
			case 5 :
				background.push("white");
				background.push("white");
				background.push("white");
				background.push("white");
				background.push("white");
				break;
		}

		this.setState({background:background});

	}

  addEdgeFromChange = (event) => {
	var from = Number(event.target.value);
	this.setState({addFromEdge : from});
  }

  weightChange = (event) => {
    var newWeight = Number(event.target.value);
    this.setState({weight : newWeight});
    }

  removeEdgeToChange = (event) => {
	this.setState({removeToEdge : Number(event.target.value)});
  }

  removeEdgeFromChange = (event) => {
	this.setState({removeFromEdge : Number(event.target.value)});
  }

  addEdge = () => {
	  var ePair = this.state.edgePair;
	  var to = this.state.addToEdge;
	  var from = this.state.addFromEdge;
    var weight = this.state.weight;
    console.log(ePair);
    ePair[from].push({node: to,weight :weight,colour: "red"});
	  this.setState({edgePair : ePair});
  }

  removeEdge =() =>{
    var to = this.state.removeToEdge;
	  var from = this.state.removeFromEdge;
	  var ePair = this.state.edgePair[from];
		for(var i=0;i<ePair.length;i++){
			if(ePair[i].node === to){
				ePair.splice(i,1);
				break;
			}
		}
	this.setState({edgePair : this.state.edgePair});
  }

  resetClick = () =>{
    var testedges = [
						[
							{node:1,weight:7,colour:"red"},
							{node:4,weight:8,colour:"red"}
                      	],
						[
							{node:4,weight:3,colour:"red"},
							{node:2,weight:6,colour:"red"}
						],
						[
							{node:3,weight:2,colour:"red"},
							{node:4,weight:4,colour:"red"},
							{node:5,weight:5,colour:"red"}
						],
						[
							{node:4,weight:3,colour:"red"},
							{node:5,weight:2,colour:"red"}	
						],
						[

						],
						[

						]					
					];
    this.setState({vertices : 6, edgePair: testedges});
  }

  render(){
    return (
    <div>
        <div className="justify-center">
            <h1 style={{textAlign: "center"}}> Prim's Algorithm</h1>
			<div className="container-fluid">
				<div className="row">					
					<div  className="col-lg-6" style={{marginBottom:"5px",textAlign:"center"}}> 
						<div style={{marginBottom:"5px"}}>
							<h2 style={{display:"inline"}}>Number of Vertices:</h2>
							<Input  placeholder="please enter value" onChange={this.verticesOnChange} />
							<Button onClick={this.setVertices}>set</Button>
						</div>
						<div className="d-flex  justify-content-center" style = {{marginBottom:"5px"}}>
							<h2 style={{display:"inline", margin:"0px 5px 0px 0px"}}>Add Edge: </h2>
							<Input placeholder="From" style={{width:"100px"}} onChange={this.addEdgeFromChange} />
							<Input placeholder="to" style={{width:"100px"}} onChange={this.addEdgeToChange} />
							<Input placeholder="weight" style={{width:"100px"}} onChange={this.weightChange} />
							<Button onClick={this.addEdge}>add</Button>
							<Button onClick={this.print}>print</Button>
						</div>
						<div className="d-flex  justify-content-center"  style = {{marginBottom:"5px"}}>
							<h2 style={{display:"inline", margin:"0px 5px 0px 0px"}}>Remove Edge: </h2>
							<Input placeholder="From" style={{width:"100px"}} onChange={this.removeEdgeFromChange} />
							<Input placeholder="to" style={{width:"100px"}} onChange = {this.removeEdgeToChange} />
							<Button onClick={this.removeEdge}>remove</Button>
						</div>
						{/* <div>
							<Button onClick={() => {this.undirected();}}>Undirected</Button>
							<Button onClick={() => {this.directed();}}>Directed</Button>
						</div> */}
						<div style={{marginBottom : "5px"}}>
							<Button onClick={() => {this.startClick();}}>Start</Button>
							<Button onClick={() => {this.resetClick();}}>Reset</Button>
						</div>
						<div>
							<Button onClick={() => {this.resumeClick();}}>Resume</Button>
							<Button onClick={() => {this.pauseClick();}}>Pause</Button>
						</div>
					</div>
					<div className="col-lg-6"  style={{paddingLeft:"200px",fontSize:"13px"}}>
						<p style={{marginBottom:"0px",backgroundColor:this.state.background[0]}}>Visited.add(s)</p>
						<div style={{backgroundColor:this.state.background[1]}}>
							<p style={{marginBottom:"0px"}}>for each [v,w] in G.E[s]</p>
							<p style={{marginLeft:"50px",marginBottom:"0px"}}>Q.push([s,u,w]) </p>
						</div>
						<p style={{marginBottom:"0px"}}>while(!Q.empty())</p>
						<div style={{marginLeft:"50px"}}>
							<div style={{backgroundColor:this.state.background[2]}}>
								<p style={{marginBottom:"0px"}}>[u,v,w] = ExtractMin(Q)</p>
								<p style={{marginBottom:"0px"}}>while(v belongs to Visited)</p>
								<p style={{marginLeft:"50px",marginBottom:"0px"}}>[u,v,w] = ExtractMin(Q)</p>
							</div>
							<div style={{backgroundColor:this.state.background[3]}} >
								<p style={{marginBottom:"0px"}}>MST.push([u,v,w])</p>
								<p style={{marginBottom:"0px"}}>Visited.add(v)</p>
							</div>
							<div style={{backgroundColor:this.state.background[4]}} >
								<p style={{marginBottom:"0px"}}>for each [v',w] in G.E[v]</p>
								<p style={{marginLeft:"50px",marginBottom:"0px"}}>if v' does not belong to Visited</p>
								<p style={{marginLeft:"100px",marginBottom:"0px"}}>Q.push([v,v',w]) </p>
							</div>
						</div>
					</div>
				</div>
			</div>
            <div className="container-fluid" style={{border:"10px 10px 10px 10px"}}>
                <div className="row">
                <div className="col-lg-12" style={{width:"100%",border:"3px solid grey",overflowX:"scroll"}}>
                    <PrimsPath 
                        startButton ={click => this.startClick = click} 
                        resumeButton = {click => this.resumeClick = click }
                        pauseButton = {click => this.pauseClick = click }
                        vertices={ this.state.vertices} 
                        edges={this.state.edgePair} 
                        directed = {this.state.directedEdges}
						updateAlgo = {this.updateAlgo}
						/>
                </div>
                {/* <div className="col-lg-4" style={{border:"3px solid grey",overflowY:"scroll"}}>
                </div> */}
                </div>
            </div>
        </div>
    </div>
    ); 
  }
}