import { Poppins, Space_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider.";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/custome-components/Header";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "./redux/providers";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Image converter - Convertio",
  description:
    "Convert your images to various formats with our easy-to-use online image converter tool.",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${spaceMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <div className="bg-background w-full">
              <Header />
              <main className="w-full container mx-auto px-4 py-8">
                <ReduxProvider>{children}</ReduxProvider>
              </main>
              <Toaster  position="top-right" />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
