import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Surface } from '@progress/kendo-drawing';
import { drawScene } from './draw-scene';
import {Trail} from './EulerianTrial';

class EulerianTrail extends React.Component {
    surface;
    constructor(props){
        super(props);

        var edgec = [];
        var vertexc = [];
        this.state={
            vertices:this.props.vertices,
            edgePair : this.props.edges,
            vertexColour : vertexc,
            edgeColour: edgec,
            directed : this.props.directed
        }
    }
    iter = 0;
    interval;
    resume = true;
    getState = () =>{
        var res = Trail(this.state.edgePair,this.state.vertices,this.state.directed);
        var latestStatements = [];
        if(res === null){
            return;
        }
        this.updateComments(latestStatements);
        var v1,v2,vc,v;
        var trail = res.trail.join(" ");
        this.interval = setInterval(()=>{
            if(this.resume){            
                if(this.iter >= res.vertices.length){
                    latestStatements.unshift(<li>The final paths is {trail}</li>);
                    this.updateComments(latestStatements);
                    this.iter = 0;
                    clearInterval(this.interval);
                    return;
                }
                if (this.iter === 0 ) {
                    v = res.vertices[this.iter];
                    vc = this.state.vertexColour;

                    latestStatements.unshift(<li>The starting vertex is {v}</li>);
                    this.updateComments(latestStatements);
                    vc[v] = "pink";
                    this.setState({vertexColour : vc},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour,this.state.directed);});
                    this.iter+=1;
                }
                else{
                    v1 = res.vertices[this.iter-1];
                    v2 = res.vertices[this.iter];
                    vc = this.state.vertexColour;
                    var index,ep,ec,i;
                    if(v2 >0 && v1<0){
                        vc[v2] = "#ff00ff";
                        v1 = v1+ 51;
                        vc[v1] = "#006400";                    
                        ep = this.state.edgePair;
                        console.log(v1,v2,"condition1");

                        for(i=0;i<ep.length;i++){
                            if((ep[i][0]===v2 && ep[i][1] === v1) || (ep[i][0]===v1 && ep[i][1] === v2)){
                                index = i;
                                break;
                            }
                        }
                        ec = this.state.edgeColour;
                        ec[index] = "#008000";
                        this.setState({vertexColour:vc,edgeColour:ec},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour,this.state.directed);});
                    }
                    else if(v1 <0 && v2<0){
                        v2 = v2 + 51;
                        vc[v2] = "#ff00ff";
                        v1 = v1 + 51;
                        vc[v1] = "#006400"; 
                        ep = this.state.edgePair;
                        console.log(v1,v2,"condition2");
                        latestStatements.unshift(<li>Backtracking the edge from {v2} to {v1} and adding it to the trail.</li>)

                        
                        for(i=0;i<ep.length;i++){
                            if((ep[i][0]===v2 && ep[i][1] === v1) || (ep[i][0]===v1 && ep[i][1] === v2)){
                                index = i;
                                break;
                            }
                        }
                        ec = this.state.edgeColour;
                        ec[index] = "#008000";
                        this.updateComments(latestStatements);
                        this.setState({vertexColour:vc,edgeColour:ec},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour,this.state.directed);});
                    }
                    else if(v2<0 && v1>0){
                        v2 = v2 + 51;
                        vc[v2] = "#006400";
                        vc[v1] = "#ff00ff";
                        ep = this.state.edgePair;
                        console.log(v1,v2,"condition3");

                        if(v1===v2){
                        latestStatements.unshift(<li>No non visited egdes at vertex {v1}. Hence backTracking.</li>)
                        }

                        for(i=0;i<ep.length;i++){
                            if((ep[i][0]===v2 && ep[i][1] === v1) || (ep[i][0]===v1 && ep[i][1] === v2)){
                                index = i;
                                break;
                            }
                        }
                        ec = this.state.edgeColour;
                        ec[index] = "#008000";
                        this.updateComments(latestStatements);
                        this.setState({vertexColour:vc,edgeColour:ec},()=>{
                            drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour,this.state.directed);}
                            );                  
                    }
                    else{
                        //console.log(ec);
                        vc[v1] = "yellow";
                        vc[v2] = "#ff00ff";
                        ep = this.state.edgePair;
                        console.log(v1,v2,"condition4");
                        if(v1 !== v2 && v1>0 && v2>0){                        
                            for(i=0;i<ep.length;i++){
                                if((ep[i][0]===v1 && ep[i][1] === v2) || (ep[i][0]===v2 && ep[i][1] === v1)){
                                    index = i;
                                    break;
                                }
                            }
                            ec = this.state.edgeColour;
                            ec[index] = "#483d8b";
                            latestStatements.unshift(<li>Visited edge from {v1} to {v2}. The current vertex is {v2}</li>);
                            this.updateComments(latestStatements);
                            this.setState({vertexColour:vc,edgeColour:ec},()=>{
                                drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour,this.state.directed);
                            });   
                        }
                        else{
                            latestStatements.unshift(<li>Searching for unvisited vertex at {v2}</li>);
                            this.updateComments(latestStatements);
                            this.setState({vertexColour:vc,edgeColour:ec},()=>{
                                drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour,this.state.directed);
                            });
                        }               
                    }                
                    this.iter +=1;
                }
            }
        },2000);
    }
    running = ()=>{
        this.resume = true;
    }

    pause = () =>{
        this.resume = false;
    }
    
    updateComments = (stmnts) =>{
        this.props.updateComments(stmnts);
    }

    componentDidMount() {        
        this.props.startButton(this.getState);
        this.props.resumeButton(this.running);
        this.props.pauseButton(this.pause);
        drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.directed);
    }

    

    componentDidUpdate(prevProps,prevState){
        if(prevProps !== this.props ){
            let ver = [];
            for(let i=0;i<this.props.vertices;i++){
                ver.push("yellow");
            }
            let edgc = [];
            for(let i=0;i<this.props.edges.length;i++){
                edgc.push("#9999b6");
            }
            this.setState(
            {   vertices : this.props.vertices,
                edgePair : this.props.edges,
                vertexColour : ver,
                edgeColour : edgc,
                directed : this.props.directed
             },()=>{ 
                    drawScene(
                        this.createSurface(),
                        this.state.vertices,
                        this.state.edgePair,
                        this.state.vertexColour,
                        this.state.edgeColour,
                        this.state.directed
                ); 
            });
            
        }
    }

    createSurface = () => {
        const element = ReactDOM.findDOMNode(this);

        this.surface = Surface.create(element);

        return this.surface;
    }
    render() {
        return (<div id="surface" style={{height:"1500px"}}></div>
        );
    }
}

export default EulerianTrail;