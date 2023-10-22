import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '../Button/Button';
import Messages from '../Message/Messages';

const Upload = ({ value, type, count, formats, path, onUpload }) => {
    const [dragging, setDragging] = useState(false);
    const drop = useRef(null);
    const drag = useRef(null);
    const btn = useRef(null);

    useEffect(() => {
        if (type === 'area') {
            const ref = drop.current;
            ref.addEventListener('dragover', handleDragOver);
            ref.addEventListener('drop', handleDrop);
            ref.addEventListener('dragenter', handleDragEnter);
            ref.addEventListener('dragleave', handleDragLeave);

            return () => {
                ref.removeEventListener('dragover', handleDragOver, false);
                ref.removeEventListener('drop', handleDrop, false);
                ref.removeEventListener('dragenter', handleDragEnter);
                ref.removeEventListener('dragleave', handleDragLeave);
            };
        }
    }, []);

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target === drop.current) setDragging(true);
    };

    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target !== drag.current) setDragging(false);
    };

    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async e => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const { files } = e.dataTransfer || e.target;

        if (files && files.length) {
            const formData = new FormData();
            formData.append('file', files[0], files[0].name);
            console.log(formats)

            if (count && count < files.length) {
                showMessage(`Слишком много файлов! Можно загрузить только ${count} файл${count !== 1 ? 'ов' : ''} за раз`, 'error');
                return;
            }

            if (formats && Object.values(files).some(file => !formats.some(format => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
                showMessage(`Данный тип файлов не поддерживается! Поддерживаемые форматы: ${formats.join(', ')}`, 'error');
                return;
            }

            try {
                const response = await axios.post(`https://192.168.0.100:1500/api/v1/upload/img${path ? `?path=${path}` : ''}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('user_token')}`
                    }
                });
                // eslint-disable-next-line no-console
                console.log(response);
                onUpload(response.data.data);
            } catch (e) {
                console.log(e.response)
                showMessage(`Ошибка загрузки файла! ${e}`, 'error');
            }
        }
    };

    const onUploadClick = () => {
        btn.current.click();
    };

    const onRemoveImageClick = filename => {
        const newValues = [...value].filter(img => img.filename !== filename);
        onUpload(newValues);
    };

    const showMessage = (content, type) => {
        Messages.add({ type, content });
    };

    const renderValues = () => {
        return (
            <div className="aui-upload__files">
                {value.map(({ filename, location }, index) => (
                    <div key={index} className="aui-upload__file">
                        <img
                            alt={filename}
                            src={`https://192.168.0.100/site/public/img/${path ? `${path}/` : ''}${location}`}
                            onClick={() => onRemoveImageClick(filename)}
                        />
                        <a title="Удалить" onClick={() => onRemoveImageClick(filename)}>
                            <i className="far fa-times" />
                        </a>
                    </div>
                ))}
            </div>
        );
    };

    if (type === 'button') {
        return (
            <div className="aui-upload">
                <input ref={btn} type="file" onChange={handleDrop} />
                <Button onClick={onUploadClick}>Загрузить файл</Button>
                {value && renderValues()}
            </div>
        );
    }

    return (
        <div className="aui-upload">
            <div ref={drop} className="aui-upload__area" onClick={onUploadClick}>
                <input ref={btn} type="file" onChange={handleDrop} />
                <div className="aui-upload__content">
                    <i className="far fa-upload" />
                    <h4>Нажмите или перенесите файл для загрузки</h4>
                    <p>Поддерживается следующие форматы: {formats.join(', ')}</p>
                </div>
                {dragging && (
                    <div ref={drag} className="aui-upload__content aui-upload__content--dragging">
                        <i className="fas fa-upload" />
                        <h4>Отпустите файлы для начала загрузки</h4>
                    </div>
                )}
            </div>
            {value && renderValues()}
        </div>
    );
};

export default Upload;

Upload.defaultProps = {
    type: 'area',
    count: 1,
    formats: ['jpg', 'png', 'webm']
};

Upload.propTypes = {
    type: PropTypes.oneOf(['button', 'area']),
    count: PropTypes.number,
    formats: PropTypes.instanceOf(Array),
    onUpload: PropTypes.func.isRequired
};
