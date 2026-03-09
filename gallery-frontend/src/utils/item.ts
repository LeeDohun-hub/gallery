import type { ItemSummary } from '../types/models.ts';

export function normalizeItem(row: Record<string, unknown>): ItemSummary {
  return {
    id: Number(row.id),
    imgPath: String(row.imgPath ?? row.img_path ?? ''),
    name: String(row.name ?? ''),
    price: Number(row.price ?? 0),
    discountPer: Number(row.discountPer ?? row.discount_per ?? 0),
  };
}

export function getDiscountedPrice(price: number, discountPer: number): number {
  return price - (price * discountPer) / 100;
}

export function formatWon(value: number): string {
  return `${value.toLocaleString()}원`;
}

export function toImgSrc(imgPath: string): string {
  if (!imgPath || typeof imgPath !== 'string') return '';

  const trimmed = imgPath.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  if (trimmed.startsWith('img/')) return `/${trimmed}`;

  return `/img/${trimmed}`;
}
