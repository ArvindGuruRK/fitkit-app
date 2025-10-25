"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateRecommendationsAction, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Wand2, PartyPopper } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Generating..." : "Generate Recommendations"}
      <Wand2 className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function AiRecommendations() {
  const { toast } = useToast();
  const initialState: FormState = {
    message: "",
    recommendations: null,
    status: "idle",
  };
  const [state, formAction] = useFormState(
    generateRecommendationsAction,
    initialState
  );

  useEffect(() => {
    if (state.status === "error" && state.message) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>
            Let our AI assistant help you find the perfect gyms and classes based on your profile. Fill out the details below.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fitnessGoals">Your Fitness Goals</Label>
              <Textarea
                id="fitnessGoals"
                name="fitnessGoals"
                placeholder="e.g., 'I want to lose 10 pounds and build lean muscle, focusing on my core strength.'"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pastBookingHistory">Past Booking History</Label>
              <Textarea
                id="pastBookingHistory"
                name="pastBookingHistory"
                placeholder="e.g., 'I usually do yoga twice a week and sometimes go to a HIIT class on weekends. I enjoyed classes at Serenity Yoga.'"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferences">Preferences</Label>
              <Textarea
                id="preferences"
                name="preferences"
                placeholder="e.g., 'I prefer morning classes near downtown, in a gym that has clean showers and a friendly atmosphere.'"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.status === "success" && state.recommendations && (
        <Card className="bg-green-50 border-green-200 dark:bg-green-950">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PartyPopper className="h-6 w-6 text-green-600" />
              <CardTitle className="text-green-800 dark:text-green-300">
                Here are your recommendations!
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 prose prose-sm dark:prose-invert max-w-none">
            <div>
              <h3 className="font-semibold">Recommended Gyms:</h3>
              <p>{state.recommendations.gymRecommendations}</p>
            </div>
            <div>
              <h3 className="font-semibold">Recommended Classes:</h3>
              <p>{state.recommendations.classRecommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
