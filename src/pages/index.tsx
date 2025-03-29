import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Listbox, ListboxItem } from "@heroui/react";
import { ReactNode, useMemo, useState } from "react";

export const ListboxWrapper = ({ children } : { children: ReactNode }) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function Home() {
  function randomizeGroups(names: string[], numGroups: number): string[][] {
    if (numGroups <= 0) throw new Error("Number of groups must be at least 1");

    // Acak urutan nama menggunakan Fisher-Yates Shuffle
    for (let i = names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [names[i], names[j]] = [names[j], names[i]];
    }

    // Inisialisasi array kosong untuk grup
    const groups: string[][] = Array.from({ length: numGroups }, () => []);

    // Distribusikan nama ke dalam grup secara merata
    names.forEach((name, i) => {
      groups[i % numGroups].push(name);
    });

    return groups;
  }

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const selectedValue = useMemo(() => Array.from(selectedKeys).join(", "), [selectedKeys]);



  // Contoh penggunaan:
  const namesList = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank", "a", "b", "c", "d", "e", "f"];
  const numGroups = 3;

  console.log(randomizeGroups(namesList, numGroups));

  return (
    <div className="">
      <Navbar position="static">
        <NavbarBrand>
          <p className="satoshi text-3xl text-inherit">Randus</p>
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-4 hide" justify="center">
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 max-w-[1024px] px-6 w-screen">
          <ListboxWrapper>
            <Listbox
              aria-label="Multiple selection example"
              selectedKeys={selectedKeys}
              selectionMode="multiple"
              variant="flat"
              onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
            >
              <ListboxItem key="text">Text</ListboxItem>
              <ListboxItem key="number">Number</ListboxItem>
              <ListboxItem key="date">Date</ListboxItem>
              <ListboxItem key="single_date">Single Date</ListboxItem>
              <ListboxItem key="iteration">Iteration</ListboxItem>
            </Listbox>
          </ListboxWrapper>
          <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        </div>
      </div>

    </div>

  );
}
