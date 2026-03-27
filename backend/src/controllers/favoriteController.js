import User from "../models/User.js";

export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      data: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.favorites.includes(req.params.propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Property already in favorites",
      });
    }

    user.favorites.push(req.params.propertyId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Property added to favorites",
      data: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.params.propertyId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: "Property removed from favorites",
      data: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};
