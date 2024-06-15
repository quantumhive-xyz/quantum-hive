import { serviceHero } from "./schemas/service/hero";
import { serviceProcess } from "./schemas/service/process";
import { blog } from "./schemas/blog/blog";
import { serviceTechStack } from "./schemas/service/tech";
import { caseStudy } from "./schemas/case-study/case-study";
import { metadata } from "./schemas/metadata/metadata";
import { industry } from "./schemas/industry/industry";

export const schema = {
  types: [
    serviceHero,
    serviceProcess,
    blog,
    serviceTechStack,
    caseStudy,
    metadata,
    industry
  ],
};
