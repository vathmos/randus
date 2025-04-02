import DefaultNavbar from "@/components/Navbar";
import { Button, Card, CardBody, CardHeader, Checkbox, Divider, Form, Input, Radio, RadioGroup, Select, SelectItem, SharedSelection } from "@heroui/react";
import { useState } from "react";
import { Plus, Crown, Trash, Dices, Mars, Venus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import randomizeGroups from "@/utils/randomizeGroups";
import { Group, Item } from "@/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import Link from "next/link";
import { useTheme } from "next-themes";



export default function Home() {

  function generateShortID(length = 6): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }


  const { theme } = useTheme();

  const form = useForm();

  const [isGenderFair, setIsGenderFair] = useState(false);
  const [isRandomizeLoading, setIsRandomizeLoading] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedItemKeys, setSelectedItemKeys] = useState<Set<string> | "all">(new Set());
  const [selectedGroupingKey, setSelectedGroupingKey] = useState<Set<string>>(new Set(["0"]));

  const dummyItems: Item[] = [];
  // const dummyItems: Item[] = [
  //   { key: "1", name: "John", isLeader: false, gender: "male" },
  //   { key: "2", name: "Emma", isLeader: false, gender: "female" },
  //   { key: "3", name: "Michael", isLeader: false, gender: "male" },
  //   { key: "4", name: "Olivia", isLeader: false, gender: "female" },
  //   { key: "5", name: "James", isLeader: false, gender: "male" },
  //   { key: "6", name: "Sophia", isLeader: false, gender: "female" },
  //   { key: "7", name: "William", isLeader: false, gender: "male" },
  //   { key: "8", name: "Isabella", isLeader: false, gender: "female" },
  //   { key: "9", name: "Benjamin", isLeader: false, gender: "male" },
  //   { key: "10", name: "Mia", isLeader: false, gender: "female" },
  //   { key: "11", name: "Daniel", isLeader: false, gender: "male" },
  //   { key: "12", name: "Charlotte", isLeader: false, gender: "female" },
  //   { key: "13", name: "Henry", isLeader: false, gender: "male" },
  //   { key: "14", name: "Amelia", isLeader: false, gender: "female" },
  //   { key: "15", name: "Matthew", isLeader: false, gender: "male" },
  //   { key: "16", name: "Harper", isLeader: false, gender: "female" },
  //   { key: "17", name: "Joseph", isLeader: false, gender: "male" },
  //   { key: "18", name: "Evelyn", isLeader: false, gender: "female" },
  //   { key: "19", name: "Samuel", isLeader: false, gender: "male" },
  //   { key: "20", name: "Abigail", isLeader: false, gender: "female" },
  //   { key: "21", name: "David", isLeader: false, gender: "male" },
  //   { key: "22", name: "Ella", isLeader: false, gender: "female" },
  //   { key: "23", name: "Christopher", isLeader: false, gender: "male" },
  //   { key: "24", name: "Scarlett", isLeader: false, gender: "female" },
  //   { key: "25", name: "Andrew", isLeader: false, gender: "male" },
  //   { key: "26", name: "Grace", isLeader: false, gender: "female" },
  //   { key: "27", name: "Joshua", isLeader: false, gender: "male" },
  //   { key: "28", name: "Lily", isLeader: false, gender: "female" },
  //   { key: "29", name: "Ethan", isLeader: false, gender: "male" },
  //   { key: "30", name: "Hannah", isLeader: false, gender: "female" }
  // ];



  const [items, setItems] = useState<Item[]>(dummyItems);


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
    const newItem: Item = { key: generateShortID(), name: form.getValues("item"), isLeader: false, gender: "" };
    setItems((prev) => prev ? [...prev, newItem] : [newItem]);
    form.setFocus("item");
    form.setValue("item", "");
    console.log(items);
  }

  const handleGroupingChange = (key: SharedSelection) => {
    setSelectedGroupingKey(key as Set<string>)
  }

  const handleRandomizeClick = () => {
    setIsRandomizeLoading(true);
    if (selectedGroupingKey.has("0")) {
      setGroups(randomizeGroups(items, form.watch("groupNum"), "group by number input", isGenderFair));
    } else if (selectedGroupingKey.has("1")) {
      setGroups([]);
      setGroups(randomizeGroups(items, totalLeaders, "group by leaders", isGenderFair));
    }
    setIsRandomizeLoading(false);

  }

  const handleGenderFairChange = () => {
    setIsGenderFair((prevStatus) => !prevStatus);
    console.log(isGenderFair);
  }
  // console.log(items);
  // console.log(groups);


  const totalLeaders = items.filter((item) => item.isLeader === true).length;




  return (
    <div className="">
      <DefaultNavbar></DefaultNavbar>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 max-w-[1024px] px-6 w-screen color">
          <div className="flex w-full justify-between flex-wrap md:flex-nowrap gap-4">
            <div className="">
              <Select defaultSelectedKeys="0" isRequired className="max-w-xs" label="Select grouping method" variant="bordered" onSelectionChange={handleGroupingChange}>
                {groupingMethods.map((method, key) => (
                  <SelectItem key={key}>{method}</SelectItem>
                ))}
              </Select>
              <Checkbox className="mt-2" onChange={(handleGenderFairChange)}>Use gender fair distribution</Checkbox>
            </div>
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
                    placeholder="Enter new member"
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
          <div className="flex flex-col max-w-[1024px] overflow-auto">
            <div className="">
              <Table
                removeWrapper
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
                  <TableColumn>
                    Gender
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
                      <TableCell>
                        <RadioGroup isDisabled={!isGenderFair}>
                          <div className="flex sm:flex-row flex-col gap-3">
                            <Radio value="male"
                              onChange={() => {
                                setItems((prev) =>
                                  prev.map((prevItem) =>
                                    prevItem.key === item.key ? { ...prevItem, gender: "male" } : prevItem
                                  )
                                );
                                console.log(items);
                              }}>Male</Radio>
                            <Radio value="female"
                              onChange={() => {
                                setItems((prev) =>
                                  prev.map((prevItem) =>
                                    prevItem.key === item.key ? { ...prevItem, gender: "female" } : prevItem
                                  )
                                );
                                console.log(items);
                              }}
                            >Female</Radio>
                          </div>
                        </RadioGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
                    {group.leader
                      ?
                      <div className="text-yellow-500 flex justify-between items-center">
                        <p className=" font-semibold ">{group.leader.name}</p>
                        <Crown size={20} />
                      </div>
                      : ""}
                    {group.members.map((item, index) => (
                      <div className="flex justify-between items-center" key={index}>
                        <p>{item.name}</p>
                        {isGenderFair ?
                          item.gender === "male" ? <Mars size={20} className="text-blue-500" /> : item.gender === "female" ? <Venus size={20} className="text-pink-500" /> : ""
                          : ""
                        }
                      </div>
                    ))}

                  </CardBody>
                </Card>
              ))}
            </div>

          </div>
        </div>
      </div>
      <footer className="opacity-70 w-full bg-transparent mt-8 flex flex-col items-center justify-center p-10">
        <p className="opacity-70">@ 2025 Vathmos. All rights reserved.</p>
        <div className={`p-2 gap-4 flex invert ${theme === "blurple-light" ? "invert-0" : "invert"}`}>
          <Link href="https://www.instagram.com/vathmos/">
            <svg className="size-[22px] cursor-pointer opacity-70 transition-transform-opacity hover:opacity-100" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" /></svg>
          </Link>
          <Link href="https://github.com/vathmos">
            <svg className="size-[22px] cursor-pointer opacity-70 transition-transform-opacity hover:opacity-100" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          </Link>
        </div>

      </footer>
    </div>

  );
}