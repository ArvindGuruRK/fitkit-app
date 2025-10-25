'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Starter',
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: 'For individuals just starting their fitness journey.',
    features: [
      '4 classes per month',
      'Access to all basic gyms',
      'Online community access',
    ],
    isPopular: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 59,
    yearlyPrice: 590,
    description: 'For fitness enthusiasts who want more flexibility.',
    features: [
      '10 classes per month',
      'Access to all partner gyms',
      'Book classes up to 2 weeks in advance',
      'AI workout recommendations',
    ],
    isPopular: true,
  },
  {
    name: 'Unlimited',
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: 'For the dedicated athlete who wants it all.',
    features: [
      'Unlimited classes',
      'Access to all premium locations',
      'Guest passes (2 per month)',
      'Priority booking',
    ],
    isPopular: false,
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-accent-foreground">Membership Plans</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Choose the plan that's right for you.
        </p>
      </div>

      <div className="flex justify-center items-center space-x-4 mb-10">
        <span>Monthly</span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
          aria-label="Toggle billing period"
        />
        <div className="flex items-center">
            <span>Yearly</span>
            <span className="ml-2 bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded-full">SAVE 15%</span>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              "flex flex-col transform transition-all duration-300 hover:scale-105",
              tier.isPopular ? "border-primary border-2 shadow-lg relative" : "shadow-md"
            )}
          >
            {tier.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold font-headline">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">${isYearly ? tier.yearlyPrice / 12 : tier.monthlyPrice}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.isPopular ? "default" : "outline"}>
                Choose Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
