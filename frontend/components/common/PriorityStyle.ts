export const priorityStyle = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return { background: "#fee2e2", color: "#b91c1c" }; // red
    case "MEDIUM":
      return { background: "#ffedd5", color: "#c2410c" }; // orange
    default:
      return { background: "#f3f4f6", color: "#374151" }; // gray (LOW)
  }
};
