const db = require("../initialize/db.initialize");
const Social = db.Social;

exports.createPost = async (req, res) => {
  try {
    const social = await Social.create({
      postedBy: req.body.postedBy,
      post: req.body.post,
      imgUrl: req.body.imgUrl,
    });
    if (social) {
      res.status(200).send({ message: "Successfully posted" });
    }
  } catch (error) {
    res.status(200).send({ error: `Failed to post, ${error}` });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const social = await Social.findAndCountAll({
      order: [["createdAt", "DESC"]],
      offset: 0,
      limit: req.params.limit,
    });

    res.status(200).send(social);
  } catch (error) {
    res.status(200).send({ error: `Failed to post, ${error}` });
  }
};

// exports.socialDeleteAllPost = async (req, res) => {
//   try {
//     const social = await Social.destroy({ truncate: true });
//     res.status(200).send(social);
//   } catch (error) {
//     res.status(200).send({ error: `Failed to delete, ${error}` });
//   }
// };
