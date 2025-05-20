const slugify = require("slugify");

const generateUniqueSlug = async (name, modelName) => {
  let slug = slugify(name, {
    lower: true,
    strict: true,
  });

  let count = await modelName.countDocuments({ slug });

  if (count >= 1) {
    return `${slug}-${Date.now()}`;
  } else {
    return slug;
  }
};

module.exports = generateUniqueSlug;
