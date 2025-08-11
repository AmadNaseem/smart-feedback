
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThemeProvider } from '../components/ThemeProvider';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen flex flex-col items-center justify-center font-sans">
        {/* Animated gradient background */}
        <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 opacity-90" />
        <Navbar />
        <main className="flex-1 w-full max-w-3xl flex flex-col items-center justify-center px-4 py-8">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
