export type IndexableItem = {
  title: string;
  href?: string;
  description?: string;
};

export type LinkedItem = {
  title: string;
  href?: string;
  description?: string;
};

export const createTitleIndex = <T extends IndexableItem>(items: readonly T[]) =>
  new Map(
    items.map((item) => [
      item.title,
      {
        title: item.title,
        href: item.href,
        description: item.description,
      } satisfies LinkedItem,
    ]),
  );

export const createKeyedIndex = <T, TValue>(items: readonly T[], getKey: (item: T) => string, mapValue: (item: T) => TValue) =>
  new Map(items.map((item) => [getKey(item), mapValue(item)]));

export const resolveLinkedByTitle = <T extends LinkedItem>(
  titles: readonly string[],
  index: Map<string, T>,
  fallbackMapper: (title: string) => T = (title) => ({ title } as T),
) =>
  titles.map((title) => {
    const item = index.get(title);
    return item ?? fallbackMapper(title);
  });

export const resolveLinkedByKey = <T extends LinkedItem>(
  keys: readonly string[],
  index: Map<string, T>,
  fallbackMapper: (key: string) => T = (key) => ({ title: key } as T),
) =>
  keys.map((key) => {
    const item = index.get(key);
    return item ?? fallbackMapper(key);
  });
