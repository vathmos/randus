import { useState } from "react";
import randomizeGroups from "@/utils/randomizeGroups";
import { addToast } from "@heroui/react";
import { Group, Member } from "@/types";

export const useRandomizer = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isRandomizing, setIsRandomizing] = useState(false);

  const randomize = async (
    members: Member[],
    numGroups: number,
    mode: "group by number input" | "group by leaders",
    balanceGender: boolean

  ) => {
    setIsRandomizing(true);
    try {
      const newGroups = randomizeGroups(
        members,
        numGroups,
        mode,
        balanceGender
      );

      setGroups(newGroups);
    } catch(error) {
      addToast({
        title: `${error}`,
        shouldShowTimeoutProgress: true,
        timeout: 4000,
        color: "danger"
      })
    } finally {
      setIsRandomizing(false);
    }
  };

  return {
    groups,
    randomize,
    isRandomizing,
  };
};
