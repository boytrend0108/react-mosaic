import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app';
import { store } from './app/configs/storeConfig';

const APP_ELEMENT = document.getElementById('app');

if (APP_ELEMENT) {
  const root = createRoot(APP_ELEMENT);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
