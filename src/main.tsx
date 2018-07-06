import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppState} from "./AppState";
import {App} from "./App";
import {AppStore} from "./AppStore";
import * as PropTypes from 'prop-types';

let store = new AppStore(new AppState());

class Main extends React.Component<{},{}>{

    state = store.getState();

    static childContextTypes = {
        getStore: PropTypes.func
    };

    getChildContext(){
        return {getStore: ()=> store};
    }
    componentDidMount()
    {
        store.onChange((state)=>
        {
            this.setState(state);
        });
    }
    render(){
        return <App {...this.state}/>
    }
}


window.onload = function()
{
    ReactDOM.render(
        <Main/>, document.getElementById('app')
    );
};

