import type { GirlWish } from '../data/wishes.ts';
import { WISHES } from '../data/wishes.ts';

/**
 * Standardize text: trims whitespace, collapses inner spaces, converts to lowercase
 */
export function normalizeSpaces(str: string): string {
  if (!str) return '';
  return str.trim().replace(/\s+/g, ' ').toLowerCase();
}

/**
 * Remove Vietnamese diacritics / accents for fallback search
 */
export function removeVietnameseAccents(str: string): string {
  if (!str) return '';
  return normalizeSpaces(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd');
}

export type SearchResult =
  | { status: 'empty'; message: string }
  | { status: 'found'; wish: GirlWish }
  | { status: 'ambiguous'; candidates: GirlWish[]; message: string }
  | { status: 'not_found'; message: string };

export function searchWishByName(query: string, wishes: GirlWish[] = WISHES): SearchResult {
  const cleanQuery = normalizeSpaces(query);
  if (!cleanQuery) {
    return {
      status: 'empty',
      message: 'Cậu chưa nhập tên kìa. Điền họ tên để tìm lời chúc dành riêng cho mình nhé!'
    };
  }

  // 1. Exact full name match (accent-sensitive, case-insensitive)
  const exactMatches = wishes.filter(
    (w) => normalizeSpaces(w.name) === cleanQuery
  );
  if (exactMatches.length === 1) {
    return { status: 'found', wish: exactMatches[0] };
  }

  // 2. Exact full name match (accent-insensitive)
  const queryNoAccents = removeVietnameseAccents(cleanQuery);
  const accentInsensitiveMatches = wishes.filter(
    (w) => removeVietnameseAccents(w.name) === queryNoAccents
  );
  if (accentInsensitiveMatches.length === 1) {
    return { status: 'found', wish: accentInsensitiveMatches[0] };
  } else if (accentInsensitiveMatches.length > 1) {
    return {
      status: 'ambiguous',
      candidates: accentInsensitiveMatches,
      message: 'Có vẻ có hơn một kết quả phù hợp. Chọn đúng họ tên đầy đủ của cậu nhé!'
    };
  }

  // 3. Check for partial name match (e.g. typing "Phương Anh" or "Khánh Trâm")
  // Candidates where the full name contains or ends with the query
  const partialMatches = wishes.filter((w) => {
    const normName = normalizeSpaces(w.name);
    const normNoAccents = removeVietnameseAccents(w.name);

    // Exact word or ending match
    const wordsMatch = normName.includes(cleanQuery) || normNoAccents.includes(queryNoAccents);
    return wordsMatch;
  });

  if (partialMatches.length > 1) {
    return {
      status: 'ambiguous',
      candidates: partialMatches,
      message: 'Có vẻ có hơn một kết quả phù hợp. Chọn đúng họ tên đầy đủ của cậu nhé!'
    };
  } else if (partialMatches.length === 1) {
    // If it's a unique match and query has at least 2 words (e.g., "Kim Bông", "Dạ Thảo", "Ánh Dương")
    // or is the student's unique shortName
    const single = partialMatches[0];
    const isSingleShortName =
      normalizeSpaces(single.shortName) === cleanQuery ||
      removeVietnameseAccents(single.shortName) === queryNoAccents;
    const queryWordCount = cleanQuery.split(' ').length;

    if (isSingleShortName || queryWordCount >= 2) {
      return { status: 'found', wish: single };
    }
    // Single word query (like just "Trúc" or "Trâm" or "Linh" or "Thảo"): prompt with candidate
    return {
      status: 'ambiguous',
      candidates: partialMatches,
      message: 'Có vẻ có hơn một kết quả phù hợp. Chọn đúng họ tên đầy đủ của cậu nhé!'
    };
  }

  return {
    status: 'not_found',
    message: 'Hình như tên cậu chưa có trong danh sách. Kiểm tra lại họ tên giúp tớ nhé!'
  };
}
