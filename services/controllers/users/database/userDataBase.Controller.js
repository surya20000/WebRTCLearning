import User from "../../../models/User.Schema.js";

export const handleUpdateUserProfile = async (req, res) => {
  try {
    const _id = req.params.id;

    if (_id) {
      const foundUser = await User.findById({ _id });
      if (!foundUser) {
        res.status(204).json({ message: "No Such User Exist" });
        return;
      }
      const updatedUser = await User.findByIdAndUpdate({ _id }, req.body, {
        new: true,
      });
      res.status(200).json({ user: updatedUser });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
