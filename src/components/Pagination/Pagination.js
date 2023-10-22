import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ current, total, pageSize, size, hideOnSinglePage, onChange }) => {
    const [pages, setPages] = useState(null);
    const isLeftArrowActive = current !== 1;
    const isRightArrowActive = current !== pages;

    useEffect(() => {
        handleCalcPages();
    }, []);

    const handleCalcPages = () => {
        let pages = total / pageSize;
        const hasDecimal = !Number.isInteger(pages);
        if (hasDecimal) pages = Math.floor(pages) + 1;
        setPages(pages);
    };

    const onArrowClick = dir => {
        onChange(dir === 'right' ? current + 1 : current - 1);
    };

    const renderPages = () => {
        const prevPages = [];
        const nextPages = [];
        if (current - 2 > 0) prevPages.push(current - 2);
        if (current - 1 > 0) prevPages.push(current - 1);
        if (current + 1 <= pages) nextPages.push(current + 1);
        if (current + 2 <= pages) nextPages.push(current + 2);
        const newPages = [...prevPages, current, ...nextPages];
        return newPages.map(n => {
            const page = n;
            const isActive = current === page;
            const cls = ['aui-pagination__item'];
            if (isActive) cls.push('aui-pagination__item--active');
            return (
                <a key={page} className={cls.join(' ')} onClick={() => onChange(page)}>
                    {page}
                </a>
            );
        });
    };

    if (hideOnSinglePage && pageSize >= total) return null;
    return (
        <div className={`aui-pagination aui-pagination-${size}`}>
            <a
                title="Перейти к первой странице"
                className={`aui-pagination__arrow aui-pagination__item ${!isLeftArrowActive ? 'aui-pagination__arrow--disabled' : ''}`}
                onClick={current !== 0 ? () => onChange(1) : null}
            >
                <i className="far fa-chevrons-left" />
            </a>
            <a
                title="Перейти к предыдущей странице"
                className={`aui-pagination__arrow aui-pagination__item ${!isLeftArrowActive ? 'aui-pagination__arrow--disabled' : ''}`}
                onClick={isLeftArrowActive ? () => onArrowClick('left') : null}
            >
                <i className="far fa-chevron-left" />
            </a>
            {renderPages()}
            <a
                title="Перейти к следующей странице"
                className={`aui-pagination__arrow aui-pagination__item ${!isRightArrowActive ? 'aui-pagination__arrow--disabled' : ''}`}
                onClick={isRightArrowActive ? () => onArrowClick('right') : null}
            >
                <i className="far fa-chevron-right" />
            </a>
            <a
                title="Перейти к последней странице"
                className={`aui-pagination__arrow aui-pagination__item ${!isRightArrowActive ? 'aui-pagination__arrow--disabled' : ''}`}
                onClick={current !== pages ? () => onChange(pages) : null}
            >
                <i className="far fa-chevrons-right" />
            </a>
        </div>
    );
};

Pagination.defaultProps = {
    size: 'normal',
    hideOnSinglePage: false
};

Pagination.propTypes = {
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    hideOnSinglePage: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

export default Pagination;
