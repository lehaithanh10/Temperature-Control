import { Db } from "mongodb";

module.exports = {
  async up(db: Db) {
    console.log("run");
    const newDevices = await db.collection("devices").aggregate([
      { $addFields: { objectIdGardenId: { $toObjectId: "$gardenId" } } },
      {
        $lookup: {
          from: "gardens",
          localField: "objectIdGardenId",
          foreignField: "_id",
          as: "garden",
        },
      },
      {
        $set: {
          userId: {
            $arrayElemAt: ["$garden.userId", 0],
          },
        },
      },
      {
        $merge: {
          into: "new-devices",
          whenMatched: "replace",
          whenNotMatched: "insert",
        },
      },
    ]);

    await newDevices.toArray();

    const mergeDevices = await db.collection("new-devices").aggregate([
      { $unset: ["garden", "objectIdGardenId"] },
      {
        $merge: {
          into: "devices",
          on: "_id",
          whenMatched: "replace",
          whenNotMatched: "discard",
        },
      },
    ]);

    await mergeDevices.toArray();
    await db.collection("new-devices").drop();
  },

  async down(db: Db) {
    await db.collection("orders").updateMany({}, { $unset: { userId: "" } });
  },
};
