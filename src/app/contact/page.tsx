import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const faqs = [
  {
    question: "How do I book a class?",
    answer: "You can book a class by navigating to the gym's page, selecting a class from the schedule, and clicking the 'Book Now' button. You must be logged in to complete a booking."
  },
  {
    question: "What is the cancellation policy?",
    answer: "Cancellation policies vary by gym. Typically, you can cancel up to 24 hours before the class starts for a full refund or credit. Please check the specific gym's policy on their page."
  },
  {
    question: "How do memberships work?",
    answer: "We offer various membership tiers that provide you with a set number of credits per month. You can use these credits to book classes at any of our partner gyms. Visit our Pricing page for more details."
  },
  {
    question: "Can I try a class before buying a membership?",
    answer: "Yes! Many of our partner gyms offer drop-in rates or introductory offers for new members. You can purchase a single class pass directly from the gym's page."
  }
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-accent-foreground">Contact & Support</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Have questions? We're here to help.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-accent-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                For any other questions, please fill out the form below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
