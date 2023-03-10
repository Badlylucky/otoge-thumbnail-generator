import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <header className='appheader'>
      <span>音ゲー風カードジェネレーター</span>
    </header>
    <div className='outframe'>
      <App/>
    </div>
  </>
);