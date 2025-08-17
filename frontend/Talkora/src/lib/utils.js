export const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export function formatNotificationTime(timestamp) {
  if (!timestamp) return "";

  const now = new Date();
  const created = new Date(timestamp);

  const diffMs = now - created; // difference in milliseconds
  const diffMinutes = Math.floor(diffMs / 1000 / 60);

  if (diffMinutes < 5) {
    return "Recently";
  }

  return created.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
