'use server';

/**
 * @fileOverview Provides personalized gym and class recommendations based on user data.
 *
 * - getPersonalizedRecommendations - A function that generates gym and class recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  fitnessGoals: z
    .string()
    .describe('The fitness goals of the user, e.g., weight loss, muscle gain, overall wellness.'),
  pastBookingHistory: z
    .string()
    .describe(
      'A summary of the users past booking history, including gym names, class types, and frequency.'
    ),
  preferences: z
    .string()
    .describe(
      'The users preferences, such as preferred location, time of day, class types, and amenities.'
    ),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  gymRecommendations: z
    .string()
    .describe('A list of recommended gyms based on the user input.'),
  classRecommendations: z
    .string()
    .describe('A list of recommended classes based on the user input.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedGymRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedGymRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides personalized gym and class recommendations to users based on their fitness goals, past booking history, and preferences.

  Based on the following information, provide a list of gym and class recommendations:

  Fitness Goals: {{{fitnessGoals}}}
  Past Booking History: {{{pastBookingHistory}}}
  Preferences: {{{preferences}}}

  Gym Recommendations: 
  Class Recommendations:`,
});

const personalizedGymRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedGymRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
