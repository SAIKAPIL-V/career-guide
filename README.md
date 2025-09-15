# EduCareer Compass - Next.js Starter

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), enhanced with AI features using Genkit and Firebase.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Running the Project Locally

After downloading the project ZIP file, follow these steps to run it on your local machine:

### 1. Unzip the File
Extract the contents of the ZIP file into a new folder on your computer.

### 2. Install Dependencies
Open a terminal or command prompt, navigate into the project directory you just created, and run the following command to install all the required packages:

```bash
npm install
```

### 3. Set Up Environment Variables
This project uses both **Firebase** for authentication and data storage, and the **Google Gemini API** for its AI features. You will need API keys and configuration for both.

1.  Create a new file in the root of the project directory named `.env.local`.
2.  Copy the contents from the `.env` file into your new `.env.local` file.
3.  **Set up Firebase:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Create a new project or select an existing one.
    *   In your Project Settings, under the "General" tab, scroll down to "Your apps".
    *   Click the web icon (`</>`) to add a new web app.
    *   After registering the app, you will see a `firebaseConfig` object. Copy the values from this object into your `.env.local` file, matching the keys (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY` corresponds to `apiKey`).
    *   Go to the **Authentication** section in the Firebase console, select the **Sign-in method** tab, and enable the **Email/Password** provider.
4.  **Set up Gemini API Key:**
    *   Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Paste this key into the `GEMINI_API_KEY` variable in your `.env.local` file.

Your `.env.local` file should look something like this:
```
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-firebase-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-firebase-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-firebase-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-firebase-messaging-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-firebase-app-id"
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Run the Development Server
Once the dependencies are installed and your environment variables are set, run the following command in your terminal:

```bash
npm run dev
```

This will start the local development server. You can then open [http://localhost:3000](http://localhost:3000) in your web browser to see the application running.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
