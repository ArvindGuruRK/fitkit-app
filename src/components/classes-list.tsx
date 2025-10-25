'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Clock, Calendar, Users, Bookmark, User, Info, ChevronDown, Percent } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import ElectricBorder from "./ui/electric-border";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const classes = [
  { 
    id: 'class-1', 
    name: 'The Big Boxing', 
    gym: 'Serenity Yoga', 
    imageId: 'gym-1', 
    category: 'Boxing', 
    duration: '60 min', 
    language: 'English',
    level: 'BASIC',
    instructor: 'Venkat',
    description: 'Get fit and fight-ready with our energizing boxing classes!',
    schedule: {
      days: ['T', 'W', 'T', 'F'],
      time: '7:30 AM - 8:30 AM (IST)'
    },
    capacity: 0,
    maxCapacity: 100,
    price: 2999,
    originalPrice: 3299,
  },
  { 
    id: 'class-2', 
    name: 'Vinyasa Flow', 
    gym: 'Serenity Yoga', 
    imageId: 'gym-2', 
    category: 'Yoga', 
    duration: '60 min', 
    language: 'English',
    level: 'INTERMEDIATE',
    instructor: 'Aisha',
    description: 'A dynamic style of yoga which joins physical postures with breath.',
    schedule: {
      days: ['M', 'W', 'F'],
      time: '6:00 PM - 7:00 PM (IST)'
    },
    capacity: 25,
    maxCapacity: 40,
    price: 2500,
  },
   { 
    id: 'class-3', 
    name: 'HIIT Express', 
    gym: 'Powerhouse Gym', 
    imageId: 'gym-3', 
    category: 'HIIT', 
    duration: '45 min', 
    language: 'English',
    level: 'ADVANCED',
    instructor: 'Mike',
    description: 'High-intensity interval training to maximize calorie burn in a short time.',
    schedule: {
      days: ['M', 'T', 'W', 'T', 'F', 'S'],
      time: '7:00 AM - 7:45 AM (IST)'
    },
    capacity: 15,
    maxCapacity: 20,
    price: 3500,
  },
  { 
    id: 'class-4', 
    name: 'Spin & Sculpt', 
    gym: 'Cycle Hub', 
    imageId: 'gym-4', 
    category: 'Cycling', 
    duration: '50 min', 
    language: 'English',
    level: 'INTERMEDIATE',
    instructor: 'Sarah',
    description: 'A high-energy cycling class combined with light weight training.',
    schedule: {
      days: ['T', 'T', 'S'],
      time: '5:30 PM - 6:20 PM (IST)'
    },
    capacity: 18,
    maxCapacity: 25,
    price: 3200,
  },
  { 
    id: 'class-5', 
    name: 'Strength 101', 
    gym: 'Iron House', 
    imageId: 'gym-5', 
    category: 'Weightlifting', 
    duration: '75 min', 
    language: 'English',
    level: 'BEGINNER',
    instructor: 'David',
    description: 'Learn the fundamentals of weightlifting in a safe and supportive environment.',
    schedule: {
      days: ['M', 'W', 'F'],
      time: '6:00 PM - 7:15 PM (IST)'
    },
    capacity: 8,
    maxCapacity: 12,
    price: 4000,
    originalPrice: 4500,
  },
  { 
    id: 'class-6', 
    name: 'Aqua Zumba', 
    gym: 'AquaFit Center', 
    imageId: 'gym-6', 
    category: 'Aqua Fitness', 
    duration: '45 min', 
    language: 'English',
    level: 'ALL_LEVELS',
    instructor: 'Maria',
    description: 'A fun, low-impact water workout that feels like a pool party.',
    schedule: {
      days: ['S', 'S'],
      time: '11:00 AM - 11:45 AM (IST)'
    },
    capacity: 20,
    maxCapacity: 30,
    price: 2800,
  },
  { 
    id: 'class-7', 
    name: 'Restorative Yoga', 
    gym: 'Zen Garden', 
    imageId: 'gym-7', 
    category: 'Yoga', 
    duration: '90 min', 
    language: 'English',
    level: 'ALL_LEVELS',
    instructor: 'Lee',
    description: 'Gentle poses and deep relaxation to calm your mind and body.',
    schedule: {
      days: ['S'],
      time: '4:00 PM - 5:30 PM (IST)'
    },
    capacity: 15,
    maxCapacity: 20,
    price: 2700,
  },
  { 
    id: 'class-8', 
    name: 'Pilates Fusion', 
    gym: 'Core Connect', 
    imageId: 'gym-8', 
    category: 'Pilates', 
    duration: '60 min', 
    language: 'English',
    level: 'INTERMEDIATE',
    instructor: 'Chloe',
    description: 'A blend of classical Pilates with contemporary exercises for a full-body workout.',
    schedule: {
      days: ['T', 'T'],
      time: '9:00 AM - 10:00 AM (IST)'
    },
    capacity: 10,
    maxCapacity: 15,
    price: 3300,
    originalPrice: 3500,
  },
  { 
    id: 'class-9', 
    name: 'Dance Cardio', 
    gym: 'Rhythm Nation', 
    imageId: 'gym-9', 
    category: 'Dance', 
    duration: '60 min', 
    language: 'English',
    level: 'ALL_LEVELS',
    instructor: 'Alex',
    description: 'Dance your way to fitness with high-energy routines and upbeat music.',
    schedule: {
      days: ['M', 'W', 'F'],
      time: '7:00 PM - 8:00 PM (IST)'
    },
    capacity: 30,
    maxCapacity: 40,
    price: 3000,
  },
];

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const logoImage = PlaceHolderImages.find(p => p.id === 'main-logo');


export function ClassesList() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {classes.map((item) => {
          const classImage = PlaceHolderImages.find(p => p.id === item.imageId);
          return (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4">
               <div className="p-1">
                <ElectricBorder className="rounded-2xl z-10" speed={0.8} chaos={0.5} color="hsl(var(--destructive))">
                  <Card className="overflow-hidden group transform transition-all duration-300 hover:shadow-xl flex flex-col rounded-2xl bg-transparent">
                    {classImage && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={classImage.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          data-ai-hint={classImage.imageHint}
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-semibold">{item.level}</div>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">{item.language}</div>
                      </div>
                    )}
                    <CardContent className="p-4 flex-grow flex flex-col bg-card space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl text-foreground mt-1">{item.name}</h3>
                        <div className="w-12 h-12 rounded-full border-2 border-muted overflow-hidden flex-shrink-0">
                          {logoImage && <Image src={logoImage.imageUrl} alt={logoImage.description} width={48} height={48} />}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-foreground">
                        <User className="w-4 h-4 mr-2" />
                        <span>{item.instructor}</span>
                        <Info className="w-3 h-3 ml-1 text-blue-500" />
                      </div>

                      <div className="bg-muted/50 rounded-lg p-2 text-sm mt-1">
                        <div className="flex items-center font-semibold text-foreground mb-1">
                          <Bookmark className="w-4 h-4 mr-2" />
                          <span>Program Description</span>
                        </div>
                        <p className="text-foreground text-xs">{item.description}</p>
                      </div>

                      <div className="flex justify-between items-center text-xs mt-1">
                          <Badge variant="outline" className="text-foreground border-green-300 bg-green-50">AVAILABLE</Badge>
                          <div className="flex items-center text-foreground">
                            <Percent className="w-3 h-3 mr-1"/>
                            <span>1 items</span>
                            <Info className="w-3 h-3 ml-1 text-blue-500" />
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="bg-muted/50 rounded-lg p-2 text-sm">
                          <div className="flex items-center font-semibold text-foreground mb-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Schedule</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            {weekDays.map((day, i) => (
                              <span key={i} className={cn(
                                "flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
                                item.schedule.days.includes(day) ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                              )}>{day}</span>
                            ))}
                          </div>
                          <p className="text-xs text-foreground text-center">{item.schedule.time}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-2 text-sm">
                          <div className="flex items-center font-semibold text-foreground mb-1">
                            <Users className="w-4 h-4 mr-2" />
                            <span>Capacity</span>
                          </div>
                          <p className="text-base font-bold text-foreground">{item.capacity}/{item.maxCapacity}</p>
                          <Progress value={(item.capacity / item.maxCapacity) * 100} className="h-1 mt-1" />
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-2 text-sm mt-1">
                        <div className="flex items-center font-semibold text-foreground mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                            <span>Choose Plan:</span>
                        </div>
                        <Select defaultValue="momentum">
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select a plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="momentum">Momentum (1 Month)</SelectItem>
                            <SelectItem value="pro">Pro (3 Months)</SelectItem>
                            <SelectItem value="unlimited">Unlimited (1 Year)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-green-100/60 border border-green-200 rounded-lg p-2 text-center mt-1">
                        <p className="font-semibold text-green-800 text-xs">Selected Package: Momentum</p>
                        <div className="flex justify-center items-baseline gap-1">
                          {item.originalPrice && <span className="line-through text-foreground text-sm">₹{item.originalPrice}</span>}
                          <span className="font-bold text-xl text-foreground">₹{item.price}</span>
                          <span className="text-xs text-foreground">+Tax</span>
                        </div>
                      </div>

                      <Button size="lg" className="w-full mt-2 text-base">Explore</Button>
                    </CardContent>
                  </Card>
                </ElectricBorder>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
