import * as React from "react";
import { ThemeProvider as ThemesXProvider } from "themesx";
import { ThemeProviderProps } from "themesx";
import { useTheme } from "themesx";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <ThemesXProvider {...props}> {children} </ThemesXProvider>;
}

export { ThemeProvider, useTheme };
