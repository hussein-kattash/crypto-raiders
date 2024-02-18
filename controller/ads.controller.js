const Ads = require("../models/ads");

// create ads
async function createAds(req, res) {
  const { image, link } = req.body;

  if (!image || !link) {
    return res.status(422).json({ message: "Invalid input data" });
  }

  // Handle image data validation if necessary
  let imageData = `data:${image.type};base64,${image.name}`;

  const data = new Ads({ image: imageData, link });
  // Set the createdAt and updatedAt fields
  data.createdAt = new Date();

  try {
    await data.save();
    res.status(201).json({ message: "Ads created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// get all ads
async function getAllAds(req, res) {
  try {
    const allAds = await Ads.find();
    res.status(200).json(allAds);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// delete ads
async function deleteAds(req, res) {
  const adsId = req.params.adsId;
  if (!adsId) {
    return res.status(404).json({ message: "Ads not found" });
  }
  res.status(200).json({ message: "Ads deleted successfully" });
  try {
    await Ads.findByIdAndDelete(adsId);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
   createAds,
   deleteAds,
   getAllAds
};
