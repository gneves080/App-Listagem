import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Lista de Tarefas',
  description: 'Aplicacao de listagem e adicao de tarefas com Next.js 15.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
