export type Theme = "light" | "dark";

export function getPreferredTheme(): Theme {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}