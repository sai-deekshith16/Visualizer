import { Circle, geometry,Group,Text} from '@progress/kendo-drawing';
const { Circle: GeomCircle } = geometry;


export function NewCircle(center,id,colour) {
    // Create the circle geometry and shape
      const geometry = new GeomCircle(center, 15);
      const circle = new Circle(geometry, {
          fill: { color: colour}
      });
      const text = new Text( id,[center[0]-5,center[1]-5]);

      const group = new Group();
      group.append(circle,text);
  
    // Render the group on the surface
      return group;
  }
  