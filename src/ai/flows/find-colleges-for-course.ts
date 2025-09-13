'use server';
/**
 * @fileOverview An AI agent that recommends colleges for a specific course.
 *
 * - findCollegesForCourse - A function that handles the college recommendation process.
 * - FindCollegesForCourseInput - The input type for the function.
 * - FindCollegesForCourseOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const FindCollegesForCourseInputSchema = z.object({
  course: z.string().describe('The course the student is interested in.'),
  location: z
    .string()
    .describe(
      'The student\'s city or state, to find nearby colleges. Assume India.'
    ),
});
export type FindCollegesForCourseInput = z.infer<
  typeof FindCollegesForCourseInputSchema
>;

const CollegeRecommendationSchema = z.object({
    collegeName: z.string().describe("The name of the recommended college."),
    reason: z.string().describe("A brief, one-sentence reason why this college is a good fit for the specified course."),
});

const FindCollegesForCourseOutputSchema = z.object({
  colleges: z
    .array(CollegeRecommendationSchema)
    .describe('A list of 3-5 recommended colleges.'),
});
export type FindCollegesForCourseOutput = z.infer<
  typeof FindCollegesForCourseOutputSchema
>;

export async function findCollegesForCourse(
  input: FindCollegesForCourseInput
): Promise<FindCollegesForCourseOutput> {
  return findCollegesForCourseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findCollegesForCoursePrompt',
  input: {schema: FindCollegesForCourseInputSchema},
  output: {schema: FindCollegesForCourseOutputSchema},
  prompt: `You are an expert college advisor in India. A student wants to know which colleges are best for a specific course in their area.

  Course: {{{course}}}
  Student's Location: {{{location}}}

  Based on this, recommend 3-5 suitable colleges (including government and private institutions) near the student's location. For each college, provide a short, compelling reason why it's a good choice for that particular course.
  `,
});

const findCollegesForCourseFlow = ai.defineFlow(
  {
    name: 'findCollegesForCourseFlow',
    inputSchema: FindCollegesForCourseInputSchema,
    outputSchema: FindCollegesForCourseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
