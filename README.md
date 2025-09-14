This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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
This project uses the Google Gemini API to power its AI features. You will need an API key to run it.

1.  Create a new file in the root of the project directory named `.env.local`.
2.  Copy the contents from the `.env` file into your new `.env.local` file.
3.  Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
4.  Replace the placeholder value in `.env.local` with your actual API key.

Your `.env.local` file should look like this:
```
GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

### 4. Run the Development Server
Once the dependencies are installed and your API key is set, run the following command in your terminal:

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
