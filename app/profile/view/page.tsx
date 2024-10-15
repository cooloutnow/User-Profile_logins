'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { UserCircle, ArrowLeft, Mail, Calendar, Building, MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ViewProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
      setUser(currentUser);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md animate-slideIn">
        <CardHeader className="text-center">
          <UserCircle size={80} className="mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">{user.name}'s Profile</CardTitle>
          <CardDescription>View your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <UserCircle className="mr-2 h-5 w-5 text-gray-500" />
              <p><strong>Username:</strong> {user.username}</p>
            </div>
            <div className="flex items-center">
              <UserCircle className="mr-2 h-5 w-5 text-gray-500" />
              <p><strong>Name:</strong> {user.name}</p>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-gray-500" />
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-gray-500" />
              <p><strong>Date Registered:</strong> {new Date(user.dateRegistered).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center">
              <Building className="mr-2 h-5 w-5 text-gray-500" />
              <p><strong>Division:</strong> {user.division || 'Not specified'}</p>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-gray-500" />
              <p><strong>Station:</strong> {user.station || 'Not specified'}</p>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-gray-500" />
              <p><strong>Shift:</strong> {user.shift || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.back()} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Welcome
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}