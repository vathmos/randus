import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";


export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleClickSwitch = () => {

  }

  return (
    <div>
      <Button isIconOnly onPress={() => theme === "light" ? setTheme("dark") : setTheme("light")}>
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
    </div>
  )
};