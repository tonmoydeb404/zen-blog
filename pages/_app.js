import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { BookmarksContextProvider } from "../contexts/BookmarksContext";
import { ThemeContextProvider } from "../contexts/ThemeContext";
import { siteInfo } from "../lib/constant";
import "../scss/globals.scss";

const NextNProgress = dynamic(() => import("nextjs-progressbar"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        color={siteInfo.color}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={{ showSpinner: false }}
        style={{ zIndex: 999999 }}
      />
      <ThemeContextProvider>
        <BookmarksContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BookmarksContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default MyApp;
