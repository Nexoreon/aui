import { createContext, useContext } from 'react';
import { nanoid } from 'nanoid';

export const AUIContext = createContext();
export const useDialog = () => {
    const dispatch = useContext(AUIContext);

    function remove(id) {
        dispatch({
            type: 'REMOVE_DIALOG',
            payload: id
        });
    }

    function create(payload) {
        const id = nanoid(6);
        dispatch({
            type: 'DISPLAY_DIALOG',
            payload: {
                ...payload,
                id,
                visible: true,
                onCancel: () => {
                    if (payload.onCancel) payload.onCancel();
                    remove(id);
                }
            }
        });
    }

    return { remove, create };
};

export const useMessage = () => {
    const dispatch = useContext(AUIContext);

    function remove(id) {
        dispatch({
            type: 'REMOVE_MESSAGE',
            payload: id
        });
    }

    function add(payload) {
        dispatch({
            type: 'ADD_MESSAGE',
            payload: {
                message: {
                    id: nanoid(6),
                    ...payload
                }
            }
        });
    }

    return { add, remove };
};

export const DropdownContext = createContext();
export function useDropdownContext() {
    const context = useContext(DropdownContext);
    if (!context) throw new Error("Component Item can't be used without parent component Dropdown");
    return context;
}

export const SelectContext = createContext();
export function useSelectContent() {
    const context = useContext(SelectContext);
    if (!context) throw new Error('Item selector compound components should be used only with Select');
    return context;
}

export const TabsContext = createContext();
export function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) throw new Error("Component Tab can't be used without parent component Tabs");
    return context;
}
