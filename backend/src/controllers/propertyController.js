import Property from "../models/Property.js";

export const getProperties = async (req, res, next) => {
  try {
    const {
      location,
      type,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
    } = req.query;

    let filter = { status: "available" };

    if (location) {
      filter["location.city"] = { $regex: location, $options: "i" };
    }

    if (type) {
      filter.type = type;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const properties = await Property.find(filter)
      .populate("agent", "name phone email")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Property.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      pages: Math.ceil(total / limit),
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("agent", "name phone email profileImage");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req, res, next) => {
  try {
    const { title, description, price, location, type, features, images } =
      req.body;

    if (!title || !description || !price || !location || !type || !features) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const property = await Property.create({
      title,
      description,
      price,
      location,
      type,
      features,
      images: images || [],
      agent: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (
      property.agent.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this property",
      });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (
      property.agent.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this property",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
