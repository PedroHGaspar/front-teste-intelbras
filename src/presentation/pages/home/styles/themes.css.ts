import { createThemeContract, createTheme } from "@vanilla-extract/css";
import { COLOR_PALETTE } from "../../../components/styles/theme/color-palette";

export const vars = createThemeContract({
    color: {
        background: null,
        text: null,
        surface: null,
        border: null,
        success: null,
        error: null,
        hover: null,
        tableRowEven: null,
        tableRowOdd: null,
    },
});

export const lightTheme = createTheme(vars, {
    color: {
        background: COLOR_PALETTE.neutral[50],
        text: COLOR_PALETTE.neutral[900],
        surface: COLOR_PALETTE.neutral[200],
        border: COLOR_PALETTE.neutral[300],
        success: COLOR_PALETTE.green[500],
        error: COLOR_PALETTE.red[300],
        hover: COLOR_PALETTE.neutral[300],
        tableRowEven: COLOR_PALETTE.neutral[50],
        tableRowOdd: COLOR_PALETTE.neutral[200],
    },
});

export const darkTheme = createTheme(vars, {
    color: {
        background: COLOR_PALETTE.neutral[950],
        text: COLOR_PALETTE.neutral[50],
        surface: COLOR_PALETTE.neutral[850],
        border: COLOR_PALETTE.neutral[700],
        success: COLOR_PALETTE.green[500],
        error: COLOR_PALETTE.red[300],
        hover: COLOR_PALETTE.neutral[650],
        tableRowEven: COLOR_PALETTE.neutral[700],
        tableRowOdd: COLOR_PALETTE.neutral[860],
    },
});
