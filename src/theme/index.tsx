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

const white = '#FFFFFF';
const black = '#000000';

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#DAA520' : '#1F2937', // Darker golden color for dark mode, dark grey for light mode
    text2: darkMode ? '#B8860B' : '#374151', // Darker golden color for dark mode, grey for light mode
    text3: darkMode ? '#CD853F' : '#4B5563', // Darker golden color for dark mode, grey for light mode
    text4: darkMode ? '#8B4513' : '#6B7280', // Darker golden color for dark mode, light grey for light mode
    text5: darkMode ? '#A0522D' : '#9CA3AF', // Darker golden color for dark mode, lighter grey for light mode

    // backgrounds / greys
    bg1: darkMode ? '#212429' : '#F9FAFB', // Dark background for dark mode, light grey for light mode
    bg2: darkMode ? '#2C2F36' : '#F3F4F6', // Dark background for dark mode, light grey for light mode
    bg3: darkMode ? '#40444F' : '#E5E7EB', // Dark background for dark mode, light grey for light mode
    bg4: darkMode ? '#565A69' : '#D1D5DB', // Dark background for dark mode, light grey for light mode
    bg5: darkMode ? '#565A69' : '#9CA3AF', // Dark background for dark mode, grey for light mode

    // specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,0.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    // primary colors
    primary1: darkMode ? '#DAA520' : '#3B82F6', // Darker golden color for dark mode, blue for light mode
    primary2: darkMode ? '#B8860B' : '#2563EB', // Darker golden color for dark mode, blue for light mode
    primary3: darkMode ? '#CD853F' : '#1D4ED8', // Darker golden color for dark mode, blue for light mode
    primary4: darkMode ? '#8B451370' : '#93C5FD', // Darker golden color for dark mode, light blue for light mode
    primary5: darkMode ? '#A0522D70' : '#BFDBFE', // Darker golden color for dark mode, lighter blue for light mode

    // color text
    primaryText1: darkMode ? '#DAA520' : '#1E40AF', // Darker golden color for dark mode, blue for light mode

    // secondary colors
    secondary1: darkMode ? '#DAA520' : '#60A5FA', // Darker golden color for dark mode, blue for light mode
    secondary2: darkMode ? '#DAA52026' : '#BFDBFE', // Darker golden color for dark mode, light blue for light mode
    secondary3: darkMode ? '#DAA52026' : '#E0EFFF', // Darker golden color for dark mode, very light blue for light mode

    // other
    red1: darkMode ? '#FF4500' : '#DC2626',
    red2: darkMode ? '#FF0000' : '#EF4444',
    green1: darkMode ? '#9ACD32' : '#10B981',
    yellow1: darkMode ? '#DAA520' : '#FBBF24', // Darker golden color for dark mode, yellow for light mode
    yellow2: darkMode ? '#B8860B' : '#F59E0B' // Darker golden color for dark mode, yellow for light mode

    // don't wanna forget these blue yet
    // blue4: darkMode ? '#DAA52070' : '#C4D9F8', // Darker golden color for dark mode, blue for light mode
    // blue5: darkMode ? '#DAA52070' : '#EBF4FF', // Darker golden color for dark mode, blue for light mode
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
