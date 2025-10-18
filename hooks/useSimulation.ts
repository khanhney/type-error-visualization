import { useState, useCallback, useMemo } from 'react';
import type { SimulationSample, Metrics, PRCurvePoint } from '../types';

const SIMULATION_SIZE = 1000;
const DEFAULT_BASE_RATE = 0.3; // 30% positive cases

// Box-Muller transform to get a normal distribution from a uniform one.
const randomNormal = (mean = 0, stdDev = 1) => {
  let u1 = 0, u2 = 0;
  while (u1 === 0) u1 = Math.random(); //Converting [0,1) to (0,1)
  while (u2 === 0) u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
};

const generateData = (baseRate: number): SimulationSample[] => {
  const data: SimulationSample[] = [];
  for (let i = 0; i < SIMULATION_SIZE; i++) {
    const trueLabel = Math.random() < baseRate ? 1 : 0;
    let predictedProbability: number;

    if (trueLabel === 1) {
      predictedProbability = randomNormal(0.7, 0.15);
    } else {
      predictedProbability = randomNormal(0.3, 0.15);
    }

    // Clamp probabilities between 0 and 1
    predictedProbability = Math.max(0, Math.min(1, predictedProbability));

    data.push({ trueLabel, predictedProbability });
  }
  return data;
};

export const useSimulation = () => {
  const [samples, setSamples] = useState<SimulationSample[]>(() => generateData(DEFAULT_BASE_RATE));

  const runNewSimulation = useCallback(() => {
    setSamples(generateData(DEFAULT_BASE_RATE));
  }, []);

  const calculateMetrics = useCallback((threshold: number): Metrics => {
    let tp = 0, fp = 0, fn = 0, tn = 0;

    samples.forEach(sample => {
      const predictedLabel = sample.predictedProbability >= threshold ? 1 : 0;
      if (sample.trueLabel === 1 && predictedLabel === 1) tp++;
      else if (sample.trueLabel === 0 && predictedLabel === 1) fp++;
      else if (sample.trueLabel === 1 && predictedLabel === 0) fn++;
      else if (sample.trueLabel === 0 && predictedLabel === 0) tn++;
    });

    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const fpr = fp + tn > 0 ? fp / (fp + tn) : 0;
    const fnr = fn + tp > 0 ? fn / (fn + tp) : 0;

    return { tp, fp, fn, tn, total: samples.length, precision, recall, fpr, fnr };
  }, [samples]);
  
  const prCurveData: PRCurvePoint[] = useMemo(() => {
      const curve: PRCurvePoint[] = [];
      for (let i = 1; i < 100; i++) {
        const threshold = i / 100.0;
        const { precision, recall } = calculateMetrics(threshold);
        if (recall > 0 || precision > 0) {
           curve.push({ threshold, precision, recall });
        }
      }
      // Sort by recall for a smooth line
      return curve.sort((a,b) => a.recall - b.recall);
  }, [calculateMetrics]);

  return { calculateMetrics, prCurveData, runNewSimulation };
};