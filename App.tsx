import React, { useState } from 'react';
import { SCENARIOS } from './constants';
import type { Scenario, ScenarioID } from './types';
import { Playground } from './components/Playground';
import { Card } from './components/ui/Card';

const App: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);

  const handleScenarioChange = (scenarioId: ScenarioID) => {
    const newScenario = SCENARIOS.find(s => s.id === scenarioId);
    if (newScenario) {
      setActiveScenario(newScenario);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <header className="max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-gem-900 tracking-tight">
          Type I & II Error Playground
        </h1>
        <p className="mt-1 text-md text-slate-600">
          Master the trade-off between False Positives & False Negatives.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
             <h2 className="text-md font-semibold text-center text-blue-gem-900 mr-2">
                Select a Scenario:
              </h2>
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioChange(scenario.id)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gem-500
                  ${
                    activeScenario.id === scenario.id
                      ? 'bg-blue-gem-600 text-white shadow'
                      : 'bg-white text-blue-gem-700 hover:bg-blue-gem-100 border border-blue-gem-300'
                  }`}
              >
                {scenario.icon} {scenario.title}
              </button>
            ))}
          </div>
        </div>
        
        <Card className="p-6 mb-6">
            <h2 className="text-2xl font-bold text-blue-gem-800 mb-2">{activeScenario.icon} {activeScenario.title}</h2>
            <p className="text-slate-600 text-lg">{activeScenario.description}</p>
        </Card>

        <Playground scenario={activeScenario} key={activeScenario.id} />

      </main>

      <footer className="text-center mt-12 py-4 border-t">
        <p className="text-sm text-slate-500">
          Built to make statistical concepts intuitive and memorable.
        </p>
      </footer>
    </div>
  );
};

export default App;