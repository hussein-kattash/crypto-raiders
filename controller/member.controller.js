const Member = require("../models/member");


// create new member
async function createMember(req, res){
    const {name, role, image, links} = req.body;

     // Validate input data
  if (!name || !role) {
    return res.status(422).json({ message: "Invalid input data" });
  }

  // Handle image data validation if necessary
  let imageData = `data:${image.type};base64,${image.name}`;

  if (!image.type && !image.name) {
    imageData = "";
  }

  const data = new Member({
    name,
    role,
    image: imageData,
    links:links
  });

  try {
    await data.save();
    res.status(201).json({ message: "Member created successfully"});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// get all members
async function getAllMembers(req, res) {
    try {
      const allMembers = await Member.find();
      res.status(200).json(allMembers);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
}

// get one post by ID
async function getMemberById(req, res) {
    const memberId = req.params.memberId;
  
    try {
      const member = await Member.findById(memberId);
  
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
  
      res.status(200).json(member);
    } catch (error) {
      // Check if the error is due to a non-existent ID
      if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(404).json({ message: "Member not found" });
      }
  
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
}


// Update or edit team member
async function updateMember(req, res) {
    const memberId = req.params.memberId; // Assuming you have memberId in the request parameters
    const {name, role, image, links} = req.body;
  
    // Validate input data
    if (!name || !role) {
      return res.status(422).json({ message: "Invalid input data" });
    }
  
    // Handle image data validation if necessary
    let imageData;
    if (image && image.name && image.type) {
      imageData = `data:image/${image.type};base64,${image.name}`;
    }
  
    try {
      const existingMember = await Member.findById(memberId);
  
      if (!existingMember) {
        return res.status(404).json({ message: "Member not found" });
      }
  
      // Update post fields
      existingMember.name = name;
      existingMember.role = role;
      existingMember.image = imageData
      existingMember.links = links
  
      // Save the updated post
      const updatedMember = await existingMember.save();
  
      res
        .status(200)
        .json({ message: "Member updated successfully", member: updatedMember });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }


  // Delete post
async function deleteMember(req, res) {
    const memberId = req.params.memberId;
  
    try {
      await Member.findByIdAndDelete(memberId);
      res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
      // Check if the error is due to a non-existent ID
      if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(404).json({ message: "Post not found" });
      }
  
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

module.exports = {
    createMember,
    getAllMembers,
    getMemberById,
    deleteMember,
    updateMember
}