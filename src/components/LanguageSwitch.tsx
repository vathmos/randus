import { Select, SelectItem, SharedSelection } from "@heroui/react";
import { useTranslation } from "@/contexts/TranslationContext";


export default function LanguageSwitch() {

  const { handleLanguageChange } = useTranslation();

  return (
    <div className="w-[120px] sm:w-48">
      <Select onSelectionChange={(key: SharedSelection) => handleLanguageChange((key as Set<string>).has("1") ? "id" : "en")}
        defaultSelectedKeys="2" variant="bordered"  className="max-w-xs flex sm:hidden" label="">
        <SelectItem
          key="1"
        >
          Indonesian
        </SelectItem>
        <SelectItem
          key="2"
        >
          English
        </SelectItem>
      </Select>
      <Select onSelectionChange={(key: SharedSelection) => handleLanguageChange((key as Set<string>).has("1") ? "id" : "en")}
        defaultSelectedKeys="2" variant="bordered" labelPlacement="outside-left" className="max-w-xs hidden sm:flex" label="Language">
        <SelectItem
          key="1"
        >
          Indonesia
        </SelectItem>
        <SelectItem
          key="2"
        >
          English
        </SelectItem>
      </Select>
    </div>
  )
}