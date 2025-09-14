'use server';
/**
 * @fileOverview Generates a detailed career roadmap for a specific course and educational stage.
 *
 * - careerRoadmap - A function that provides a detailed roadmap.
 * - CareerRoadmapInput - The input type for the function.
 * - CareerRoadmapOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CareerRoadmapInputSchema = z.object({
  course: z
    .string()
    .describe('The specific course or stream, e.g., "Polytechnic in Civil Engineering", "Intermediate (MPC)", "B.Tech in Computer Science".'),
  stage: z
    .enum(['10th Completed', '12th Completed', 'Degree Completed'])
    .describe('The current educational stage of the student.'),
});
export type CareerRoadmapInput = z.infer<typeof CareerRoadmapInputSchema>;

const PathDetailSchema = z.object({
  pathName: z.string().describe('The name of the specific further study or career path, e.g., "B.Tech Lateral Entry" or "Software Development".'),
  furtherStudies: z.array(z.string()).describe('A list of next-step educational goals, e.g., "M.Tech in AI", "MBA".'),
  jobOpportunities: z.array(z.string()).describe('A list of 3-4 potential job titles or roles.'),
  entrepreneurshipIdeas: z.array(z.string()).describe('A list of 2-3 business or startup ideas related to this path.'),
  advantages: z.array(z.string()).describe('Key benefits or advantages of choosing this path.'),
  recommendedColleges: z.array(z.string()).describe('A list of 2-3 well-known government colleges in India for this path.'),
});

const CareerRoadmapOutputSchema = z.object({
  introduction: z.string().describe('A brief introduction to the opportunities that open up after completing the chosen course/stream.'),
  recommendedPaths: z.array(PathDetailSchema).describe('A list of 2-3 recommended detailed paths one can follow after this course.'),
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
  prompt: `You are an expert career counselor in India. A student has completed "{{stage}}" and is asking for a roadmap for the course/stream: "{{course}}".

  Generate a detailed, practical roadmap for them.

  1.  Start with a brief, encouraging introduction about the opportunities available after completing "{{course}}".
  2.  Recommend 2-3 specific, primary paths they can follow. For example, if the input is "Intermediate (MPC)", the paths could be "Engineering (B.Tech)", "Architecture (B.Arch)", and "Pure Sciences (B.Sc)".
  3.  For EACH recommended path, provide the following details:
      -   **pathName**: The specific name of the sub-path (e.g., "B.Tech in Computer Science").
      -   **furtherStudies**: What's the next educational step after this path? (e.g., "M.Tech after B.Tech").
      -   **jobOpportunities**: List 3-4 specific job roles.
      -   **entrepreneurshipIdeas**: Provide 2-3 concrete startup ideas.
      -   **advantages**: List 2-3 key advantages of this path.
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
