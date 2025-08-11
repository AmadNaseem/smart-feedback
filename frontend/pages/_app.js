
import { ThemeProvider } from '../components/ThemeProvider';
import LayoutShell from '../components/LayoutShell';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <LayoutShell>
        <Component {...pageProps} />
      </LayoutShell>
    </ThemeProvider>
  );
}
