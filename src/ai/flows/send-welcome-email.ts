'use server';
/**
 * @fileOverview A flow to send a welcome email to new users.
 *
 * - sendWelcomeEmail - A function that sends the email.
 * - WelcomeEmailInput - The input type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const WelcomeEmailInputSchema = z.object({
  email: z.string().describe('The recipient\'s email address.'),
  name: z.string().describe('The name of the user.'),
});
export type WelcomeEmailInput = z.infer<typeof WelcomeEmailInputSchema>;

export async function sendWelcomeEmail(input: WelcomeEmailInput): Promise<void> {
  return sendWelcomeEmailFlow(input);
}

const emailPrompt = ai.definePrompt({
  name: 'welcomeEmailPrompt',
  input: { schema: WelcomeEmailInputSchema },
  prompt: `
    To: {{{email}}}
    Subject: Welcome to CareerCompass - Your Journey Starts Now!

    Dear {{{name}}},

    Thank you for registering with CareerCompass, an initiative by the Government of Jammu and Kashmir to empower students like you. We are thrilled to have you on board!

    Our mission is to provide you with the best tools and resources to navigate your educational and career journey with confidence. Here’s what you can do on our platform:

    *   **AI-Powered Assessments**: Take insightful quizzes to discover your strengths, interests, and the career paths that are a perfect fit for you.
    *   **Personalized Recommendations**: Receive tailored suggestions for courses, colleges, and careers based on your unique profile.
    *   **Comprehensive College Directory**: Explore detailed information about thousands of colleges across India, including their NIRF rankings.
    *   **Dynamic Career Roadmaps**: Visualize your entire journey, from your current educational stage to your dream job and beyond.
    *   **AI College Finder**: Instantly find the best colleges for any course you're interested in.

    Your journey to a successful future starts now. We encourage you to start by taking an assessment to unlock your personalized dashboard.

    Best regards,
    The CareerCompass Team
    Government of Jammu and Kashmir
  `,
  config: {
    // In a real application, you would configure an email sending tool here.
    // For this demo, the output is simulated in the console.
  },
});

const sendWelcomeEmailFlow = ai.defineFlow(
  {
    name: 'sendWelcomeEmailFlow',
    inputSchema: WelcomeEmailInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    // In a real app, this would use a tool to send the email.
    // For now, we just generate the content and log it.
    const email = await emailPrompt(input);
    console.log('--- Sending Welcome Email ---');
    console.log(email.text);
    console.log('-----------------------------');
  }
);
