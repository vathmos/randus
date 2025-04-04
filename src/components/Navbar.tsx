import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import ThemeSwitch from "./ThemeSwitch";
import LanguageSwitch from "./LanguageSwitch";
import Image from "next/image";

export default function DefaultNavbar(props: { currentTheme: string | undefined }) {
  return (
    <>
      <Navbar position="static">
        <NavbarBrand>
          <Image width={140} height={0} src="/randus-text.svg" alt="randus icon" className={props.currentTheme === "blurple-light" ? "invert-0" : "invert"}></Image>
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-4 hide" justify="center">
        </NavbarContent>
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