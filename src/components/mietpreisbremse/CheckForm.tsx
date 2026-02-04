import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MapPin, Home, Calendar, Euro, Info } from 'lucide-react';
import type { MietpreisbremseInput } from '@/hooks/useMietpreisbremseCheck';

interface CheckFormProps {
  input: MietpreisbremseInput;
  onChange: (input: MietpreisbremseInput) => void;
}

export function CheckForm({ input, onChange }: CheckFormProps) {
  const updateField = <K extends keyof MietpreisbremseInput>(
    field: K,
    value: MietpreisbremseInput[K]
  ) => {
    onChange({ ...input, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Standort & Miete */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-primary" />
            Standort & Miete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plz">PLZ *</Label>
              <Input
                id="plz"
                type="text"
                placeholder="z.B. 10115"
                value={input.plz}
                onChange={(e) => updateField('plz', e.target.value)}
                maxLength={5}
              />
              <p className="text-xs text-muted-foreground">Für Gebiets-Check</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ort">Ort *</Label>
              <Input
                id="ort"
                type="text"
                placeholder="z.B. Berlin"
                value={input.ort}
                onChange={(e) => updateField('ort', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kaltmiete">Kaltmiete *</Label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="kaltmiete"
                  type="number"
                  placeholder="0"
                  className="pl-9"
                  value={input.kaltmiete || ''}
                  onChange={(e) => updateField('kaltmiete', parseFloat(e.target.value) || 0)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Nettokaltmiete in €/Monat</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wohnflaeche">Wohnfläche *</Label>
              <div className="relative">
                <Input
                  id="wohnflaeche"
                  type="number"
                  placeholder="0"
                  value={input.wohnflaeche || ''}
                  onChange={(e) => updateField('wohnflaeche', parseFloat(e.target.value) || 0)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  m²
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wohnungs-Details */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Home className="h-5 w-5 text-primary" />
            Wohnungs-Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baujahr">Baujahr *</Label>
            <Input
              id="baujahr"
              type="number"
              placeholder="z.B. 1990"
              value={input.baujahr || ''}
              onChange={(e) => updateField('baujahr', parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="erstbezug" className="text-sm font-medium cursor-pointer">
                  Erstbezug nach 01.10.2014?
                </Label>
                <p className="text-xs text-muted-foreground">Neubau-Ausnahme</p>
              </div>
              <Switch
                id="erstbezug"
                checked={input.erstbezug_nach_2014}
                onCheckedChange={(checked) => updateField('erstbezug_nach_2014', checked)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="modernisiert" className="text-sm font-medium cursor-pointer">
                  Umfassend modernisiert?
                </Label>
                <p className="text-xs text-muted-foreground">Mehr als 1/3 Neubaukosten</p>
              </div>
              <Switch
                id="modernisiert"
                checked={input.umfassend_modernisiert}
                onCheckedChange={(checked) => updateField('umfassend_modernisiert', checked)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="vormiete_bekannt" className="text-sm font-medium cursor-pointer">
                  Vormiete bekannt?
                </Label>
                <p className="text-xs text-muted-foreground">Falls Vormieter bekannt</p>
              </div>
              <Switch
                id="vormiete_bekannt"
                checked={input.vormiete_bekannt}
                onCheckedChange={(checked) => updateField('vormiete_bekannt', checked)}
              />
            </div>

            {input.vormiete_bekannt && (
              <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                <Label htmlFor="vormiete">Vormiete</Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="vormiete"
                    type="number"
                    placeholder="0"
                    className="pl-9"
                    value={input.vormiete || ''}
                    onChange={(e) => updateField('vormiete', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">€/Monat des Vormieters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mietbeginn */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Mietbeginn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="mietbeginn">Mietbeginn *</Label>
            <Input
              id="mietbeginn"
              type="date"
              value={input.mietbeginn ? input.mietbeginn.toISOString().split('T')[0] : ''}
              onChange={(e) => updateField('mietbeginn', e.target.value ? new Date(e.target.value) : null)}
            />
            <p className="text-xs text-muted-foreground">Für Rückforderungs-Berechnung</p>
          </div>
        </CardContent>
      </Card>

      {/* Info-Box */}
      <div className="flex items-start gap-3 rounded-lg bg-muted p-4">
        <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Hinweis zur Mietpreisbremse</p>
          <p>
            Die Mietpreisbremse gilt in ausgewiesenen Gebieten mit angespanntem Wohnungsmarkt. 
            Die Miete darf maximal 10% über der ortsüblichen Vergleichsmiete liegen.
          </p>
        </div>
      </div>
    </div>
  );
}
