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

exports.blockSite = async (data, io) => {
  try {
    const auth = await Auth.update(
      {
        block: false,
        chat: false,
        chatInput: false,
        partager: false,
        transcript: false,
        menu: false,
        day: false,
        call: false,
        online: false,
      },
      { where: { id: 1 } }
    );
    // const auth = await Auth.update({ block: data }, { where: { id: 1 } });
    this.getAuth(io);
    console.log("SUccessfully blocked the site");
  } catch (error) {
    console.log(error);
  }
};

exports.blockChat = async (data, io) => {
  try {
    const auth = await Auth.update({ chat: data }, { where: { id: 1 } });
    this.getAuth(io);
    console.log("SUccessfully blocked full chat");
  } catch (error) {
    console.log(error);
  }
};

exports.disableChat = async (data, io) => {
  try {
    const auth = await Auth.update({ chatInput: data }, { where: { id: 1 } });
    this.getAuth(io);
    console.log("SUccessfully disable input chat.");
  } catch (error) {
    console.log(error);
  }
};

exports.blockPartager = async (data, io) => {
  try {
    const auth = await Auth.update({ partager: data }, { where: { id: 1 } });
    this.getAuth(io);
    console.log("SUccessfully disable input chat.");
  } catch (error) {
    console.log(error);
  }
};

exports.blockTranscript = async (data, io) => {
  try {
    const auth = await Auth.update({ transcript: data }, { where: { id: 1 } });
    this.getAuth(io);
    console.log("SUccessfully block transcript.");
  } catch (error) {
    console.log(error);
  }
};

exports.blockMenu = async (data, io) => {
  try {
    const auth = await Auth.update({ menu: data }, { where: { id: 1 } });
    this.getAuth(io);
    console.log("SUccessfully block menu.");
  } catch (error) {
    console.log(error);
  }
};

exports.blockDay = async (data, io) => {
  try {
    const auth = await Auth.update({ day: data }, { where: { id: 1 } });
    this.getAuth(io);
    console.log("SUccessfully block menu.");
  } catch (error) {
    console.log(error);
  }
};

exports.blockOnline = async (data, io) => {
  try {
    const auth = await Auth.update({ online: data }, { where: { id: 1 } });
    this.getAuth(io);
    console.log("SUccessfully block online.");
  } catch (error) {
    console.log(error);
  }
};

exports.blockCall = async (data, io) => {
  try {
    const auth = await Auth.update({ call: data }, { where: { id: 1 } });
    this.getAuth(io);
    console.log("SUccessfully block call.");
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

    console.log("SUccessfully get the auth table.");
    io.emit("block-status", auth);
  } catch (error) {
    console.log(error);
  }
};
