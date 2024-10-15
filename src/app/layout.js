import "@/styles/globals.css";
import { MakesProvider } from '@/context/MakesContext';

export const metadata = {
  title: "Car Dealer App",
  description: "Car Dealer App for DevelopsToday by Limemix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MakesProvider>
          {children}
        </MakesProvider>
      </body>
    </html>
  );
}
