import { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NameCard } from '@/components/NameCard';
import type { GeneratedName } from '@/lib/nameGenerator';

interface FavoritesPageProps {
  favorites: GeneratedName[];
  onToggleFavorite: (id: string) => void;
}

export function FavoritesPage({ favorites, onToggleFavorite }: FavoritesPageProps) {
  const [search, setSearch] = useState('');

  const filtered = favorites.filter((n) =>
    n.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 px-4 pt-4 safe-bottom">
      <div>
        <h1 className="text-xl font-extrabold text-foreground">Favoritos</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">{favorites.length} nomes salvos</p>
      </div>

      {favorites.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar favoritos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-xl bg-secondary/50 pl-9 text-sm"
          />
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((name, i) => (
            <NameCard key={name.id} name={name} onToggleFavorite={onToggleFavorite} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-3 rounded-2xl bg-secondary p-4">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            {search ? 'Nenhum resultado' : 'Nenhum favorito ainda'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {search ? 'Tente outra busca' : 'Toque no ♥ para salvar nomes'}
          </p>
        </div>
      )}
    </div>
  );
}
