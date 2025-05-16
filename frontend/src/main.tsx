import React from 'react'; // ✅ Needed for JSX
import ReactDOM from 'react-dom/client'; // ✅ Needed for createRoot
import { BrowserRouter } from 'react-router-dom'; // ✅ For routing
import App from './App'; // ✅ Your main App component

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
