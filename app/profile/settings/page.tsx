'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Settings, ArrowLeft, User, Mail, Lock, CheckCircle, Building, MapPin, Clock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export default function ProfileSettings() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [division, setDivision] = useState('');
  const [station, setStation] = useState('');
  const [shift, setShift] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
      setUser(currentUser);
      setUsername(currentUser.username);
      setName(currentUser.name);
      setEmail(currentUser.email);
      setDivision(currentUser.division || '');
      setStation(currentUser.station || '');
      setShift(currentUser.shift || '');
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Update user information
    const updatedUser = { ...user, name, email, division, station, shift };
    if (password) {
      updatedUser.password = password;
    }

    // Update in localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.username === user.username ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Show toast notification
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });

    // Update status message
    setUpdateStatus('Profile updated successfully');

    // Clear password field
    setPassword('');

    // Clear status message after 3 seconds
    setTimeout(() => setUpdateStatus(''), 3000);
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md animate-slideIn">
        <CardHeader className="text-center">
          <Settings size={60} className="mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">Profile Settings</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <form onSubmit={handleUpdateProfile}>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username (cannot be changed)</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="username"
                  value={username}
                  className="pl-10"
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">New Password (leave blank to keep current)</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  placeholder="Enter new password"
                />
              </div>
            </div>
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
            {updateStatus && (
              <div className="flex items-center justify-center text-green-600 animate-fadeIn">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span>{updateStatus}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()} className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Update Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}