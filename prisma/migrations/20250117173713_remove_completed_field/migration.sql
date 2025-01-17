-- Step 1: Update "status" based on the "completed" field
UPDATE "Todo" SET "status" = 'completed' WHERE "completed" = true;
UPDATE "Todo" SET "status" = 'pending' WHERE "completed" = false;

-- Step 2: Drop the "completed" column
ALTER TABLE "Todo" DROP COLUMN "completed";
