import { Db } from "mongodb";
import { ObjectId } from "bson";

module.exports = {
  async up(db: Db) {
    await db.collection("gardens").updateMany({}, { $set: { deviceCount: 0 } });

    const listGardenWithDeviceCount = await db
      .collection("devices")
      .aggregate([
        { $match: {} },
        { $group: { _id: "$gardenId", totalDeviceCount: { $sum: 1 } } },
      ])
      .toArray();

    await Promise.all([
      listGardenWithDeviceCount.map(async (garden) => {
        await db
          .collection("gardens")
          .updateOne(
            { _id: new ObjectId(garden._id) },
            { $set: { deviceCount: garden.totalDeviceCount } }
          );
      }),
    ]);
  },

  async down(db: Db) {
    await db.collection("gardens").updateMany({}, { $de: { deviceCount: "" } });
  },
};
