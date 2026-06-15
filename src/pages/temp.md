This is for copy pasting styles from another repo utrp which we want (style wise) this repo page styles to mimic.

Minimal copy-paste guide to reproduce the UTRP uninstall page styles in another repo.

Files to copy (core):
- [src/views/components/common/ExtensionRoot/ExtensionRoot.module.scss](src/views/components/common/ExtensionRoot/ExtensionRoot.module.scss)
- [src/views/styles/colors.module.scss](src/views/styles/colors.module.scss)
- [src/views/styles/fonts.module.scss](src/views/styles/fonts.module.scss)
- UnoCSS shortcuts from `unocss.config.ts` (see snippet below)
- JS color tokens: [src/shared/types/ThemeColors.ts](src/shared/types/ThemeColors.ts)
- Theme helper: [src/shared/util/themeColors.ts](src/shared/util/themeColors.ts)

Why these are needed
- `ExtensionRoot.module.scss` provides the base resets and injected-page rules (fonts, scrollbar, focus styles).
- `colors.module.scss` exports the brand color variables used throughout the UI.
- `fonts.module.scss` registers local fonts / Google imports used by the UI.
- UnoCSS shortcuts define the `btn` and `focusable` utility classes used by buttons and inputs.
- `ThemeColors.ts` and `themeColors.ts` provide runtime color tokens used by `Button`.

UnoCSS shortcuts (copy into your UnoCSS/Tailwind config):
```ts
shortcuts: {
  focusable:
    'outline-none focus-visible:outline-2 focus-visible:outline-blue-500 dark:focus-visible:outline-blue-400 focus-visible:outline-offset-2',
  btn: 'h-10 w-auto flex justify-center items-center gap-spacing-3 rounded-1 px-spacing-5 py-0 text-4.5 btn-transition disabled:(cursor-not-allowed opacity-50) active:enabled:scale-96 active:has-enabled:scale-96 focusable',
  link: 'text-ut-burntorange link:text-ut-burntorange underline underline-offset-2 hover:text-ut-orange focus-visible:text-ut-orange focusable btn-transition ease-out-expo',
}
```

Core SASS snippets (copy as-is):

- ExtensionRoot.module.scss (relevant content)
```scss
@use 'sass:meta';
@use 'src/views/styles/base.module.scss';

@layer preflights {
    .extensionRoot {
        @include meta.load-css('tailwind-compat');
    }
}

@layer default {
    .extensionRoot {
        @apply font-sans;
        color: #303030;
        * { @apply font-sans; }
        button, a, input, select, textarea, [tabindex]:not([tabindex='-1']) { @apply focusable; }
        button, [role='button'] { cursor: pointer; }
        ::-webkit-scrollbar { width: 14px; height: 14px; background: transparent; }
        ::-webkit-scrollbar-thumb { border: 3px solid #fff; border-radius: 7px; background: rgb(218,220,224); }
    }
}
```

- colors.module.scss
```scss
$burnt_orange: #bf5700;
$charcoal: #333f48;
$white: #ffffff;
:export { burnt_orange: $burnt_orange; charcoal: $charcoal; white: $white; }
```

- fonts.module.scss (register fonts or keep Google imports)
```scss
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
```

JS/TS color tokens (minimal):
```ts
export const colors = {
  ut: { burntorange: '#BF5700', black: '#333F48', orange: '#F8971F', offwhite: '#D6D2C4' },
  theme: { red: '#D10000', black: '#1A2024', offwhite: '#D6D2C4' }
} as const;
```

themeColors helper (minimal):
```ts
const colorsFlattened = Object.entries(colors).reduce((acc, [prefix, group]) => {
  for (const [name, hex] of Object.entries(group)) acc[`${prefix}-${name}`] = hex;
  return acc;
}, {} as Record<string,string>);
export const getThemeColorHexByName = (name: string) => colorsFlattened[name];
```

Button usage notes
- Button component uses `getThemeColorHexByName` and `getThemeColorRgbByName` to style background and foreground.
- If you don't bring the React `Button` component, replicate the `btn` shortcut and apply `background-color` and `color` using the tokens above.

Shadow DOM note
- `ExtensionRoot` mounts a Shadow DOM and adopts a generated global CSS stylesheet (`virtual:inline-styles`). If you don't want shadow isolation, render normally and include the CSS files directly.

Build / copy checklist
1. Copy the SASS files listed at top into your project (or extract the relevant rules into your CSS system).
2. Add the UnoCSS shortcuts and theme `colors` to your config.
3. Ensure fonts are available (either local files or Google imports).
4. Copy `ThemeColors.ts` + `themeColors.ts` if you want runtime color helpers for components.

If you want, I can generate a small ZIP containing these exact files ready to drop into another repo — say the word and I'll prepare it.


plaintext here:

@use 'sass:meta';
@use 'src/views/styles/base.module.scss';

@layer preflights {
    .extensionRoot {
        @include meta.load-css('tailwind-compat');
    }
}

@layer default {
    span {
        font-family: inherit;
    }

    .extensionRoot {
        @apply font-sans;
        color: #303030;

        // fix font-family on injected pages
        * {
            @apply font-sans;
        }

        // Global focus-visible styles for all interactive elements
        button,
        a,
        input,
        select,
        textarea,
        [tabindex]:not([tabindex='-1']) {
            @apply focusable;
        }

        button,
        [role='button'] {
            cursor: pointer;
        }

        [data-rfd-drag-handle-context-id=':r1:'] {
            cursor: move;
        }

        ::-webkit-scrollbar {
            width: 14px;
            height: 14px;
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            border: 3px solid #fff;
            border-radius: 7px;
            min-height: 40px;
            box-shadow: none;
            background: rgb(218, 220, 224);
        }
        :hover::-webkit-scrollbar-thumb,
        ::-webkit-scrollbar-thumb:hover {
            background: rgb(189, 193, 198);
        }

        ::-webkit-scrollbar-thumb:active {
            background: rgb(128, 134, 139);
        }
    }
}


$burnt_orange: #bf5700;
$charcoal: #333f48;
$white: #ffffff;
$black: #000000;
$tangerine: #f8971f;
$sunshine: #ffd600;
$cactus: #a6cd57;
$turtle_pond: #579d42;
$turquoise: #00a9b7;
$bluebonnet: #005f86;
$shade: #9cadb7;
$limestone: #d6d2c4;
$speedway_brick: #d10000;

//scss hover active focus color calculation

:export {
    burnt_orange: $burnt_orange;
    charcoal: $charcoal;
    white: $white;
    black: $black;
    tangerine: $tangerine;
    sunshine: $sunshine;
    cactus: $cactus;
    turtle_pond: $turtle_pond;
    turquoise: $turquoise;
    bluebonnet: $bluebonnet;
    shade: $shade;
    limestone: $limestone;
    speedway_brick: $speedway_brick;
}


@each $weight in '100' '200' '300' '400' '500' '600' '700' '800' '900' {
    @font-face {
        font-family: 'Inter';
        src: url('@public/fonts/inter-#{$weight}.woff2') format('woff2');
        font-display: auto;
        font-style: normal;
        font-weight: #{$weight};
    }
}

@font-face {
    font-family: 'Roboto Flex Local';
    src: url('@public/fonts/roboto-flex.woff2') format('woff2');
    font-display: swap;
    font-style: normal;
}

@font-face {
    font-family: 'Roboto Mono Local';
    src: url('@public/fonts/roboto-mono.woff2') format('woff2');
    font-display: swap;
    font-style: normal;
}

@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100..1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

$medium_size: 16px;

:export {
    medium_size: $medium_size;
}


import type { theme } from 'unocss/preset-mini';

import type { HexColor } from './Color';

export const colors = {
    ut: {
        burntorange: '#BF5700',
        black: '#333F48',
        orange: '#F8971F',
        yellow: '#FFD600',
        lightgreen: '#A6CD57',
        green: '#579D42',
        teal: '#00A9B7',
        blue: '#005F86',
        gray: '#9CADB7',
        offwhite: '#D6D2C4',
    },
    theme: {
        red: '#D10000',
        black: '#1A2024',
        offwhite: '#D6D2C4',
        black1: '#333F4850',
        black2: '#333F4820',
        staticwhite: '#FFFFFF',
        staticblack: '#1A2024',
        majorgridline: '#D1D5DB',
        minorgridline: '#F3F4F6',
    },
} as const satisfies Record<string, Record<string, string>>;

export const extendedColors = {
    ...colors,
    gradeDistribution: {
        a: '#22C55E',
        aminus: '#A3E635',
        bplus: '#84CC16',
        b: '#FDE047',
        bminus: '#FACC15',
        cplus: '#F59E0B',
        c: '#FB923C',
        cminus: '#F97316',
        dplus: '#EF4444',
        d: '#DC2626',
        dminus: '#B91C1C',
        f: '#B91C1C',
        other: '#D6D3D1',
    },
} as const;

type NestedKeys<T> = {
    [K in keyof T]: T[K] extends Record<string, unknown> ? `${string & K}-${string & keyof T[K]}` : never;
}[keyof T];

/**
 * A union of all colors in the theme
 */
export type ThemeColor = NestedKeys<typeof colors>;

/**
 * Represents a Tailwind colorway: a colorway is a key in the theme.colors object that has an object as its value
 */
export type TWColorway = {
    [K in keyof typeof theme.colors]: (typeof theme.colors)[K] extends Record<string, unknown> ? K : never;
}[keyof typeof theme.colors];

/**
 * Represents the index type for accessing the theme colors based on the specified TWColorway
 */
export type TWIndex = keyof (typeof theme.colors)[TWColorway];

/**
 * Represents the colors for a course.
 */
export interface CourseColors {
    primaryColor: HexColor;
    secondaryColor: HexColor;
}

/**
 * Adjusted colorway indexes for better *quality*
 */
export const colorwayIndexes = {
    yellow: 300,
    amber: 400,
    emerald: 400,
    lime: 400,
    orange: 400,
    sky: 600,
} as const satisfies Record<string, number>;

import type { HexColor } from '../types/Color';
import type { ThemeColor } from '../types/ThemeColors';
import { colors } from '../types/ThemeColors';
import { hexToRGB } from './colors';

/**
 * Flattened colors object.
 */
export const colorsFlattened: Record<ThemeColor, string> = Object.entries(colors).reduce(
    (acc: Record<ThemeColor, string>, [prefix, group]) => {
        for (const [name, hex] of Object.entries(group)) {
            acc[`${prefix}-${name}` as ThemeColor] = hex;
        }
        return acc;
    },
    {} as Record<ThemeColor, string>
);

/**
 * Represents the flattened RGB values of the colors.
 */
const colorsFlattenedRgb: Record<ThemeColor, ReturnType<typeof hexToRGB>> = Object.fromEntries(
    Object.entries(colorsFlattened).map(([name, hex]) => [name, hexToRGB(hex as HexColor)])
) as Record<ThemeColor, ReturnType<typeof hexToRGB>>;

/**
 * Retrieves the hexadecimal color value by name from the theme.
 *
 * @param name - The name of the theme color.
 * @returns The hexadecimal color value.
 */
export const getThemeColorHexByName = (name: ThemeColor): string => colorsFlattened[name];

/**
 *
 * @param name - The name of the theme color.
 * @returns An array of the red, green, and blue values, respectively
 */
export const getThemeColorRgbByName = (name: ThemeColor) => colorsFlattenedRgb[name];
