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

const white = '#E8EAF6';
const black = '#1A237E';

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FF8A80' : '#263238', // Soft red for dark mode, dark blue-grey for light mode
    text2: darkMode ? '#FF5252' : '#37474F', // Bright red for dark mode, blue-grey for light mode
    text3: darkMode ? '#FF1744' : '#455A64', // Vivid red for dark mode, blue-grey for light mode
    text4: darkMode ? '#D50000' : '#607D8B', // Deep red for dark mode, grey-blue for light mode
    text5: darkMode ? '#C51162' : '#78909C', // Pink-red for dark mode, grey-blue for light mode

    // backgrounds / greys
    bg1: darkMode ? '#0D47A1' : '#ECEFF1', // Deep blue for dark mode, light blue-grey for light mode
    bg2: darkMode ? '#1565C0' : '#CFD8DC', // Blue for dark mode, light blue-grey for light mode
    bg3: darkMode ? '#1976D2' : '#B0BEC5', // Mid blue for dark mode, light blue-grey for light mode
    bg4: darkMode ? '#1E88E5' : '#90A4AE', // Lighter blue for dark mode, blue-grey for light mode
    bg5: darkMode ? '#42A5F5' : '#78909C', // Sky blue for dark mode, grey-blue for light mode

    // specialty colors
    modalBG: darkMode ? 'rgba(255,82,82,0.425)' : 'rgba(38,50,56,0.3)',
    advancedBG: darkMode ? 'rgba(38,50,56,0.1)' : 'rgba(224,247,250,0.6)',

    // primary colors
    primary1: darkMode ? '#FF4081' : '#3D5AFE', // Pink for dark mode, bright blue for light mode
    primary2: darkMode ? '#F50057' : '#304FFE', // Deep pink for dark mode, darker blue for light mode
    primary3: darkMode ? '#C51162' : '#1A237E', // Darker pink for dark mode, deepest blue for light mode
    primary4: darkMode ? '#880E4F70' : '#8C9EFF', // Very dark pink for dark mode, soft blue for light mode
    primary5: darkMode ? '#AD145770' : '#B3E5FC', // Dark pink for dark mode, light blue for light mode

    // color text
    primaryText1: darkMode ? '#FF4081' : '#283593', // Pink for dark mode, indigo for light mode

    // secondary colors
    secondary1: darkMode ? '#FF80AB' : '#536DFE', // Light pink for dark mode, blue for light mode
    secondary2: darkMode ? '#FF80AB26' : '#8C9EFF', // Light pink for dark mode, soft blue for light mode
    secondary3: darkMode ? '#FF80AB26' : '#E3F2FD', // Light pink for dark mode, very light blue for light mode

    // other
    red1: darkMode ? '#FF5252' : '#D32F2F',
    red2: darkMode ? '#FF1744' : '#E53935',
    green1: darkMode ? '#69F0AE' : '#00C853',
    yellow1: darkMode ? '#FFD600' : '#FFEB3B', // Bright yellow for dark mode, yellow for light mode
    yellow2: darkMode ? '#FFC400' : '#FFD600' // Golden yellow for dark mode, bright yellow for light mode

    // don't wanna forget these blue yet
    // blue4: darkMode ? '#FF80AB70' : '#B3E5FC', // Light pink for dark mode, light blue for light mode
    // blue5: darkMode ? '#FF80AB70' : '#E3F2FD', // Light pink for dark mode, very light blue for light mode
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
