'use server';
/**
 * @fileOverview Generates a detailed career roadmap for a specific field and educational stage.
 *
 * - careerRoadmap - A function that provides a detailed roadmap.
 * - CareerRoadmapInput - The input type for the function.
 * - CareerRoadmapOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CareerRoadmapInputSchema = z.object({
  careerField: z
    .string()
    .describe('The broad career field, e.g., Engineering, Healthcare, Business.'),
  stage: z
    .enum(['10th Completed', '12th Completed', 'Degree Completed'])
    .describe('The current educational stage of the student.'),
});
export type CareerRoadmapInput = z.infer<typeof CareerRoadmapInputSchema>;

const PathDetailSchema = z.object({
  pathName: z.string().describe('The name of the specific course or path, e.g., "Polytechnic Diploma in Mechanical Engineering".'),
  furtherStudies: z.array(z.string()).describe('A list of next-step educational goals, e.g., "B.Tech Lateral Entry".'),
  jobOpportunities: z.array(z.string()).describe('A list of potential job titles or roles.'),
  entrepreneurshipIdeas: z.array(z.string()).describe('A list of business or startup ideas related to this path.'),
  advantages: z.array(z.string()).describe('Key benefits or advantages of choosing this path.'),
  recommendedColleges: z.array(z.string()).describe('A list of 2-3 well-known government colleges in India for this path.'),
});

const CareerRoadmapOutputSchema = z.object({
  introduction: z.string().describe('A brief introduction to the opportunities in this field from the chosen stage.'),
  recommendedPaths: z.array(PathDetailSchema).describe('A list of 2-3 recommended courses or paths.'),
});
export type CareerRoadmapOutput = z.infer<typeof CareerRoadmapOutputSchema>;

export async function careerRoadmap(
  input: CareerRoadmapInput
): Promise<CareerRoadmapOutput> {
  return careerRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerRoadmapPrompt',
  input: {schema: CareerRoadmapInputSchema},
  output: {schema: CareerRoadmapOutputSchema},
  prompt: `You are an expert career counselor in India. A student has expressed interest in the "{{careerField}}" field and has completed "{{stage}}".

  Generate a detailed, practical roadmap for them.

  1.  Start with a brief, encouraging introduction about the opportunities available in "{{careerField}}" from their current stage.
  2.  Recommend 2-3 specific, primary paths or courses they can pursue now.
  3.  For EACH recommended path, provide the following details:
      -   **pathName**: The specific name of the course or path.
      -   **furtherStudies**: What's the next educational step? (e.g., "B.Tech after Diploma").
      -   **jobOpportunities**: List 3-4 specific job roles.
      -   **entrepreneurshipIdeas**: Provide 2-3 concrete startup ideas.
      -   **advantages**: List 2-3 key advantages of this path in bullet-point style.
      -   **recommendedColleges**: Name 2-3 well-known government colleges in India offering this course.

  The response must be grounded in the Indian education and job market context.
  `,
});

const careerRoadmapFlow = ai.defineFlow(
  {
    name: 'careerRoadmapFlow',
    inputSchema: CareerRoadmapInputSchema,
    outputSchema: CareerRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
