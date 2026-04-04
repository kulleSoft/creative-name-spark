import { Moon, Sun, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface SettingsPageProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onViewTerms: () => void;
  onClearHistory: () => void;
  historyCount: number;
  favoritesCount: number;
}

export function SettingsPage({
  isDark,
  onToggleTheme,
  onViewTerms,
  onClearHistory,
  historyCount,
  favoritesCount,
}: SettingsPageProps) {
  return (
    <div className="space-y-6 px-4 pt-4 safe-bottom">
      <div>
        <h1 className="text-xl font-extrabold text-foreground">Configurações</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">Personalize sua experiência</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Aparência</h2>
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            {isDark ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
            <div>
              <p className="text-sm font-semibold text-card-foreground">Modo Escuro</p>
              <p className="text-xs text-muted-foreground">{isDark ? 'Ativado' : 'Desativado'}</p>
            </div>
          </div>
          <Switch checked={isDark} onCheckedChange={onToggleTheme} />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estatísticas</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-extrabold text-gradient">{historyCount}</p>
            <p className="text-xs text-muted-foreground">Nomes gerados</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-extrabold text-gradient">{favoritesCount}</p>
            <p className="text-xs text-muted-foreground">Favoritos</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Legal</h2>
        <button
          onClick={onViewTerms}
          className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-all hover:shadow-md"
        >
          <FileText className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-semibold text-card-foreground">Visualizar Termos de Uso</p>
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dados</h2>
        <Button
          variant="outline"
          onClick={onClearHistory}
          className="w-full justify-start gap-3 rounded-2xl border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          Limpar Histórico
        </Button>
      </div>

      <p className="pb-4 text-center text-[10px] text-muted-foreground">NomeCriativo v1.0 • Feito com ❤️</p>
    </div>
  );
}
