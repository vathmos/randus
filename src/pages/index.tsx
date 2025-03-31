import DefaultNavbar from "@/components/Navbar";
import { Button, Checkbox, Form, Input, Select, SelectItem, SharedSelection } from "@heroui/react";
import { useState } from "react";
import { Plus, Crown, Trash, Dices } from "lucide-react";
import { useForm } from "react-hook-form";
import randomizeGroups from "@/utils/randomizeGroups";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

type Item = {
  key: string,
  name: string,
  isLeader: boolean
}


export default function Home() {

  const form = useForm();




  const [selectedItemKeys, setSelectedItemKeys] = useState<Set<string> | "all">(new Set());
  const [selectedGroupingKey, setSelectedGroupingKey] = useState<Set<string>>(new Set());

  const [items, setItems] = useState<Item[]>([
    ...["John", "Emma", "Michael", "Olivia", "James", "Sophia", "William", "Isabella", "Benjamin", "Mia",
      "Daniel", "Charlotte", "Henry", "Amelia", "Matthew", "Harper", "Joseph", "Evelyn", "Samuel", "Abigail",
      "David", "Ella", "Christopher", "Scarlett", "Andrew", "Grace", "Joshua", "Lily", "Ethan", "Hannah",
      "Nathan", "Aria", "Anthony", "Zoe", "Thomas", "Stella", "Ryan", "Victoria", "Nicholas", "Lucy",
      "Charles", "Lillian", "Jonathan", "Nova", "Christian", "Aurora", "Hunter", "Ellie", "Connor", "Mila",
      "Dylan", "Layla", "Isaac", "Violet", "Caleb", "Hazel", "Luke", "Penelope", "Jack", "Nora"].map((name, index) => ({ key: (index + 1).toString(), name, isLeader: false }))
  ]);

  console.log(selectedItemKeys);

  const itemNames = items.map((item) => item.name);

  // console.log(itemNames);

  const groupingMethods =
    [
      "Group by number input",
      "Group by total leaders"
    ]


  const handleDeleteItem = () => {
    if (selectedItemKeys === "all") {
      setItems([]);
    } else {
      setItems((prevItems) => prevItems.filter((item) => !selectedItemKeys.has(item.key)));
    }
    setSelectedItemKeys(new Set());

  }
  const handleCreateItem = () => {
    const newItem = { key: (items.length + 1).toString(), name: form.getValues("item"), isLeader: false };
    setItems((prev) => prev ? [...prev, newItem] : [newItem]);
    form.setValue("item", "");
    form.setFocus("item");
    form.reset();
  }

  const handleGroupingChange = (key: SharedSelection) => {
    setSelectedGroupingKey(key as Set<string>)
  }

  const handleRandomizeClick = () => {
    console.log(randomizeGroups(itemNames, form.getValues("groupNum")));
  }





  return (
    <div className="">
      <DefaultNavbar></DefaultNavbar>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 max-w-[1024px] px-6 w-screen color">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Select isRequired className="max-w-xs" label="Select grouping method" variant="bordered" onSelectionChange={handleGroupingChange}>
              {groupingMethods.map((method) => (
                <SelectItem key={method}>{method}</SelectItem>
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
              <Input label="Number of Groups" type="text" variant="underlined" placeholder="0" {...form.register("groupNum")} className={`w-1/4 ${!selectedGroupingKey.has("Group by number input") ? "hidden" : ""}`} />
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
            >
              <TableHeader>
                <TableColumn>
                  #
                </TableColumn>
                <TableColumn>
                  Name
                </TableColumn>
                <TableColumn>
                  Status
                </TableColumn>
              </TableHeader>
              <TableBody emptyContent="No items... yet!" items={items}>
                {items.map((item) => (
                  <TableRow key={item.key}>
                    <TableCell>{item.key}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Checkbox isDisabled={!selectedGroupingKey.has("Group by total leaders")} key={item.name} size="md" icon={<Crown />} color="warning" defaultChecked={false}
                        onChange={() => {
                          setItems((prev) =>
                            prev.map((prevItem) =>
                              prevItem.key === item.key ? { ...prevItem, isLeader: !prevItem.isLeader } : prevItem
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
            <Button onPress={handleRandomizeClick} size="lg" className="rounded mt-8 self-center w-fit bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 font-bold ">
              <Dices />
              <span>Randomize!</span>
            </Button>

          </div>
        </div>
      </div>

    </div>

  );
}
