const db = require("../initialize/db.initialize");
const Admin = db.Admin;
const Auth = db.Auth;

exports.createPost = async (data) => {
  try {
    console.log(data);
    const admin = await Admin.create({
      postedBy: data.postedBy,
      post: data.post,
      imgUrl: data.imgUrl,
      userId: data.userId,
      UserId: data.userId,
      uId: data.uId,
    });
    if (admin) {
      console.log({ message: "Successfully posted" });
    }
  } catch (error) {
    console.log({ error: `Failed to post ${error}` });
  }
};

exports.deletePost = async (id) => {
  try {
    console.log(id);
    const admin = await Admin.destroy({
      where: {
        id: id,
      },
    });
    if (admin) {
      console.log({ message: `Successfully deleted. ${admin}` });
    }
  } catch (error) {
    console.log({ error: `Failed to delete admin post ${error}` });
  }
};

exports.blockSite = async (data) => {
  try {
    const auth = await Auth.update({ block: data }, { where: { id: 1 } });
    console.log("SUccessfully blocked the site");
  } catch (error) {
    console.log(error);
  }
};

exports.getAuth = async (io) => {
  try {
    const auth = await Auth.findAndCountAll({
      order: [["createdAt", "ASC"]],
      offset: 0,
      limit: 1,
    });

    console.log("SUccessfully blocked the site");
    io.emit("block-status", auth);
  } catch (error) {
    console.log(error);
  }
};
