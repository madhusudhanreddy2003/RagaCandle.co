import SmoothScroll from './components/SmoothScroll';
import { CartProvider } from './context/CartContext';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <CartProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}