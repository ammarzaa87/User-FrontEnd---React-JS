import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Table from './Components/Table';
import Header from './Components/Header'

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Header />
      <br/>
      <Table />
    </StyledEngineProvider>
  </React.StrictMode>
);