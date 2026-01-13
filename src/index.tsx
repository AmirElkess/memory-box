import React from 'react';
import ReactDOM from 'react-dom/client';
import MemoryBoxApp from './MemoryBoxApp';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MemoryBoxApp />
  </React.StrictMode>
);