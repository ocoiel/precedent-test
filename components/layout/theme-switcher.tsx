import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import cx from "classnames";
import { useTheme } from "next-themes";
import { useEffect, useState, cloneElement } from "react";

const themes = [
  {
    key: "light",
    label: "Light",
    icon: <SunIcon />,
  },
  {
    key: "dark",
    label: "Dark",
    icon: <MoonIcon />,
  },

  {
    key: "system",
    label: "System",
    icon: <DesktopIcon />,
  },
];

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative z-40 inline-block text-left">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger
          className={cx(
            "inline-flex cursor-pointer select-none justify-center rounded-md px-2.5 py-2 text-center text-sm font-medium",
            "bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600",
            "border border-gray-300 dark:border-transparent",
            "focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 dark:focus-visible:ring-slate-200",
          )}
        >
          {(function () {
            switch (resolvedTheme) {
              case "light":
                return (
                  <SunIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                );
              case "dark":
                return (
                  <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                );
              default:
                return (
                  <DesktopIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                );
            }
          })()}
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="center"
            sideOffset={5}
            className={cx(
              "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down z-40",
              "w-36 cursor-pointer rounded-lg px-1.5 py-1 shadow-md md:w-48",
              "bg-gray-50 text-center dark:bg-gray-700",
            )}
          >
            {themes.map(({ key, label, icon }, i) => {
              return (
                <DropdownMenuPrimitive.Item
                  key={`theme-${i}`}
                  className={cx(
                    "flex w-full cursor-pointer select-none items-center justify-center rounded-md px-2 py-2 text-center text-xs outline-none",
                    "text-gray-500 focus:bg-gray-200 dark:text-gray-400 dark:focus:bg-gray-800",
                  )}
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                >
                  {cloneElement(icon, {
                    className:
                      "w-5 h-5 mr-2 text-gray-700 dark:text-gray-300 text-center",
                  })}
                  <span className="ml-2 flex text-gray-700 dark:text-gray-300">
                    {label}
                  </span>
                </DropdownMenuPrimitive.Item>
              );
            })}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export default ThemeSwitcher;
