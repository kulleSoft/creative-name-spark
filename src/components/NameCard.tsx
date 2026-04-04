import { Copy, Heart } from 'lucide-react';
import { toast } from 'sonner';
import type { GeneratedName } from '@/lib/nameGenerator';

interface NameCardProps {
  name: GeneratedName;
  onToggleFavorite: (id: string) => void;
  index?: number;
}

export function NameCard({ name, onToggleFavorite, index = 0 }: NameCardProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(name.name);
    toast.success('Nome copiado!', { duration: 1500 });
  };

  return (
    <div
      className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
    >
      <span className="text-sm font-semibold text-card-foreground truncate mr-2">{name.name}</span>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={handleCopy}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Copiar nome"
        >
          <Copy className="h-4 w-4" />
        </button>
        <button
          onClick={() => onToggleFavorite(name.id)}
          className={`rounded-lg p-2 transition-colors ${
            name.isFavorite
              ? 'text-primary'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          }`}
          aria-label={name.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`h-4 w-4 ${name.isFavorite ? 'fill-primary' : ''}`} />
        </button>
      </div>
    </div>
  );
}
