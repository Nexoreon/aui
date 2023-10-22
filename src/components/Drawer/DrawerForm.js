import React from 'react';
import Drawer from './Drawer';
import FormCreatorV4 from '../../../Utils/FormCreator/FormCreatorV4';

const DrawerForm = ({ title, visible, onClose, inputs, action, URL, updateItems, width, style }) => {
    return (
        <Drawer title={title} visible={visible} onCancel={() => onClose(false)} style={style} bodyStyle={{ display: 'flex', padding: '6px 24px' }}>
            {visible ? <FormCreatorV4 onCancel={() => onClose(false)} form={inputs} action={action} URL={URL} updateItems={updateItems} /> : null}
        </Drawer>
    );
};

export default DrawerForm;
