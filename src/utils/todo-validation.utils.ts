export const validateTodoStatus = (status?: string): void => {
  const validStatuses = ["pending", "completed", "expired"];
  if (status && !validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }
};
