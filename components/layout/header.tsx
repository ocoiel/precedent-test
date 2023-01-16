import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import UserDropdown from "./user-dropdown";
import { useSession } from "next-auth/react";
import { useSignInModal } from "./sign-in-modal";

export default function Header() {
  const { data: session, status } = useSession();
  const { setTheme, systemTheme, resolvedTheme } = useTheme();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [mounted, setMounted] = useState(false);
  const scrolled = useScroll(50);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <SignInModal />
      <div className="fixed h-screen w-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100 transition-all duration-200 dark:from-zinc-900 dark:via-slate-800 dark:to-black" />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Logo image of a chat bubble"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Precedent</p>
          </Link>
          <div className="flex gap-2">
            <motion.button
              className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              {...FADE_IN_ANIMATION_SETTINGS}
            >
              Theme test
            </motion.button>
            <AnimatePresence>
              {!session && status !== "loading" ? (
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
