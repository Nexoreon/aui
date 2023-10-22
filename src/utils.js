/* eslint-disable import/prefer-default-export */
export const defineIcon = type => {
    let icon;
    if (type === 'confirm' || type === 'info' || !type) {
        icon = 'circle-info';
    } else if (type === 'success') {
        icon = 'circle-check';
    } else if (type === 'warning') {
        icon = 'circle-exclamation';
    } else if (type === 'error') {
        icon = 'circle-xmark';
    }
    return icon;
};
