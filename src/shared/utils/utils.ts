import type { TreeObject } from '@/types/types';

export function isTreeObject(obj: any): obj is TreeObject {
  return (
    obj != null &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    obj.hasOwnProperty('id') &&
    obj.hasOwnProperty('parent') &&
    (typeof obj.id === 'string' || typeof obj.id === 'number') &&
    (typeof obj.id === 'string'
      ? obj.id.trim() !== ''
      : Number.isFinite(obj.id)) &&
    (obj.parent === null ||
      (typeof obj.parent === 'string' && obj.parent.trim() !== '') ||
      (typeof obj.parent === 'number' && Number.isFinite(obj.parent)))
  );
}
