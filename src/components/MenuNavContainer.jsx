import React from 'react';
import { Menu, MenuItem } from '@progress/kendo-react-layout';
import { useHistory } from 'react-router-dom';


const MenuNavContainer = (props) => {
    const history = useHistory();
    const onSelect = (event) => {
        history.push(event.item.data.route);
    }
    return (
        <Menu onSelect={onSelect}>
            <MenuItem text="Home" data={{ route: '/' }}/>
            <MenuItem text="EulerianTrail" data={{ route: '/Eulerian' }}/>
            <MenuItem text="Prim's Algorithm" data = {{route : '/Prims'}}/>
            <MenuItem text="Krushkal Algorithm" data = {{route : '/Krushkal'}}/>
        </Menu>
    );
}

export default MenuNavContainer;
