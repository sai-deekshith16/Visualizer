import React from "react";

import Eulerian from "./EulerianTrail";
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';

export default class Blank1 extends React.Component{
    disable;
  constructor(props){
    super(props);
    this.disable = false;
	this.state = {addToEdge : 0,
				addFromEdge: 0,
				removeToEdge : 0,
				removeFromEdge: 0,
				vertices : 0,
				edgePair: []}
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
  
  render(){
    return (
    <div className="justify-center">
      <h1 style={{textAlign: "center"}}> Eulerian Trail</h1>
      <div style={{marginBottom:"5px",textAlign:"center"}}> 
		<div style={{marginBottom:"5px"}}>
          <h2 style={{display:"inline"}}>Number of Vertices:         
          </h2>
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
        <div style={{marginBottom : "5px"}}>
          <Button onClick={() => {this.startClick();}}>Start</Button>
        </div>
        <div>
          <Button onClick={() => {this.resumeClick();}}>Resume</Button>
          <Button onClick={() => {this.pauseClick();}}>Pause</Button>
        </div>
      </div>
      <Eulerian 
            startButton ={click => this.startClick = click} 
            resumeButton = {click => this.resumeClick = click }
            pauseButton = {click => this.pauseClick = click }
            vertices={ this.state.vertices} 
            edges={this.state.edgePair} />
    </div>
    ); 
  }
}
