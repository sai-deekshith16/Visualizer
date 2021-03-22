import {NewCircle} from "./NewCircle";
import { Group } from '@progress/kendo-drawing';


export function testDrawScene(ver) {
    var x = 900;
    var y = 75;
    var group  = new Group();
    for(var i=0;i<ver;i++){
        x = (x+200);
        if(x>=1500){
            x = 100;
            y = y+ 200;
        }
        var cir = NewCircle([x,y],String(i),"yellow");
        group.append(cir);
    }
    return group;
}