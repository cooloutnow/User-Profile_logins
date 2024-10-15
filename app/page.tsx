import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">User Profile App</h1>
      <p className="text-xl mb-4">If you can see this, the app is working!</p>
      <Card className="w-full max-w-md animate-slideIn">
        <CardContent className="flex flex-col items-center pt-6">
          <div className="mb-8 animate-pulse">
            <UserCircle size={100} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-4 w-full animate-slideIn" style={{ animationDelay: '0.2s' }}>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/register">Register</Link>
            </Button>
            <Button asChild variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}