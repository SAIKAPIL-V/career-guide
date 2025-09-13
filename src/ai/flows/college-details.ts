'use server';
/**
 * @fileOverview Generates detailed information about a specific college.
 *
 * - collegeDetails - A function that provides a detailed look at a college.
 * - CollegeDetailsInput - The input type for the collegeDetails function.
 * - CollegeDetailsOutput - The return type for the collegeDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CollegeDetailsInputSchema = z.object({
  collegeName: z
    .string()
    .describe('The name of the college to get details for.'),
});
export type CollegeDetailsInput = z.infer<typeof CollegeDetailsInputSchema>;

const CollegeDetailsOutputSchema = z.object({
  description: z.string().describe('A detailed description of the college, its history, and reputation.'),
  coursesOffered: z.array(z.string()).describe('A list of popular undergraduate courses offered at the college.'),
  facilities: z.string().describe('A summary of the key facilities available on campus, like library, hostels, and sports.'),
  admissionProcess: z.string().describe('An overview of the typical admission process for undergraduate courses.'),
});
export type CollegeDetailsOutput = z.infer<typeof CollegeDetailsOutputSchema>;


export async function collegeDetails(
  input: CollegeDetailsInput
): Promise<CollegeDetailsOutput> {
  return collegeDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'collegeDetailsPrompt',
  input: {schema: CollegeDetailsInputSchema},
  output: {schema: CollegeDetailsOutputSchema},
  prompt: `You are an expert on Indian higher education. Provide a detailed overview of the following college, assuming the user is a prospective undergraduate student.

  College Name: {{{collegeName}}}

  Generate the following information:
  - A detailed description of the college, its history, and reputation.
  - A list of 4-6 popular undergraduate courses offered.
  - A summary of key campus facilities (e.g., library, hostels, sports, labs).
  - An overview of the typical admission process for undergraduate courses.

  Present the information clearly in the requested JSON format.
  `,
});

const collegeDetailsFlow = ai.defineFlow(
  {
    name: 'collegeDetailsFlow',
    inputSchema: CollegeDetailsInputSchema,
    outputSchema: CollegeDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
