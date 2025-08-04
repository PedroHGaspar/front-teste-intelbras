import type { Metadata } from "next";
import { ReactNode } from "react";
import { fonts } from "@components/styles/fonts";
import "@styles/global.css";

import { ReactQueryProvider } from "../presentation/contexts/query-client";
import { ThemeProvider } from "./theme-provider"; // novo provider para dark mode

export const metadata: Metadata = {
  title: "Defense IA | Middlewares e Centrais",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className={fonts.nunito}>
      <body>
        <ThemeProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
