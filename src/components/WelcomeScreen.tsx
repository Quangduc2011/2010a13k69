import React, { useState, useId } from 'react';
import { Search, Heart, Sparkles, AlertCircle, Users, CheckCircle2, X } from 'lucide-react';
import type { GirlWish } from '../data/wishes.ts';
import { CLASS_GREETING, WISHES } from '../data/wishes.ts';
import { searchWishByName } from '../utils/nameSearch.ts';
import { BlossomIcon, CornerDecoration, BotanicalBranch } from './FloralIcons.tsx';

interface WelcomeScreenProps {
  onSelectWish: (wish: GirlWish) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectWish }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [ambiguousList, setAmbiguousList] = useState<GirlWish[]>([]);
  const [showRosterModal, setShowRosterModal] = useState(false);
  const inputId = useId();

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setAmbiguousList([]);

    const result = searchWishByName(searchTerm, WISHES);

    if (result.status === 'empty') {
      setErrorMessage(result.message);
    } else if (result.status === 'not_found') {
      setErrorMessage(result.message);
    } else if (result.status === 'ambiguous') {
      setErrorMessage(result.message);
      setAmbiguousList(result.candidates);
    } else if (result.status === 'found') {
      onSelectWish(result.wish);
    }
  };

  const handleSelectCandidate = (wish: GirlWish) => {
    setErrorMessage(null);
    setAmbiguousList([]);
    onSelectWish(wish);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 relative z-10">
      {/* HEADER SECTION */}
      <header className="relative text-center mb-8 sm:mb-12">
        <div className="flex justify-center items-center gap-3 mb-2">
          <BotanicalBranch className="w-8 h-8 -scale-x-100 opacity-75" />
          <span className="text-xs uppercase tracking-widest font-semibold text-pink-700 bg-pink-100/80 px-3.5 py-1 rounded-full border border-pink-200">
            A little gift from 10A13 - K69
          </span>
          <BotanicalBranch className="w-8 h-8 opacity-75" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-elegant font-bold text-[#572B38] tracking-tight mt-3 mb-2">
          BLOOM FOR YOU
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mt-1">
          <span className="font-serif-elegant text-rose-600 text-lg sm:text-xl font-semibold">
            10A13 - K69
          </span>
          <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-pink-400" />
          <span className="text-stone-600 text-sm sm:text-base font-normal">
            Một lời chúc nhỏ, dành riêng cho cậu.
          </span>
        </div>

        {/* Central Floral Emblem */}
        <div className="mt-5 flex justify-center">
          <div className="relative p-3 bg-white/70 rounded-full border border-pink-200 shadow-sm backdrop-blur-xs">
            <BlossomIcon className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
        </div>
      </header>

      {/* INTRO PARAGRAPH */}
      <section
        aria-label="Lời giới thiệu"
        className="bg-white/85 backdrop-blur-xs rounded-2xl p-5 sm:p-7 border border-pink-100 shadow-xs mb-8 text-stone-700 text-sm sm:text-base leading-relaxed text-center space-y-3"
      >
        <p className="font-semibold text-rose-900 text-base sm:text-lg">
          Gửi những cô gái tuyệt vời của 10A13 - K69!
        </p>
        <p>
          Nhân ngày 20/10, các chàng trai của lớp đã chuẩn bị một món quà nho nhỏ dành riêng cho các cậu.
        </p>
        <p>
          Mỗi người đều có một lời chúc riêng, được gửi gắm bằng sự chân thành và những điều tốt đẹp nhất.
        </p>
        <p className="text-rose-800 font-medium italic">
          Hy vọng món quà nhỏ này sẽ khiến ngày hôm nay của cậu trở nên đặc biệt hơn một chút.
        </p>
      </section>

      {/* FULL GENERAL CLASS WISH (PHẦN IV) */}
      <section
        aria-label="Lời chúc chung của tập thể 10A13"
        className="relative bg-[#FFFDF9] rounded-2xl border-2 border-[#F6D5DF] p-6 sm:p-8 card-shadow mb-10 overflow-hidden"
      >
        {/* Decorative corner motifs */}
        <CornerDecoration position="top-left" />
        <CornerDecoration position="top-right" />
        <CornerDecoration position="bottom-left" />
        <CornerDecoration position="bottom-right" />

        <div className="relative z-10 text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200/60 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            20/10 • Ngày Phụ nữ Việt Nam
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-elegant font-bold text-[#552735] tracking-wide">
            {CLASS_GREETING.title}
          </h2>
        </div>

        <div className="relative z-10 space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed text-justify sm:text-left">
          {CLASS_GREETING.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="relative z-10 mt-6 pt-4 border-t border-pink-200/60 text-right">
          <p className="font-serif-elegant italic text-sm sm:text-base font-semibold text-rose-800">
            {CLASS_GREETING.signature}
          </p>
        </div>
      </section>

      {/* NAME SEARCH SECTION */}
      <section
        aria-label="Tìm kiếm lời chúc cá nhân"
        className="bg-white/90 backdrop-blur-xs rounded-2xl border-2 border-pink-200/80 p-6 sm:p-8 shadow-md mb-8"
      >
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-50 text-pink-600 mb-2">
            <Heart className="w-5 h-5 fill-pink-400 text-pink-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-serif-elegant font-bold text-[#542B39]">
            Còn bây giờ, hãy tìm món quà dành riêng cho cậu nhé!
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Nhập chính xác họ và tên của cậu để phong bì cá nhân mở ra nhé.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor={inputId} className="sr-only">
              Họ tên đầy đủ của cậu
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-pink-400 pointer-events-none">
                <Heart className="w-4 h-4 fill-pink-300" />
              </div>
              <input
                id={inputId}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                  if (ambiguousList.length > 0) setAmbiguousList([]);
                }}
                placeholder="Nhập họ tên đầy đủ của cậu..."
                className="w-full pl-11 pr-10 py-3.5 text-sm sm:text-base bg-[#FFFDFB] text-stone-800 placeholder-stone-400 rounded-xl border border-pink-300 focus:border-pink-500 focus:ring-3 focus:ring-pink-200/70 outline-none transition-all shadow-inner"
                autoComplete="name"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setErrorMessage(null);
                    setAmbiguousList([]);
                  }}
                  aria-label="Xóa nội dung nhập"
                  className="absolute right-3 p-1 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Validation Feedback Messages */}
          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm animate-in fade-in duration-200"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{errorMessage}</p>
                {/* Ambiguous candidates buttons */}
                {ambiguousList.length > 0 && (
                  <div className="mt-2.5 space-y-1.5">
                    <p className="text-[11px] text-stone-600">
                      Hãy chạm vào họ tên của cậu bên dưới:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ambiguousList.map((cand) => (
                        <button
                          key={cand.id}
                          type="button"
                          onClick={() => handleSelectCandidate(cand)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-pink-300 hover:border-pink-500 text-pink-800 text-xs font-semibold shadow-xs hover:bg-pink-50 transition-colors cursor-pointer"
                        >
                          {cand.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 hover:from-pink-600 hover:via-rose-500 hover:to-pink-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-99"
          >
            <Search className="w-4 h-4" />
            <span>MỞ MÓN QUÀ CỦA CẬU</span>
          </button>
        </form>

        {/* Quick directory trigger for convenience */}
        <div className="mt-4 pt-3 border-t border-pink-100 text-center">
          <button
            type="button"
            onClick={() => setShowRosterModal(true)}
            className="inline-flex items-center gap-1.5 text-xs text-pink-700 hover:text-pink-900 font-medium hover:underline underline-offset-4 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-pink-500" />
            <span>Hoặc xem danh sách 36 bông hoa của 10A13</span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-4 text-xs text-stone-500">
        <p className="text-xs sm:text-sm text-stone-500">
          Chúc các bạn nữ 10A13 một ngày 20/10 ngập tràn niềm vui và yêu thương ♡
        </p>
      </footer>

      {/* ROSTER MODAL (To let girls easily find their exact full name if preferred) */}
      {showRosterModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Danh sách 36 bạn nữ lớp 10A13"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-[#FFFDF9] rounded-2xl border-2 border-pink-200 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-pink-100 flex items-center justify-between bg-pink-50/50">
              <div className="flex items-center gap-2">
                <BlossomIcon className="w-6 h-6" />
                <h4 className="font-serif-elegant font-bold text-base sm:text-lg text-rose-900">
                  36 Bông Hoa Của 10A13 - K69
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowRosterModal(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                aria-label="Đóng danh sách"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto divide-y divide-pink-100/60 flex-1">
              <p className="text-xs text-stone-500 mb-3 px-1">
                Chạm vào họ tên của cậu để mở ngay phong bì lời chúc nhé:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WISHES.map((girl, idx) => (
                  <button
                    key={girl.id}
                    type="button"
                    onClick={() => {
                      setShowRosterModal(false);
                      onSelectWish(girl);
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl text-left bg-white hover:bg-pink-50/80 border border-pink-100 hover:border-pink-300 transition-all text-xs sm:text-sm text-stone-700 font-medium group cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="group-hover:text-pink-700 truncate">{girl.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-pink-400 opacity-0 group-hover:opacity-100 shrink-0 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-stone-50 border-t border-pink-100 text-center">
              <button
                type="button"
                onClick={() => setShowRosterModal(false)}
                className="text-xs text-stone-500 hover:text-stone-800 font-medium py-1 px-4"
              >
                Đóng danh sách
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
