import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#fff8f0" },
          100: { value: "#ffecd6" },
          200: { value: "#ffd9ad" },
          300: { value: "#ffbf7a" },
          400: { value: "#ffa84d" },
          500: { value: "#ff6800" },
          600: { value: "#cc6e14" },
          700: { value: "#be4c00" },
          800: { value: "#663409" },
          900: { value: "#331a04" },
        },

        ink: {
          50: { value: "#f6f6f6" },
          100: { value: "#f1f2f3" },
          200: { value: "#e1e3e5" },
          300: { value: "#c9ccd0" },
          400: { value: "#9C9C9C" },
          500: { value: "#6f757c" },
          600: { value: "#403F3F" },
          700: { value: "#3E3E3E" },
          800: { value: "#2E2E2E" },
          900: { value: "#242424" },
        },

        accent: {
          50: { value: "{colors.brand.50}" },
          100: { value: "{colors.brand.100}" },
          200: { value: "{colors.brand.200}" },
          300: { value: "{colors.brand.300}" },
          400: { value: "{colors.brand.400}" },
          500: { value: "{colors.brand.500}" },
          600: { value: "{colors.brand.600}" },
          700: { value: "{colors.brand.700}" },
          800: { value: "{colors.brand.800}" },
          900: { value: "{colors.brand.900}" },
        },

        muted: {
          50: { value: "{colors.ink.200}" },
          100: { value: "{colors.ink.300}" },
          200: { value: "{colors.ink.400}" },
          300: { value: "{colors.ink.500}" },
        },
      },
    },

    semanticTokens: {
      colors: {
        "bg.surface": {
          value: { base: "{colors.ink.50}", _dark: "{colors.ink.900}" },
        },
        "bg.subtle": {
          value: { base: "{colors.ink.100}", _dark: "{colors.ink.800}" },
        },

        "bg.selected": {
          value: { base: "{colors.ink.200}", _dark: "{colors.ink.600}" },
        },

        text: {
          value: { base: "{colors.ink.800}", _dark: "{colors.ink.50}" },
        },

        "text.overlay": {
          value: { base: "{colors.ink.50}", _dark: "{colors.ink.800}" },
        },

        primary: {
          value: { base: "{colors.brand.500}", _dark: "{colors.brand.500}" },
        },

        chart1: {
          value: { base: "{colors.brand.300}", _dark: "{colors.brand.700}" },
        },

        muted: {
          value: { base: "{colors.ink.500}", _dark: "{colors.ink.400}" },
        },

        "border.default": {
          value: { base: "{colors.ink.200}", _dark: "{colors.ink.700}" },
        },
        "icon.default": {
          value: { base: "{colors.ink.700}", _dark: "{colors.ink.100}" },
        },
      },
    },
  },
});
