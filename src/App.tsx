import * as React from "react";
import {PureComponent} from "./common/Component";
import {AppState} from "./AppState";
import { HashRouter } from "react-router-dom";


export class App extends PureComponent<AppState, {}>
{
    render()
    {
        return  <HashRouter>
            <div>
                Hello World

            </div>
        </HashRouter>
    }
}

