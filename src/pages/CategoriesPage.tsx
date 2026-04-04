import { categoryLabels, categoryIcons, type Category } from '@/lib/nameGenerator';
import type { GeneratedName } from '@/lib/nameGenerator';
import { NameCard } from '@/components/NameCard';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface CategoriesPageProps {
  history: GeneratedName[];
  onToggleFavorite: (id: string) => void;
}

const categories: Category[] = ['empresas', 'apps', 'marcas', 'usuarios', 'jogos'];

const categoryColors: Record<Category, string> = {
  empresas: 'bg-category-empresas/10 text-category-empresas',
  apps: 'bg-category-apps/10 text-category-apps',
  marcas: 'bg-category-marcas/10 text-category-marcas',
  usuarios: 'bg-category-usuarios/10 text-category-usuarios',
  jogos: 'bg-category-jogos/10 text-category-jogos',
};

export function CategoriesPage({ history, onToggleFavorite }: CategoriesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const getCategoryCount = (cat: Category) => history.filter((n) => n.category === cat).length;

  if (selectedCategory) {
    const names = history.filter((n) => n.category === selectedCategory);
    return (
      <div className="space-y-4 px-4 pt-4 safe-bottom">
        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-1 text-sm font-semibold text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-foreground">
            {categoryIcons[selectedCategory]} {categoryLabels[selectedCategory]}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{names.length} nomes gerados</p>
        </div>
        {names.length > 0 ? (
          <div className="space-y-2">
            {names.map((name, i) => (
              <NameCard key={name.id} name={name} onToggleFavorite={onToggleFavorite} index={i} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">Nenhum nome nesta categoria ainda</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 pt-4 safe-bottom">
      <div>
        <h1 className="text-xl font-extrabold text-foreground">Categorias</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">Explore por tipo de nome</p>
      </div>
      <div className="space-y-3">
        {categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md animate-fade-in"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'backwards' }}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${categoryColors[cat]}`}>
              {categoryIcons[cat]}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-card-foreground">{categoryLabels[cat]}</p>
              <p className="text-xs text-muted-foreground">{getCategoryCount(cat)} nomes</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
