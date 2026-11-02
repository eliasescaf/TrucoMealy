"use client";
import { useMealy } from "../hooks/useMealy";

export default function TrucoValidator() {
  const { currentState, outputs, history, sendInput, reset, getAvailableInputs } =
    useMealy();
  const availableInputs = getAvailableInputs();

  const allInputs = ["E", "RE", "FE", "T", "RT", "V4", "Q", "NQ"];

  const labels: Record<string, string> = {
      E: 'Envido', RE: 'Real Envido', FE: 'Falta Envido',
      T: 'Truco', RT: 'Retruco', V4: 'Vale 4',
      Q: 'Quiero', NQ: 'No Quiero'
    };

  return (
    <main className="min-h-screen bg-emerald-950 text-zinc-50 flex flex-col items-center justify-center p-8 font-mono">
      <div className="w-full max-w-md border border-zinc-800 bg-emerald-900 rounded-xl p-6 shadow-2xl">
        <h1 className="text-xl font-bold mb-4 text-zinc-200 tracking-tight">
          ¿Cuántos puntos son?
        </h1>

        <div className="mb-6 space-y-2 p-4 bg-emerald-950 border border-zinc-800 rounded-lg">
          <p className="text-sm text-zinc-400">
            Estado actual:{" "}
            <span className="text-zinc-100 font-bold">{currentState}</span>
          </p>
          <p className="text-sm text-zinc-400">
            Salidas:{" "}
            <span className="text-zinc-100 font-bold">
              [{outputs.join(", ")}]
            </span>
          </p>

          <div className="pt-2 mt-2 border-t border-zinc-800">
            <p className="text-xs text-zinc-500 mb-1">Historial de Cantos:</p>
            <div className="flex flex-wrap gap-2">
              {history.length === 0 ? (
                <span className="text-xs text-zinc-600">
                  Esperando jugada...
                </span>
              ) : (
                history.map((canto, index) => (
                  <span
                    key={index}
                    className="text-xs bg-emerald-800 text-zinc-300 px-2 py-1 rounded-md border border-zinc-700"
                  >
                    {labels[canto]}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {allInputs.map((btn) => (
            <button
              key={btn}
              onClick={() => sendInput(btn as any)}
              disabled={!availableInputs.includes(btn as any)}
              className="px-4 py-2 rounded-lg bg-emerald-800 text-zinc-300 font-medium disabled:opacity-20 disabled:cursor-not-allowed hover:bg-emerald-700 hover:text-white transition-all active:scale-95"
            >
              {labels[btn]}
            </button>
          ))}
        </div>

        <button
          onClick={reset}
          className="w-full py-2 border border-zinc-800 text-zinc-400 rounded-lg text-sm hover:bg-emerald-800 hover:text-zinc-200 transition-colors"
        >
          Reiniciar máquina
        </button>
      </div>
    </main>
  );
}
