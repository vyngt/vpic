import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ScrollToTopButton, Layout } from "../components/layout";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore: N/A
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <>
      <NextNProgress />
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      <ScrollToTopButton />
    </>
  );
}

export default MyApp;
