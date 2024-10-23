import '@styles/globals.css';

export const metadata = {
  title: 'Enawga',
  description: 'Chat app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
