import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { hooks as metaMaskHooks, metaMask } from './Metamask'
import type { MetaMask } from '@web3-react/metamask'
import { Provider } from 'react-redux'
import store from './Redux/store';

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]]
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode >
    <BrowserRouter>
      <Web3ReactProvider connectors={connectors}>
        <Provider store={store} >
          <App />
        </Provider>
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
