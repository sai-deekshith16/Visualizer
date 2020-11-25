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
            <MenuItem text="EulerianTrail" data={{ route: '/Blank1' }}/>
        </Menu>
    );
}

export default MenuNavContainer;
