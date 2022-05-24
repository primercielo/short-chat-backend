const db = require("../initialize/db.initialize");
const Social = db.Social;

exports.createPost = async (data) => {
  try {
    const social = await Social.create({
      postedBy: data.postedBy,
      post: data.post,
      imgUrl: data.imgUrl,
    });
    if (social) {
      res.status(200).send({ message: "Successfully posted" });
    }
  } catch (error) {
    res.status(200).send({ error: `Failed to post ${error}` });
  }
};
