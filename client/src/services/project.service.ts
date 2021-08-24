import { environment } from "utils/environment";
import axios from "axios";
import store from "store";
import { globalErrorWasThrown } from "store/actions/globalErrorActions";

export type ProjectData = {
  companyName: string;
  projectName: string;
  username: string;
  email: string;
};

export const postProject: any = async (body: ProjectData) => {
  const res: any = await axios
    .post(`${environment.API_BASE_URL}project`, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        responseType: "json",
      },
    })
    .then(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        if (error.response) {
          // console.log(error);
          return error;
        }
        if (error.request) {
          // console.log(error.request);
          store.dispatch(globalErrorWasThrown("Server antwortet nicht!"));
        }
      }
    );
  return res;
};
//FIXME: Return Type muss eingefügt werden und APIModel gesetzt werden
//FIXME: parameter is not ideal --> one parameter for id, projectLink, etc.
//So that there is one parameter for every "/" in the get path

export interface getProjectArgs {
  projectLink: string;
  projectId: number;
}

export const getProject = (args: getProjectArgs) => {
  let res: any = axios
    .get(
      `${environment.API_BASE_URL}project/${args.projectId}?projectLink=${args.projectLink}`
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
export interface getUserTypeArgs {
  projectLink: string;
}

export const getUserType = (args: getUserTypeArgs) => {
  let res: any = axios
    .get(`${environment.API_BASE_URL}link/?projectLink=${args.projectLink}`)
    .then(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        console.log(error);
        return error;
      }
    );
  return res;
};
