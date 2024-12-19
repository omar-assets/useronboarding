'use client';

import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Header from '@/components/Header';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { OnboardingProgress } from '@/components/OnboardingProgress';
import { ResumeOnboarding } from '@/components/ResumeOnboarding';
import { RestartOnboarding } from '@/components/RestartOnboarding';
import { ToastProvider } from '@/components/providers/ToastProvider';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isOnboardingRoute = router.pathname.startsWith('/onboarding') || router.pathname === '/sign-up';

  return (
    <OnboardingProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className={`min-h-screen bg-background ${inter.className}`}>
          <Header />
          <ResumeOnboarding />
          {isOnboardingRoute && (
            <div className="container mt-8">
              <div className="flex justify-between items-center mb-4">
                <OnboardingProgress />
                <RestartOnboarding />
              </div>
            </div>
          )}
          <Component {...pageProps} />
          <ToastProvider />
        </div>
      </ThemeProvider>
    </OnboardingProvider>
  );
}