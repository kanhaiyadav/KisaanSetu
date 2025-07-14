import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface HSLColor {
    h: number;
    s: number;
    l: number;
}

interface RGBColor {
    r: number;
    g: number;
    b: number;
}

export function stringToColor(str: string): string {

        let hash: number = 0;
        for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
                hash = hash & hash;
        }

        const hue: number = Math.abs(hash) % 360;
        const saturation: number = 65 + (Math.abs(hash) % 20);
        const lightness: number = 45 + (Math.abs(hash) % 20);

        const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
                h /= 360;
                s /= 100;
                l /= 100;

                const hue2rgb = (p: number, q: number, t: number): number => {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                };

                if (s === 0) {
                        return [l, l, l];
                }

                const q: number = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p: number = 2 * l - q;
                const r: number = hue2rgb(p, q, h + 1 / 3);
                const g: number = hue2rgb(p, q, h);
                const b: number = hue2rgb(p, q, h - 1 / 3);

                return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        };

        const [r, g, b]: [number, number, number] = hslToRgb(hue, saturation, lightness);

        const toHex = (n: number): string => {
                const hex: string = n.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}