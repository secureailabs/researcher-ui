import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from 'src/reportWebVitals';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import App from './App';
import { ConfigProvider } from 'src/contexts/ConfigContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { initAmplitude } from './utils/Amplitude/amplitude';
import { OpenAPI } from './tallulah-ts-client';
import './App.css';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

initAmplitude();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

OpenAPI.BASE = process.env.REACT_APP_SAIL_API_SERVICE_URL as string;

root.render(
  <Provider store={store}>
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
