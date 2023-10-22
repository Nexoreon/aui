import React from 'react'
import { createRoot } from 'react-dom/client';
import { Button, Tag } from './index';
import { BrowserRouter } from 'react-router-dom';
import './styles/tests.scss';


const LibraryShowcase = () => {
    return (
        <div>
            <Button>test</Button>
            <Tag>test2</Tag>
        </div>
  )
};

const test = (
    <BrowserRouter>
        <LibraryShowcase />
    </BrowserRouter>
);

const root = createRoot(document.getElementById('root'));
root.render(test);

export default LibraryShowcase;
