const Partners = require("../models/partner");

// create new partner
async function createPartner(req, res) {
  try {
    const { image, link, name } = req.body;

    if (!(image && link && name)) {
      return res.status(422).json({ message: "Invalid input data" });
    }

    // Handle image data validation if necessary
    let imageData = `data:${image.type};base64,${image.name}`;
    const data = new Partners({ image: imageData, link, name });

    // Set the createdAt and updatedAt fields
    data.createdAt = new Date();

    await data.save();
    res.status(201).json({ message: "Partner created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}


// get all partners
async function getAllPartners(req, res) {
    try {
      const allPartners = await Partners.find();
      res.status(200).json(allPartners);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  // delete ads
async function deletePartner(req, res) {
  const partnerId = req.params.partnerId;
  if (!partnerId) {
    return res.status(404).json({ message: "Partner not found" });
  }
  res.status(200).json({ message: "Partner deleted successfully" });
  try {
    await Partners.findByIdAndDelete(partnerId);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
    createPartner,
    getAllPartners,
    deletePartner
}
