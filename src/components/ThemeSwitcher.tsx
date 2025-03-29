import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";


export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <Button variant="ghost" isIconOnly onPress={() => theme === "light" ? setTheme("blurple-dark") : setTheme("light")}>
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
    </div>
  )
};