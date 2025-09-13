'use server';
/**
 * @fileOverview An AI agent that provides personalized course recommendations based on student interests and strengths.
 *
 * - personalizedCourseRecommendations - A function that handles the course recommendation process.
 * - PersonalizedCourseRecommendationsInput - The input type for the personalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the personalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  interests: z
    .string()
    .describe('A description of the students interests.'),
  strengths: z.string().describe('The strengths of the student.'),
  academicPerformance: z
    .string()
    .describe(
      'The academic performance of the student, including grades in relevant subjects.'
    ),
  careerAspirations: z
    .string()
    .describe('The career aspirations of the student.'),
});
export type PersonalizedCourseRecommendationsInput = z.infer<
  typeof PersonalizedCourseRecommendationsInputSchema
>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  recommendedStreams: z.array(z.string()).describe(
    'A list of recommended academic streams (e.g., Arts, Science, Commerce)'
  ),
  recommendedCourses: z.array(z.string()).describe(
    'A list of recommended degree courses based on the students profile.'
  ),
  rationale: z
    .string()
    .describe(
      'Explanation of why these streams and courses are recommended, based on the input data.'
    ),
});
export type PersonalizedCourseRecommendationsOutput = z.infer<
  typeof PersonalizedCourseRecommendationsOutputSchema
>;

export async function personalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {schema: PersonalizedCourseRecommendationsInputSchema},
  output: {schema: PersonalizedCourseRecommendationsOutputSchema},
  prompt: `You are an expert academic and career advisor.

Based on the following information about the student, recommend suitable academic streams and degree courses.

Interests: {{{interests}}}
Strengths: {{{strengths}}}
Academic Performance: {{{academicPerformance}}}
Career Aspirations: {{{careerAspirations}}}

Consider nearby government colleges and the long-term career outcomes of different courses.

Explain your recommendations in the rationale field.
`,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
