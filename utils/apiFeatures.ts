import { Query } from "mongoose";

class ApiFeatures {
  constructor(
    public query: Query<any[], any, {}>,
    public queryStr: { [key: string]: string | string[] | number }
  ) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const location = this.queryStr.location
      ? {
          name: {
            $regex: this.queryStr.location,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...location });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // Remove location field from query
    const removeFields = ["location", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);
    this.query = this.query.find(queryCopy);
    return this;
  }

  pagination(resPerPage: number) {
    // eg currentPage 3
    const currentPage = Number(this.queryStr.page) || 1;
    // eg 5 resPerPage, skip will be 10 and show 11 - 15
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
