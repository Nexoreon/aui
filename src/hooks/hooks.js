import { useEffect } from 'react';

// accepts reference, condition and callback
// eslint-disable-next-line import/prefer-default-export
export const useOutsideAlerter = (ref, cond, cb) => {
    useEffect(() => {
        const handleClickOutside = event => {
            if (Array.isArray(ref)) {
                const isOutsideClick = [];
                const elems = ref.map(el => el.current);
                elems.map(el => {
                    if (el && !el.contains(event.target)) isOutsideClick.push(true);
                });
                if (isOutsideClick.length === elems.length) cb(false);
            }

            if (ref.current && !ref.current.contains(event.target)) {
                cb(false);
            }
        };

        if (cond) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, cond]);
};
