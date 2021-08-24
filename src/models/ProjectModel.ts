export interface Project {
  id: number;
  users: User2projects[];
  companyName: string;
  projectName: string;
  sprints: Sprint[];
  projectLink: ProjectLink;
}
export interface User2projects {
  id: number;
  user: User;
  role: Role;
  slot2sprints: Slot2Sprints[];
}

export interface Contribution {
  id: number;
  relevant: boolean;
}

export interface Slot2Sprints {
  id: number;
  sprint: Sprint;
  capacontribution: Contribution;
}

export interface User {
  id: number;
  email: string;
  username: string;
  deletedDate: null | string;
}

export interface Role {
  id: number;
  type: string;
  projectRole: string;
}

export interface Sprint {
  id: number;
  intervalTime: string;
  sprintStartDate: string;
  sprintGoal: string;
  sprintReference: string;
}

export interface ProjectLink {
  id: number;
  type: string;
  link: string;
}
