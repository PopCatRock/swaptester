import { transparentize } from 'polished'
import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#F5F5F5';
const black = '#1B1B1B';

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#B3E5FC' : '#1F2937', // Light sky blue for dark mode, dark grey for light mode
    text2: darkMode ? '#81D4FA' : '#374151', // Sky blue for dark mode, grey for light mode
    text3: darkMode ? '#4FC3F7' : '#4B5563', // Lighter sky blue for dark mode, grey for light mode
    text4: darkMode ? '#29B6F6' : '#6B7280', // Soft blue for dark mode, light grey for light mode
    text5: darkMode ? '#0288D1' : '#9CA3AF', // Deep blue for dark mode, lighter grey for light mode

    // backgrounds / greys
    bg1: darkMode ? '#121212' : '#F9FAFB', // Very dark grey for dark mode, light grey for light mode
    bg2: darkMode ? '#1E1E1E' : '#F3F4F6', // Dark grey for dark mode, light grey for light mode
    bg3: darkMode ? '#2C2C2C' : '#E5E7EB', // Mid grey for dark mode, light grey for light mode
    bg4: darkMode ? '#383838' : '#D1D5DB', // Lighter grey for dark mode, light grey for light mode
    bg5: darkMode ? '#454545' : '#9CA3AF', // Even lighter grey for dark mode, grey for light mode

    // specialty colors
    modalBG: darkMode ? 'rgba(255,255,255,0.075)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)',

    // primary colors
    primary1: darkMode ? '#64B5F6' : '#3B82F6', // Lighter blue for dark mode, blue for light mode
    primary2: darkMode ? '#42A5F5' : '#2563EB', // Lighter blue for dark mode, blue for light mode
    primary3: darkMode ? '#2196F3' : '#1D4ED8', // Blue for dark mode, darker blue for light mode
    primary4: darkMode ? '#1E88E5' : '#93C5FD', // Slightly deeper blue for dark mode, light blue for light mode
    primary5: darkMode ? '#1976D2' : '#BFDBFE', // Deep blue for dark mode, lighter blue for light mode

    // color text
    primaryText1: darkMode ? '#90CAF9' : '#1E40AF', // Light blue for dark mode, blue for light mode

    // secondary colors
    secondary1: darkMode ? '#4DD0E1' : '#60A5FA', // Soft cyan for dark mode, blue for light mode
    secondary2: darkMode ? '#26C6DA' : '#BFDBFE', // Light cyan for dark mode, light blue for light mode
    secondary3: darkMode ? '#00BCD4' : '#E0EFFF', // Bright cyan for dark mode, very light blue for light mode

    // other
    red1: darkMode ? '#EF5350' : '#DC2626',
    red2: darkMode ? '#E57373' : '#EF4444',
    green1: darkMode ? '#81C784' : '#10B981',
    yellow1: darkMode ? '#FFEB3B' : '#FBBF24', // Bright yellow for dark mode, yellow for light mode
    yellow2: darkMode ? '#FBC02D' : '#F59E0B' // Golden yellow for dark mode, yellow for light mode

    // don't wanna forget these blue yet
    // blue4: darkMode ? '#81D4FA70' : '#C4D9F8', // Light blue for dark mode, light blue for light mode
    // blue5: darkMode ? '#B3E5FC70' : '#EBF4FF', // Light blue for dark mode, blue for light mode
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.018em;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Inter var', sans-serif;
  }
}

html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg2};
}

body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-image: ${({ theme }) =>
    `radial-gradient(50% 50% at 50% 50%, ${transparentize(0.9, theme.primary1)} 0%, ${transparentize(
      1,
      theme.bg1
    )} 100%)`};
}
`
