import "@styles/globals.css";

export const metadata = {
  title: "Enawga",
  description: "Chat app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg[var(--background-color)]">
        {children}
        <div id="loading-body">
          <div id="loading-spinner" />
        </div>
      </body>
    </html>
  );
}
