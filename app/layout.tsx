import localFont from "next/font/local";
import "./globals.css";
import {MenuBarHorizontal} from "@/app/ui/navigation/menu-bar";

const excalifont = localFont({
    src: [
        {
            path: "../public/fonts/Excalifont-Regular.woff2",
            weight: "400",
            style: "normal"
        }
    ],
    variable: "--font-excalifont",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="root" className={`${excalifont.className} antialiased flex flex-col m-2 max-w-screen bg-blackboard-500`}
      >
        <div className="overflow-y-auto flex-col">
            {children}
        </div>
        <div className="sticky bottom-0 w-full">
            <MenuBarHorizontal />
        </div>
      </body>
    </html>
  );
}
