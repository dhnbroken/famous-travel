// import PostModel from "../models/postModel.js";
import LocationModel from '../models/locationModel.js';
import mongoose from 'mongoose';

// save location

export const saveLocation = async (req, res) => {
  const newPlace = new LocationModel(req.body);
  const { longitude, latitude } = req.body;

  try {
    const oldLocation = await LocationModel.findOne({ longitude, latitude });
    if (oldLocation) return res.status(400).json({ message: 'Location already saved' });

    // if not
    await newPlace.save();
    res.status(200).json(newPlace);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a location

export const getLocation = async (req, res) => {
  const id = req.params.id;

  try {
    let places = await LocationModel.findById(id);
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get All location saved
export const getAllLocation = async (req, res) => {
  const id = req.params.id;

  try {
    let places = await LocationModel.find();
    places = places.filter((place) => {
      return place.userId === id;
    });
    console.log(req);
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a location saved
export const deleteLocation = async (req, res) => {
  const id = req.params.id;

  try {
    let places = await LocationModel.findById(id);
    await places.deleteOne();
    res.status(200).json('Location deleted.');
  } catch (err) {
    res.status(500).json(err);
  }
};
