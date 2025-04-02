import { Member, Group } from "@/types";

function randomizeGroups(
  members: Member[], 
  numGroups: number, 
  mode: "group by number input" | "group by leaders" = "group by leaders",
  balanceGender: boolean = false
): Group[] {
  if (numGroups <= 0) throw new Error("Number of groups must be at least 1");

  // Shuffle members list
  const shuffled = [...members].sort(() => Math.random() - 0.5);

  // Separate leaders and non-leaders
  const leaders = shuffled.filter(m => m.isLeader);
  const nonLeaders = shuffled.filter(m => !m.isLeader);

  // Initialize empty groups
  const groups: Group[] = Array.from({ length: numGroups }, () => ({ leader: null, members: [] }));

  if (mode === "group by leaders") {
    // **Distribute leaders first**
    leaders.forEach((leader, i) => {
      groups[i % numGroups].leader = leader;
    });

    if (balanceGender) {
      const males = nonLeaders.filter(m => m.gender === "male");
      const females = nonLeaders.filter(m => m.gender === "female");

      const maleCountInGroups = new Array(numGroups).fill(0);
      const femaleCountInGroups = new Array(numGroups).fill(0);

      groups.forEach((group, i) => {
        if (group.leader?.gender === "male") maleCountInGroups[i]++;
        if (group.leader?.gender === "female") femaleCountInGroups[i]++;
      });

      const totalPeople = members.length;
      const avgGroupSize = Math.floor(totalPeople / numGroups);
      const remainder = totalPeople % numGroups;

      for (let i = 0; i < numGroups; i++) {
        const targetGroupSize = avgGroupSize + (i < remainder ? 1 : 0);

        while (groups[i].members.length + (groups[i].leader ? 1 : 0) < targetGroupSize) {
          if (maleCountInGroups[i] <= femaleCountInGroups[i] && males.length > 0) {
            groups[i].members.push(males.pop()!);
            maleCountInGroups[i]++;
          } else if (females.length > 0) {
            groups[i].members.push(females.pop()!);
            femaleCountInGroups[i]++;
          } else {
            groups[i].members.push(males.pop()!);
          }
        }
      }
    } else {
      let groupIndex = 0;
      nonLeaders.forEach(member => {
        groups[groupIndex].members.push(member);
        groupIndex = (groupIndex + 1) % numGroups;
      });
    }
  } else {
    // **Fix for "group by number input" mode**
    if (balanceGender) {
      const males = shuffled.filter(m => m.gender === "male");
      const females = shuffled.filter(m => m.gender === "female");

      const avgGroupSize = Math.floor(members.length / numGroups);
      const remainder = members.length % numGroups;

      for (let i = 0; i < numGroups; i++) {
        const targetGroupSize = avgGroupSize + (i < remainder ? 1 : 0);

        while (groups[i].members.length < targetGroupSize) {
          if (males.length > females.length && males.length > 0) {
            groups[i].members.push(males.pop()!);
          } else if (females.length > 0) {
            groups[i].members.push(females.pop()!);
          } else {
            groups[i].members.push(males.pop()!);
          }
        }
      }
    } else {
      let groupIndex = 0;
      shuffled.forEach(member => {
        groups[groupIndex].members.push(member);
        groupIndex = (groupIndex + 1) % numGroups;
      });
    }
  }

  // **Sort each group's members (females first, then males)**
  groups.forEach(group => {
    group.members.sort((a) => (a.gender === "female" ? -1 : 1));
  });

  // **If mode is "group by number input", return without leaders**
  if (mode === "group by number input") {
    return groups.map(group => ({
      leader: null, 
      members: group.members.map(m => ({ name: m.name, gender: m.gender, isLeader: false }))
    }));
  }

  return groups;
}


export default randomizeGroups;