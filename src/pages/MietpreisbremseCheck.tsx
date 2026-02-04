import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { AuthModal } from '@/components/AuthModal';
import { CheckForm } from '@/components/mietpreisbremse/CheckForm';
import { CheckResults } from '@/components/mietpreisbremse/CheckResults';
import { Button } from '@/components/ui/button';
import { RotateCcw, Shield, Scale, FileCheck } from 'lucide-react';
import { 
  getDefaultInput, 
  calculateMietpreisbremse,
  type MietpreisbremseInput 
} from '@/hooks/useMietpreisbremseCheck';

const MietpreisbremseCheck = () => {
  const [input, setInput] = useState<MietpreisbremseInput>(getDefaultInput());
  const [showAuthModal, setShowAuthModal] = useState(false);

  const result = useMemo(() => calculateMietpreisbremse(input), [input]);

  const handleReset = () => {
    setInput(getDefaultInput());
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLoginClick={() => setShowAuthModal(true)} />

      {/* Hero Section */}
      <div className="gradient-hero text-primary-foreground py-10 px-4">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-background/20 p-2">
              <Scale className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium bg-background/20 px-3 py-1 rounded-full">
              Kostenloser Check
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Mietpreisbremsen-Check
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Prüfen Sie in wenigen Sekunden, ob die Mietpreisbremse für Ihre Wohnung gilt 
            und ob Sie zu viel Miete zahlen.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" />
              <span>100% Datenschutz</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileCheck className="h-4 w-4" />
              <span>Rechtlich geprüft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
          {/* Left Column - Form */}
          <div className="space-y-4">
            <CheckForm input={input} onChange={setInput} />
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Zurücksetzen
              </Button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Ihr Ergebnis
            </h2>
            <CheckResults result={result} />
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="border-t bg-muted/30 py-8 mt-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Was ist die Mietpreisbremse?</h4>
              <p>
                Die Mietpreisbremse begrenzt die Miete bei Neuvermietung auf maximal 10% 
                über der ortsüblichen Vergleichsmiete.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Wann greift sie nicht?</h4>
              <p>
                Ausnahmen gelten für Neubauten nach Oktober 2014, umfassend modernisierte 
                Wohnungen und wenn die Vormiete bereits höher war.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Was kann ich tun?</h4>
              <p>
                Bei überhöhter Miete können Sie eine Rüge an den Vermieter senden und 
                die Absenkung der Miete sowie Rückzahlung fordern.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default MietpreisbremseCheck;
