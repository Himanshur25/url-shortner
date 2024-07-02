const shortid = require("shortid");
const url = require("../models");

const handleGenerateShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "Url is Required" });
  }
  const shortID = shortid();
  await url.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.render("home", {
    id: shortID,
  });
};

const handleGetSingleUserData = async (req, res) => {
  const shortId = req.params.id;
  if (!shortId) {
    return res.status(404).send("Id Not found");
  }
  const result = await url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  return res.redirect(result.redirectUrl);
};

module.exports = {
  handleGenerateShortUrl,
  handleGetSingleUserData,
};
