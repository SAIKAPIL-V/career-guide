'use server';
/**
 * @fileOverview Generates a detailed spotlight for a specific career.
 *
 * - careerSpotlight - A function that provides a detailed look at a career.
 * - CareerSpotlightInput - The input type for the careerSpotlight function.
 * - CareerSpotlightOutput - The return type for the careerSpotlight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CareerSpotlightInputSchema = z.object({
  career: z.string().describe('The career path to generate a spotlight for.'),
});
export type CareerSpotlightInput = z.infer<typeof CareerSpotlightInputSchema>;

const CareerSpotlightOutputSchema = z.object({
  title: z.string().describe('The title of the career.'),
  description: z
    .string()
    .describe('A detailed description of the career path.'),
  dayInTheLife: z.string().describe('A summary of a typical day in this role.'),
  requiredSkills: z
    .array(z.string())
    .describe('A list of key skills required for this career.'),
  averageSalary: z
    .string()
    .describe(
      'An estimated average salary range for this career in the specified location (assume India if not provided).'
    ),
});
export type CareerSpotlightOutput = z.infer<typeof CareerSpotlightOutputSchema>;

export async function careerSpotlight(
  input: CareerSpotlightInput
): Promise<CareerSpotlightOutput> {
  return careerSpotlightFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerSpotlightPrompt',
  input: {schema: CareerSpotlightInputSchema},
  output: {schema: CareerSpotlightOutputSchema},
  prompt: `You are a career counselor providing a detailed "spotlight" on a specific career path for a student in India.

  Career Path: {{{career}}}

  Generate a detailed overview covering:
  - A compelling description of what the career entails.
  - A "Day in the Life" summary.
  - A list of 3-5 essential skills.
  - An estimated average salary range in India (in INR).

  Present the information clearly in the requested JSON format.
  `,
});

const careerSpotlightFlow = ai.defineFlow(
  {
    name: 'careerSpotlightFlow',
    inputSchema: CareerSpotlightInputSchema,
    outputSchema: CareerSpotlightOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
