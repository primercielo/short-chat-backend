const db = require("../initialize/db.initialize");
const Social = db.Social;
const User = db.User;

exports.createPost = async (req, res) => {
  try {
    const social = await Social.create({
      postedBy: req.body.postedBy,
      post: req.body.post,
      imgUrl: req.body.imgUrl,
      userId: req.body.userId,
      UserId: req.body.userId,
      uId: req.body.uId,
      view: 0,
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
      include: [User],
      order: [["createdAt", "DESC"]],
      offset: 0,
      limit: req.params.limit,
    });

    res.status(200).send(social);
  } catch (error) {
    res.status(200).send({ error: `Failed to post, ${error}` });
  }
};

exports.socialDeleteAllPost = async (req, res) => {
  try {
    const social = await Social.destroy({ truncate: true });
    res.status(200).send(social);
  } catch (error) {
    res.status(200).send({ error: `Failed to delete, ${error}` });
  }
};

exports.getSingleUserAllPosts = async (req, res) => {
  try {
    const social = await Social.findAndCountAll({
      where: { uId: req.params.uid },
      include: [User],
      order: [["createdAt", "DESC"]],
      offset: 0,
      limit: req.params.limit,
    });
    res.status(200).send(social);
  } catch (error) {
    // res.status(200).send({ error: `Failed to delete, ${error}` });
    console.log({ error: `Failed to delete, ${error}` });
  }
};
