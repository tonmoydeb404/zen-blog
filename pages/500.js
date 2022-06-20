import Head from "next/head";
import ErrorPage from "../components/ErrorPage";
import { siteInfo } from "../lib/constant";

const Error500 = () => {
  return (
    <>
      <Head>
        <title>Error - {siteInfo.fullName}</title>
      </Head>
      <ErrorPage errorCode={500} errorText="enternal sever error" />
    </>
  );
};

export default Error500;
