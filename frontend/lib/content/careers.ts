export interface CareerRole {
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

export const careersData: CareerRole[] = [];
