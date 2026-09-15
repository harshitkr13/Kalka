export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  practiceArea: string;
  bio: string;
  expertise: string[];
}

export const teamData: TeamMember[] = [];
