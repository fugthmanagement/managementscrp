import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata = {
  title: "Fugth Management",
  description: "Luxury AI operations dashboard for calls, marketing, and executive consulting.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
