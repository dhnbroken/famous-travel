import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: {
      type: String,
    },
    longitude: { type: Number },
    latitude: { type: Number },
    photoPath: { type: String },
  },
  {
    timestamps: true,
  },
);

const LocationModel = mongoose.model('Location', LocationSchema);
export default LocationModel;
