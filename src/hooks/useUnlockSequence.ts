import { useEffect, useState } from 'react';

const UNLOCK_CODE = 'OSKA';

export function useUnlockSequence(onUnlock: () => void) {
  const [sequence, setSequence] = useState('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = (sequence + e.key.toUpperCase()).slice(-4);
      setSequence(newSequence);

      if (newSequence === UNLOCK_CODE) {
        onUnlock();
        setSequence('');
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [sequence, onUnlock]);

  return sequence;
}
