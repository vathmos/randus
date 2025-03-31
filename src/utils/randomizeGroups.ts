export default function randomizeGroups(
  items: string[],
  numGroups: number
): string[][] {
  if (numGroups <= 0) throw new Error("Number of groups must be at least 1");

  // Acak urutan nama menggunakan Fisher-Yates Shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  // Inisialisasi array kosong untuk grup
  const groups: string[][] = Array.from({ length: numGroups }, () => []);

  // Distribusikan nama ke dalam grup secara merata
  items.forEach((name, i) => {
    groups[i % numGroups].push(name);
  });

  return groups;
}
