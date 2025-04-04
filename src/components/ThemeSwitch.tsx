import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";


export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <Button variant="ghost" isIconOnly onPress={() => theme === "blurple-light" ? setTheme("blurple-dark") : setTheme("blurple-light")}>
        {theme === "blurple-light" ? <Moon /> : <Sun />}
      </Button>
    </div>
  )
};