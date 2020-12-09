import React, { Fragment } from 'react';
import loadingAnim from './loadingAnim.svg';

export default () => (
    <Fragment>
        <img 
            src={loadingAnim}
            alt='Loading...' 
            style={{ width: '100px', margin: 'auto', display: 'block', 
                    position: 'absolute' , top: '50%', transform: 'translate(-50%,-50%)',
                    left: '50%'}} 
        />
    </Fragment>
);