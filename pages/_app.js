import "../styles/globals.css";
import "../styles/fonts/Bebas/stylesheet.css";
import "../styles/fonts/Poppins/stylesheet.css";
import { AuthProvider } from "../components/context/AuthProvider";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
