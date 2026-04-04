import { useState, useCallback } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { TermsDialog } from '@/components/TermsDialog';
import { GeneratorPage } from '@/pages/GeneratorPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';
import type { GeneratedName } from '@/lib/nameGenerator';

type Tab = 'generator' | 'favorites' | 'categories' | 'settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('generator');
  const [termsAccepted, setTermsAccepted] = useLocalStorage('terms-accepted', false);
  const [history, setHistory] = useLocalStorage<GeneratedName[]>('name-history', []);
  const [showTermsView, setShowTermsView] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleAcceptTerms = useCallback(() => {
    setTermsAccepted(true);
  }, [setTermsAccepted]);

  const handleAddToHistory = useCallback((names: GeneratedName[]) => {
    setHistory((prev) => [...names, ...prev]);
  }, [setHistory]);

  const handleToggleFavorite = useCallback((id: string) => {
    setHistory((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isFavorite: !n.isFavorite } : n))
    );
  }, [setHistory]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    toast.success('Histórico limpo');
  }, [setHistory]);

  const favorites = history.filter((n) => n.isFavorite);

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background">
      {/* Terms on first launch */}
      <TermsDialog open={!termsAccepted} onAccept={handleAcceptTerms} />

      {/* Terms view-only from settings */}
      <TermsDialog
        open={showTermsView}
        onAccept={() => {}}
        viewOnly
        onClose={() => setShowTermsView(false)}
      />

      {termsAccepted && (
        <>
          {activeTab === 'generator' && (
            <GeneratorPage
              onAddToHistory={handleAddToHistory}
              onToggleFavorite={handleToggleFavorite}
              history={history}
            />
          )}
          {activeTab === 'favorites' && (
            <FavoritesPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />
          )}
          {activeTab === 'categories' && (
            <CategoriesPage history={history} onToggleFavorite={handleToggleFavorite} />
          )}
          {activeTab === 'settings' && (
            <SettingsPage
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onViewTerms={() => setShowTermsView(true)}
              onClearHistory={handleClearHistory}
              historyCount={history.length}
              favoritesCount={favorites.length}
            />
          )}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default Index;
