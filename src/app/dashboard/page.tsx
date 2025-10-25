'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AiRecommendations } from '@/components/ai-recommendations';
import { Flame, Target, CalendarDays, Dumbbell } from 'lucide-react';

const chartData = [
  { month: 'Jan', classes: 4 },
  { month: 'Feb', classes: 3 },
  { month: 'Mar', classes: 8 },
  { month: 'Apr', classes: 6 },
  { month: 'May', classes: 10 },
  { month: 'Jun', classes: 7 },
];

const upcomingBookings = [
    { class: 'Vinyasa Flow', gym: 'Serenity Yoga', date: '2025-07-25', time: '9:00 AM', status: 'Confirmed' },
    { class: 'HIIT Express', gym: 'Powerhouse Gym', date: '2025-07-27', time: '6:00 PM', status: 'Confirmed' },
];

const pastBookings = [
    { class: 'Intro to CrossFit', gym: 'CrossFit Intense', date: '2025-07-18', time: '7:00 PM', status: 'Completed' },
    { class: 'Deep Stretch', gym: 'Serenity Yoga', date: '2025-07-15', time: '8:00 PM', status: 'Completed' },
    { class: 'Spin & Sculpt', gym: 'Cycle Hub', date: '2025-07-12', time: '12:00 PM', status: 'Cancelled' },
];


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-accent-foreground">
        Welcome Back, User!
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes This Month</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10 Classes</div>
            <p className="text-xs text-muted-foreground">3 away from your monthly goal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Class</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tomorrow</div>
            <p className="text-xs text-muted-foreground">Vinyasa Flow at 9 AM</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Your class attendance over the past 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                <Bar dataKey="classes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="lg:col-span-2">
             <Tabs defaultValue="recommendations" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="recommendations">AI Coach</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">History</TabsTrigger>
                </TabsList>
                <TabsContent value="recommendations" className="mt-4">
                    <AiRecommendations />
                </TabsContent>
                <TabsContent value="upcoming">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {upcomingBookings.map((booking, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{booking.class}</TableCell>
                                            <TableCell>{booking.date}</TableCell>
                                            <TableCell className="text-right"><Button variant="outline" size="sm">Cancel</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="past">
                    <Card>
                        <CardHeader>
                            <CardTitle>Past Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pastBookings.map((booking, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{booking.class}</TableCell>
                                            <TableCell>{booking.date}</TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant={booking.status === 'Completed' ? 'default' : 'destructive'} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                    {booking.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}
