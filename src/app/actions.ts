"use server";

import { z } from "zod";

const recommendationSchema = z.object({
  fitnessGoals: z.string().min(10, { message: "Please describe your fitness goals in more detail." }),
  pastBookingHistory: z.string().min(10, { message: "Please describe your past booking history in more detail." }),
  preferences: z.string().min(10, { message: "Please describe your preferences in more detail." }),
});

export type FormState = {
  message: string;
  recommendations: {
    gymRecommendations: string;
    classRecommendations: string;
  } | null;
  status: "idle" | "loading" | "success" | "error";
};

export async function generateRecommendationsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    fitnessGoals: formData.get("fitnessGoals"),
    pastBookingHistory: formData.get("pastBookingHistory"),
    preferences: formData.get("preferences"),
  };

  const validatedFields = recommendationSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Please fill out all fields with sufficient detail.",
      recommendations: null,
      status: "error",
    };
  }

  try {
    // This is where the AI call was. We'll return a mock result.
    const result = {
        gymRecommendations: "Based on your goals, we recommend 'Powerhouse Gym' for its HIIT classes and 'Iron House' for strength training.",
        classRecommendations: "You should try the 'HIIT Express' at Powerhouse and 'Strength 101' at Iron House."
    };
    return {
      message: "Here are your personalized recommendations!",
      recommendations: result,
      status: "success",
    };
  } catch (error) {
    console.error("Mock recommendation error:", error);
    return {
      message: "We couldn't generate recommendations at this time. Please try again later.",
      recommendations: null,
      status: "error",
    };
  }
}
