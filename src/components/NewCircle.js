import { Circle, geometry,Group,Text} from '@progress/kendo-drawing';
const { Circle: GeomCircle } = geometry;


export function NewCircle(center,id,colour) {
      var circle = new Circle(new GeomCircle(center, 10), {
        fill: {
            color: colour
        }
    });
      const text = new Text( id,[center[0]-5,center[1]-5]);

      const group = new Group();
      group.append(circle,text);
      return group;
  }
  