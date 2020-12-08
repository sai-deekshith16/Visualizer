import React from "react";

import Eulerian from "./EulerianTrail";
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';

export default class MainPage extends React.Component{
    disable;
    constructor(props){
    super(props);
    this.disable = false;
	  this.state = {
        addToEdge : 0,
        addFromEdge: 0,
        removeToEdge : 0,
        removeFromEdge: 0,
        vertices : 0,
        edgePair: [],
        statements :[],
        directedEdges: false
    }
  }

 verticesOnChange = (event) =>{
	this.setState({vertices : Number(event.target.value)});

  }

  addEdgeToChange = (event) => {
	  var to = Number(event.target.value);
	  this.setState({addToEdge : to});
  }

  print = ()=>{
	  console.log(this.state);
  }

  addEdgeFromChange = (event) => {
	var from = Number(event.target.value);
	this.setState({addFromEdge : from});
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
	  ePair.push([from,to]);
	  this.setState({edgePair : ePair});
  }

  removeEdge =() =>{
	  var ePair = this.state.edgePair;
	  var to = this.state.removeToEdge;
	  var from = this.state.removeFromEdge;
		for(var i=0;i<ePair.length;i++){
			if(ePair[i][0]=== from && ePair[i][1]===to){
				ePair.splice(i,1);
				break;
			}
		}
	this.setState({edgePair : ePair});
  }

  startClicked = ()=>{
      this.disable = true;
  }

  Comments = (update)=>{
    this.setState({statements:update});
  }
  
  undirected = () =>{
    this.setState({directedEdges:false});
  }

  directed = () =>{
    this.setState({directedEdges:true});
  }

  render(){
    const elements = ['one', 'two', 'three'];

    const items = []
  
    for (const [index, value] of elements.entries()) {
      items.push(<li key={index}>{value}</li>)
    }
    return (
    <div>
        <div style={{margin:"25px"}}>
            <h3>Eulerian Path</h3>
            <div>
                Eulerian Path is a path in graph that visits every edge exactly once.
                The conditions for the graph to contain an eulerian path are :
                <li>A directed graph has an Eulerian trail if and only if at most one vertex has (out-degree) − (in-degree) = 1, 
                    at most one vertex has (in-degree) − (out-degree) = 1, every other vertex has equal in-degree and out-degree.
                </li>
                <li> all of vertices of graph with nonzero degree belong to a single connected component of the underlying undirected graph.</li>
            </div>
        </div>
        <div className="justify-center">
            <h1 style={{textAlign: "center"}}> Eulerian Path</h1>
            <div style={{marginBottom:"5px",textAlign:"center"}}> 
                <div style={{marginBottom:"5px"}}>
                    <h2 style={{display:"inline"}}>Number of Vertices:</h2>
                    <Input  placeholder="please enter value" disabled = {this.disable} onChange={this.verticesOnChange} />
                </div>
                <div className="d-flex  justify-content-center" style = {{marginBottom:"5px"}}>
                    <h2 style={{display:"inline", margin:"0px 5px 0px 0px"}}>Add Edge: </h2>
                    <Input placeholder="From" style={{width:"100px"}} onChange={this.addEdgeFromChange} />
                    <Input placeholder="to" style={{width:"100px"}} onChange={this.addEdgeToChange} />
                    <Button onClick={this.addEdge}>add</Button>
                </div>
                <div className="d-flex  justify-content-center"  style = {{marginBottom:"5px"}}>
                    <h2 style={{display:"inline", margin:"0px 5px 0px 0px"}}>Remove Edge: </h2>
                    <Input placeholder="From" style={{width:"100px"}} onChange={this.removeEdgeFromChange} />
                    <Input placeholder="to" style={{width:"100px"}} onChange = {this.removeEdgeToChange} />
                    <Button onClick={this.removeEdge}>remove</Button>
                </div>
                <div>
                    <Button onClick={() => {this.undirected();}}>Undirected</Button>
                    <Button onClick={() => {this.directed();}}>Directed</Button>
                </div>
                <div style={{marginBottom : "5px"}}>
                    <Button onClick={() => {this.startClick();}}>Start</Button>
                </div>
                <div>
                    <Button onClick={() => {this.resumeClick();}}>Resume</Button>
                    <Button onClick={() => {this.pauseClick();}}>Pause</Button>
                </div>
            </div>
            <div className="container-fluid" style={{border:"10px 10px 10px 10px"}}>
                <div className="row">
                <div className="col-lg-8" style={{border:"3px solid grey"}}>
                    <Eulerian 
                        startButton ={click => this.startClick = click} 
                        resumeButton = {click => this.resumeClick = click }
                        pauseButton = {click => this.pauseClick = click }
                        vertices={ this.state.vertices} 
                        edges={this.state.edgePair} 
                        updateComments={this.Comments}
                        directed = {this.state.directedEdges}/>
                </div>
                <div className="col-lg-4" style={{border:"3px solid grey",overflowY:"scroll"}}>
                    {this.state.statements}
                </div>
                </div>
            </div>
        </div>
    </div>
    ); 
  }
}
