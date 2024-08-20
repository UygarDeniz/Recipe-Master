import ThemeProvider from './ThemeProvider';
import { NextSessionProvider } from './SessionProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextSessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </NextSessionProvider>
  );
}
