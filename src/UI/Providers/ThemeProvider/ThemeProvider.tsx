import * as React from "react";
import { ThemeProvider as ThemesXProvider } from "themesx";
import { ThemeProviderProps } from "themesx";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <ThemesXProvider {...props}> {children} </ThemesXProvider>;
}
