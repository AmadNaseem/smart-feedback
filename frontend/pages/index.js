import ThemeSwitcher from "../components/ThemeSwitcher";
import FeedbackForm from "../components/FeedbackForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Smart Feedback
        </h1>
        <ThemeSwitcher />
      </div>

      <FeedbackForm />

    </main>
  );
}
