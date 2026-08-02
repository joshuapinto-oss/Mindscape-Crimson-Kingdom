import "./globals.css";

export const metadata = {
  title: "The Couch — Psychology Topics, Backed by Research",
  description: "Pull a random psychology topic, backed by real current research, with ready content ideas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
