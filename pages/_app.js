import Layout from "../components/Layout";
import { BookmarksContextProvider } from "../contexts/BookmarksContext";
import { ThemeContextProvider } from "../contexts/ThemeContext";
import "../scss/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <BookmarksContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BookmarksContextProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
