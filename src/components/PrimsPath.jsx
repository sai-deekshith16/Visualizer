import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Surface } from '@progress/kendo-drawing';
import { primsDrawScene } from './prims-draw-scene';
import { prims} from './modifiedPrims';
import _ from "lodash";

class PrimsPath extends React.Component {
    surface;
    constructor(props){
        super(props);
        var vertexc = ["yellow"];
        this.state={
            vertices:this.props.vertices,
            edgePair : this.props.edges,
            vertexColour : vertexc,
            directed : this.props.directed
        }
    }
    iter = 0;
    interval;
    resume = true;
    getState = () =>{
        var res =prims(this.state.edgePair,this.state.vertices);
        var len = res.length;
        this.interval = setInterval(()=>{
            if(this.resume){
                if(this.iter === len){
                    this.iter=0;
                    clearInterval(this.interval);
                    return;
                }
                else{
                    // var resVert = res[this.iter][0];
                    // var resVerCol = _.cloneDeep(this.state.vertexColour);
                    
                    // for(let item of resVert.visited){
                        //     resVerCol[item] = "green";
                        // }
                        
                        // for(let item of resVert.unvisited){
                            //     resVerCol[item] = "yellow";
                            // }
                            // console.log(res[this.iter][1]);
                            // this.setState({edgePair : res[this.iter][1], vertexColour: resVerCol},()=> { primsDrawScene(
                                //     this.surface,
                                //     this.state.vertices,
                                //     this.state.edgePair,
                                //     this.state.vertexColour
                                // ); });
                                
                                
                                var resVer = res[this.iter][0];
                                var resVerCol = this.state.vertexColour;
                                if(resVer >=0){
                                    resVerCol[resVer] = "green";
                                }
                                var edgepairs = this.state.edgePair;
                                var resEdges = res[this.iter][1];
                                for(var i=0;i<resEdges.length;i++){
                                    var temp = resEdges[i].edge;
                                    for(var j=0;j<edgepairs[temp[0]].length;j++){
                                        if(edgepairs[temp[0]][j].node === temp[1]){
                                            edgepairs[temp[0]][j].colour = resEdges[i].colour;
                                            break;
                                        }
                                    }
                                }
                                
                                this.setState({edgePair : edgepairs, vertexColour: resVerCol},()=> { primsDrawScene(
                                    this.surface,
                                    this.state.vertices,
                                    this.state.edgePair,
                                    this.state.vertexColour
                                    ); });
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

    componentDidMount() {        
        this.props.startButton(this.getState);
        this.props.resumeButton(this.running);
        this.props.pauseButton(this.pause);
        primsDrawScene(this.createSurface(),this.state.vertices,this.state.edgePair,this.state.vertexColour,this.state.directed);
    }

    

    componentDidUpdate(prevProps,prevState){
        if(prevProps !== this.props ){
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

export default PrimsPath;