/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import type { GirlWish } from './data/wishes.ts';
import { WISHES } from './data/wishes.ts';
import { WelcomeScreen } from './components/WelcomeScreen.tsx';
import { EnvelopeFlow } from './components/EnvelopeFlow.tsx';
import { BackgroundPetals } from './components/BackgroundPetals.tsx';
import { AudioToggle } from './components/AudioToggle.tsx';
import { searchWishByName } from './utils/nameSearch.ts';

export default function App() {
  const [selectedWish, setSelectedWish] = useState<GirlWish | null>(null);

  // URL query parameter support for direct sharing / testing (?id=1 or ?name=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get('id');
      const nameParam = params.get('name');
      const autostart = params.get('autostart');

      if (idParam) {
        const found = WISHES.find((w) => w.id === parseInt(idParam, 10));
        if (found) {
          setSelectedWish(found);
          return;
        }
      }

      if (nameParam) {
        const searchRes = searchWishByName(nameParam, WISHES);
        if (searchRes.status === 'found') {
          setSelectedWish(searchRes.wish);
          return;
        }
      }

      if (autostart === '1') {
        setSelectedWish(WISHES[0]);
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  const handleSelectWish = (wish: GirlWish) => {
    setSelectedWish(wish);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedWish(null);
    // Clear any search param in URL without reload
    if (window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#4A3E3D] relative overflow-x-hidden flex flex-col justify-between selection:bg-pink-100 selection:text-pink-900">
      {/* Background Petals Ambient Effect */}
      <BackgroundPetals />

      {/* Floating Audio Controller */}
      <AudioToggle />

      {/* Main View Area */}
      <main className="flex-1 w-full flex flex-col items-center justify-start z-10">
        {selectedWish ? (
          <EnvelopeFlow wish={selectedWish} onBack={handleBackToHome} />
        ) : (
          <WelcomeScreen onSelectWish={handleSelectWish} />
        )}
      </main>
    </div>
  );
}
