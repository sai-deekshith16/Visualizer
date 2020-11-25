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
            edgeColour: edgec
        }
    }
    iter = 0;
    getState = () =>{
        var res = Trail(this.state.edgePair,this.state.vertices);
        var prev = null;
        var cur = null;
        setInterval(()=>{
            if (this.iter === 0 ) {
                var v = res.vertices[this.iter];
                var vc = this.state.vertexColour;
                vc[v] = "pink";
                this.setState({vertexColour : vc},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour);});
                this.iter+=1;
            }
            else{
                var v1 = res.vertices[this.iter-1];
                var v2 = res.vertices[this.iter];
                var vc = this.state.vertexColour;
                if(v2 >0 && v1<0){
                    v2 = v2;
                    vc[v2] = "#ff00ff";
                    v1 = v1+ 51;
                    vc[v1] = "#006400";                    
                    var ep = this.state.edgePair;
                    console.log(v1,v2);

                    var index;
                    for(var i=0;i<ep.length;i++){
                        if(ep[i][0]===v2 && ep[i][1] === v1){
                            index = i;
                            console.log("here");
                            break;
                        }
                    }
                    console.log(index);
                    var ec = this.state.edgeColour;
                    ec[index] = "#008000";
                    this.setState({vertexColour:vc,edgeColour:ec},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour);});
                }
                else if(v1 <0 && v2<0){
                    v2 = v2 + 51;
                    vc[v2] = "#ff00ff";
                    v1 = v1 + 51;
                    vc[v1] = "#006400"; 
                    var ep = this.state.edgePair;
                    console.log(v1,v2);

                    var index;
                    for(var i=0;i<ep.length;i++){
                        if(ep[i][0]===v2 && ep[i][1] === v1){
                            index = i;
                            console.log("here");

                            break;
                        }
                    }
                    console.log(index);
                    var ec = this.state.edgeColour;
                    ec[index] = "#008000";
                    this.setState({vertexColour:vc,edgeColour:ec},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour);});
                }
                else if(v2<0 && v1>0){
                    v2 = v2 + 51;
                    vc[v2] = "#006400";
                    v1 = v1;
                    vc[v1] = "#ff00ff";
                    var ep = this.state.edgePair;
                    var index;
                    console.log(v1,v2);

                    for(var i=0;i<ep.length;i++){
                        if(ep[i][0]===v2 && ep[i][1] === v1){
                            index = i;
                            console.log("here");
                            break;
                        }
                    }
                    console.log(index);
                    var ec = this.state.edgeColour;
                    ec[index] = "#008000";
                    this.setState({vertexColour:vc,edgeColour:ec},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour);});                  
                }
                else{
                    //console.log(ec);
                    vc[v1] = "yellow";
                    vc[v2] = "#ff00ff";
                    var ep = this.state.edgePair;
                    var index;
                    console.log(v1,v2);

                    for(var i=0;i<ep.length;i++){
                        if(ep[i][0]===v1 && ep[i][1] === v2){
                            index = i;
                            console.log("here");
                            break;
                        }
                    }
                    console.log(index);
                    var ec = this.state.edgeColour;
                    ec[index] = "#483d8b";
                    this.setState({vertexColour:vc,edgeColour:ec},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour);});                  
                }                
                this.iter +=1;
            }
            
        },1000);
    }

    componentDidMount() {
        this.props.setClick(this.getState);
        drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour);
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
            this.setState({vertices : this.props.vertices},()=>{ drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour); });
            this.setState({edgePair : this.props.edges},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour);});            
            this.setState({vertexColour : ver},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour);});
            this.setState({edgeColour : edgc},()=>{drawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.edgeColour);});                        
        }
    }

    createSurface = () => {
        const element = ReactDOM.findDOMNode(this);

        this.surface = Surface.create(element);

        return this.surface;
    }
    render() {
        return (<div id="surface"  style={ {height:"2000px"}}/>);
    }
}

export default EulerianTrail;