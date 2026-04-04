import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsDialogProps {
  open: boolean;
  onAccept: () => void;
  viewOnly?: boolean;
  onClose?: () => void;
}

export function TermsDialog({ open, onAccept, viewOnly, onClose }: TermsDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-[90vw] sm:max-w-md rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Termos de Uso
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <ScrollArea className="h-64 pr-4 text-sm leading-relaxed text-muted-foreground">
              <div className="space-y-3">
                <p className="font-semibold text-foreground"><p className="font-semibold text-foreground">Bem-vindo ao B3Names!</p></p>
                <p>Ao utilizar este aplicativo, você concorda com os seguintes termos:</p>
                <p><strong>1. Uso do Serviço</strong><br />Este app gera sugestões de nomes criativos com base em algoritmos. Os nomes gerados são sugestões e não garantimos exclusividade ou disponibilidade para registro.</p>
                <p><strong>2. Anúncios</strong><br />Este aplicativo exibe anúncios para manter o serviço gratuito. Ao aceitar estes termos, você concorda com a exibição de anúncios durante o uso do app.</p>
                <p><strong>3. Dados Locais</strong><br />Seus favoritos, histórico e preferências são armazenados localmente no seu dispositivo. Não coletamos dados pessoais.</p>
                <p><strong>4. Propriedade Intelectual</strong><br />Antes de usar qualquer nome gerado para fins comerciais, recomendamos verificar a disponibilidade e possíveis conflitos de marca registrada.</p>
                <p><strong>5. Isenção de Responsabilidade</strong><br />Não nos responsabilizamos por quaisquer danos diretos ou indiretos decorrentes do uso dos nomes gerados.</p>
                <p><strong>6. Alterações</strong><br />Reservamo-nos o direito de alterar estes termos a qualquer momento.</p>
              </div>
            </ScrollArea>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {viewOnly ? (
            <Button onClick={onClose} variant="outline" className="w-full">
              Fechar
            </Button>
          ) : (
            <Button onClick={onAccept} className="w-full gradient-primary text-primary-foreground font-semibold">
              Aceitar e Continuar
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
