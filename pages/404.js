import Head from "next/head";
import ErrorPage from "../components/ErrorPage";
import { siteInfo } from "../lib/constant";

const Error404 = () => {
  return (
    <>
      <Head>
        <title>{`404 Error - ${siteInfo.fullName}`}</title>
      </Head>
      <ErrorPage />;
    </>
  );
};

export default Error404;
