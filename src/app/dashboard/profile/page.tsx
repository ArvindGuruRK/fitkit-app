import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Upload } from "lucide-react";

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline text-accent-foreground">
        Your Profile
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} data-ai-hint={userAvatar.imageHint} />}
                  <AvatarFallback>TU</AvatarFallback>
                </Avatar>
                <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload Picture</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Test" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="user@example.com" disabled />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Fitness Profile</CardTitle>
              <CardDescription>Tell us about your fitness preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <Label htmlFor="fitness-goal">Primary Fitness Goal</Label>
                <Select defaultValue="weight-loss">
                  <SelectTrigger id="fitness-goal">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="flexibility">Flexibility & Mobility</SelectItem>
                    <SelectItem value="endurance">Cardio & Endurance</SelectItem>
                    <SelectItem value="wellness">General Wellness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Additional Goals & Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="e.g., training for a marathon, prefer outdoor activities, etc."
                  defaultValue="I want to improve my running time and overall cardiovascular health."
                />
              </div>
              <Button className="w-full">Update Fitness Profile</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
