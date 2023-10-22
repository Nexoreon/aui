import React from 'react';
import Dialog from './Dialog';
import { useDialog } from '../AUIContext';

const Dialogs = ({ items }) => {
    const dialog = useDialog();
    Dialogs.create = dialog.create;
    Dialogs.remove = dialog.remove;

    const renderDialogs = () => {
        return items.map(dlg => <Dialog key={dlg.id} {...dlg} />);
    };

    if (!items.length) return null;
    return renderDialogs();
};

export default Dialogs;
