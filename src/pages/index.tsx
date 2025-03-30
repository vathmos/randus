import DefaultNavbar from "@/components/Navbar";
import { Button, Checkbox, Form, Input } from "@heroui/react";
import { useState } from "react";
import { Plus, Crown, Trash2 as Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

type Item = {
  name: string,
  isLeader: boolean
}


export default function Home() {

  const form = useForm();


  // function randomizeGroups(items: string[], numGroups: number): string[][] {
  //   if (numGroups <= 0) throw new Error("Number of groups must be at least 1");

  //   // Acak urutan nama menggunakan Fisher-Yates Shuffle
  //   for (let i = items.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [items[i], items[j]] = [items[j], items[i]];
  //   }

  //   // Inisialisasi array kosong untuk grup
  //   const groups: string[][] = Array.from({ length: numGroups }, () => []);

  //   // Distribusikan nama ke dalam grup secara merata
  //   items.forEach((name, i) => {
  //     groups[i % numGroups].push(name);
  //   });

  //   return groups;
  // }

  const [selectedKeys, setSelectedKeys] = useState<Set<string> | "all">(new Set());


  // const selectedValue = useMemo(() => Array.from(selectedKeys).join(", "), [selectedKeys]);



  const [items, setItems] = useState<Item[]>([
    {
      name: "Bob",
      isLeader: false
    },
    {
      name: "Alex",
      isLeader: false
    },
    {
      name: "Sarah",
      isLeader: false
    },
  ]);


  const handleDeleteItem = () => {
    if (selectedKeys === "all") {
      setItems([]);
    } else {
      setItems((prevItems) => prevItems.filter((item) => !selectedKeys.has(item.name)));
    }
    setSelectedKeys(new Set());

  }
  const handleCreateItem = () => {
    setItems((prev) => prev ? [...prev, form.getValues("item")] : form.getValues("item"));
    form.setValue("item", "");
    form.setFocus("item");
    form.reset();
  }
  console.log(selectedKeys);



  // Contoh penggunaan:
  // const itemsList = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank", "a", "b", "c", "d", "e", "f"];
  // const numGroups = 3;

  // console.log(randomizeGroups(itemsList, numGroups));

  return (
    <div className="">
      <DefaultNavbar></DefaultNavbar>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 max-w-[1024px] px-6 w-screen color">

          <div key="bordered" className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
            <Form className="flex-row flex items-end w-full" onSubmit={form.handleSubmit(handleCreateItem)}>
              <Input onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreateItem();
                }
              }}
                label="Name" type="text" variant="underlined" placeholder="Enter new item" {...form.register("item")} />
              <Input label="Number of Groups" type="text" variant="underlined" placeholder="0" {...form.register("groupNum")} className="w-1/2" />
              <Button type="submit" isIconOnly variant="solid" size="md" color="primary">
                <Plus></Plus>
              </Button>
              <Button onPress={handleDeleteItem} isIconOnly variant="solid" size="md" color="danger">
                <Trash></Trash>
              </Button>
            </Form>
          </div>
          <div className="flex flex-col max-w-[1024px]">
            <Table
              removeWrapper
              aria-label="Rows actions table example with dynamic content"
              selectionBehavior="toggle"
              color="danger"
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
            // onRowAction={(key) => alert(`Opening item ${key}...`)}
            >
              <TableHeader>
                <TableColumn>
                  Name
                </TableColumn>
                <TableColumn>
                  Status
                </TableColumn>
              </TableHeader>
              <TableBody emptyContent="No items... yet!">
                {items.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Checkbox key={item.name} size="md" icon={<Crown />} color="warning" defaultChecked={false}>
                        Leader
                      </Checkbox>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>
        </div>
      </div>

    </div>

  );
}
