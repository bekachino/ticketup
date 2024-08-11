import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';
import { Provider } from 'react-redux';
import { addInterceptors } from './axiosApi';
import { ThemeProvider, createTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale/';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
}, ruRU);

const root = ReactDOM.createRoot(document.getElementById('root'));

addInterceptors(store);

root.render(<ThemeProvider theme={darkTheme}>
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </PersistGate>
</ThemeProvider>);
