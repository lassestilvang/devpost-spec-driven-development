const COLORS = [
  '#00d4ff', // neon blue
  '#b44aff', // neon purple
  '#00ff9d', // neon green
  '#ff00ff', // neon pink
  '#ff6b35', // neon orange
  '#f5f549', // neon yellow
] as const;

export function getNextColor(index: number): string {
  return COLORS[index % COLORS.length];
}

export const colorPalette = COLORS;
