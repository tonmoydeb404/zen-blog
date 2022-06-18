import Layout from "../components/Layout";
import { BookmarksContextProvider } from "../contexts/BookmarksContext";
import "../scss/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <BookmarksContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BookmarksContextProvider>
  );
}

export default MyApp;
