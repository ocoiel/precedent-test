export default function Footer() {
  return (
    <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center dark:border-gray-800 dark:bg-black">
      <p className="text-gray-500 dark:text-gray-400">
        A free template made with ❤️ by{" "}
        <a
          className="font-medium text-gray-300 underline transition-colors hover:text-white hover:decoration-wavy hover:transition-all"
          href="https://twitter.com/steventey"
          target="_blank"
          rel="noopener noreferrer"
        >
          Steven Tey
        </a>
      </p>
    </div>
  );
}
