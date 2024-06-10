import { serviceHero } from "./schemas/service/hero";
import { serviceProcess } from "./schemas/service/process";
import { blog } from "./schemas/blog/blog";
import { serviceTechStack } from "./schemas/service/tech";
import { caseStudy } from "./schemas/case-study/case-study";

export const schema = {
  types: [serviceHero, serviceProcess, blog, serviceTechStack, caseStudy],
};
