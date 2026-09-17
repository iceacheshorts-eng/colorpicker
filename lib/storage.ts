export interface SavedPalette {
  id: string;
  colors: string[];
  createdAt: string;
}

const STORAGE_KEY = 'saved_palettes';
const MAX_SAVED = 24;

export function getSavedPalettes(): SavedPalette[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse saved palettes', error);
    return [];
  }
}

export function savePalette(colors: string[]): boolean {
  if (typeof window === 'undefined') return false;

  const saved = getSavedPalettes();

  // Check for duplicate
  const isDuplicate = saved.some(p => p.colors.join('') === colors.join(''));
  if (isDuplicate) {
    return false; // Indicate it wasn't saved because duplicate
  }

  const newPalette: SavedPalette = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    colors,
    createdAt: new Date().toISOString()
  };

  const updated = [newPalette, ...saved].slice(0, MAX_SAVED);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
     console.error('Failed to save palette', error);
     return false;
  }
}

export function deleteSavedPalette(id: string): void {
  if (typeof window === 'undefined') return;
  const saved = getSavedPalettes();
  const updated = saved.filter(p => p.id !== id);
  try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
      console.error('Failed to delete palette', e);
  }
}

export function clearSavedPalettes(): void {
  if (typeof window === 'undefined') return;
  try {
     localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
      console.error('Failed to clear palettes', e);
  }
}
