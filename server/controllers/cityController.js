const City = require('../models/city');

exports.getCities = async (req, res) => {
  const cities = await City.find({});
  res.json(cities);
};

exports.addCity = async (req, res) => {
  const { name } = req.body;
  const newCity = new City({ name });
  await newCity.save();
  res.status(201).json(newCity);
};
