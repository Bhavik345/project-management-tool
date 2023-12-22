import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Modal from 'react-modal';
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RTKProvider } from "./providers/rtk-provider.jsx";


Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <RTKProvider>
        <App />
      </RTKProvider>
    </BrowserRouter>
  </>
);
