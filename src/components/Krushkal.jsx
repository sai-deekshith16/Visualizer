import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Surface } from '@progress/kendo-drawing';
import { krushkalDrawScene} from './krushkal-draw-scene';
import {krushkal} from './krushkalalgo';

class Krushkal extends React.Component {
    surface;
    started = false;
    constructor(props){
        super(props);
        this.state={
            vertices:this.props.vertices,
            edgePair : this.props.edges,
            vertexColour : [],
        }
    }
    iter = 0;
    interval;
    resume = true;
    getState = () =>{
        var res = krushkal(this.state.vertices,this.state.edgePair);
        var len = res.length;
        this.interval = setInterval(()=>{
            if(this.resume){

                if(this.iter-1 === len){
                    this.iter=0;
                    this.updateColor(3);
                    clearInterval(this.interval);
                    return;
                }
                if(this.iter===0){
                    var ePair = this.state.edgePair;
                    for(var i=0;i<ePair.length;i++){
                        for(var j=0;j<ePair[i].length;j++){
                            ePair[i][j].colour = "blue";
                        }
                    }
                    this.updateColor(0);
                    this.setState({
                        edgePair : ePair
                    },()=>{
                        krushkalDrawScene(
                         this.createSurface(),
                         this.state.vertices,
                         this.state.edgePair,
                         this.state.vertexColour,
                         null
                        )
                    });
                }
                else{
                    var curedge = res[this.iter-1];
                    var verColour = this.state.vertexColour;
                    if(curedge.colour === "green" || curedge.colour === "white"){
                        this.updateColor(2);
                    }
                    else{
                        this.updateColor(1);
                    }
                    if(curedge.colour !== "white" && verColour[curedge.from] !== "green"){
                        verColour[curedge.from] = curedge.colour;
                    }
                    if(curedge.colour !== "white" && verColour[curedge.to] !== "green"){
                        verColour[curedge.to] = curedge.colour;
                    }
                    var temp = null;
                    if(curedge.colour === "green"){
                        temp = curedge;
                    }
                    var edgePairs = this.state.edgePair;
                    for(var i=0;i<edgePairs[curedge.from].length;i++){
                        if(edgePairs[curedge.from][i].node === curedge.to){
                            edgePairs[curedge.from][i].colour = curedge.colour;
                            break;
                        }
                    }
                    this.setState({
                        vertexColour: verColour,
                        edgePair : edgePairs
                    },()=>{
                        krushkalDrawScene(
                         this.createSurface(),
                         this.state.vertices,
                         this.state.edgePair,
                         this.state.vertexColour,
                         temp
                        )
                    });
                }
                this.iter += 1;
            }
        },2000);
    }

    running = ()=>{
        this.resume = true;
    }

    pause = () =>{
        this.resume = false;
    }
    
    updateColor = (count)=>{
        this.props.updateAlgo(count);
    }

    componentDidMount() {        
        this.props.startButton(this.getState);
        this.props.resumeButton(this.running);
        this.props.pauseButton(this.pause);
        krushkalDrawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,null);
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps !== this.props && !this.started){
            let ver = [];
            for(let i=0;i<this.props.vertices;i++){
                ver.push("yellow");
            }
            this.setState(
            {   
                vertices : this.props.vertices,
                edgePair : this.props.edges,
                vertexColour : ver,
             },()=>{ 
                 krushkalDrawScene(
                     this.createSurface(),
                     this.state.vertices,
                     this.state.edgePair,
                     this.state.vertexColour,
                     null
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

export default Krushkal;