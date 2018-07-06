import * as React from 'react';
import * as PropTypes from 'prop-types';
import {AppStore} from "../AppStore";


export interface IContext {
    getStore():AppStore
}

let contextTypes = {
    getStore: PropTypes.func,
};

export class PureComponent<T, V> extends React.PureComponent<T, V>
{
    static contextTypes = contextTypes;

    context:IContext;
}
