import React, { useState, useEffect } from 'react';
import type { GirlWish } from '../data/wishes.ts';
import { BlossomIcon } from './FloralIcons.tsx';
import { GreetingCard } from './GreetingCard.tsx';
import { Sparkles, Heart } from 'lucide-react';
import { fireEnvelopeCelebration } from '../utils/confettiBurst.ts';

interface EnvelopeFlowProps {
  wish: GirlWish;
  onBack: () => void;
}

type FlowStep = 'preparing' | 'envelope' | 'opening' | 'opened';

export const EnvelopeFlow: React.FC<EnvelopeFlowProps> = ({ wish, onBack }) => {
  const [step, setStep] = useState<FlowStep>('preparing');

  // Step 1: Preparation stage (brief 700ms transition with gentle greeting)
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('envelope');
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenEnvelope = () => {
    if (step !== 'envelope') return;
    setStep('opening');
    fireEnvelopeCelebration();
    // Animate flap and card rising, then show full card
    setTimeout(() => {
      setStep('opened');
    }, 950);
  };

  if (step === 'opened') {
    return <GreetingCard wish={wish} onBack={onBack} />;
  }

  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Step 1: Preparing */}
      {step === 'preparing' && (
        <div className="text-center animate-in fade-in zoom-in-95 duration-400">
          <div className="inline-block p-4 rounded-full bg-pink-100/70 border border-pink-200 mb-4 animate-bounce">
            <BlossomIcon className="w-12 h-12" />
          </div>
          <p className="text-xl sm:text-2xl font-serif-elegant font-semibold text-[#5B3944]">
            Một món quà nhỏ đang chờ {wish.name}...
          </p>
          <p className="text-xs text-stone-500 mt-2 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
            Đang chuẩn bị phong bì gửi tới cậu
          </p>
        </div>
      )}

      {/* Step 2 & Opening: Envelope Stage */}
      {(step === 'envelope' || step === 'opening') && (
        <div className="w-full max-w-md flex flex-col items-center animate-in fade-in duration-500">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 border border-pink-200/80 mb-2">
              <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
              10A13 - K69 Special Delivery
            </span>
            <p className="text-sm sm:text-base font-serif-elegant text-stone-600">
              Chạm vào phong bì để mở lời chúc nhé.
            </p>
          </div>

          {/* Interactive Envelope Container */}
          <button
            type="button"
            onClick={handleOpenEnvelope}
            disabled={step === 'opening'}
            aria-label={`Mở phong bì lời chúc cho ${wish.name}`}
            className="group relative w-[310px] sm:w-[360px] h-[220px] sm:h-[245px] cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-pink-300 rounded-xl transition-transform duration-300 active:scale-98"
          >
            {/* The Envelope Body (Cream / Blush) */}
            <div className="absolute inset-0 bg-[#FDF9F3] border-2 border-[#E9CDD4] rounded-xl envelope-shadow overflow-hidden">
              {/* Inner lining with subtle floral gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FCE7F3]/70 via-[#FFFDF9] to-[#FAF5EE]" />

              {/* Envelope fold diagonal lines on front */}
              <svg
                viewBox="0 0 360 245"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                preserveAspectRatio="none"
              >
                {/* Left fold */}
                <polygon
                  points="0,0 180,140 0,245"
                  fill="#FDF8F2"
                  stroke="#EAD4DB"
                  strokeWidth="1.5"
                />
                {/* Right fold */}
                <polygon
                  points="360,0 180,140 360,245"
                  fill="#FBF4ED"
                  stroke="#EAD4DB"
                  strokeWidth="1.5"
                />
                {/* Bottom flap */}
                <polygon
                  points="0,245 180,125 360,245"
                  fill="#FDF8F2"
                  stroke="#E5C7D0"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Letter sliding out animation */}
              <div
                className={`absolute left-4 right-4 bg-white border border-pink-200 rounded-t-lg p-4 shadow-md transition-all duration-700 ease-out z-20 ${
                  step === 'opening'
                    ? '-top-28 sm:-top-32 opacity-100 scale-105'
                    : 'top-8 opacity-0'
                }`}
              >
                <div className="flex items-center gap-2 border-b border-pink-100 pb-2">
                  <BlossomIcon className="w-5 h-5" />
                  <span className="text-xs font-serif-elegant font-semibold text-pink-700">
                    DEAR {wish.shortName.toUpperCase()}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 bg-pink-100 rounded w-full" />
                  <div className="h-1.5 bg-pink-100 rounded w-5/6" />
                  <div className="h-1.5 bg-pink-100 rounded w-4/6" />
                </div>
              </div>

              {/* Recipient Address on Front of Envelope */}
              <div className="absolute inset-x-4 bottom-5 z-25 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[11px] font-sans tracking-widest uppercase text-pink-600 font-semibold">
                  To:
                </span>
                <span className="text-base sm:text-lg font-serif-elegant font-bold text-[#55333D] px-4 py-0.5 border-b border-pink-300">
                  {wish.name}
                </span>
                <span className="text-[10px] text-stone-500 mt-1 font-sans">
                  Lớp 10A13 - K69
                </span>
              </div>
            </div>

            {/* Top Flap with 3D open transition */}
            <div
              className={`absolute top-0 inset-x-0 h-[130px] z-30 origin-top transition-all duration-500 ease-in-out ${
                step === 'opening'
                  ? 'transform -rotate-180 opacity-60'
                  : 'group-hover:brightness-95'
              }`}
              style={{
                perspective: '600px',
                transformStyle: 'preserve-3d',
              }}
            >
              <svg
                viewBox="0 0 360 130"
                className="w-full h-full drop-shadow-sm"
                preserveAspectRatio="none"
              >
                <polygon
                  points="0,0 180,128 360,0"
                  fill="#F9ECEF"
                  stroke="#E5C7D0"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Wax Seal with 10A13 emblem */}
            <div
              className={`absolute top-[90px] sm:top-[100px] left-1/2 transform -translate-x-1/2 z-35 transition-all duration-300 ${
                step === 'opening'
                  ? 'scale-125 opacity-0 rotate-45'
                  : 'group-hover:scale-105'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 via-pink-600 to-rose-700 shadow-md border-2 border-rose-300 flex items-center justify-center text-white text-[10px] font-bold tracking-tight">
                <div className="w-9 h-9 rounded-full border border-pink-200/50 flex flex-col items-center justify-center">
                  <span className="font-serif-elegant font-bold">10A13</span>
                  <span className="text-[8px] -mt-0.5">K69</span>
                </div>
              </div>
            </div>
          </button>

          {/* Quick back or hint */}
          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="text-xs text-stone-500 hover:text-pink-700 underline underline-offset-4 cursor-pointer transition-colors"
            >
              Tìm lời chúc cho bạn khác
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
