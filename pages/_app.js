import "../styles/globals.scss";
import Head from "next/head";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Google Keep Clone</title>
        <meta name="theme-color" content="#FBBC05" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
