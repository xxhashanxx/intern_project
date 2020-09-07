import { createMuiTheme, Theme as MuiTheme } from "@material-ui/core";
import palette from "./palette";
import typography from "./typography";
import overrides from "./overrides";

const baseTheme = {
  palette,
  typography: typography as any,
  overrides,
};

export const theme = createMuiTheme(baseTheme);
export const themeWithRtl = createMuiTheme({ ...baseTheme, direction: "rtl" });

type MuiPalette = MuiTheme["palette"];
interface Palette extends MuiPalette {
  icon: string;
}
export interface Theme extends MuiTheme {
  palette: Palette;
}
