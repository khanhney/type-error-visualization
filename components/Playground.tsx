import React, { useState, useMemo } from 'react';
import type { Scenario } from '../types';
import { useSimulation } from '../hooks/useSimulation';
import { ConfusionMatrix } from './ConfusionMatrix';
import { Card } from './ui/Card';

interface PlaygroundProps {
  scenario: Scenario;
}

export const Playground: React.FC<PlaygroundProps> = ({ scenario }) => {
  const [threshold, setThreshold] = useState(0.5);
  const { calculateMetrics, runNewSimulation } = useSimulation();

  const [editableCostFP, setEditableCostFP] = useState(scenario.costFP);
  const [editableCostFN, setEditableCostFN] = useState(scenario.costFN);

  const metrics = useMemo(() => calculateMetrics(threshold), [calculateMetrics, threshold]);
  
  const totalCost = useMemo(() => {
    return metrics.fp * editableCostFP + metrics.fn * editableCostFN;
  }, [metrics.fp, metrics.fn, editableCostFP, editableCostFN]);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowExplanation(true);
  };

  const handleQuizReset = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left column for controls and metrics */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <Card>
          <div className="p-6">
            <label htmlFor="threshold-slider" className="block text-lg font-semibold text-blue-gem-800 mb-2">
              Decision Threshold: <span className="font-bold text-blue-gem-600">{(threshold).toFixed(2)}</span>
            </label>
            <p className="text-sm text-slate-600 mb-4">
              A model score above this value is classified as "{scenario.positiveLabel}". Adjust this to see how it impacts the results.
            </p>
            <input
              id="threshold-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </Card>

        <Card>
          <div className="p-6">
             <h3 className="text-lg font-semibold mb-4 text-blue-gem-800">Cost Analysis</h3>
             <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                    <label htmlFor="cost-fp-input" className="text-slate-600">Cost per False Positive:</label>
                    <div className="relative rounded-md shadow-sm">
                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-slate-500 sm:text-sm">$</span>
                        </div>
                        <input 
                            type="number"
                            id="cost-fp-input"
                            value={editableCostFP}
                            onChange={(e) => setEditableCostFP(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)}
                            className="block w-28 rounded-md border-0 py-1.5 pl-7 pr-2 bg-slate-50 text-right font-semibold text-orange-600 ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-gem-600 sm:text-sm sm:leading-6"
                            aria-label="Cost per False Positive"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="cost-fn-input" className="text-slate-600">Cost per False Negative:</label>
                    <div className="relative rounded-md shadow-sm">
                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-slate-500 sm:text-sm">$</span>
                        </div>
                        <input 
                            type="number"
                            id="cost-fn-input"
                            value={editableCostFN}
                            onChange={(e) => setEditableCostFN(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)}
                            className="block w-28 rounded-md border-0 py-1.5 pl-7 pr-2 bg-slate-50 text-right font-semibold text-red-600 ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-gem-600 sm:text-sm sm:leading-6"
                            aria-label="Cost per False Negative"
                        />
                    </div>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between items-center text-lg">
                    <p className="font-bold text-blue-gem-900">Total Error Cost:</p>
                    <p className="font-bold text-blue-gem-900">${totalCost.toLocaleString()}</p>
                </div>
             </div>
             <button 
                onClick={runNewSimulation}
                className="mt-6 w-full px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 bg-blue-gem-100 text-blue-gem-800 hover:bg-blue-gem-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gem-500"
              >
               🎲 Run New Simulation
            </button>
          </div>
        </Card>
      </div>

      {/* Right column for confusion matrix and explanations */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card className="p-6">
            <ConfusionMatrix 
              metrics={metrics}
              positiveLabel={scenario.positiveLabel}
              negativeLabel={scenario.negativeLabel}
            />
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-orange-50 border-orange-200">
            <h3 className="text-xl font-bold text-orange-800">Type I Error: False Positive</h3>
            <p className="mt-2 text-slate-700">{scenario.fp_description}</p>
            <p className="mt-4 text-2xl font-bold text-orange-700">{metrics.fp} cases</p>
          </Card>
          <Card className="p-6 bg-red-50 border-red-200">
            <h3 className="text-xl font-bold text-red-800">Type II Error: False Negative</h3>
            <p className="mt-2 text-slate-700">{scenario.fn_description}</p>
            <p className="mt-4 text-2xl font-bold text-red-700">{metrics.fn} cases</p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-gem-800">Scenario Quiz</h3>
          <p className="text-slate-700 mb-4">{scenario.quiz.question}</p>
          <div className="space-y-3">
            {scenario.quiz.options.map((option, index) => (
               <div key={index}>
                <button
                  onClick={() => handleOptionSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    showExplanation && option.correct ? 'bg-green-100 border-green-400' : ''
                  } ${
                    showExplanation && !option.correct && selectedOption === index ? 'bg-red-100 border-red-400' : ''
                  } ${
                    !showExplanation ? 'bg-white border-slate-300 hover:bg-slate-100 hover:border-blue-gem-400' : 'cursor-not-allowed'
                  }`}
                >
                  {option.text}
                </button>
                {showExplanation && selectedOption === index && (
                  <div className={`mt-2 p-3 rounded-lg text-sm ${option.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <p><span className="font-bold">{option.correct ? 'Correct!' : 'Not quite.'}</span> {option.explanation}</p>
                  </div>
                )}
               </div>
            ))}
          </div>
          {showExplanation && (
            <button onClick={handleQuizReset} className="mt-4 text-sm font-semibold text-blue-gem-600 hover:underline">
              Try again
            </button>
          )}
        </Card>
      </div>
    </div>
  );
};
