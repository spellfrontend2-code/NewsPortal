const avatarColors = [
  "from-red-500 to-red-400",
  "from-orange-500 to-orange-400",
  "from-yellow-500 to-yellow-400",
  "from-green-500 to-green-400",
  "from-teal-500 to-teal-400",
  "from-blue-500 to-blue-400",
  "from-indigo-500 to-indigo-400",
  "from-violet-500 to-violet-400",
  "from-pink-500 to-pink-400",
];

export function getAvatarColor(userId: number | string) {
  const id = Number(userId);
  const index = id % avatarColors.length;
  return avatarColors[index];
}