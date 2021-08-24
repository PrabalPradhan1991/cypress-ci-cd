import axios from "axios";
import { environment } from "utils/environment";

export interface getCapacityByUserArgs {
  userId: number;
  sprintId: number;
  projectLink: string;
}

export const getCapacityByUser = (args: getCapacityByUserArgs) => {
  let res: any = axios
    .get(
      `${environment.API_BASE_URL}user/${args.userId}/${args.sprintId}/capa?projectLink=${args.projectLink}`
    )
    .then(
      (response) => {
        // console.log(response);
        return response;
      },
      (error) => {
        // console.log(error);
        return error;
      }
    );

  return res;
};

export interface getCapacityBySprintArgs {
  sprintId: number;
  projectLink: string;
}

export const getCapacityBySprint = (args: getCapacityBySprintArgs) => {
  let res: any = axios
    .get(
      `${environment.API_BASE_URL}sprint/${args.sprintId}/capa?projectLink=${args.projectLink}`
    )
    .then(
      (response) => {
        // console.log(response);
        return response;
      },
      (error) => {
        // console.log(error);
        return error;
      }
    );

  return res;
};
