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
