
'use client'
import React, { useState } from 'react';
import { Sparkles, Flame, Waves, AlertTriangle } from 'lucide-react';

const scenarios = [
  {
    id: 'earthquake',
    title: 'Earthquake Simulation',
    description: 'An earthquake has just started. What should you do first?',
    options: [
      { text: 'Run outside immediately', correct: false },
      { text: 'Take cover under a sturdy table', correct: true },
      { text: 'Use the elevator to evacuate', correct: false },
    ],
    explanation: 'During an earthquake, you should drop, cover, and hold on. Taking cover under a sturdy table is safest.'
  },
  {
    id: 'fire',
    title: 'Fire Simulation',
    description: 'You smell smoke and see fire in your building. What should you do?',
    options: [
      { text: 'Use the elevator', correct: false },
      { text: 'Evacuate using stairs', correct: true },
      { text: 'Hide in a room', correct: false },
    ],
    explanation: 'Never use elevators during a fire. Always use stairs to evacuate safely.'
  },
  {
    id: 'flood',
    title: 'Flood Simulation',
    description: 'Floodwaters are rising outside. What is the safest action?',
    options: [
      { text: 'Move to higher ground', correct: true },
      { text: 'Walk through floodwaters', correct: false },
      { text: 'Stay in a low area', correct: false },
    ],
    explanation: 'Always move to higher ground and avoid walking through floodwaters.'
  }
];

const scenarioIcons: Record<string, React.ReactNode> = {
  earthquake: <AlertTriangle className="w-8 h-8 text-yellow-500 animate-bounce" />,
  fire: <Flame className="w-8 h-8 text-red-500 animate-pulse" />,
  flood: <Waves className="w-8 h-8 text-blue-500 animate-wave" />,
};

export default function SimulationPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const scenario = scenarios[step];

  const handleOption = (idx: number) => {
    setSelected(idx);
    setShowResult(true);
  };

  const handleNext = () => {
    setSelected(null);
    setShowResult(false);
    setStep((prev) => (prev + 1) % scenarios.length);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10">
      <div className="w-full max-w-2xl p-8 rounded-3xl shadow-2xl bg-white/90 border border-blue-100 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 opacity-30 pointer-events-none">
          <Sparkles className="w-32 h-32 text-blue-300 animate-spin-slow" />
        </div>
        <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center gap-2">
          <Sparkles className="w-8 h-8 animate-pulse text-yellow-400" />
          Disaster Simulation Games
        </h1>
        <div className="flex items-center gap-4 mb-2">
          {scenarioIcons[scenario.id]}
          <h2 className="text-2xl font-bold text-gray-800 drop-shadow">{scenario.title}</h2>
        </div>
        <p className="mb-6 text-lg text-gray-600 font-medium">{scenario.description}</p>
        <div className="space-y-3 mb-6">
          {scenario.options.map((opt, idx) => (
            <button
              key={idx}
              className={`w-full px-6 py-3 rounded-xl border text-lg font-semibold shadow transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 text-black
                ${selected === idx
                  ? (opt.correct
                    ? 'bg-gradient-to-r from-green-200 to-green-100 border-green-500 scale-105 ring-2 ring-green-300'
                    : 'bg-gradient-to-r from-red-200 to-red-100 border-red-500 scale-105 ring-2 ring-red-300')
                  : 'bg-gradient-to-r from-gray-50 to-blue-50 border-gray-300 hover:bg-blue-100 hover:scale-105'}
              `}
              disabled={showResult}
              onClick={() => handleOption(idx)}
            >
              {opt.text}
            </button>
          ))}
        </div>
        {showResult && (
          <div className="mb-6 p-4 rounded-xl border shadow-inner bg-gradient-to-r from-white to-blue-50">
            {scenario.options[selected!].correct ? (
              <p className="text-green-700 font-bold text-lg flex items-center gap-2"><Sparkles className="w-5 h-5 text-green-400 animate-pulse" /> Correct!</p>
            ) : (
              <p className="text-red-700 font-bold text-lg flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" /> Incorrect.</p>
            )}
            <p className="mt-2 text-gray-700 text-base font-medium">{scenario.explanation}</p>
          </div>
        )}
        {showResult && (
          <button
            className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            onClick={handleNext}
          >
            Next Scenario
          </button>
        )}
      </div>
    </div>
  );
}
