import DefaultNavbar from "@/components/Navbar";
import { Button, Checkbox, Form, Input, Select, SelectItem, SharedSelection } from "@heroui/react";
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

  const [selectedItemKeys, setSelectedItemKeys] = useState<Set<string> | "all">(new Set());
  const [selectedGroupingKey, setSelectedGroupingKey] = useState<Set<string>>(new Set());

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

  const groupingMethods =
    [
      "Group by number input",
      "Group by total leaders"
    ]


  const handleDeleteItem = () => {
    if (selectedItemKeys === "all") {
      setItems([]);
    } else {
      setItems((prevItems) => prevItems.filter((item) => !selectedItemKeys.has(item.name)));
    }
    setSelectedItemKeys(new Set());

  }
  const handleCreateItem = () => {
    const newItem = { name: form.getValues("item"), isLeader: false };
    setItems((prev) => prev ? [...prev, newItem] : [newItem]);
    form.setValue("item", "");
    form.setFocus("item");
    form.reset();
  }

  const handleGroupingChange = (key: SharedSelection) => {
    setSelectedGroupingKey(key as Set<string>)
  }

  // Contoh penggunaan:
  // const itemsList = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank", "a", "b", "c", "d", "e", "f"];
  // const numGroups = 3;

  // console.log(randomizeGroups(itemsList, numGroups));

  console.log(items);

  return (
    <div className="">
      <DefaultNavbar></DefaultNavbar>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 max-w-[1024px] px-6 w-screen color">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Select isRequired className="max-w-xs" label="Select grouping method" variant="bordered" onSelectionChange={handleGroupingChange}>
              {groupingMethods.map((method, index) => (
                <SelectItem key={index}>{method}</SelectItem>
              ))}
            </Select>
          </div>
          <div key="bordered" className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">

            <Form className="flex-row flex items-end w-full" onSubmit={form.handleSubmit(handleCreateItem)}>
              <Input onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreateItem();
                }
              }}
                label="Name" type="text" variant="underlined" placeholder="Enter new item" {...form.register("item")} />
              <Input label="Number of Groups" type="text" variant="underlined" placeholder="0" {...form.register("groupNum")} className={`w-1/6 ${!selectedGroupingKey.has("0") ? "hidden" : ""}`} />
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
              selectedKeys={selectedItemKeys}
              onSelectionChange={(keys) => setSelectedItemKeys(keys as Set<string>)}
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
                      <Checkbox isDisabled={!selectedGroupingKey.has("1")} key={item.name} size="md" icon={<Crown />} color="warning" defaultChecked={false}
                        onChange={() => {
                          setItems((prev) =>
                            prev.map((prevItem) =>
                              prevItem.name === item.name ? { ...prevItem, isLeader: !prevItem.isLeader } : prevItem
                            )
                          );
                        }}
                      >
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
