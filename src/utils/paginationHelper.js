/**
 * @class PaginationHelper
 */
class PaginationHelper {
  /**
   * @param {object} rows
   * @param {int} descLength
   * @returns {object} data
   */
  static stripRowByDescription(rows, descLength) {
    const strippedRow = rows.filter((row) => {
      const descriptionLength = row.dataValues.description.length;
      if (descriptionLength > descLength) {
        row.dataValues.description = `${row.dataValues.description.slice(0, descLength)}...`;
      } else {
        row.dataValues.description = row.dataValues.description.slice(0, descLength);
      }
      return row;
    });
    return strippedRow;
  }

  /**
   * @param {*} model
   * @param {*} queries
   * @returns {object} data
   */
  static async paginationHelper(model, queries) {
    let offset = 0;
    let limit = 20;
    let descrLength = 200;
    let lookUpValue = null;
    let lookUpField = null;
    if (queries.limit) {
      limit = parseInt(queries.limit);
    }
    if (queries.page) {
      offset = parseInt(limit) + ((parseInt(queries.page) - 1));
    }
    if (queries.descriptionLength) {
      descrLength = queries.descriptionLength;
    }
    if (queries.field) {
      lookUpField = queries.field;
    }
    if (queries.value) {
      lookUpValue = queries.value;
    }
    const query = {
      where: (lookUpField && lookUpValue) ? { [lookUpField]: lookUpValue } : undefined,
      limit,
      offset
    };
    const [data, productCount] = await Promise.all([model.findAll(query), model.count()]);
    return { count: productCount, rows: this.stripRowByDescription(data, descrLength) };
  }

  /**
   *@description - this method fetch products by their category
   *@param {obj} data
   *@param {int} page
   *@param {int} limit
   *@returns {object} -paginated resources
   * @static
   * @memberof PaginationHelper
   */
  static paginateResource(data, page, limit = 20) {
    let offset = 0;
    let paginateLimit = limit;
    if (page) {
      offset = (page - 1) * limit;
    }
    if (limit && page) {
      paginateLimit = limit * page;
    }

    const paginatedResource = data.slice(offset, paginateLimit);
    return paginatedResource;
  }
}

export default PaginationHelper;
