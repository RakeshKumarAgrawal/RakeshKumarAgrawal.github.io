export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "rka-portfolio-theme";

export const getPreferredTheme = (savedTheme: string | null, prefersDark: boolean): Theme => {
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return prefersDark ? "dark" : "light";
};
