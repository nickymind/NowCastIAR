import Papa from 'papaparse';

/**
 * Canonical interface used by the app
 */
export interface SignalDataPoint {
  date: string; // YYYY-MM-01
  signalScore: number; // 0–100
  economicRegime: 'Expansion' | 'Transition' | 'Contraction';
  emaeYoY: number;
}

/**
 * Normalize regime labels coming from the CSV
 */
const mapRegime = (r: string): 'Expansion' | 'Transition' | 'Contraction' => {
  const v = r?.toLowerCase() ?? '';
  if (v.includes('exp')) return 'Expansion';
  if (v.includes('trans')) return 'Transition';
  return 'Contraction';
};

/**
 * Load EMAE signal data from GitHub (public CSV)
 */
export const loadEmaeSignalData = async (): Promise<SignalDataPoint[]> => {
  const response = await fetch(
    'https://raw.githubusercontent.com/nickymind/NowCastIAR/main/data/emae_signal_app.csv'
  );

  if (!response.ok) {
    console.error('Failed to fetch EMAE signal CSV');
    throw new Error('Failed to load economic signal data.');
  }

  const csv = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const raw = results.data as any[];

        const data: SignalDataPoint[] = raw
          .filter(
            r =>
              r.ym &&
              r.signal_score !== undefined &&
              r.regime !== undefined &&
              r.yhat !== undefined
          )
          .map(r => {
            const ym = String(r.ym);
            const date = `${ym}-01`;

            return {
              date,
              signalScore: Number(r.signal_score),
              economicRegime: mapRegime(r.regime),
              emaeYoY: Number(r.yhat)
            };
          })
          .filter(d => !Number.isNaN(Date.parse(d.date)))
          .sort(
            (a, b) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        resolve(data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};