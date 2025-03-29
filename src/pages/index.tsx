import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";

export default function Home() {
  return (
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
          <ThemeSwitcher>

          </ThemeSwitcher>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
