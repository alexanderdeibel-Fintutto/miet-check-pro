import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  MapPinOff, 
  Euro, 
  TrendingDown,
  FileText,
  ArrowRight,
  Shield,
  Calculator
} from 'lucide-react';
import type { MietpreisbremseResult, Empfehlung } from '@/hooks/useMietpreisbremseCheck';

interface CheckResultsProps {
  result: MietpreisbremseResult | null;
}

const empfehlungConfig: Record<Empfehlung, {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  className: string;
  badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}> = {
  zu_hoch: {
    icon: XCircle,
    title: 'Miete zu hoch!',
    subtitle: 'Sie zahlen mehr als erlaubt',
    className: 'bg-destructive text-destructive-foreground',
    badgeVariant: 'destructive',
  },
  ok: {
    icon: CheckCircle2,
    title: 'Miete im zulässigen Rahmen',
    subtitle: 'Ihre Miete entspricht den Vorgaben',
    className: 'bg-success text-success-foreground',
    badgeVariant: 'success',
  },
  ausnahme: {
    icon: AlertTriangle,
    title: 'Ausnahme greift',
    subtitle: 'Die Mietpreisbremse gilt hier nicht',
    className: 'bg-warning text-warning-foreground',
    badgeVariant: 'secondary',
  },
  keine_bremse: {
    icon: MapPinOff,
    title: 'Kein Mietpreisbremsen-Gebiet',
    subtitle: 'Für diese PLZ gilt keine Mietpreisbremse',
    className: 'bg-muted text-muted-foreground',
    badgeVariant: 'outline',
  },
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

export function CheckResults({ result }: CheckResultsProps) {
  if (!result) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Calculator className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-medium text-lg mb-2">Noch keine Berechnung</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Geben Sie Ihre Daten links ein, um zu prüfen, ob die Mietpreisbremse für Sie greift.
          </p>
        </CardContent>
      </Card>
    );
  }

  const config = empfehlungConfig[result.empfehlung];
  const Icon = config.icon;

  return (
    <div className="space-y-4">
      {/* Primary Result */}
      <Card className={`${config.className} border-0`}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-background/20 p-3">
              <Icon className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{config.title}</h2>
              <p className="opacity-90">{config.subtitle}</p>
              
              {result.empfehlung === 'zu_hoch' && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <TrendingDown className="h-5 w-5" />
                    <span>{result.ueberhoehung_prozent}% über dem Limit</span>
                  </div>
                  <p className="opacity-90">
                    {formatCurrency(result.ueberhoehung)} / Monat überhöht
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Box for zu_hoch */}
      {result.miete_zu_hoch && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-destructive mb-2">
                  Sie zahlen monatlich {formatCurrency(result.ueberhoehung)} zu viel!
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Mögliche Rückforderung: bis zu <strong className="text-foreground">{formatCurrency(result.rueckforderung_gesamt)}</strong>
                  {result.monate_rueckforderung > 0 && (
                    <span> ({result.monate_rueckforderung} Monate)</span>
                  )}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <FileText className="h-4 w-4" />
                  <span>Empfehlung: Rüge an Vermieter senden</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ausnahmen */}
      {result.ausnahmen.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-warning" />
              Geltende Ausnahmen
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.ausnahmen.map((ausnahme, index) => (
                <Badge key={index} variant="secondary">
                  {ausnahme.text}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Secondary Results Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground mb-1">Ihre Miete/m²</p>
            <p className="text-xl font-bold font-mono">{formatCurrency(result.miete_qm)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground mb-1">Vergleichsmiete</p>
            <p className="text-xl font-bold font-mono text-primary">{formatCurrency(result.vergleichsmiete)}/m²</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground mb-1">Max. erlaubt</p>
            <p className="text-xl font-bold font-mono">{formatCurrency(result.max_miete)}</p>
          </CardContent>
        </Card>
        <Card className={result.ueberhoehung > 0 ? 'border-destructive/50' : ''}>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground mb-1">Überhöhung</p>
            <p className={`text-xl font-bold font-mono ${result.ueberhoehung > 0 ? 'text-destructive' : 'text-success'}`}>
              {formatCurrency(result.ueberhoehung)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gebiets-Info */}
      {result.in_bremsen_gebiet && result.bremse_gueltig_bis && (
        <div className="text-xs text-muted-foreground text-center">
          Mietpreisbremse gültig bis: {new Date(result.bremse_gueltig_bis).toLocaleDateString('de-DE')}
        </div>
      )}

      {/* Cross-Sell */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">Nebenkosten zu hoch?</h3>
              <p className="text-sm text-muted-foreground">
                Prüfen Sie auch Ihre Nebenkostenabrechnung
              </p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              Zum Check
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
