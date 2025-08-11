import Navbar from "@/components/Navbar";
import { addToast, Button, Card, CardBody, CardHeader, Checkbox, Divider, Form, Input, Radio, RadioGroup, Select, SelectItem, SharedSelection } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { Plus, Crown, Trash, Dices, Mars, Venus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import generateShortID from "@/utils/generateShortId";
import { Item, Separator } from "@/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import Head from "next/head";
import { motion } from "framer-motion"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@/contexts/TranslationContext";
import Footer from "@/components/Footer";
import { useRandomizer } from "@/hooks/useRandomizer";
import DownloadDropdown from "@/components/DownloadDropdown";
// import dummyMembers from "@/data/dummyMembers.json";



const randomizeGroupSchema = z.object({
  groupMode: z.enum(["0", "1"], { message: "please select one of the grouping mode" }),
  groupNum: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.groupMode === "0") {
    // if (!data.groupNum) {
    //   ctx.addIssue({
    //     code: "custom",
    //     path: ["groupNum"],
    //     message: "Group number is required when group mode is 0",
    //   });
    // } 
    if (Number(data.groupNum) <= 1) {
      ctx.addIssue({
        code: "custom",
        path: ["groupNum"],
        message: "There are must be at least 2 groups",
      });
    }
  }
});

const createMemberSchema = z.object({
  memberName: z.string({ message: "Input must be a string" }).trim().nonempty({ message: "Please type something dude" }),
  separator: z.enum(["0", "1", "2", "3", "4"])
})
type CreateMemberSchema = z.infer<typeof createMemberSchema>;

type RandomizeGroupSchema = z.infer<typeof randomizeGroupSchema>;




export default function Home() {

  const { text } = useTranslation();

  const createMemberForm = useForm<CreateMemberSchema>({
    resolver: zodResolver(createMemberSchema),
  });

  const randomizeGroupForm = useForm<RandomizeGroupSchema>({
    resolver: zodResolver(randomizeGroupSchema)
  })

  const { groups, isRandomizing, randomize } = useRandomizer();

  const boardRef = useRef<HTMLDivElement>(null);
  const boardTitleRef = useRef<HTMLDivElement>(null);

  const [shuffleKey, setShuffleKey] = useState(0);
  const [isGenderFair, setIsGenderFair] = useState(false);
  const [inputSeparator, setInputSeparator] = useState<Separator>(null);
  const [selectedItemKeys, setSelectedItemKeys] = useState<Set<string> | "all">(new Set());
  const [selectedGroupingKey, setSelectedGroupingKey] = useState<Set<string>>(new Set(["0"]));
  const [boardTitle, setBoardTitle] = useState<string>("Randus Board");
  const [items, setItems] = useState<Item[]>([]);


  useEffect(() => {
    const storedItems = localStorage.getItem("randus-items");
    if (storedItems) {
      setItems(JSON.parse(storedItems) as Item[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("randus-items", JSON.stringify(items));
  }, [items]);

    useEffect(() => {
    if (boardTitleRef.current) {
      boardTitleRef.current.textContent = boardTitle;
    }
  }, []); 

  const handleDeleteItem = () => {
    if (selectedItemKeys !== "all" && selectedItemKeys.size !== 0) {

      setItems((prevItems) => prevItems.filter((item) => !selectedItemKeys.has(item.key)));
      addToast({
        title: "Member(s) deleted successfully",
        shouldShowTimeoutProgress: true,
        timeout: 2000,
        color: "success"
      })
    } else {
      setItems([]);
      addToast({
        title: "All members deleted successfully",
        shouldShowTimeoutProgress: true,
        timeout: 2000,
        color: "success"
      })
    }
    setSelectedItemKeys(new Set());


  }
  const handleCreateItem = () => {

    if (inputSeparator) {
      const newItems: Item[] = createMemberForm.getValues("memberName").split(inputSeparator).map((name) => {
        return { key: generateShortID(), name: name.trim(), isLeader: false, gender: null };
      });
      setItems((prev) => prev ? [...prev, ...newItems] : [...newItems]);
      createMemberForm.setFocus("memberName");
      createMemberForm.setValue("memberName", "");
      addToast({
        title: "Members added successfully",
        shouldShowTimeoutProgress: true,
        timeout: 2000,
        color: "success"
      })
    } else {
      const newItem: Item = { key: generateShortID(), name: createMemberForm.getValues("memberName"), isLeader: false, gender: null };
      setItems((prev) => prev ? [...prev, newItem] : [newItem]);
      createMemberForm.setFocus("memberName");
      createMemberForm.setValue("memberName", "");
      addToast({
        title: "Member added successfully",
        shouldShowTimeoutProgress: true,
        timeout: 2000,
        color: "success"
      })
    }

  }

  const handleGroupingChange = (key: SharedSelection) => {
    setSelectedGroupingKey(key as Set<string>)
  }

  const handleSeparatorChange = (key: SharedSelection) => {
    const selectedKey: string = Array.isArray(key) ? key[0] : key === "all" ? "0" : [...key][0];
    const separatorMap: Record<string, Separator> = {
      "0": null,
      "1": ",",
      "2": " ",
      "3": ";",
      "4": "|",
    };
    setInputSeparator(separatorMap[selectedKey] ?? null);
  };


  const handleRandomizeClick = () => {
    if (totalLeaders < 2 && selectedGroupingKey.has("1")) {
      addToast({
        title: "there are should be at least 2 leaders",
        shouldShowTimeoutProgress: true,
        timeout: 4000,
        color: "danger"
      })
      return;
    }
    if (genderNulls && isGenderFair) {
      addToast({
        title: "Gender selection is required for all members",
        shouldShowTimeoutProgress: true,
        timeout: 4000,
        color: "warning"
      })
      return;
    }
    setShuffleKey((prevKey) => prevKey + 1);

    const groupNum = Number(randomizeGroupForm.watch("groupNum"));
    if (selectedGroupingKey.has("0")) {
      randomize(items, groupNum, "group by number input", isGenderFair);
    } else if (selectedGroupingKey.has("1")) {
      randomize(items, totalLeaders, "group by leaders", isGenderFair);
    }

    requestAnimationFrame(() => {
      const editableTitle = boardTitleRef.current;
      if (editableTitle) {
        editableTitle.focus();
      }
    })

  };
  const handleGenderFairChange = () => {
    setIsGenderFair((prevStatus) => !prevStatus);
  }

  const handleTitleChange = () => {
    setBoardTitle(boardTitleRef.current?.textContent || "");
  }

  const totalLeaders = items.filter((item) => item.isLeader === true).length;
  const genderNulls = items.filter((item) => item.gender === null).length;

  return (
    <>
      <Head>
        <title>
          Randus
        </title>
        <link rel="icon" href="/randus-logo.ico" sizes="any" />
      </Head>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 max-w-[1024px] px-6 w-screen color">
          <div className="flex w-full justify-between flex-wrap md:flex-nowrap gap-4">
            <div className="">
              <Select errorMessage="please select one of the grouping mode" defaultSelectedKeys="0" isRequired className="max-w-56" label="Select grouping method" variant="bordered" onSelectionChange={handleGroupingChange} {...randomizeGroupForm.register("groupMode")}>
                <SelectItem key="0">{text.grouping_method_1}</SelectItem>
                <SelectItem key="1">{text.grouping_method_2}</SelectItem>
              </Select>
              <div className="flex flex-col gap-2  mt-2">
                <Checkbox onChange={(handleGenderFairChange)}>{text.gender_fair_dist}</Checkbox>
              </div>
            </div>
            <Input isInvalid={randomizeGroupForm.formState.errors.groupNum ? true : false} errorMessage={randomizeGroupForm.formState.errors.groupNum?.message} isDisabled={!selectedGroupingKey.has("0")} label={text.group_num} type="number" variant="bordered" placeholder="0" {...randomizeGroupForm.register("groupNum")} className="w-40" isRequired />

          </div>
          <div key="bordered" className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
            <Form className="mt-4 flex flex-col w-full gap-0" onSubmit={createMemberForm.handleSubmit(handleCreateItem)}>
              <Select errorMessage="please select one of the separator" defaultSelectedKeys="0" className="max-w-56" label="Select multiple input separator" variant="bordered" onSelectionChange={handleSeparatorChange} {...createMemberForm.register("separator")} isRequired>
                <SelectItem key="0">{text.separators.none}</SelectItem>
                <SelectItem key="1">{text.separators.comma}</SelectItem>
                <SelectItem key="2">{text.separators.space}</SelectItem>
                <SelectItem key="3">{text.separators.semicolon}</SelectItem>
                <SelectItem key="4">{text.separators.pipe}</SelectItem>
              </Select>
              <div className="flex flex-row items-end w-full gap-2">
                <Controller
                  name="memberName"
                  control={createMemberForm.control}
                  render={({ field }) => (
                    <Input
                      isInvalid={createMemberForm.formState.errors.memberName ? true : false}
                      errorMessage={createMemberForm.formState.errors.memberName?.message}
                      {...field}
                      label={text.table.name}
                      type="text"
                      variant="underlined"
                      placeholder={text.new_member}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          createMemberForm.handleSubmit(handleCreateItem)();
                        }
                      }}
                    />
                  )}
                />
                <section className="flex items-end gap-2">
                  <Button type="submit" isIconOnly variant="solid" size="md" color="primary">
                    <Plus></Plus>
                  </Button>
                  <Button isDisabled={selectedItemKeys !== "all" && selectedItemKeys.size === 0} onPress={handleDeleteItem} isIconOnly variant="solid" size="md" color="danger">
                    <Trash></Trash>
                  </Button>
                </section>
              </div>
            </Form>
          </div>
          <div className="flex flex-col max-w-[1024px]">
            <div className="overflow-auto">
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
                    {text.table.name}
                  </TableColumn>
                  <TableColumn>
                    Status
                  </TableColumn>
                  <TableColumn>
                    Gender
                  </TableColumn>
                </TableHeader>
                <TableBody emptyContent={text.table.empty_table} items={items}>
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
                          {text.leader}
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
                              }}>{text.male}</Radio>
                            <Radio value="female"
                              onChange={() => {
                                setItems((prev) =>
                                  prev.map((prevItem) =>
                                    prevItem.key === item.key ? { ...prevItem, gender: "female" } : prevItem
                                  )
                                );
                              }}
                            >{text.female}</Radio>
                          </div>
                        </RadioGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button onClick={randomizeGroupForm.handleSubmit(handleRandomizeClick)} isLoading={isRandomizing} size="lg" className=" text-white rounded my-8 self-center w-fit bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 font-bold ">
              <Dices className={isRandomizing ? "hidden" : ""} />
              <span>Randomize!</span>
            </Button>

            <div ref={boardRef} className="bg-background rounded-md">
              <div className={`rounded-md text-center flex flex-col justify-start bg-gradient-to-tr from-blue-500/70 to-indigo-600/70 ${groups[0] ? "" : "hidden"}`}>
                <h1 className="text-2xl sm:text-3xl font-bold mt-6 outline-none px-20" ref={boardTitleRef} contentEditable onInput={handleTitleChange}></h1>
                <div key={shuffleKey} className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 grid-cols-1 p-6">
                  {groups.map((group, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <Card isBlurred>
                        <CardHeader>
                          {text.group} {index + 1}
                        </CardHeader>
                        <Divider />
                        <CardBody>
                          {group.leader && (
                            <div className="text-yellow-500 flex justify-between items-center">
                              <p className="font-semibold">{group.leader.name}</p>
                              <Crown size={20} />
                            </div>
                          )}
                          {group.members.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              className="flex justify-between items-center"
                            >
                              <p>{item.name}</p>
                              {isGenderFair &&
                                (item.gender === "male" ? <Mars size={20} className="text-blue-500" /> :
                                  item.gender === "female" ? <Venus size={20} className="text-pink-500" /> : "")
                              }
                            </motion.div>
                          ))}
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <DownloadDropdown targetElement={boardRef.current!} isGroupExist={!!groups[0]} boardTitle={boardTitle}></DownloadDropdown>

          </div>
        </div>
      </div>
      <Footer />
    </>

  );
}