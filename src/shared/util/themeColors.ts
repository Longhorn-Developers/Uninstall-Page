import { colors } from '../types/ThemeColors';
import { hexToRGB } from './colors';

export const colorsFlattened: Record<string, string> = Object.entries(colors).reduce(
	(acc, [prefix, group]) => {
		for (const [name, hex] of Object.entries(group)) {
			acc[`${prefix}-${name}`] = hex as string;
		}
		return acc;
	},
	{} as Record<string, string>
);

export const getThemeColorHexByName = (name: keyof typeof colorsFlattened) => colorsFlattened[name as string];

export const getThemeColorRgbByName = (name: keyof typeof colorsFlattened) => {
	const hex = colorsFlattened[name as string];
	return hex ? hexToRGB(hex as HexColor) : undefined;
};

type HexColor = `#${string}`;
