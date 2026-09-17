import { hexToRgb, rgbToHsl, hslToHex, normalizeHex } from './color';

export type HarmonyMode = 'random' | 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'pastel' | 'vibrant' | 'dark';

export interface GenerateOptions {
  seed?: string;
  mode: HarmonyMode;
  lockedColors?: Map<number, string>; // Map of index to hex
}

function randomHex(): string {
  const letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function ensureFiveColors(colors: string[]): string[] {
    const result = [...colors];
    while (result.length < 5) {
        result.push(randomHex());
    }
    return result.slice(0, 5);
}


function shiftHue(h: number, amount: number): number {
    return (h + amount) % 360;
}

export function generateRandomPalette(): string[] {
    return Array.from({ length: 5 }, () => randomHex());
}

export function generateMonochromatic(seed: string): string[] {
    const rgb = hexToRgb(seed);
    const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Vary lightness, keep hue and sat
    return [
        hslToHex(h, s, Math.max(l - 40, 10)),
        hslToHex(h, s, Math.max(l - 20, 20)),
        seed,
        hslToHex(h, s, Math.min(l + 20, 80)),
        hslToHex(h, s, Math.min(l + 40, 90)),
    ];
}

export function generateAnalogous(seed: string): string[] {
    const rgb = hexToRgb(seed);
    const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return [
        hslToHex(shiftHue(h, -60), s, l),
        hslToHex(shiftHue(h, -30), s, l),
        seed,
        hslToHex(shiftHue(h, 30), s, l),
        hslToHex(shiftHue(h, 60), s, l),
    ];
}

export function generateComplementary(seed: string): string[] {
     const rgb = hexToRgb(seed);
     const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
     const compH = shiftHue(h, 180);

     return [
        hslToHex(h, s, Math.max(l - 20, 10)),
        seed,
        hslToHex(h, s, Math.min(l + 20, 90)),
        hslToHex(compH, s, Math.max(l - 15, 15)),
        hslToHex(compH, s, l),
     ];
}

export function generateTriadic(seed: string): string[] {
    const rgb = hexToRgb(seed);
    const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return [
        hslToHex(shiftHue(h, 120), s, Math.max(l - 10, 10)),
        hslToHex(shiftHue(h, 120), s, l),
        seed,
        hslToHex(shiftHue(h, 240), s, l),
        hslToHex(shiftHue(h, 240), s, Math.min(l + 10, 90)),
    ];
}

export function generateTetradic(seed: string): string[] {
     const rgb = hexToRgb(seed);
     const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
     return [
         seed,
         hslToHex(shiftHue(h, 90), s, l),
         hslToHex(shiftHue(h, 180), s, l),
         hslToHex(shiftHue(h, 270), s, l),
         hslToHex(shiftHue(h, 90), s, Math.max(l-20, 10)), // Extra color
     ];
}

export function generatePastel(seed?: string): string[] {
     const baseH = seed ? rgbToHsl(...Object.values(hexToRgb(seed)) as [number, number, number]).h : Math.random() * 360;
     return [
         hslToHex(shiftHue(baseH, -60), 70, 85),
         hslToHex(shiftHue(baseH, -30), 75, 80),
         hslToHex(baseH, 80, 85),
         hslToHex(shiftHue(baseH, 30), 75, 80),
         hslToHex(shiftHue(baseH, 60), 70, 85),
     ]
}

export function generateVibrant(seed?: string): string[] {
    const baseH = seed ? rgbToHsl(...Object.values(hexToRgb(seed)) as [number, number, number]).h : Math.random() * 360;
     return [
         hslToHex(shiftHue(baseH, -40), 90, 50),
         hslToHex(shiftHue(baseH, -20), 100, 55),
         hslToHex(baseH, 100, 50),
         hslToHex(shiftHue(baseH, 20), 100, 55),
         hslToHex(shiftHue(baseH, 40), 90, 50),
     ]
}

export function generateDark(seed?: string): string[] {
     const baseH = seed ? rgbToHsl(...Object.values(hexToRgb(seed)) as [number, number, number]).h : Math.random() * 360;
     return [
         hslToHex(shiftHue(baseH, -45), 40, 15),
         hslToHex(shiftHue(baseH, -20), 50, 20),
         hslToHex(baseH, 60, 25),
         hslToHex(shiftHue(baseH, 20), 50, 20),
         hslToHex(shiftHue(baseH, 45), 40, 15),
     ]
}

export function applyLocks(newPalette: string[], lockedMap: Map<number, string>): string[] {
    const result = [...newPalette];
    lockedMap.forEach((hex, index) => {
        if (index >= 0 && index < 5) {
             result[index] = hex;
        }
    });
    return result;
}

export function generatePalette(options: GenerateOptions): string[] {
    const normalizedSeed = options.seed ? normalizeHex(options.seed) : null;
    const seed = normalizedSeed || randomHex();

    let palette: string[] = [];

    switch (options.mode) {
        case 'monochromatic':
            palette = generateMonochromatic(seed);
            break;
        case 'analogous':
            palette = generateAnalogous(seed);
            break;
        case 'complementary':
            palette = generateComplementary(seed);
            break;
        case 'triadic':
            palette = generateTriadic(seed);
            break;
        case 'tetradic':
            palette = generateTetradic(seed);
            break;
        case 'pastel':
            palette = generatePastel(normalizedSeed || undefined);
            break;
        case 'vibrant':
            palette = generateVibrant(normalizedSeed || undefined);
            break;
        case 'dark':
            palette = generateDark(normalizedSeed || undefined);
            break;
        case 'random':
        default:
             palette = generateRandomPalette();
             // In random mode, if there's a seed, put it in the middle for reference
             if (normalizedSeed && !options.lockedColors?.has(2)) {
                 palette[2] = seed;
             }
             break;
    }

    if (options.lockedColors && options.lockedColors.size > 0) {
        palette = applyLocks(palette, options.lockedColors);
    }

    return ensureFiveColors(palette);
}
