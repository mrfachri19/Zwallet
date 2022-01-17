import Head from "next/head";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap";
import { ToastContainer } from "react-toastify";

// REDUX
import { Provider } from "react-redux";
import { store, persistor } from "../stores/store";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
          <ToastContainer autoClose={2000} pauseOnHover={false} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
