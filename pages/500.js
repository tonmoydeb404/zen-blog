import ErrorPage from "../components/ErrorPage";

const Error500 = () => {
  return <ErrorPage errorCode={500} errorText="enternal sever error" />;
};

export default Error500;
