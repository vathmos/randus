import { Group, Member } from "@/types";

function randomizeGroups(
  members: Member[],
  numGroups: number,
  mode: "group by number input" | "group by leaders" = "group by leaders",
  balanceGender: boolean = false
): Group[] {
  if (numGroups <= 0) throw new Error("Number of groups must be at least 1");

  const shuffled = [...members].sort(() => Math.random() - 0.5);
  const leaders = shuffled.filter(m => m.isLeader);
  const nonLeaders = shuffled.filter(m => !m.isLeader);

  const groups: Group[] = Array.from({ length: numGroups }, () => ({ leader: null, members: [] }));

  if (mode === "group by leaders") {
    // Assign leaders in round-robin
    leaders.forEach((leader, i) => {
      groups[i % numGroups].leader = leader;
    });

    if (balanceGender) {
      const males = nonLeaders.filter(m => m.gender === "male");
      const females = nonLeaders.filter(m => m.gender === "female");

      const totalPeople = members.length;
      const baseSize = Math.floor(totalPeople / numGroups);
      const extra = totalPeople % numGroups;
      const targetSizes = Array.from({ length: numGroups }, (_, i) => baseSize + (i < extra ? 1 : 0));

      const genderRatio = members.filter(m => m.gender === "male").length / totalPeople;

      while (males.length > 0 || females.length > 0) {
        groups.sort((a, b) => (a.members.length + (a.leader ? 1 : 0)) - (b.members.length + (b.leader ? 1 : 0)));

        for (const group of groups) {
          const currentTotal = group.members.length + (group.leader ? 1 : 0);
          const groupIndex = groups.indexOf(group);
          if (currentTotal >= targetSizes[groupIndex]) continue;

          const currentMale = group.members.filter(m => m.gender === "male").length + (group.leader?.gender === "male" ? 1 : 0);
          const currentRatio = currentMale / (currentTotal || 1);

          if ((currentRatio < genderRatio || females.length === 0) && males.length > 0) {
            group.members.push(males.pop()!);
          } else if (females.length > 0) {
            group.members.push(females.pop()!);
          }
        }
      }
    } else {
      let index = 0;
      nonLeaders.forEach(m => {
        groups[index].members.push(m);
        index = (index + 1) % numGroups;
      });
    }

  } else {
    // group by number input
    if (balanceGender) {
      const males = shuffled.filter(m => m.gender === "male");
      const females = shuffled.filter(m => m.gender === "female");

      const totalPeople = members.length;
      const baseSize = Math.floor(totalPeople / numGroups);
      const extra = totalPeople % numGroups;
      const targetSizes = Array.from({ length: numGroups }, (_, i) => baseSize + (i < extra ? 1 : 0));

      const genderRatio = males.length / (males.length + females.length);

      while (males.length > 0 || females.length > 0) {
        groups.sort((a, b) => a.members.length - b.members.length);

        for (const group of groups) {
          const groupIndex = groups.indexOf(group);
          if (group.members.length >= targetSizes[groupIndex]) continue;

          const currentMale = group.members.filter(m => m.gender === "male").length;
          const currentRatio = currentMale / (group.members.length || 1);

          if ((currentRatio < genderRatio || females.length === 0) && males.length > 0) {
            group.members.push(males.pop()!);
          } else if (females.length > 0) {
            group.members.push(females.pop()!);
          }
        }
      }
    } else {
      let index = 0;
      shuffled.forEach(m => {
        groups[index].members.push(m);
        index = (index + 1) % numGroups;
      });
    }

    // ✨ Sort group members (females first)
    groups.forEach(group => {
      group.members.sort((a) => (a.gender === "female" ? -1 : 1));
    });

    // Remove leader in group by number input mode
    return groups.map(g => ({ leader: null, members: g.members }));
  }

  // ✨ Sort group members (females first)
  groups.forEach(g => {
    g.members.sort((a) => (a.gender === "female" ? -1 : 1));
  });

  return groups;
}

export default randomizeGroups;
