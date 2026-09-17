export function paletteToCssVariables(palette: string[]): string {
  let css = ':root {\n';
  palette.forEach((hex, i) => {
    css += `  --color-${i + 1}: #${hex};\n`;
  });
  css += '}';
  return css;
}

export function paletteToTailwindConfig(palette: string[]): string {
  let config = "theme: {\n  extend: {\n    colors: {\n      palette: {\n";
  palette.forEach((hex, i) => {
    config += `        ${i + 1}: '#${hex}',\n`;
  });
  config += "      }\n    }\n  }\n}";
  return config;
}

export function paletteToJson(palette: string[]): string {
  return JSON.stringify(
    palette.map((hex) => `#${hex}`),
    null,
    2
  );
}

export function paletteToSvg(palette: string[]): string {
  const width = 500;
  const height = 200;
  const colWidth = width / palette.length;

  let rects = '';
  palette.forEach((hex, i) => {
    // Determine a good text color for the hex label
    // Calculate luminance
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const textColor = luminance > 0.5 ? '#000000' : '#FFFFFF';

    rects += `
    <g transform="translate(${i * colWidth}, 0)">
      <rect width="${colWidth}" height="${height}" fill="#${hex}" />
      <text x="${colWidth / 2}" y="${height - 20}" fill="${textColor}" font-family="sans-serif" font-size="16" text-anchor="middle">#${hex}</text>
    </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    ${rects}
  </svg>`;
}
