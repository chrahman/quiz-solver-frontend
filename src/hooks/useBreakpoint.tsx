import { useMediaQuery } from "usehooks-ts";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export const breakpoints = resolveConfig(tailwindConfig).theme.screens;
type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K, direction: "up" | "down" = "up") {
  return useMediaQuery(direction === "up" ? `(min-width: ${breakpoints[breakpointKey]})` : `(max-width: ${breakpoints[breakpointKey]})`);
}
