import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    console.log(user.friends);
    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
};

// UPDATE

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ error: "User or friend not found." });
    }
    const isFriend = user.friends.includes(friendId);
    if (isFriend) {
      console.log("follwing");
      user.friends = user.friends.filter((f) => f.toString() !== friendId);
      // Remove user from friend's friends list
      friend.friends = friend.friends.filter((u) => u.toString() !== id);
    } else {
      console.log("guest");
      user.friends.push(friendId);
      // Add user to friend's friends list
      friend.friends.push(id);
    }

    const friends = await Promise.all([user.save(), friend.save()]);

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
};
