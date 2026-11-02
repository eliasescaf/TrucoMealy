import { useState } from 'react';

type State = 'q0' | 'qE' | 'qEE' | 'qERE' | 'qEFE' | 'qEEFE' | 'qEERE' | 'qERERE' | 'qEREFE' | 'qEERERE' | 'qEEREFE' | 'qEREREFE' | 'qEEREREFE' | 'qRE' | 'qRERE' | 'qREFE' | 'qREREFE' | 'qFE' | 'qFINE' | 'qT' | 'qRT' | 'qV4' | 'qFINT';
type Input = 'E' | 'RE' | 'FE' | 'T' | 'RT' | 'V4' | 'Q' | 'NQ';

interface Transition {
  nextState: State;
  output: string | number;
}

const trucoMaquina: Record<string, Partial<Record<Input, Transition>>> = {
  q0: {
    E: { nextState: 'qE', output: 'λ' },
    RE: { nextState: 'qRE', output: 'λ' },
    FE: { nextState: 'qFE', output: 'λ' },
    T: { nextState: 'qT', output: 'λ' }
  },
  qE: {
    E: { nextState: 'qEE', output: 'λ' },
    RE: { nextState: 'qERE', output: 'λ' },
    FE: { nextState: 'qEFE', output: 'λ' },
    Q: { nextState: 'qFINE', output: 2 },
    NQ: { nextState: 'qFINE', output: 1 }
  },
  qEE: {
    RE: { nextState: 'qEERE', output: 'λ' },
    FE: { nextState: 'qEEFE', output: 'λ' },
    Q: { nextState: 'qFINE', output: 4 },
    NQ: { nextState: 'qFINE', output: 2 }
  },
  qERE: {
    RE: { nextState: 'qERERE', output: 'λ' },
    FE: { nextState: 'qEREFE', output: 'λ' },
    Q: { nextState: 'qFINE', output: 5 },
    NQ: { nextState: 'qFINE', output: 2 }
  },
  qEFE: {
    Q: { nextState: 'qFINE', output: 'X' },
    NQ: { nextState: 'qFINE', output: 2 }
  },
  qEERE: {
    RE: { nextState: 'qEERERE', output: 'λ' },
    FE: { nextState: 'qEEREFE', output: 'λ' },
    Q: { nextState: 'qFINE', output: 7 },
    NQ: { nextState: 'qFINE', output: 4 }
  },
  qEEFE: {
    Q: { nextState: 'qFINE', output: 'X' },
    NQ: { nextState: 'qFINE', output: 4 }
  },
  qERERE: {
    FE: { nextState: 'qEREREFE', output: 'λ' },
    Q: { nextState: 'qFINE', output: 8 },
    NQ: { nextState: 'qFINE', output: 5 }
  },
  qEREFE: {
    Q: { nextState: 'qFINE', output: 'X' },
    NQ: { nextState: 'qFINE', output: 5 }
  },
  qEERERE: {
    FE: { nextState: 'qEEREREFE', output: 'λ' },
    Q: { nextState: 'qFINE', output: 10 },
    NQ: { nextState: 'qFINE', output: 7 }
  },
  qEEREFE: {
    Q: { nextState: 'qFINE', output: 'X' },
    NQ: { nextState: 'qFINE', output: 7 }
  },
  qEREREFE: {
    Q: { nextState: 'qFINE', output: 'X' },
    NQ: { nextState: 'qFINE', output: 8 }
  },
  qEEREREFE: {
    Q: { nextState: 'qFINE', output: 'X' },
    NQ: { nextState: 'qFINE', output: 10 }
  },
  qRE: {
    RE: { nextState: 'qRERE', output: 'λ' },
    FE: { nextState: 'qREFE', output: 'λ' },
    Q: { nextState: 'qFINE', output: 3 },
    NQ: { nextState: 'qFINE', output: 1 }
  },
  qRERE: {
    FE: { nextState: 'qREREFE', output: 'λ' },
    Q: { nextState: 'qFINE', output: 6 },
    NQ: { nextState: 'qFINE', output: 3 }
  },
  qREFE: {
    Q: { nextState: 'qFINE', output: 'λ' },
    NQ: { nextState: 'qFINE', output: 3 }
  },
  qREREFE: {
    Q: { nextState: 'qFINE', output: 'X' },
    NQ: { nextState: 'qFINE', output: 6 }
  },
  qFE: {
    Q: { nextState: 'qFINE', output: 'X' },
    NQ: { nextState: 'qFINE', output: 1 }
  },
  qT: {
    RT: { nextState: 'qRT', output: 'λ' },
    Q: { nextState: 'qFINT', output: 2 },
    NQ: { nextState: 'qFINT', output: 1 }
  },
  qRT: {
    V4: { nextState: 'qV4', output: 'λ' },
    Q: { nextState: 'qFINT', output: 3 },
    NQ: { nextState: 'qFINT', output: 2 }
  },
  qV4: {
    Q: { nextState: 'qFINT', output: 4 },
    NQ: { nextState: 'qFINT', output: 3 }
  },
  qFINE: {
    T: { nextState: 'qT', output: 'λ' }
  }
};


export function useMealy() {
  const [currentState, setCurrentState] = useState<State>('q0');
  const [outputs, setOutputs] = useState<(string | number)[]>([]);
  const [history, setHistory] = useState<Input[]>([]);

  const getAvailableInputs = () => Object.keys(trucoMaquina[currentState] || {}) as Input[];

  const sendInput = (input: Input) => {
    const transition = trucoMaquina[currentState]?.[input];
    if (transition) {
      setCurrentState(transition.nextState);
      setHistory(prev => [...prev, input]);
      if (transition.output !== 'λ') {
        setOutputs(prev => [...prev, transition.output]);
      }
    }
  };

  const reset = () => {
    setCurrentState('q0');
    setOutputs([]);
    setHistory([]);
  };

  return { currentState, outputs, sendInput, reset, getAvailableInputs, history };
}
