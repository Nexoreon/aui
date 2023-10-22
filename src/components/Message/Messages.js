import React from 'react';
import { createPortal } from 'react-dom';
import { useMessage } from '../AUIContext';
import Message from './Message';

const Messages = ({ items }) => {
    const message = useMessage();
    Messages.add = message.add;
    Message.remove = message.remove;

    const renderMessages = () => {
        return items.map(msg => <Message key={msg.id} handleRemoveMsg={() => message.remove(msg.id)} {...msg} />);
    };

    if (!items.length) return null;
    const body = <div className="aui-messages">{renderMessages()}</div>;
    return createPortal(body, document.body);
};

export default Messages;
