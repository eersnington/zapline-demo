import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { NowPlayingContextProvider } from "react-nowplaying";
import classNames from "classnames";
import localFont from "next/font/local";
import Script from "next/script";

import { DeepgramContextProvider } from "./context/Deepgram";
import { MessageMetadataContextProvider } from "./context/MessageMetadata";
import { AudioStoreContextProvider } from "./context/AudioStore";
import { ToastContextProvider } from "./context/Toast";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { PHProvider } from "./context/PostHogProvider";

const inter = Inter({ subsets: ["latin"] });
const favorit = localFont({
  src: "./fonts/ABCFavorit-Bold.woff2",
  variable: "--font-favorit",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  // maximumScale: 1, hitting accessability
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zaplineai.com/"),
  title: "Shopify Voicebot Demo Store | ZaplineAI",
  description: `This is a demo of the Zapline AI Voicebot. It is geared to showcase a demo for an E-commerce store.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PHProvider>
      <html lang="en" className="h-dvh">
        <body
          className={`h-full dark ${classNames(
            favorit.variable,
            inter.className
          )}`}
        >
          <ToastContextProvider>
            <AudioStoreContextProvider>
              <NowPlayingContextProvider>
                <MessageMetadataContextProvider>
                  <DeepgramContextProvider>{children}</DeepgramContextProvider>
                </MessageMetadataContextProvider>
              </NowPlayingContextProvider>
            </AudioStoreContextProvider>
          </ToastContextProvider>
        </body>
      </html>
    </PHProvider>
  );
}
