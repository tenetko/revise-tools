import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Airate from '../pages/Airate';
import Start from '../pages/Start';

const Routes: React.FC = () => (
    <Switch>
        <Route exact path="/" component={Start}/>
        <Route exact path="/airate" component={Airate}/>
    </Switch>
);

export default Routes;