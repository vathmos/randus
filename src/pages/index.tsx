import DefaultNavbar from "@/components/Navbar";
import { Button, Card, CardBody, CardHeader, Checkbox, Divider, Form, Input, Select, SelectItem, SharedSelection } from "@heroui/react";
import { useState } from "react";
import { Plus, Crown, Trash, Dices } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
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

  const [isRandomizeLoading, setIsRandomizeLoading] = useState(false);
  const [groups, setGroups] = useState<string[][]>([]);
  const [selectedItemKeys, setSelectedItemKeys] = useState<Set<string> | "all">(new Set());
  const [selectedGroupingKey, setSelectedGroupingKey] = useState<Set<string>>(new Set(["0"]));

  const dummyItems = [
    ...["John", "Emma", "Michael", "Olivia", "James", "Sophia", "William", "Isabella", "Benjamin", "Mia",
      "Daniel", "Charlotte", "Henry", "Amelia", "Matthew", "Harper", "Joseph", "Evelyn", "Samuel", "Abigail",
      "David", "Ella", "Christopher", "Scarlett", "Andrew", "Grace", "Joshua", "Lily", "Ethan", "Hannah"].map((name, index) => ({ key: (index + 1).toString(), name, isLeader: false }))
  ]

  const [items, setItems] = useState<Item[]>(dummyItems);

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
    form.setFocus("item");
    form.setValue("item","");
  }

  const handleGroupingChange = (key: SharedSelection) => {
    setSelectedGroupingKey(key as Set<string>)
  }

  const handleRandomizeClick = () => {
    setIsRandomizeLoading(true);
    console.log(itemNames, form.watch("groupNum"));
    if (selectedGroupingKey.has("0")) {
      setGroups(randomizeGroups(itemNames, form.watch("groupNum")));
    } else if (selectedGroupingKey.has("1")) {
      setGroups(randomizeGroups(itemNames, totalLeaders));
    }
    setIsRandomizeLoading(false);

  }

  const totalLeaders = items.filter((item) => item.isLeader === true).length;




  return (
    <div className="pb-20">
      <DefaultNavbar></DefaultNavbar>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 max-w-[1024px] px-6 w-screen color">
          <div className="flex w-full justify-between flex-wrap md:flex-nowrap gap-4">
            <Select defaultSelectedKeys="0" isRequired className="max-w-xs" label="Select grouping method" variant="bordered" onSelectionChange={handleGroupingChange}>
              {groupingMethods.map((method, key) => (
                <SelectItem key={key}>{method}</SelectItem>
              ))}
            </Select>
            <Input label="Number of Groups" type="text" variant="bordered" placeholder="0" {...form.register("groupNum")} className={`w-36 ${!selectedGroupingKey.has("0") ? "hidden" : ""}`} />

          </div>
          <div key="bordered" className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">

            <Form className="flex flex-row items-end w-full" onSubmit={form.handleSubmit(handleCreateItem)}>
              <Controller
                name="item"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field} // Spreads field properties for full RHF control
                    label="Name"
                    type="text"
                    variant="underlined"
                    placeholder="Enter new item"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCreateItem();
                      }
                    }}
                  />
                )}
              />
              <section className="flex items-end gap-2">
                <Button type="submit" isIconOnly variant="solid" size="md" color="primary">
                  <Plus></Plus>
                </Button>
                <Button onPress={handleDeleteItem} isIconOnly variant="solid" size="md" color="danger">
                  <Trash></Trash>
                </Button>
              </section>
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
                {items.map((item, index) => (
                  <TableRow key={item.key}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Checkbox isDisabled={!selectedGroupingKey.has("1")} key={item.name} size="md" icon={<Crown />} color="warning" defaultChecked={false}
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
            <Button isLoading={isRandomizeLoading} onPress={handleRandomizeClick} size="lg" className=" text-white rounded my-8 self-center w-fit bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 font-bold ">
              <Dices className={isRandomizeLoading ? "hidden" : ""} />
              <span>Randomize!</span>
            </Button>

            <div className={`grid gap-4 bg-gradient-to-tr  sm:grid-cols-2 md:grid-cols-4 grid-cols-1 from-blue-500/70 to-indigo-600/70 p-6 rounded-md ${groups[0] ? "" : "hidden"}`}>
              {groups.map((group, index) => (
                <Card isBlurred key={index + 1}>
                  <CardHeader>
                    Group {index + 1}
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    {group.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </CardBody>
                </Card>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>

  );
}
