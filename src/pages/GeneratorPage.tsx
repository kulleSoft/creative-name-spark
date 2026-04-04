import { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NameCard } from '@/components/NameCard';
import {
  generateNames,
  categoryLabels,
  categoryIcons,
  styleLabels,
  type Category,
  type Style,
  type GeneratedName,
} from '@/lib/nameGenerator';

interface GeneratorPageProps {
  onAddToHistory: (names: GeneratedName[]) => void;
  onToggleFavorite: (id: string) => void;
  history: GeneratedName[];
}

const categories: Category[] = ['empresas', 'apps', 'marcas', 'usuarios', 'jogos'];
const styles: Style[] = ['moderno', 'profissional', 'criativo', 'curto', 'tech'];

export function GeneratorPage({ onAddToHistory, onToggleFavorite, history }: GeneratorPageProps) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<Category>('empresas');
  const [style, setStyle] = useState<Style>('moderno');
  const [results, setResults] = useState<GeneratedName[]>([]);

  const handleGenerate = () => {
    const names = generateNames(keyword, category, style);
    setResults(names);
    onAddToHistory(names);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  // Sync favorites state from history
  const displayResults = results.map((r) => {
    const inHistory = history.find((h) => h.id === r.id);
    return inHistory ? { ...r, isFavorite: inHistory.isFavorite } : r;
  });

  return (
    <div className="space-y-5 px-4 pt-4 safe-bottom">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">
          <span className="text-gradient">B3Names</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Gere nomes incríveis em segundos</p>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Palavra-chave ou tema
        </label>
        <Input
          placeholder="Ex: tecnologia, café, aventura..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="h-11 rounded-xl bg-secondary/50 text-sm font-medium"
          maxLength={30}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Categoria
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                category === cat
                  ? 'gradient-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              <span>{categoryIcons[cat]}</span>
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Estilo
        </label>
        <div className="flex flex-wrap gap-2">
          {styles.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                style === s
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {styleLabels[s]}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-bold text-sm shadow-lg"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Gerar Nomes
      </Button>

      {displayResults.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">Sugestões</h2>
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-1 text-xs font-semibold text-primary"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerar
            </button>
          </div>
          <div className="space-y-2">
            {displayResults.map((name, i) => (
              <NameCard key={name.id} name={name} onToggleFavorite={onToggleFavorite} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
