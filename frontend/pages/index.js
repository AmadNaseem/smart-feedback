import ThemeSwitcher from "../components/ThemeSwitcher";
import FeedbackForm from "../components/FeedbackForm";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center py-8 px-2">
      <section className="w-full max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-violet-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-4 animate-fade-in">
          Smart Feedback
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-6 animate-fade-in delay-100">
          Share your thoughts and help us improve. Your feedback is valuable!
        </p>
        <div className="flex justify-center items-center gap-4 animate-fade-in delay-200">
          <ThemeSwitcher />
        </div>
      </section>
      <div className="w-full max-w-xl animate-fade-in delay-300">
        <FeedbackForm />
      </div>
    </main>
  );
}
