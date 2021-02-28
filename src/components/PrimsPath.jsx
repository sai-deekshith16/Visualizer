import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Surface } from '@progress/kendo-drawing';
import { primsDrawScene } from './prims-draw-scene';
import { prims} from './prims';

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
        console.log(res);
        this.setState({edgePair : res},()=> { primsDrawScene(
             this.surface,
             this.state.vertices,
             this.state.edgePair,
             this.state.vertexColour
         ); });
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