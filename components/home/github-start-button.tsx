import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";

const Odometer = dynamic(import("react-odometerjs"), {
  ssr: false,
});

function Skeleton() {
  return (
    <div className="flex h-4 w-16 animate-pulse flex-row justify-center rounded-lg bg-gray-300"></div>
  );
}

export function GithubStarButton() {
  const [stars, setStars] = useState<number>();

  const fetchStars = async () => {
    const res = await fetch(
      "https://api.github.com/repos/steven-tey/precedent",
    );
    const data = await res.json();
    if (typeof data?.stargazers_count === "number") {
      setStars(data.stargazers_count);
    }
  };

  useEffect(() => {
    fetchStars().catch(console.error);
  }, []);

  return (
    <Suspense fallback={<Skeleton />}>
      <Odometer duration={3000} format="(,ddd)" value={stars!} />
    </Suspense>
  );
}
