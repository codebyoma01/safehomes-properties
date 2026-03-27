import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";
import Property from "./models/Property.js";
import connectDB from "./config/database.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();
    console.log("🔄 Clearing existing data...");

    await User.deleteMany({});
    await Property.deleteMany({});

    console.log("👤 Creating sample users...");

    const agent1 = await User.create({
      name: "Jane Smith",
      email: "jane@safehome.com",
      password: "SecurePass123",
      role: "agent",
      phone: "(555) 123-4567",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    });

    const agent2 = await User.create({
      name: "Mike Johnson",
      email: "mike@safehome.com",
      password: "SecurePass123",
      role: "agent",
      phone: "(555) 987-6543",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    });

    await User.create({
      name: "John Buyer",
      email: "buyer@safehome.com",
      password: "SecurePass123",
      role: "user",
      phone: "(555) 111-2222",
    });

    console.log("🏠 Creating sample properties...");

    const sampleProperties = [
      {
        title: "Modern Family House with Pool",
        description:
          "Beautiful 4-bedroom family home nestled in a quiet neighborhood. Features a spacious backyard with a heated swimming pool, perfectly maintained landscaping, and a state-of-the-art kitchen.",
        price: 549000,
        location: {
          address: "123 Maple Street",
          city: "Springfield",
          state: "Illinois",
          zipCode: "62701",
          coordinates: {
            latitude: 39.7817,
            longitude: -89.6501,
          },
        },
        type: "house",
        features: {
          bedrooms: 4,
          bathrooms: 3,
          squareFeet: 2800,
          yearBuilt: 2018,
          parking: 2,
          hasPool: true,
          hasGarden: true,
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800",
            caption: "Front exterior view",
          },
          {
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
            caption: "Living room",
          },
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
            caption: "Kitchen",
          },
          {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            caption: "Backyard pool",
          },
        ],
        agent: agent1._id,
        status: "available",
        views: 245,
        rating: 4.8,
      },
      {
        title: "Luxury Downtown Penthouse",
        description:
          "Stunning 3-bedroom penthouse with panoramic city views. Located in the heart of downtown with easy access to restaurants, shopping, and entertainment.",
        price: 725000,
        location: {
          address: "789 Main Street, Suite 45B",
          city: "Chicago",
          state: "Illinois",
          zipCode: "60616",
          coordinates: {
            latitude: 41.8819,
            longitude: -87.6278,
          },
        },
        type: "apartment",
        features: {
          bedrooms: 3,
          bathrooms: 2.5,
          squareFeet: 1900,
          yearBuilt: 2020,
          parking: 1,
          hasPool: false,
          hasGarden: false,
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
            caption: "Main living area",
          },
          {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            caption: "Modern kitchen",
          },
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
            caption: "Master bedroom",
          },
          {
            url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
            caption: "City views",
          },
        ],
        agent: agent2._id,
        status: "available",
        views: 512,
        rating: 4.9,
      },
      {
        title: "Cozy 2-Bedroom Condo",
        description:
          "Perfect starter home or investment property. Well-maintained condo with updated appliances, hardwood floors, and a modern bathroom.",
        price: 275000,
        location: {
          address: "456 Oak Avenue",
          city: "Naperville",
          state: "Illinois",
          zipCode: "60540",
          coordinates: {
            latitude: 41.7658,
            longitude: -88.1515,
          },
        },
        type: "condo",
        features: {
          bedrooms: 2,
          bathrooms: 2,
          squareFeet: 1100,
          yearBuilt: 2015,
          parking: 1,
          hasPool: false,
          hasGarden: false,
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1576941160550-2173dba999ef?w=800",
            caption: "Front view",
          },
          {
            url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
            caption: "Living room",
          },
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
            caption: "Kitchen",
          },
        ],
        agent: agent1._id,
        status: "available",
        views: 189,
        rating: 4.6,
      },
      {
        title: "Spacious Townhouse near Parks",
        description:
          "Charming 3-story townhouse with modern finishes. Located near beautiful parks and excellent schools. Great for families!",
        price: 395000,
        location: {
          address: "321 Elm Boulevard",
          city: "Aurora",
          state: "Illinois",
          zipCode: "60505",
          coordinates: {
            latitude: 41.7606,
            longitude: -88.2434,
          },
        },
        type: "townhouse",
        features: {
          bedrooms: 3,
          bathrooms: 2.5,
          squareFeet: 1600,
          yearBuilt: 2019,
          parking: 2,
          hasPool: false,
          hasGarden: true,
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800",
            caption: "Street view",
          },
          {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            caption: "Living area",
          },
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
            caption: "Kitchen",
          },
        ],
        agent: agent2._id,
        status: "available",
        views: 156,
        rating: 4.7,
      },
      {
        title: "Luxury 5-Bedroom Estate",
        description:
          "Grand mansion on 2 acres of pristine grounds. Features a tennis court, guest house, home theater, and wine cellar. Perfect for luxury living.",
        price: 1200000,
        location: {
          address: "555 Prestige Lane",
          city: "Hinsdale",
          state: "Illinois",
          zipCode: "60521",
          coordinates: {
            latitude: 41.8078,
            longitude: -87.9549,
          },
        },
        type: "house",
        features: {
          bedrooms: 5,
          bathrooms: 4,
          squareFeet: 5500,
          yearBuilt: 2010,
          parking: 3,
          hasPool: true,
          hasGarden: true,
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800",
            caption: "Exterior",
          },
          {
            url: "https://images.unsplash.com/photo-1616394584534-60b60dba6fff?w=800",
            caption: "Grand foyer",
          },
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
            caption: "Gourmet kitchen",
          },
          {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            caption: "Master suite",
          },
        ],
        agent: agent1._id,
        status: "available",
        views: 678,
        rating: 4.95,
      },
      {
        title: "Affordable 1-Bedroom Apartment",
        description:
          "Budget-friendly apartment perfect for young professionals. Close to public transportation and local businesses. Move-in ready!",
        price: 165000,
        location: {
          address: "234 Pine Road",
          city: "Cicero",
          state: "Illinois",
          zipCode: "60804",
          coordinates: {
            latitude: 41.8523,
            longitude: -87.7517,
          },
        },
        type: "apartment",
        features: {
          bedrooms: 1,
          bathrooms: 1,
          squareFeet: 650,
          yearBuilt: 2012,
          parking: 0,
          hasPool: false,
          hasGarden: false,
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
            caption: "Studio view",
          },
          {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
            caption: "Kitchen",
          },
        ],
        agent: agent2._id,
        status: "available",
        views: 234,
        rating: 4.4,
      },
    ];

    await Property.insertMany(sampleProperties);

    console.log("✅ Database seeded successfully!");
    console.log("\n📋 Sample Login Credentials:");
    console.log("━━━━━━━━━━━━���━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Agent Account:");
    console.log("  Email: jane@safehome.com");
    console.log("  Password: SecurePass123");
    console.log("");
    console.log("User Account:");
    console.log("  Email: buyer@safehome.com");
    console.log("  Password: SecurePass123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seed();
