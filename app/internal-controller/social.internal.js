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
      sensitive: data.sensitive,
      heart: 0,
      happy: 0,
      sad: 0,
      view: 0,
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

exports.incrementHeart = async (id) => {
  try {
    console.log(id);
    const social = await db.sequelize.query(`UPDATE "Socials"
    SET heart = heart + 1
    WHERE id = ${id}`);
    if (social) {
      console.log({
        message: `Successfully incremented heart reaction. ${social}`,
      });
    }
  } catch (error) {
    console.log({ error: `Failed to increment heart reaction. ${error}` });
  }
};

exports.incrementHappy = async (id) => {
  try {
    console.log(id);
    const social = await db.sequelize.query(`UPDATE "Socials"
    SET happy = happy + 1
    WHERE id = ${id}`);
    if (social) {
      console.log({
        message: `Successfully incremented happy reaction. ${social}`,
      });
    }
  } catch (error) {
    console.log({ error: `Failed to increment happy reaction. ${error}` });
  }
};

exports.incrementSad = async (id) => {
  try {
    console.log(id);
    const social = await db.sequelize.query(`UPDATE "Socials"
    SET sad = sad + 1
    WHERE id = ${id}`);

    if (social) {
      console.log({
        message: `Successfully incremented sad reaction. ${social}`,
      });
    }
  } catch (error) {
    console.log({ error: `Failed to increment sad reaction. ${error}` });
  }
};

exports.incrementView = async (data, io) => {
  try {
    if (!data.admin) {
      const social = await db.sequelize.query(`UPDATE "Socials"
      SET view = view + 1
      WHERE id = ${data.id}`);
      if (social) {
        console.log({
          message: `Successfully incremented view of video. ${social}`,
        });
      }
      io.emit("social-post");
    }
  } catch (error) {
    console.log({ error: `Failed to increment view video. ${error}` });
  }
};
