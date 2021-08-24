export default interface CreateProjectModel {
  id: number | null;
  companyName: string;
  projectName: string;
  username: string;
  email: string;
  mailToken: string;
  adminLink: string;
}
