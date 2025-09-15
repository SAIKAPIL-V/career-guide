'use server';

/**
 * @fileOverview Provides AI-driven recommendations for potential career paths based on a student's aptitude and interests.
 *
 * - personalizedCareerRecommendations - A function that handles the personalized career recommendation process.
 * - PersonalizedCareerRecommendationsInput - The input type for the personalizedCareerRecommendations function.
 * - PersonalizedCareerRecommendationsOutput - The return type for the personalizedCareerRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const PersonalizedCareerRecommendationsInputSchema = z.object({
  interests: z
    .string()
    .describe('A comma-separated list of the student\'s interests.'),
  aptitude: z
    .string()
    .describe('A description of the student\'s aptitude and strengths.'),
  academicPerformance: z
    .string()
    .describe('A summary of the student\'s academic performance.'),
  location: z.string().describe('The student\'s general location.'),
});
export type PersonalizedCareerRecommendationsInput = z.infer<
  typeof PersonalizedCareerRecommendationsInputSchema
>;

const CareerRecommendationSchema = z.object({
  career: z.string().describe('The name of the career path.'),
  collegeCount: z.number().describe('An estimated count of colleges offering courses related to this career path.'),
});


const PersonalizedCareerRecommendationsOutputSchema = z.object({
  careerRecommendations: z
    .array(CareerRecommendationSchema)
    .describe(
      'A list of 3-5 career paths recommended for the student, based on their interests, aptitude, academic performance and location.'
    ),
  courseRecommendations: z
    .array(z.string())
    .describe(
      'A list of courses recommended for the student, based on their interests, aptitude, academic performance and location.'
    ),
  collegeRecommendations: z
    .array(z.string())
    .describe(
      'A list of colleges recommended for the student, based on their interests, aptitude, academic performance and location.'
    ),
});
export type PersonalizedCareerRecommendationsOutput = z.infer<
  typeof PersonalizedCareerRecommendationsOutputSchema
>;

export async function personalizedCareerRecommendations(
  input: PersonalizedCareerRecommendationsInput
): Promise<PersonalizedCareerRecommendationsOutput> {
  return personalizedCareerRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCareerRecommendationsPrompt',
  input: {schema: PersonalizedCareerRecommendationsInputSchema},
  output: {schema: PersonalizedCareerRecommendationsOutputSchema},
  prompt: `You are a personalized career advisor. A student will provide you with information about their interests, aptitude, academic performance, and location.

  Based on this information, you will provide a list of career recommendations, course recommendations, and college recommendations.

  Interests: {{{interests}}}
  Aptitude: {{{aptitude}}}
  Academic Performance: {{{academicPerformance}}}
  Location: {{{location}}}

  For each career recommendation, also provide an estimated count of how many colleges in India offer relevant courses.

  Please provide your recommendations in JSON format.
  Ensure that the career, course and college recommendations are tailored to the student's location.
  Also, ensure that the list is not too long (around 3-5 recommendations per category).
  `,
});

const personalizedCareerRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCareerRecommendationsFlow',
    inputSchema: PersonalizedCareerRecommendationsInputSchema,
    outputSchema: PersonalizedCareerRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
