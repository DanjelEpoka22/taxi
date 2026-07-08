import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../lib/context';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata = {
  title: 'Taxi Elbasan | Transferta Aeroporti Rinas & Tiranë',
  description: 'Taxi privat në Elbasan. Transferta drejt Aeroportit të Rinasit, Tiranës dhe çdo destinacioni tjetër. Rezervim i shpejtë në WhatsApp, çmim i qartë.',
  keywords: ['taxi elbasan', 'taxi aeroport rinas', 'transferta elbasan tirane', 'airport transfer elbasan'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="sq">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-asphalt text-cream antialiased`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
