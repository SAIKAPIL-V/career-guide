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
  collegeName: z.string().describe('The name of the college.'),
});
export type CollegeDetailsInput = z.infer<typeof CollegeDetailsInputSchema>;

const CollegeDetailsOutputSchema = z.object({
  description: z
    .string()
    .describe('A brief, engaging history and overview of the college.'),
  coursesOffered: z
    .array(z.string())
    .describe(
      'A list of 5-7 popular undergraduate courses available at the college.'
    ),
  facilities: z
    .string()
    .describe(
      'A summary of the key facilities available on campus (e.g., library, sports, labs).'
    ),
  admissionProcess: z
    .string()
    .describe(
      'A brief overview of the typical admission process (e.g., entrance exam name, application period).'
    ),
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
  prompt: `You are a college information expert providing details for the EduCareer Compass website.

  College Name: {{{collegeName}}}

  Please provide a concise but comprehensive overview of this college, focusing on information relevant to a prospective student in India.

  Include the following:
  -   A brief, engaging description and history of the college.
  -   A list of 5-7 popular undergraduate courses offered.
  -   A summary of the main facilities (library, sports, labs, etc.).
  -   A brief on the typical admission process (mentioning specific entrance exams like EAMCET, JEE, etc., if applicable).
  `,
  config: {
    safetySettings: [
        {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
        },
    ]
  }
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
