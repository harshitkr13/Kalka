export interface CaseStudyData {
  slug: string;
  title: string;
  clientIndustry: string;
  engagementType: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

export const caseStudiesData: CaseStudyData[] = [];
