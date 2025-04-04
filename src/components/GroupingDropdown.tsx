import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { ArrowDownToLine } from "lucide-react";

export default function GroupingDropdown(props: {isGroupExist: boolean}) {
  return (
    <div className={`mt-4 self-center ${!props.isGroupExist && "hidden"}`}>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="ghost" radius="sm">
            <ArrowDownToLine size={18}/>
            <p>Download</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="XSLX">XSLX</DropdownItem>
          <DropdownItem key="CSV">CSV</DropdownItem>
          <DropdownItem key="JSON">JSON</DropdownItem>
          <DropdownItem key="Image">Image (PNG)</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}