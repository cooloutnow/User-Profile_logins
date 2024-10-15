'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { UserCircle, Mail, Lock, User, Calendar, Building, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('');
  const [station, setStation] = useState('');
  const [shift, setShift] = useState('');
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((user: any) => user.username === username)) {
      toast({
        title: "Registration failed",
        description: "Username already exists. Please choose a different username.",
        variant: "destructive"
      });
      return;
    }

    const newUser = { username, password, name, email, dateRegistered: new Date().toISOString(), division, station, shift };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setRegistrationComplete(true);
    toast({
      title: "Registration successful",
      description: "Your account has been created. You will be redirected to the login page shortly.",
    });

    // Delay redirection to ensure the success message is seen
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  if (registrationComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md animate-slideIn">
          <CardContent className="text-center pt-6">
            <CheckCircle size={60} className="mx-auto mb-4 text-green-500" />
            <CardTitle className="text-2xl font-bold text-green-600 mb-2">Registration Complete!</CardTitle>
            <CardDescription>
              Your account has been successfully created. You will be redirected to the login page in a few seconds.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md animate-slideIn">
        <CardHeader className="text-center">
          <UserCircle size={60} className="mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {/* Username field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              {/* Password field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              {/* Name field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              {/* Email field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              {/* Division field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="division">Division</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="division"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              {/* Station field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="station">Station</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="station"
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              {/* Shift field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="shift">Shift</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="shift"
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push('/')} className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Register</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}