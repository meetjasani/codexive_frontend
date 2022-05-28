import './App.css';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import Routes from './router/Routes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import { Provider } from 'react-redux';
import * as dotenv from 'dotenv';

dotenv.config();
function App(): JSX.Element {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <LastLocationProvider>
          <Routes />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover theme='colored' />
        </LastLocationProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
