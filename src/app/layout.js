import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Mann Chawda — MNC. | 3D Artist & Game Dev Student",
  description:
    "BTech CSE student from Surat, India. Blender artist specialising in game props, product renders, architectural environments and isometric scenes. Open for freelance work.",
  keywords: ["3D artist", "Blender", "game props", "product renders", "freelance", "Surat", "India", "Mann Chawda"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-black antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
