export type TreeObject = {
  id: TreeId;
  parent: ParentId;
  [key: string]: any;
};

export type TreeId = string | number;
export type ParentId = string | number | null;
