import React from 'react';
import ComponentsIcon from './img/components.svg';
import StylesIcon from './img/styles.svg';
import BlogsIcon from './img/blogs.svg';
import TutorialsIcon from './img/tutorials.svg';
import Kendoka from './img/kendoka.svg';

const Home = (props) => {
    return (
        <div className="container mt-5">
            <div className='row'>
                <div className='col-12'>
                    <h1 className='welcome mb-0'>Welcome to Visualizer</h1>
                    <h2 className='sub-header mt-0'>This application helps the user to visualize the Eulerain Trail/Path</h2>
                </div>
            </div>
        </div>
    )
}

export default Home;
