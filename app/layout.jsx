


import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';

export const metadata = {
  title: 'OpenSignal',
  description: 'Your go-to place for tech insights, finance tips, and personal growth.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-sans bg-gray-100 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 pt-24 pb-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}