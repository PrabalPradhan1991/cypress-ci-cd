import { environment } from "utils/environment";
import axios from "axios";
import store from "store";
import { globalErrorWasThrown } from "store/actions/globalErrorActions";
import { ProjectData } from "./project.service";

export type eMailData = {
  mailToken: string;
  mailCode: number;
};

//FIXME: Returntype and APIModel
export const eMailConfirmation = async (data: eMailData) => {
  const res: any = await axios
    .get(
      `${environment.API_BASE_URL}project/token/${data.mailToken}/${data.mailCode}`
    )
    .then(
      (response) => {
        return response.data;
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
export const resendConfirmation = async (projectId: number) => {
  try {
    await axios.get(
      `${environment.API_BASE_URL}email/resendConfirmation/${projectId}`
    );
  } catch (error) {
    store.dispatch(
      globalErrorWasThrown(
        error?.response?.data?.error || "Server antwortet nicht!"
      )
    );
    throw error;
  }
};
