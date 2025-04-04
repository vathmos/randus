import { Select, SelectItem, SharedSelection } from "@heroui/react";
import { useTranslation } from "@/contexts/TranslationContext";

export default function LanguageSwitch() {

  const { text, handleLanguageChange } = useTranslation();

  return (
    <div className="w-48">
      <Select onSelectionChange={(key: SharedSelection) => handleLanguageChange((key as Set<string>).has("1") ? "id" : "en")}
        defaultSelectedKeys="2" variant="bordered" labelPlacement="outside-left" className="max-w-xs" label={text.language}>
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