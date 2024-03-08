const express = require("express");
const router = express.Router();
const { createPost } = require("../controller/index.controller");
const { getAllPosts,getLatestPosts,getLatestTwentyPosts} = require("../controller/index.controller");
const { getPostById } = require("../controller/index.controller");
const { updatePost } = require("../controller/index.controller");
const { deletePost } = require("../controller/index.controller");
const { adminRegister } = require("../controller/admin.controller");
const { adminLogin } = require("../controller/admin.controller");
const { verifyAdmin } = require("../middleware/index");
const { createAds } = require("../controller/ads.controller");
const { deleteAds } = require("../controller/ads.controller");
const { getAllAds } = require("../controller/ads.controller");
const { createMember } = require("../controller/member.controller");
const { getAllMembers } = require("../controller/member.controller");
const { getMemberById } = require("../controller/member.controller");
const { deleteMember } = require("../controller/member.controller");
const { updateMember } = require("../controller/member.controller");
const { getAllPartners, deletePartner } = require("../controller/partners.controller");
const { createPartner } = require("../controller/partners.controller");
 
//Post Method
router.post("/create-post", verifyAdmin, createPost);

//Get all Method
router.get("/get-posts", getAllPosts);

//Get latest posts
router.get("/latest/posts", getLatestPosts);

//Get latest twenty posts
router.get("/latest/twenty/posts", getLatestTwentyPosts);

//Get by ID Method
router.get("/get-post/:id", getPostById);

//Update by ID Method
router.patch("/update-post/:postId", verifyAdmin, updatePost);

//Delete by ID Method
router.delete("/delete-post/:postId", verifyAdmin, deletePost);

// create ads
router.post("/create-ads", verifyAdmin, createAds);

// get all ads
router.get("/get-ads", getAllAds);

//delete ads
router.delete("/delete-ads/:adsId", verifyAdmin, deleteAds);

//create new member
router.post("/create-member", verifyAdmin, createMember);

//get all members
router.get("/get-members", getAllMembers);

//get member by Id
router.get("/get-member/:memberId", getMemberById);

//update member
router.patch("/update-member/:memberId", verifyAdmin, updateMember);

//delete member
router.delete("/delete-member/:memberId", verifyAdmin, deleteMember);

// create a partner
router.post("/create/partner",verifyAdmin,createPartner)

// get all partners
router.get("/partners", getAllPartners);

//delete partner
router.delete("/delete/partner/:partnerId", verifyAdmin, deletePartner);

// Register Admin account
router.post("/register-admin", adminRegister);

// Login Admin to dashboard
router.post("/login-admin", adminLogin);


module.exports = router;
