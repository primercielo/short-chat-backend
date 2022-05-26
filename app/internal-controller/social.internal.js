const db = require("../initialize/db.initialize");
const Social = db.Social;

exports.createPost = async (data) => {
  try {
    console.log(data);
    const social = await Social.create({
      postedBy: data.postedBy,
      post: data.post,
      imgUrl: data.imgUrl,
      userId: data.userId,
      UserId: data.userId,
      uId: data.uId,
    });
    if (social) {
      console.log({ message: "Successfully posted" });
    }
  } catch (error) {
    console.log({ error: `Failed to post ${error}` });
  }
};

exports.deletePost = async (id) => {
  try {
    console.log(id);
    const social = await Social.destroy({
      where: {
        id: id,
      },
    });
    if (social) {
      console.log({ message: `Successfully deleted. ${social}` });
    }
  } catch (error) {
    console.log({ error: `Failed to delete social post ${error}` });
  }
};
