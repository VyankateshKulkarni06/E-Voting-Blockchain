// const { User, Election } = require("../models/schema/User");

// const activeElectionsAdmin = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     // 1. Find user by ID
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // 2. Get community keys from both admin and user roles
//     const communityKeys = [
//       ...user.communities.admin.map((c) => c.community_key)
//     ];

//     // 3. Find all active elections matching any of these community keys
//     const elections = await Election.find({
//       community_key: { $in: communityKeys },
//       status: "active",
//     });
//     console.log(elections);
//     res.status(200).json({ elections });
//   } catch (err) {
//     console.error("❌ Error fetching active elections for user:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export default activeElectionsAdmin;

const { User, Election, MapCollection } = require("../models/schema/User");

const activeElectionsAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const communityKeys = user.communities.admin.map((c) => c.community_key);

    const result = await Promise.all(
      communityKeys.map(async (key) => {
        const elections = await Election.find({ community_key: key, status: "active" });
        const community = await MapCollection.findOne({ key });
        return {
          community_key: key,
          community_name: community?.collectionName || "Unknown",
          elections
        };
      })
    );

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error fetching active elections for admin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default activeElectionsAdmin;


// ---------------------------------- Sample frontend data -------------------------- //
// [
//     {
//       "community_key": "abc123",
//       "community_name": "PICT Elections",
//       "elections": [
//         {
//           "_id": "election1",
//           "electionName": "CR Election",
//           "status": "active",
//           ...
//         }
//       ]
//     },
//     ...
//   ]
// ---------------------------------------------------------------------------------- //