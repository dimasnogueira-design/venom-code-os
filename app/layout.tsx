import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VENOM CODE OS',
  description: 'AI-Native Digital Agency Operating System',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}