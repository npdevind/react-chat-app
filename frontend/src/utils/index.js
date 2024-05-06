export const getRandomEmoji = () => {
  // Array of emojis
  const emojis = [
    "😀",
    "😂",
    "😍",
    "🥳",
    "😎",
    "🤩",
    "😊",
    "😜",
    "😇",
    "🤗",
    "😘",
    "🤔",
    "🤨",
    "😴",
    "😄",
    "🥰",
    "🤣",
    "😋",
    "😛",
    "😝",
    "😆",
    "🤓",
    "😉",
    "😁",
    "😬",
    "😏",
    "😶‍🌫️",
    "😺",
    "🙈",
    "🙊",
    "💩",
  ];

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * emojis.length);

  // Return the randomly selected emoji
  return emojis[randomIndex];
};

export const getHoursAndMinutes = (createdAt) => {
  // Convert createdAt string to Date object
  const createdDate = new Date(createdAt);

  // Extract hours and minutes
  let hours = createdDate.getHours();
  let minutes = createdDate.getMinutes();

  hours = hours % 12;

  const ampm = hours > 12 ? "AM" : "PM";

  if (hours.toString().length === 1) hours = "0" + hours;
  if (minutes.toString().length === 1) minutes = "0" + minutes;

  return `${hours}:${minutes} ${ampm}`;
};
