'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { UserCircle, Lock, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username);
    
    if (!user) {
      setError('Username not found. Please check your username or register if you don\'t have an account.');
      toast({
        title: "Login failed",
        description: "Username not found. Please check your username or register if you don't have an account.",
        variant: "destructive"
      });
      // Reset form
      setUsername('');
      setPassword('');
    } else if (user.password !== password) {
      setError('Incorrect password. Please try again.');
      toast({
        title: "Login failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive"
      });
      // Only reset password
      setPassword('');
    } else {
      setError('');
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      router.push('/welcome');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md animate-slideIn">
        <CardHeader className="text-center">
          <UserCircle size={60} className="mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                <AlertCircle className="mr-2" />
                <span>{error}</span>
              </div>
            )}
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push('/')} className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}