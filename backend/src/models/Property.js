import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a property title"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    type: {
      type: String,
      enum: ["house", "apartment", "condo", "townhouse", "land", "commercial"],
      required: true,
    },
    features: {
      bedrooms: {
        type: Number,
        required: true,
      },
      bathrooms: {
        type: Number,
        required: true,
      },
      squareFeet: {
        type: Number,
        required: true,
      },
      yearBuilt: Number,
      parking: {
        type: Number,
        default: 0,
      },
      hasPool: {
        type: Boolean,
        default: false,
      },
      hasGarden: {
        type: Boolean,
        default: false,
      },
    },
    images: [
      {
        url: String,
        caption: String,
      },
    ],
    agent: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "pending"],
      default: "available",
    },
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

PropertySchema.index({ "location.city": 1, type: 1, price: 1 });

export default mongoose.model("Property", PropertySchema);
