import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Surface } from '@progress/kendo-drawing';
import { primsDrawScene } from './prims-draw-scene';
import { prims} from './modifiedPrims';
import _ from "lodash";

class PrimsPath extends React.Component {
    surface;
    started = false;
    constructor(props){
        super(props);
        this.state={
            vertices:this.props.vertices,
            edgePair : this.props.edges,
            vertexColour : [],
            directed : this.props.directed
        }
    }
    iter = 0;
    interval;
    resume = true;
    getState = () =>{
        this.started = true;
        var res =prims(this.state.edgePair,this.state.vertices);
        var len = res.length;
        var treeEdges = [];
        this.interval = setInterval(()=>{
            if(this.resume){
                if(this.iter === len){
                    this.iter=0;
                    clearInterval(this.interval);
                    this.updateColor(5);
                    return;
                }
                else{
                    if(this.iter === 0){
                        this.updateColor(0);
                    }
                    else if(this.iter === 1){
                        this.updateColor(1);
                    }
                    console.log(res[this.iter]);
                    var resVer = res[this.iter][0];
                    var resVerCol = this.state.vertexColour;
                    if(resVer >=0){
                        resVerCol[resVer] = "green";
                        if(this.iter!==0){
                            this.updateColor(2);
                            setTimeout(() =>{
                                this.updateColor(3);                                
                            },1500);
                        }
                    }
                    var edgepairs = this.state.edgePair;
                    var resEdges = res[this.iter][1];
                    if(resEdges.length >0 && resEdges[0].colour === "white"){
                        this.updateColor(2);
                    }
                    else if(resEdges.length >0 && resEdges[0].colour === "blue" && this.iter !==1){
                        this.updateColor(4);
                    }
                    else if(resVer <0 && resEdges.length===0){
                        this.updateColor(4);
                    }
                    var greendEdge = null;
                    for(var i=0;i<resEdges.length;i++){
                        var temp = resEdges[i].edge;
                        for(var j=0;j<edgepairs[temp[0]].length;j++){
                            if(edgepairs[temp[0]][j].node === temp[1]){
                                edgepairs[temp[0]][j].colour = resEdges[i].colour;
                                var weig = edgepairs[temp[0]][j].weight;
                                if(resEdges[i].colour === "green"){
                                    greendEdge = [temp[0],temp[1],weig,"green"]
                                    treeEdges.push(greendEdge);
                                }
                                break;
                            }
                        }
                    }
                    
                    this.setState({edgePair : edgepairs, vertexColour: resVerCol},()=> { primsDrawScene(
                        this.createSurface(),
                        this.state.vertices,
                        this.state.edgePair,
                        this.state.vertexColour,
                        greendEdge,
                        resVer,
                        treeEdges
                        ); });
                    }
                    this.iter += 1;
                }
        },3000);
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
        primsDrawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,null,-1,[]);
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
                directed : this.props.directed
             },()=>{ 
                    primsDrawScene(
                        this.createSurface(),
                        this.state.vertices,
                        this.state.edgePair,
                        this.state.vertexColour,
                        null,
                        -1,
                        []
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

export default PrimsPath;