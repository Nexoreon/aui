import React, { useReducer } from 'react';
import { AUIContext } from './AUIContext';
import Messages from './Message/Messages';
import Dialogs from './Dialog/Dialogs';

const initialState = {
    dialogs: [],
    messages: []
};

const AUIProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'DISPLAY_DIALOG':
                return { ...state, dialogs: [...state.dialogs, action.payload] };
            case 'REMOVE_DIALOG':
                return { ...state, dialogs: [...state.dialogs.filter(dlg => dlg.id !== action.payload)] };
            case 'ADD_MESSAGE':
                return { ...state, messages: [...state.messages, action.payload.message] };
            case 'REMOVE_MESSAGE':
                return { ...state, messages: [...state.messages.filter(msg => msg.id !== action.payload)] };
            default:
                return state;
        }
    }, initialState);

    return (
        <AUIContext.Provider value={dispatch}>
            {children}
            <Dialogs items={state.dialogs} />
            <Messages items={state.messages} />
        </AUIContext.Provider>
    );
};

export default AUIProvider;
