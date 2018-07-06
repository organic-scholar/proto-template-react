import {setIn} from "@radial/helpers";

export interface Subscription {
    dispose:Function
}

export interface ActionContext<T>{

    getState?():T

    setState?(state:T);

    setInState?(path, value?);
}

export class Store<T>  {

    protected state:T;

    protected listeners = [];

    constructor(state){
        this.state = state;
    }

    getState = (): T => {
        return this.state;
    };
    setState = (state:T) => {
        this.state = state;
        this.listeners.forEach((listener)=>{
            listener(this.state);
        });
    };
    setInState = (path, value?) => {
        if(typeof path === 'string') return this.setState(setIn(this.state, path, value));
        let state = this.getState();
        Object.keys(path).forEach((key)=>{
            state = setIn(state ,key, path[key]);
        });
        return this.setState(state);
    };
    onChange(func:Function):Subscription{
        func(this.state);
        this.listeners.push(func);
        return {
            dispose: ()=>{
                let index = this.listeners.indexOf(func);
                this.listeners.splice(index, 1);
            }
        }
    }
    offChange(func:Function)
    {
        this.listeners.splice(this.listeners.indexOf(func), 1);
    }
}