export const statusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return { background: "#dcfce7", color: "#15803d" }; // green
    case "in_progress":
      return { background: "#dbeafe", color: "#1d4ed8" }; // blue
    case "in_review":
      return { background: "#fef9c3", color: "#a16207" }; // yellow
    case "planning":
      return { background: "#e0f2fe", color: "#0369a1" };
    case "on_hold":
      return { background: "#fae8ff", color: "#7e22ce" };
    case "cancelled":
      return { background: "#fee2e2", color: "#b91c1c" };

    default:
      return { background: "#f3f4f6", color: "#374151" }; // gray (TODO)
  }
};
