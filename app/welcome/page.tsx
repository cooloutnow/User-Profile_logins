'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { UserCircle, Settings, LogOut } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from 'react';

export default function Welcome() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
      setUser(currentUser);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    router.push('/');
  };

  const handleProfileSettings = () => {
    router.push('/profile/settings');
  };

  const handleViewProfile = () => {
    router.push('/profile/view');
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md animate-slideIn">
        <CardHeader className="text-center">
          <UserCircle size={80} className="mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400">Welcome, {user.name}!</CardTitle>
          <CardDescription>You have successfully logged in</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">This is your personalized welcome page.</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="flex items-center" onClick={handleProfileSettings}>
              <Settings className="mr-2 h-4 w-4" /> Profile Settings
            </Button>
            <Button variant="outline" className="flex items-center" onClick={handleViewProfile}>
              <UserCircle className="mr-2 h-4 w-4" /> View Profile
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleLogout} className="bg-orange-500 hover:bg-orange-600 text-white flex items-center">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}