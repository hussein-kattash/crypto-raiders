const Post = require("../models/post");

// create post
async function createPost(req, res) {
  const {
    arTitle,
    enTitle,
    ruTitle,
    arContent,
    enContent,
    ruContent,
    arCategory,
    enCategory,
    ruCategory,
    image,
  } = req.body;

  // Validate input data
  if (!isValidInput(req.body)) {
    return res.status(422).json({ message: "Invalid input data" });
  }

  // Handle image data validation if necessary
  let imageData = `data:${image.type};base64,${image.name}`;

  if (!image.type && !image.name) {
    imageData = "";
  }

  const data = new Post({
    title: {
      ar: arTitle,
      en: enTitle,
      ru: ruTitle,
    },
    content: {
      ar: arContent,
      en: enContent,
      ru: ruContent,
    },
    category: {
      ar: arCategory,
      en: enCategory,
      ru: ruCategory,
    },
    image: imageData,
  });

  // Set the createdAt and updatedAt fields
  data.createdAt = new Date();

  try {
    await data.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Extract a function to validate the input data
function isValidInput(body) {
  const {
    arTitle,
    enTitle,
    ruTitle,
    arContent,
    enContent,
    ruContent,
    arCategory,
    enCategory,
    ruCategory,
  } = body;

  return (
    arTitle &&
    enTitle &&
    ruTitle &&
    arContent &&
    enContent &&
    ruContent &&
    arCategory.length > 0 &&
    enCategory.length > 0 &&
    ruCategory.length > 0
  );
}


//Something went wrong. Please try again.

// get all posts
async function getAllPosts(req, res) {
  try {
    const { categories, lang, page } = req.query;
    const pageSize = 10; 

    let query = {};

    if (categories && lang) {
      const categoryField = `category.${lang}`;
      query[categoryField] = { $in: categories };
    }

    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / pageSize);

    const skip = (page - 1) * pageSize;
    const posts = await Post.find(query)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}


// get one post by ID
async function getPostById(req, res) {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
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

// Update or edit post
async function updatePost(req, res) {
  const postId = req.params.postId; // Assuming you have postId in the request parameters
  const {
    arTitle,
    enTitle,
    ruTitle,
    arContent,
    enContent,
    ruContent,
    arCategory,
    enCategory,
    ruCategory,
    image,
  } = req.body;

  // Validate input data
  if (
    !arTitle ||
    !enTitle ||
    !ruTitle ||
    !arContent ||
    !enContent ||
    !ruContent ||
    !arCategory ||
    !enCategory ||
    !ruCategory
  ) {
    return res.status(422).json({ message: "Invalid input data" });
  }

  // Handle image data validation if necessary
  let imageData;
  if (image && image.name && image.type) {
    imageData = `data:image/${image.type};base64,${image.name}`;
  }

  try {
    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update post fields
    existingPost.title = { ar: arTitle, en: enTitle, ru: ruTitle };
    existingPost.content = { ar: arContent, en: enContent, ru: ruContent };
    existingPost.image = imageData;
    existingPost.category = { ar: arCategory, en: enCategory, ru: ruCategory };

    // Update the updatedAt field
    existingPost.updatedAt = new Date();

    // Save the updated post
    const updatedPost = await existingPost.save();

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Delete post
async function deletePost(req, res) {
  const postId = req.params.postId;

  try {
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
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
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
