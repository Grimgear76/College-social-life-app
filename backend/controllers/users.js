import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message});
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
    );
    res.status(200).json(formattedFriends);
    } catch(err){
        res.status(404).json({ message: err.message});
    }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: "User not found" });
        }

        const userIdStr = user._id.toString();
        const friendIdStr = friend._id.toString();

        if (user.friends.map(f => f.toString()).includes(friendIdStr)) {
            // REMOVE FRIEND
            user.friends = user.friends.filter(f => f.toString() !== friendIdStr);
            friend.friends = friend.friends.filter(f => f.toString() !== userIdStr);
        } else {
            // ADD FRIEND
            user.friends.push(friendIdStr);
            friend.friends.push(userIdStr);
        }

        await user.save();
        await friend.save();

        // Send updated friend list for logged-in user
        const friends = await Promise.all(
            user.friends.map(fid => User.findById(fid))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, picturePath }) => ({
                _id,
                firstName,
                lastName,
                picturePath,
            })
        );

        res.status(200).json(formattedFriends);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
