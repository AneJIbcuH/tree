import type { TreeObject, ParentId, TreeId } from '@/types/types';
import { isTreeObject } from '@/shared/utils/utils';

export default class TreeStore {
  items: TreeObject[] = [];

  constructor(arr: TreeObject[]) {
    this.items = arr;
  }

  getAll() {
    return this.items;
  }

  getItem(id: TreeId) {
    return this.items.find((el) => el.id === id) || null;
  }

  getChildren(id: TreeId) {
    return this.items.filter((el) => el.parent === id);
  }

  getAllChildren(id: TreeId) {
    const result: TreeObject[] = [];
    const queueIDs: TreeId[] = [id];

    while (queueIDs.length > 0) {
      const currentId = queueIDs.pop();

      const сhildren = this.items.filter((el) => el.parent === currentId);

      for (const child of сhildren) {
        result.push(child);
        queueIDs.push(child.id);
      }
    }

    return result;
  }

  getAllParents(id: TreeId) {
    const result: TreeObject[] = [];
    let currentId: ParentId = id;
    let currentElement = this.items.find((el) => el.id === currentId);

    if (!currentElement) {
      return result;
    }

    result.push(currentElement);
    currentId = currentElement.parent;

    while (currentId !== null) {
      const parent = this.items.find((el) => el.id === currentId);

      if (!parent) {
        break;
      }

      result.push(parent);
      currentId = parent.parent;
    }

    return result;
  }

  addItem(obj: TreeObject) {
    if (isTreeObject(obj)) {
      this.items.push(obj);
    }
  }

  removeItem(id: TreeId) {
    const itemIndex = this.items.findIndex((el) => el.id === id);
    if (itemIndex === -1) {
      return;
    }

    const idsToRemove = new Set<TreeId>();
    const stack: TreeId[] = [id];

    while (stack.length > 0) {
      const currentId = stack.pop()!;
      idsToRemove.add(currentId);

      for (const item of this.items) {
        if (item.parent === currentId && !idsToRemove.has(item.id)) {
          stack.push(item.id);
        }
      }
    }

    this.items = this.items.filter((el) => !idsToRemove.has(el.id));
  }

  updateItem(obj: TreeObject) {
    if (isTreeObject(obj)) {
      const findedIndex = this.items.findIndex((el) => el.id === obj.id);

      if (findedIndex !== -1) {
        this.items[findedIndex] = { ...this.items[findedIndex], ...obj };
      }
    }
  }
}
