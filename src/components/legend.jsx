import React from 'react';
import './legend.css';

function Legend(){
    return(
        <div className='legend-container' id='legend-container'>
            <div className='legend-title' id='legend-title'>
                Legend
            </div>
            <div className='legend-list-container' id='legend-list-container'>
                <div className='legend-line' id='legend-line-one'>
                    <div className='node-legend start-node-legend' id='start-node-legend' />
                    <div className='legend-description' id='legend-description-one'>
                        Starting Point
                    </div>
                </div>
                <div className='legend-line' id='legend-line-two'>
                    <div className='node-legend end-node-legend' id='end-node-legend' />
                    <div className='legend-description' id='legend-description-two'>
                        Ending Point
                    </div>
                </div>
                <div className='legend-line' id='legend-line-three'>
                    <div className='node-legend' id='node-legend'/>
                    <div className='legend-description' id='legend-description-three'>
                        Unexplored
                    </div>
                </div>
                <div className='legend-line' id='legend-line-four'>
                    <div className='node-legend wall-node-legend' id='wall-node-legend' />
                    <div className='legend-description' id='legend-description-four'>
                        Wall
                    </div>
                </div>
                <div className='legend-line' id='legend-line-five'>
                    <div className='node-legend considering-node-legend' id='considering-node-legend' />
                    <div className='legend-description' id='legend-description-five'>
                        Explored Path
                    </div>
                </div>
                <div className='legend-line' id='legend-line-six'>
                    <div className='node-legend path-node-legend' id='path-node-legend' />
                    <div className='legend-description' id='legend-description-six'>
                        Quickest Path
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Legend;