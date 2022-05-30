const db = require("../initialize/db.initialize");
const Admin = db.Admin;
const User = db.User;

exports.createPost = async (req, res) => {
  try {
    const admin = await Admin.create({
      postedBy: req.body.postedBy,
      post: req.body.post,
      imgUrl: req.body.imgUrl,
      userId: req.body.userId,
      UserId: req.body.userId,
      uId: req.body.uId,
    });
    if (admin) {
      res.status(200).send({ message: "Successfully posted" });
    }
  } catch (error) {
    res.status(200).send({ error: `Failed to post, ${error}` });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const admin = await Admin.findAndCountAll({
      include: [User],
      order: [["createdAt", "DESC"]],
      offset: 0,
      limit: req.params.limit,
    });

    res.status(200).send(admin);
  } catch (error) {
    res.status(200).send({ error: `Failed to post, ${error}` });
  }
};

exports.adminDeleteAllPost = async (req, res) => {
  try {
    const admin = await Admin.destroy({ truncate: true });
    res.status(200).send(admin);
  } catch (error) {
    res.status(200).send({ error: `Failed to delete, ${error}` });
  }
};

exports.getSingleUserAllPosts = async (req, res) => {
  try {
    const admin = await Admin.findAndCountAll({
      where: { uId: req.params.uid },
      include: [User],
      order: [["createdAt", "DESC"]],
      offset: 0,
      limit: req.params.limit,
    });
    res.status(200).send(admin);
  } catch (error) {
    // res.status(200).send({ error: `Failed to delete, ${error}` });
    console.log({ error: `Failed to delete, ${error}` });
  }
};
