import FeedbackForm from "../components/FeedbackForm";
import Button from "../components/ui/Button";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative">
  <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 md:pt-24 md:pb-20 flex flex-col items-center text-center">
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6 border border-primary/20">AI-powered insights</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gradient-hero mb-6 leading-[1.05] max-w-4xl">
            Understand your users faster with smart feedback analytics
          </h1>
          <p className="text-base md:text-xl text-soft max-w-2xl mb-8">
            Collect feedback, analyze sentiment automatically, and turn insights into product improvements. Built with modern tech & a delightful UI.
          </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button as={Link} href="/admin" variant="outline" className="text-base px-6 py-3">Go to Dashboard</Button>
          <Button as={Link} href="#feedback" variant="outline" className="text-base px-6 py-3">Leave Feedback</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-4 mb-20">
          {[
            ['Sentiment Analysis','Instantly classify feedback as positive, neutral, or negative.'],
            ['Real-time Stats','Track counts and distribution with live updating metrics.'],
            ['Secure Auth','JWT-based security keeps your data safe.'],
          ].map(([title, desc]) => (
            <div key={title} className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl text-left">
              <h3 className="font-semibold text-strong mb-1 tracking-tight">{title}</h3>
              <p className="text-sm text-soft leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
  <section id="feedback" className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-8 bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">Share your feedback</h2>
        <FeedbackForm />
      </section>
    </div>
  );
}
