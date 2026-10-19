import React, { useState, useRef } from 'react';
import { ArrowLeft, Download, Check, Heart, Sparkles, Loader2, Copy, AlertCircle, X, ExternalLink } from 'lucide-react';
import type { GirlWish } from '../data/wishes.ts';
import { BlossomIcon, CornerDecoration } from './FloralIcons.tsx';
import { downloadCardAsPng, generateExportFileName } from '../utils/imageExport.ts';

interface GreetingCardProps {
  wish: GirlWish;
  onBack: () => void;
}

export const GreetingCard: React.FC<GreetingCardProps> = ({ wish, onBack }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCopyText = async () => {
    const fullText = `DEAR ${wish.shortName.toUpperCase()}\n\n${wish.greeting}\n\nChúc cậu luôn hạnh phúc, tự tin và rực rỡ theo cách riêng của mình.\nHappy Vietnamese Women's Day!\n\nTừ những người bạn của cậu – 10A13 - K69 ♡`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSaveImage = async () => {
    if (isSaving || !cardRef.current) return;

    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const fileName = generateExportFileName(wish.name);
      const dataUrl = await downloadCardAsPng(cardRef.current, fileName);

      setSuccessMessage(
        'Đã lưu lời chúc thành công! Chúc cậu có một ngày 20/10 thật vui vẻ ♡'
      );
      setPreviewImage(dataUrl);

      // Clear success alert after 6 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 6000);
    } catch (err) {
      console.error('Error exporting card:', err);
      setErrorMessage(
        'Chưa thể tải thiệp về máy. Cậu hãy thử nhấn lại hoặc xem trước ảnh nhé!'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 animate-in fade-in zoom-in-95 duration-500">
      {/* Top navigation bar */}
      <div className="mb-4 flex items-center justify-between pr-28 sm:pr-32">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-600 hover:text-pink-700 bg-white/85 hover:bg-white px-3.5 py-1.5 rounded-full border border-pink-200/70 shadow-xs transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Quay lại trang chủ</span>
        </button>

        <button
          onClick={handleCopyText}
          aria-label="Sao chép văn bản lời chúc"
          className="inline-flex items-center gap-1 text-xs font-medium text-pink-700 bg-pink-50/90 hover:bg-pink-100 px-3 py-1.5 rounded-full border border-pink-200/80 transition-all duration-200 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Đã sao chép!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-pink-500" />
              <span>Sao chép chữ</span>
            </>
          )}
        </button>
      </div>

      {/* Main Paper Card Container to be captured */}
      <div
        ref={cardRef}
        className="relative bg-[#FFFDF9] rounded-2xl border-2 border-[#F7D6E0] p-6 sm:p-10 card-shadow overflow-hidden"
      >
        {/* Subtle patterned inner border */}
        <div className="absolute inset-2 sm:inset-3 border border-dashed border-[#F3C2D3]/70 rounded-xl pointer-events-none" />

        {/* Decorative floral corners */}
        <CornerDecoration position="top-left" />
        <CornerDecoration position="top-right" />
        <CornerDecoration position="bottom-left" />
        <CornerDecoration position="bottom-right" />

        {/* Top bloom badge */}
        <div className="relative z-10 flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center shadow-inner mb-3">
            <BlossomIcon className="w-10 h-10 transform hover:rotate-12 transition-transform duration-300" />
          </div>

          <span className="inline-block px-3 py-0.5 text-[11px] font-semibold tracking-widest text-pink-700 uppercase bg-pink-100/70 rounded-full border border-pink-200/60 mb-2">
            A Special Wish For You
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif-elegant font-semibold text-[#5B3944] tracking-wide">
            DEAR {wish.shortName.toUpperCase()}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Gửi tới: <span className="font-semibold text-stone-700">{wish.name}</span>
          </p>
        </div>

        {/* Main personalized wish content */}
        <div className="relative z-10 my-6">
          <div className="bg-[#FAF6F0]/80 rounded-xl p-5 sm:p-6 border border-[#EED9C4]/60 shadow-inner">
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed text-justify sm:text-left font-normal font-sans tracking-normal">
              "{wish.greeting}"
            </p>
          </div>
        </div>

        {/* Fixed closing message */}
        <div className="relative z-10 mt-6 pt-5 border-t border-pink-200/50 text-center space-y-2">
          <p className="text-sm sm:text-base font-medium text-[#7A4052] italic">
            "Chúc cậu luôn hạnh phúc, tự tin và rực rỡ theo cách riêng của mình."
          </p>

          <p className="text-xs uppercase font-semibold tracking-wider text-pink-600 font-sans flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            HAPPY VIETNAMESE WOMEN'S DAY!
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          </p>

          <div className="pt-3 flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 text-xs text-stone-600 font-medium">
              <span>Từ những người bạn của cậu – 10A13 - K69</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
            </div>
          </div>
        </div>
      </div>

      {/* FEEDBACK STATUS ALERTS */}
      {successMessage && (
        <div
          role="status"
          className="mt-4 p-3.5 rounded-xl bg-pink-50 border border-pink-300 text-pink-900 text-xs sm:text-sm font-medium flex items-center justify-between gap-2 shadow-xs animate-in fade-in duration-300"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          {previewImage && (
            <button
              onClick={() => {
                const w = window.open('');
                if (w) {
                  w.document.write(`<img src="${previewImage}" style="max-width:100%;height:auto;margin:auto;display:block;" alt="Thiệp 20/10"/>`);
                }
              }}
              className="text-xs text-pink-700 font-semibold underline shrink-0 hover:text-pink-900"
            >
              Xem ảnh
            </button>
          )}
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-xs animate-in fade-in duration-300"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* BOTTOM ACTION BUTTONS */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Nút 1: 📥 Lưu lời chúc */}
        <button
          onClick={handleSaveImage}
          disabled={isSaving}
          aria-label="Tải thiệp chúc mừng dưới dạng ảnh PNG"
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 hover:from-pink-600 hover:to-rose-500 disabled:opacity-75 disabled:cursor-wait text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Đang chuẩn bị thiệp...</span>
            </>
          ) : (
            <span>📥 Lưu lời chúc</span>
          )}
        </button>

        {/* Nút 2: ↩ Quay lại trang chủ */}
        <button
          onClick={onBack}
          aria-label="Quay lại trang chủ"
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-pink-50/80 text-stone-700 hover:text-pink-800 font-medium text-sm sm:text-base border border-pink-200 shadow-xs hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <span>↩ Quay lại trang chủ</span>
        </button>
      </div>

      {/* MOBILE PREVIEW MODAL IF NEEDED */}
      {previewImage && (
        <div className="mt-4 p-3 bg-pink-50/60 rounded-xl border border-pink-200/60 text-center">
          <p className="text-xs text-stone-600 mb-1">
            Thiệp đã được tạo. Nếu máy không tự động tải, cậu có thể mở ảnh để chạm giữ và lưu vào thư viện:
          </p>
          <a
            href={previewImage}
            download={generateExportFileName(wish.name)}
            className="inline-flex items-center gap-1.5 text-xs text-pink-700 font-semibold hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mở hoặc tải lại ảnh ({generateExportFileName(wish.name)})</span>
          </a>
        </div>
      )}
    </div>
  );
};
