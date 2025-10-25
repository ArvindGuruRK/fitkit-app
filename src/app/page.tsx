import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HeartPulse, Award, Users } from 'lucide-react';
import { AnimatedHeadline } from '@/components/animated-headline';
import { ClassesList } from '@/components/classes-list';
import TextType from '@/components/TextType';
import CurvedLoop from '@/components/ui/curved-loop';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

const benefits = [
  {
    icon: <Award className="w-10 h-10 text-primary" />,
    title: 'Find Your Perfect Fit',
    description: 'Explore thousands of gyms, studios, and classes to match your unique fitness goals.',
  },
  {
    icon: <HeartPulse className="w-10 h-10 text-primary" />,
    title: 'Seamless Booking',
    description: 'Book classes and sessions in just a few clicks. Your next workout is always at your fingertips.',
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: 'Join a Community',
    description: 'Connect with fellow fitness enthusiasts and stay motivated on your journey together.',
  },
];

const heroTexts = [
    "Transform your fitness routine with FitKits. Explore and book online workouts designed to keep you active, strong, and inspired—anytime, anywhere.",
    "Find and join top online fitness classes with FitKits. Train with expert instructors and achieve your goals—wherever you are."
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white overflow-hidden">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
          <AnimatedHeadline 
            text="Your Fitness Journey, Reimagined"
            className="text-4xl md:text-6xl font-bold font-headline tracking-tight" 
          />
          <TextType 
            as="p"
            text={heroTexts}
            loop={true}
            className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 h-24"
            typingSpeed={30}
            deletingSpeed={15}
          />
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/classes">Explore Classes</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/pricing">View Memberships</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Classes Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-headline text-foreground">Featured Classes</h2>
          <p className="text-center mt-2 text-muted-foreground mb-10">Find the perfect class to kickstart your fitness journey.</p>
          <ClassesList />
           <CurvedLoop marqueeText="Start✦ Your ✦ Fitness ✦ Journey ✦ Now ✦" />
          <div className="text-center mt-12">
            <Button asChild>
                <Link href="/classes">View All Classes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-headline text-foreground">Why Choose FitKit 2025?</h2>
          <p className="text-center mt-2 text-muted-foreground mb-10">Everything you need to stay active and motivated.</p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center p-6">
                {benefit.icon}
                <h3 className="mt-4 text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-accent">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold font-headline text-accent-foreground">Ready to Start?</h2>
              <p className="mt-2 text-lg text-accent-foreground/80 max-w-2xl mx-auto">
                Join thousands of members finding their fitness freedom. Sign up today and get your first class on us!
              </p>
              <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/signup">Create Your Account</Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
