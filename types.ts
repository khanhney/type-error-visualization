export type ScenarioID = 'medical' | 'fraud' | 'marketing';

export interface Scenario {
  id: ScenarioID;
  title: string;
  icon: string;
  description: string;
  positiveLabel: string;
  negativeLabel: string;
  costFP: number;
  costFN: number;
  fp_description: string;
  fn_description: string;
  quiz: {
    question: string;
    options: { text: string; explanation: string; correct: boolean }[];
  };
}

export interface SimulationSample {
  trueLabel: 0 | 1;
  predictedProbability: number;
}

export interface Metrics {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  total: number;
  precision: number;
  recall: number;
  fpr: number;
  fnr: number;
}

export interface PRCurvePoint {
  threshold: number;
  precision: number;
  recall: number;
}
