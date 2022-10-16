import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = (param) => {
  return /\.(png|jpe?g|gif|webp)$/i.test(param);
};

