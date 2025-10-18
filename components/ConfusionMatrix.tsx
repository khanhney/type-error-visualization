import React from 'react';
import type { Metrics } from '../types';

interface ConfusionMatrixProps {
  metrics: Metrics;
  positiveLabel: string;
  negativeLabel: string;
}

export const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({
  metrics,
  positiveLabel,
  negativeLabel,
}) => {
  const { tp, fp, fn, tn } = metrics;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-center mb-4 text-blue-gem-800">Confusion Matrix</h3>
      <div className="flex justify-center">
        <div className="flex items-center mr-2">
          <div className="[writing-mode:vertical-rl] transform rotate-180 font-bold text-slate-600">Actual</div>
        </div>
        <table className="flex-grow border-collapse text-center">
          <thead>
            <tr>
              <th className="w-24"></th>
              <th colSpan={2} className="p-1 font-bold text-slate-600">Predicted</th>
            </tr>
            <tr>
              <th className="w-24"></th>
              <th className="p-2 font-semibold text-slate-500 text-sm bg-slate-100 rounded-tl-md">{positiveLabel}</th>
              <th className="p-2 font-semibold text-slate-500 text-sm bg-slate-100 rounded-tr-md">{negativeLabel}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="p-2 font-semibold text-slate-500 text-sm bg-slate-100 rounded-l-md">{positiveLabel}</th>
              <td className="p-1">
                <div className="bg-green-100 p-4 rounded-lg flex flex-col justify-center items-center border border-green-200">
                  <span className="text-2xl font-bold text-green-800">{tp}</span>
                  <span className="text-xs text-green-700 mt-1">True Positive</span>
                </div>
              </td>
              <td className="p-1">
                <div className="bg-red-100 p-4 rounded-lg flex flex-col justify-center items-center border border-red-200">
                  <span className="text-2xl font-bold text-red-800">{fn}</span>
                  <span className="text-xs text-red-700 mt-1">False Negative</span>
                </div>
              </td>
            </tr>
            <tr>
              <th className="p-2 font-semibold text-slate-500 text-sm bg-slate-100 rounded-l-md">{negativeLabel}</th>
              <td className="p-1">
                <div className="bg-orange-100 p-4 rounded-lg flex flex-col justify-center items-center border border-orange-200">
                  <span className="text-2xl font-bold text-orange-800">{fp}</span>
                  <span className="text-xs text-orange-700 mt-1">False Positive</span>
                </div>
              </td>
              <td className="p-1">
                <div className="bg-blue-100 p-4 rounded-lg flex flex-col justify-center items-center border border-blue-200">
                  <span className="text-2xl font-bold text-blue-800">{tn}</span>
                  <span className="text-xs text-blue-700 mt-1">True Negative</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
