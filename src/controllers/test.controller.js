import asyncHandler from "../helpers/asyncHandler.helper.js";

const test = asyncHandler( async(req, res) => {
  throw new Error("exceptional error!")
});
export { test };
