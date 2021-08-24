import { environment } from "utils/environment";
import axios from "axios";
import store from "store";
import { globalErrorWasThrown } from "store/actions/globalErrorActions";

export type SprintData = {
  sprintInterval: { label: string; value: number };
  sprintStart: Date;
  projectId: number | null;
  mailToken: string;
};

export interface getSprintArgs {
  id: string;
  projectLink: string;
}

//FIXME: Return and function type
export const postSprint: any = async (body: SprintData) => {
  const data = {
    intervalTime: String(body.sprintInterval.value),
    sprintStartDate: String(body.sprintStart),
  };

  const res: any = await axios
    .post(
      `${environment.API_BASE_URL}project/sprint/${body.projectId}?emailToken=${body.mailToken}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          responseType: "json",
        },
      }
    )
    .then(
      (response) => {
        return response;
      },
      (error) => {
        return error;
      }
    );
  return res;
};

export interface addSprintArgs {
  projectId: number;
  projectLink: string;
}

export interface addSprintInfoInterface {
  sprintGoal?: string;
  sprintReference?: string;
}

export const addSprint = async (args: addSprintArgs) => {
  let res: any = axios
    .get(
      `${environment.API_BASE_URL}project/${args.projectId}/sprints?projectLink=${args.projectLink}`
    )
    .then(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          store.dispatch(globalErrorWasThrown(error.response.data.error));
          return error;
        }
        if (error.request) {
          store.dispatch(globalErrorWasThrown("Server antwortet nicht!"));
          return error;
        }
      }
    );
  return res;
};

export const addSprintInfo = async (
  sprintId: number,
  projectLink: string,
  args: addSprintInfoInterface
) => {
  try {
    const res = await axios.put(
      `${environment.API_BASE_URL}sprint/${sprintId}?projectLink=${projectLink}`,
      args,
      {
        headers: {
          "Content-Type": "application/json",
          responseType: "json",
        },
      }
    );

    return res?.data;
  } catch (error) {
    if (error.response) {
      store.dispatch(
        globalErrorWasThrown(
          error.response.data.error || "Server antwortet nicht!"
        )
      );
      return error;
    }
    if (error.request) {
      store.dispatch(globalErrorWasThrown("Server antwortet nicht!"));
      return error;
    }
  }
};
