import cron from "node-cron";
import { prisma } from "../utils/prisma-client.utils";

const expireTodos = async () => {
  console.log("Running expire todos job...");

  try {
    const now = new Date();
    const expiredTodos = await prisma.todo.updateMany({
      where: {
        status: "pending",
        expiresAt: { lte: now },
      },
      data: { status: "expired" },
    });

    console.log(`${expiredTodos.count} todos expired.`);
  } catch (error) {
    console.error("Error expiring todos:", error);
  }
};

// run auto expiring todos function every night at 1am
cron.schedule("0 1 * * *", async () => {
  await expireTodos();
  console.log("Scheduled task completed at:", new Date().toLocaleString());
});
