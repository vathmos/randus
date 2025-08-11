import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { toJpeg, toPng, toSvg } from "html-to-image";
import { ArrowDownToLine } from "lucide-react";
import { useTheme } from "next-themes";

type ImageFormat = "png" | "jpeg" | "svg";

type ExportOptions = {
  format?: ImageFormat;
  quality?: number;
  filename?: string;
}

type DownloadDropdownProps = {
  isGroupExist: boolean;
  targetElement: HTMLDivElement;
  boardTitle?: string;
};

export default function DownloadDropdown({ isGroupExist, targetElement, boardTitle }: DownloadDropdownProps) {

  const { theme } = useTheme();

  async function exportElement(
    element: HTMLElement, { format = "png", quality = 1, filename = boardTitle}: ExportOptions = {}) {


    if (!element) return;

    const index: number = Number(localStorage.getItem("randusboard-index") ?? 1);

    let dataUrl: string;

    switch (format) {
      case "jpeg":
        dataUrl = await toJpeg(element, { quality, skipFonts: true,
          style: {
            backgroundColor: theme === "dark" ? "dark" : "light",
            color: theme === "dark" ? "dark" : ";light"
          }
         });
        break;
      case "svg":
        dataUrl = await toSvg(element, { skipFonts: true });
        break;
      default:
        dataUrl = await toPng(element, { skipFonts: true });
    }

    const link = document.createElement("a");
    link.download = `${filename || "randusboard-" + index}.${format}`;
    link.href = dataUrl;
    link.click();

    localStorage.setItem("randusboard-index", String(index + 1));

  }
  return (
    <div className={`mt-4 self-center ${!isGroupExist && "hidden"}`}>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="ghost" radius="sm">
            <ArrowDownToLine size={18}/>
            <p>Download</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="png" onPress={() => exportElement(targetElement, { format: "png" })}>PNG</DropdownItem>
          <DropdownItem key="jpeg" onPress={() => exportElement(targetElement, { format: "jpeg" })}>JPEG</DropdownItem>
          <DropdownItem key="svg" onPress={() => exportElement(targetElement, { format: "svg" })}>SVG</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}