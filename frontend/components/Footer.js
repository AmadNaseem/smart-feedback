export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-gray-500 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-8">
      <span>© {new Date().getFullYear()} Smart Feedback. All rights reserved.</span>
    </footer>
  );
}
