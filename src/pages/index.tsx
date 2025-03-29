import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";

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
          {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
        </NavbarContent>
        <NavbarContent justify="end">
          {/* <NavbarItem className="lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>

  );
}
