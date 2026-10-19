import { toPng } from 'html-to-image';
import { removeVietnameseAccents } from './nameSearch.ts';

/**
 * Creates a clean filename according to requirement:
 * Loi-chuc-2010-[TenNguoiNhan].png
 * Example: "Vũ Phương Anh" -> "Loi-chuc-2010-Vu-Phuong-Anh.png"
 * "Vi Ngọc Minh" -> "Loi-chuc-2010-Vi-Ngoc-Minh.png"
 */
export function generateExportFileName(name: string): string {
  if (!name) return 'Loi-chuc-2010.png';

  const noAccents = removeVietnameseAccents(name);
  const formatted = noAccents
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');

  return `Loi-chuc-2010-${formatted}.png`;
}

/**
 * Captures the greeting card element and downloads it as a high-resolution PNG
 */
export async function downloadCardAsPng(
  cardElement: HTMLElement,
  fileName: string
): Promise<string> {
  // Wait for webfonts to finish loading
  if ('fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Fallback
    }
  }

  // Small delay to ensure any layout paints settle
  await new Promise((resolve) => setTimeout(resolve, 150));

  const dataUrl = await toPng(cardElement, {
    quality: 0.98,
    pixelRatio: 2.5, // Crisp retina resolution
    backgroundColor: '#FFFDF9',
    cacheBust: true,
    style: {
      transform: 'none',
      margin: '0',
    },
    filter: (node) => {
      // Exclude any interactive tooltips or action buttons if they were inside
      if (node instanceof HTMLElement && node.dataset.noExport === 'true') {
        return false;
      }
      return true;
    },
  });

  // Trigger download via anchor
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return dataUrl;
}
