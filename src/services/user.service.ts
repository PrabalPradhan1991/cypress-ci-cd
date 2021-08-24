import { environment } from "utils/environment";
import axios from "axios";
import store from "store";
import { globalErrorWasThrown } from "store/actions/globalErrorActions";

export type UserData = {
  projectId: number;
  projectLink: string;
  username: string;
  role: string;
};
export type UserInfo = {
  userId: number;
  username: string;
  role: string;
};

export const postUser: any = async (body: UserData) => {
  //FIXME: Not Typesafe
  try {
    const data = {
      username: String(body.username),
      role: String(body.role),
    };

    const res: any = await axios.post(
      `${environment.API_BASE_URL}project/user/${body.projectId}?projectLink=${body.projectLink}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          responseType: "json",
        },
      }
    );
    return res;
  } catch (error) {
    if (error.response) {
      store.dispatch(
        globalErrorWasThrown(
          error.response.data.error || error.response.statusText
        )
      );
      throw error;
    } else if (error.request) {
      throw error;
    }
  }
};

export interface editTeamMemberInterface {
  userId: number;
  projectLink: string;
  username: string;
  role: string;
}
/**
 *
 * @param {editTeamMember } args team member data
 */
export const editTeamMember = async (args: editTeamMemberInterface) => {
  try {
    const res = await axios.put(
      `${environment.API_BASE_URL}user/${args.userId}?projectLink=${args.projectLink}`,
      {
        role: args?.role,
        username: args?.username,
      },
      {
        headers: {
          "Content-Type": "application/json",
          responseType: "json",
        },
      }
    );
    return res;
  } catch (error) {
    if (error.response) {
      store.dispatch(
        globalErrorWasThrown(
          error.response.data.error || error.response.statusText
        )
      );
      throw error;
    } else if (error.request) {
      throw error;
    }
  }
};

export interface deleteUserArgs {
  userId: number;
  projectLink: string;
}

export const deleteUser: any = async (args: deleteUserArgs) => {
  //FIXME: Not Typesafe
  const res: any = await axios
    .delete(
      `${environment.API_BASE_URL}user/${args.userId}?projectLink=${args.projectLink}`,

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
        if (error.response) {
          store.dispatch(globalErrorWasThrown(error.response.data.error));
          return error;
        } else if (error.request) {
          return error;
        }
      }
    );
  return res;
};
