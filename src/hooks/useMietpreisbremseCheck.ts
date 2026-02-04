export interface MietpreisbremseInput {
  plz: string;
  ort: string;
  kaltmiete: number;
  wohnflaeche: number;
  baujahr: number;
  erstbezug_nach_2014: boolean;
  umfassend_modernisiert: boolean;
  vormiete_bekannt: boolean;
  vormiete: number;
  mietbeginn: Date | null;
}

export interface Ausnahme {
  typ: 'neubau' | 'modernisierung' | 'vormiete';
  text: string;
}

export type Empfehlung = 'zu_hoch' | 'ok' | 'ausnahme' | 'keine_bremse';

export interface MietpreisbremseResult {
  plz: string;
  ort: string;
  in_bremsen_gebiet: boolean;
  bremse_gueltig_bis: string | null;
  ausnahmen: Ausnahme[];
  bremse_greift: boolean;
  miete_qm: number;
  vergleichsmiete: number;
  max_miete_qm: number;
  max_miete: number;
  ueberhoehung: number;
  ueberhoehung_prozent: number;
  miete_zu_hoch: boolean;
  monate_rueckforderung: number;
  rueckforderung_gesamt: number;
  empfehlung: Empfehlung;
}

// Mietpreisbremsen-Gebiete mit Vergleichsmieten (vereinfacht)
const MIETPREISBREMSEN_GEBIETE: Record<string, { aktiv: boolean; bis: string; vergleichsmiete: number }> = {
  // Berlin
  '10115': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '10117': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '10119': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '10178': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
  '10179': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '10243': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '10245': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '10247': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.20 },
  '10249': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.40 },
  '10317': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.50 },
  '10318': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.20 },
  '10319': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 9.80 },
  '10365': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.00 },
  '10367': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.30 },
  '10369': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.10 },
  '10405': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '10407': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '10409': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '10435': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '10437': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.20 },
  '10439': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '10551': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.00 },
  '10553': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.20 },
  '10555': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '10557': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '10559': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.80 },
  '10585': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '10587': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
  '10589': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '10623': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '10625': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '10627': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '10629': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '10707': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.00 },
  '10709': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.80 },
  '10711': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '10713': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '10715': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '10717': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.20 },
  '10719': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.50 },
  '10777': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.80 },
  '10779': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '10781': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '10783': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '10785': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '10787': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.00 },
  '10789': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.20 },
  '10823': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '10825': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '10827': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
  '10829': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '10961': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '10963': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '10965': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '10967': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '10969': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
  '10997': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '10999': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.80 },
  '12043': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '12045': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '12047': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '12049': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.20 },
  '12051': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.80 },
  '12053': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.50 },
  '12055': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.00 },
  '12057': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.20 },
  '12059': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.80 },
  // München
  '80331': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.00 },
  '80333': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.50 },
  '80335': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.20 },
  '80336': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.80 },
  '80337': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '80469': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.80 },
  '80538': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 15.00 },
  '80539': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.50 },
  '80634': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.20 },
  '80636': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '80637': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '80638': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.80 },
  '80639': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.20 },
  '80686': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '80687': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '80689': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
  '80796': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.00 },
  '80797': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.80 },
  '80798': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '80799': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.20 },
  '80801': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.50 },
  '80802': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.80 },
  '80803': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.20 },
  '80804': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '80805': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.80 },
  '80807': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.20 },
  '80809': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '80933': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '80935': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
  '80937': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '80939': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '81241': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '81243': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '81245': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
  '81247': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '81249': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '81369': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.20 },
  '81371': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '81373': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '81375': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.80 },
  '81377': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.00 },
  '81379': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  // Hamburg
  '20095': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '20097': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '20099': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '20144': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '20146': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.00 },
  '20148': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.80 },
  '20149': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.50 },
  '20249': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '20251': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '20253': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.20 },
  '20255': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '20257': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '20259': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
  '20354': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 15.00 },
  '20355': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.50 },
  '20357': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '20359': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '20457': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.00 },
  '20459': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '22041': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '22043': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.20 },
  '22045': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.00 },
  '22047': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.80 },
  '22049': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '22081': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '22083': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '22085': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '22087': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
  '22089': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  // Frankfurt
  '60311': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '60313': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.00 },
  '60314': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '60316': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '60318': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.20 },
  '60320': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '60322': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.50 },
  '60323': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 15.00 },
  '60325': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.80 },
  '60326': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '60327': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '60329': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '60385': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '60386': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '60388': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.00 },
  '60389': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.80 },
  '60431': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '60433': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '60435': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '60437': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '60438': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.20 },
  '60439': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.00 },
  // Köln
  '50667': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '50668': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '50670': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '50672': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '50674': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '50676': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.20 },
  '50677': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '50678': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '50679': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '50733': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '50735': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '50737': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.00 },
  '50739': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.80 },
  '50823': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '50825': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '50827': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '50829': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.20 },
  // Düsseldorf
  '40210': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '40211': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '40212': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '40213': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 14.00 },
  '40215': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '40217': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '40219': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '40221': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '40223': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '40225': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.00 },
  '40227': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.80 },
  '40229': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.50 },
  '40231': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.20 },
  '40233': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 10.00 },
  '40235': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.00 },
  '40237': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '40239': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  // Stuttgart
  '70173': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.50 },
  '70174': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.00 },
  '70176': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '70178': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.20 },
  '70180': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '70182': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 13.80 },
  '70184': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '70186': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '70188': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.50 },
  '70190': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
  '70191': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '70192': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.00 },
  '70193': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 11.80 },
  '70195': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.50 },
  '70197': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.80 },
  '70199': { aktiv: true, bis: '2025-12-31', vergleichsmiete: 12.20 },
};

function monthsSince(date: Date | null): number {
  if (!date) return 0;
  const now = new Date();
  const months = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
  return Math.max(0, months);
}

function round(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function getDefaultInput(): MietpreisbremseInput {
  return {
    plz: '',
    ort: '',
    kaltmiete: 0,
    wohnflaeche: 0,
    baujahr: 2000,
    erstbezug_nach_2014: false,
    umfassend_modernisiert: false,
    vormiete_bekannt: false,
    vormiete: 0,
    mietbeginn: null,
  };
}

export function calculateMietpreisbremse(input: MietpreisbremseInput): MietpreisbremseResult | null {
  const {
    plz,
    ort,
    kaltmiete,
    wohnflaeche,
    erstbezug_nach_2014,
    umfassend_modernisiert,
    vormiete_bekannt,
    vormiete,
    mietbeginn,
  } = input;

  if (!plz || !kaltmiete || !wohnflaeche || wohnflaeche === 0) {
    return null;
  }

  const gebiet = MIETPREISBREMSEN_GEBIETE[plz];
  const in_bremsen_gebiet = gebiet?.aktiv || false;

  const ausnahmen: Ausnahme[] = [];
  if (erstbezug_nach_2014) {
    ausnahmen.push({ typ: 'neubau', text: 'Neubau nach 01.10.2014' });
  }
  if (umfassend_modernisiert) {
    ausnahmen.push({ typ: 'modernisierung', text: 'Umfassend modernisiert' });
  }
  if (vormiete_bekannt && vormiete > 0) {
    ausnahmen.push({ typ: 'vormiete', text: `Vormiete war ${vormiete.toFixed(2)} €` });
  }

  const bremse_greift = in_bremsen_gebiet && ausnahmen.length === 0;
  const miete_qm = kaltmiete / wohnflaeche;
  const vergleichsmiete = gebiet?.vergleichsmiete || 10.00;
  const max_miete_qm = vergleichsmiete * 1.10;
  const max_miete = max_miete_qm * wohnflaeche;
  const ueberhoehung = Math.max(0, kaltmiete - max_miete);
  const ueberhoehung_prozent = Math.max(0, ((miete_qm / vergleichsmiete) - 1) * 100);
  const miete_zu_hoch = bremse_greift && ueberhoehung > 0;
  const monate_rueckforderung = Math.min(monthsSince(mietbeginn), 30);
  const rueckforderung_gesamt = miete_zu_hoch ? ueberhoehung * monate_rueckforderung : 0;

  let empfehlung: Empfehlung;
  if (!in_bremsen_gebiet) empfehlung = 'keine_bremse';
  else if (ausnahmen.length > 0) empfehlung = 'ausnahme';
  else if (miete_zu_hoch) empfehlung = 'zu_hoch';
  else empfehlung = 'ok';

  return {
    plz,
    ort,
    in_bremsen_gebiet,
    bremse_gueltig_bis: gebiet?.bis || null,
    ausnahmen,
    bremse_greift,
    miete_qm: round(miete_qm, 2),
    vergleichsmiete,
    max_miete_qm: round(max_miete_qm, 2),
    max_miete: round(max_miete, 2),
    ueberhoehung: round(ueberhoehung, 2),
    ueberhoehung_prozent: round(ueberhoehung_prozent, 1),
    miete_zu_hoch,
    monate_rueckforderung,
    rueckforderung_gesamt: round(rueckforderung_gesamt, 2),
    empfehlung,
  };
}
