import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-24">
      <div className="container flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to BRiX Asset
        </h1>
        <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
          Your trusted partner in investment management and financial growth.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/sign-up">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">Sign In</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}