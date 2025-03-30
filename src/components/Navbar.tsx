import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function DefaultNavbar() {
  return (
    <>
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
    </>
  )
}