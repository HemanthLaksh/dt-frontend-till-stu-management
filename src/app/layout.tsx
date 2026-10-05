import type { Metadata } from "next";

import "./globals.css";

import AppLayout from "@/components/layout/AppLayout/AppLayout";
import StoreProvider from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "DT Admin Portal",
  description: "DocTutorials Administration Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </StoreProvider>
      </body>
    </html>
  );
}