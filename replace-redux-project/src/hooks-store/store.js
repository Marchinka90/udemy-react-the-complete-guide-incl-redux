import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shuldListen = true) => {
    const setState = useState(globalState)[1];

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = { ...globalState, ...newState };

        for (const listener of listeners) {
            listener(globalState);
        }
    }
    
    useEffect(() => {
        if (shuldListen) {
            listeners.push(setState);
        }

        return () => {
            if (shuldListen) {
                listeners = listeners.filter(li => li !== setState);
            }
        };
    }, [setState, shuldListen]);

    return [globalState, dispatch];
}

export const initStore = (userAction, initialState) => {
    if (initialState) {
        globalState = {...globalState, ...initialState};
    }
    actions = {...actions, ...userAction};
};