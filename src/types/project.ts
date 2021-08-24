export interface Project {
  id: number;
  companyName: string;
  projectName: string;
  adminUser: string;
  email: string;
  interval: number;
  projectLinks: {
    id: number;
    adminLink?: string;
    userLink: string;
  };
}
