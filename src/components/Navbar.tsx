import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import ThemeSwitch from "./ThemeSwitch";
import LanguageSwitch from "./LanguageSwitch";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function DefaultNavbar() {

  const { theme } = useTheme();

  return (
    <>
      <Navbar position="static">
        <NavbarBrand>
          <Image width={140} height={0} src="/randus-text.svg" alt="randus icon" className={theme === "blurple-light" ? "invert-0" : "invert"}></Image>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <LanguageSwitch />
          </NavbarItem>
          <NavbarItem className="flex gap-4">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

    </>
  )
}