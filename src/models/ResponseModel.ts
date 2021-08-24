import { User, User2projects } from "./ProjectModel";

export interface CapaContributionResponse extends User {
  user2projects: User2projects;
}
