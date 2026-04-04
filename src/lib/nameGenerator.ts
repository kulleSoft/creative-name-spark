export type Category = 'empresas' | 'apps' | 'marcas' | 'usuarios' | 'jogos';
export type Style = 'moderno' | 'profissional' | 'criativo' | 'curto' | 'tech';

export interface GeneratedName {
  id: string;
  name: string;
  category: Category;
  style: Style;
  keyword: string;
  createdAt: number;
  isFavorite: boolean;
}

const prefixes: Record<Style, string[]> = {
  moderno: ['Nova', 'Flux', 'Vibe', 'Pulse', 'Neo', 'Aura', 'Zen', 'Flow', 'Drift', 'Bloom'],
  profissional: ['Prime', 'Elite', 'Vertex', 'Apex', 'Core', 'Atlas', 'Pragma', 'Stride', 'Forte', 'Merit'],
  criativo: ['Spark', 'Muse', 'Pixel', 'Prism', 'Echo', 'Fable', 'Quirk', 'Bliss', 'Whirl', 'Zest'],
  curto: ['Go', 'Ox', 'Vy', 'Zo', 'Qi', 'Lu', 'Bo', 'Ka', 'Nu', 'Re'],
  tech: ['Byte', 'Code', 'Data', 'Algo', 'Cyber', 'Sync', 'Node', 'Cloud', 'Stack', 'Dev'],
};

const suffixes: Record<Category, string[]> = {
  empresas: ['Corp', 'Group', 'Hub', 'Lab', 'Works', 'Co', 'Solutions', 'Global', 'Partners', 'Ventures', 'Inc', 'Studio'],
  apps: ['App', 'ly', 'ify', 'io', 'ize', 'Up', 'Go', 'Now', 'Hub', 'Box', 'Tap', 'Kit'],
  marcas: ['Brand', 'Style', 'Luxe', 'Vogue', 'Mode', 'Craft', 'House', 'Line', 'Edge', 'Wear', 'Wave', 'Tone'],
  usuarios: ['_x', 'Pro', '_dev', 'Master', 'King', 'Boss', 'Ninja', 'Guru', 'Lord', 'Hero', 'Star', 'Ace'],
  jogos: ['Quest', 'Craft', 'World', 'Arena', 'Realm', 'Wars', 'Land', 'Forge', 'Storm', 'Rush', 'Dash', 'Tale'],
};

const connectors = ['', 'a', 'i', 'o', 'e', 'x', 'z'];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSingleName(keyword: string, category: Category, style: Style): string {
  const prefix = randomPick(prefixes[style]);
  const suffix = randomPick(suffixes[category]);
  const connector = randomPick(connectors);
  const kw = capitalize(keyword.trim());

  const patterns = [
    `${prefix}${kw}`,
    `${kw}${suffix}`,
    `${prefix}${connector}${suffix}`,
    `${kw}${connector}${suffix}`,
    `${prefix}${kw}${suffix}`,
    `${prefix}${connector}${kw}`,
    `${kw}${prefix}`,
  ];

  if (style === 'curto') {
    patterns.push(kw.slice(0, 3) + suffix, prefix + kw.slice(0, 2));
  }

  if (category === 'usuarios') {
    patterns.push(`${kw.toLowerCase()}_${prefix.toLowerCase()}`, `${prefix.toLowerCase()}.${kw.toLowerCase()}`);
  }

  return randomPick(patterns);
}

export function generateNames(keyword: string, category: Category, style: Style, count = 8): GeneratedName[] {
  const names = new Set<string>();
  let attempts = 0;

  while (names.size < count && attempts < 100) {
    names.add(generateSingleName(keyword || 'name', category, style));
    attempts++;
  }

  return Array.from(names).map((name) => ({
    id: crypto.randomUUID(),
    name,
    category,
    style,
    keyword,
    createdAt: Date.now(),
    isFavorite: false,
  }));
}

export const categoryLabels: Record<Category, string> = {
  empresas: 'Empresas',
  apps: 'Aplicativos',
  marcas: 'Marcas',
  usuarios: 'Usuários',
  jogos: 'Jogos',
};

export const categoryIcons: Record<Category, string> = {
  empresas: '🏢',
  apps: '📱',
  marcas: '🏷️',
  usuarios: '👤',
  jogos: '🎮',
};

export const styleLabels: Record<Style, string> = {
  moderno: 'Moderno',
  profissional: 'Profissional',
  criativo: 'Criativo',
  curto: 'Curto',
  tech: 'Tech',
};
