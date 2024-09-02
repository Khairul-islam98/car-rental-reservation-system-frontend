import React, { useEffect } from 'react';

const ThemeMode: React.FC<{ onToggleTheme: (theme: string) => void }> = ({
  onToggleTheme,
}) => {
  // Custom hook to handle the theme logic
  const useTheme = () => {
    useEffect(() => {
      const html = document.querySelector('html');
      const storedTheme = localStorage.getItem('hs_theme');
      const prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      if (storedTheme) {
        html!.classList.add(storedTheme);
      } else if (prefersDarkScheme) {
        html!.classList.add('dark');
        localStorage.setItem('hs_theme', 'dark');
      } else {
        html!.classList.add('light');
        localStorage.setItem('hs_theme', 'light');
      }
    }, []);
  };

  useTheme(); // Initialize the theme

  // Handle theme toggle
  const handleThemeToggle = (theme: string) => {
    const html = document.querySelector('html');

    if (theme === 'dark') {
      html!.classList.remove('light');
      html!.classList.add('dark');
    } else {
      html!.classList.remove('dark');
      html!.classList.add('light');
    }

    localStorage.setItem('hs_theme', theme);
    onToggleTheme(theme);
  };

  // Determine the current theme
  const isDarkMode = document.querySelector('html')?.classList.contains('dark');

  return (
    <div>
      {/* Dark Mode Button */}
      {!isDarkMode && (
        <button
          type="button"
          className="block font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          onClick={() => handleThemeToggle('dark')}
        >
          <span className="group inline-flex shrink-0 justify-center items-center size-9">
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </span>
        </button>
      )}

      {/* Light Mode Button */}
      {isDarkMode && (
        <button
          type="button"
          className="block font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          onClick={() => handleThemeToggle('light')}
        >
          <span className="group inline-flex shrink-0 justify-center items-center size-9">
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default ThemeMode;
