
const stripProductDescription = (products, descLength) => {
  const strippedProducts = products.filter((product) => {
    const productDescriptionLength = product.dataValues.description.length;
    if (productDescriptionLength > descLength) {
      product.dataValues.description = `${product.dataValues.description.slice(0, descLength)}...`;
    } else {
      product.dataValues.description = product.dataValues.description.slice(0, descLength);
    }
    return product;
  });
  return strippedProducts;
};


/**
 * @param {*} model
 * @param {*} queries
 * @returns {object} data
 */
export default async function paginationHelper(model, queries) {
  let offset = 0;
  let limit = 20;
  let descrLength = 200;
  if (queries.limit) {
    limit = parseInt(queries.limit);
  }
  if (queries.page) {
    offset = parseInt(limit) + ((parseInt(queries.page) - 1));
  }
  if (queries.descriptionLength) {
    descrLength = queries.descriptionLength;
  }
  const data = await model.findAll({ limit, offset });
  const productCount = await model.count();
  return { count: productCount, rows: stripProductDescription(data, descrLength) };
}
