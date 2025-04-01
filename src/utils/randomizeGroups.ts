type Member = {
  name: string;
  isLeader: boolean;
};

type Group = {
  leader: Member | null;
  members: Member[];
};

export default function randomizeGroups(members: Member[], numGroups: number, mode: "basic" | "detailed" = "detailed"): Group[] {
  if (numGroups <= 0) throw new Error("Number of groups must be at least 1");

  // Acak urutan anggota menggunakan Fisher-Yates Shuffle
  const shuffled = [...members].sort(() => Math.random() - 0.5);

  // Pisahkan leader & non-leader
  const leaders = shuffled.filter(m => m.isLeader);
  const nonLeaders = shuffled.filter(m => !m.isLeader);

  // Inisialisasi grup kosong
  const groups: Group[] = Array.from({ length: numGroups }, () => ({ leader: null, members: [] }));

  // Distribusikan leader ke grup terlebih dahulu
  leaders.forEach((leader, i) => {
    groups[i % numGroups].leader = leader;
  });

  // Distribusikan non-leader ke dalam grup secara merata
  nonLeaders.forEach((member, i) => {
    groups[i % numGroups].members.push(member);
  });

  // Jika mode "basic", hapus atribut "isLeader" agar output lebih sederhana
  if (mode === "basic") {
    return groups.map(group => ({
      leader: group.leader ? { name: group.leader.name, isLeader: false } : null, 
      members: group.members.map(m => ({ name: m.name, isLeader: false }))
    }));
  }

  return groups;
}
