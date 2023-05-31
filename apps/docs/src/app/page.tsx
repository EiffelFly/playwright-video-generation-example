import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Template",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8 text-white">
        Hello World
      </main>
    </div>
  );
}
