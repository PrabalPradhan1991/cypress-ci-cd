import { environment } from "utils/environment";
import axios from "axios";
import store from "store";
import { globalErrorWasThrown } from "store/actions/globalErrorActions";

export type postFeedbackBody = {
  userEmail: string;
  text: string;
  reason?: {
    label: string;
    value: string;
  };
};

export interface postFeedbackArgs {
  body: postFeedbackBody;
  projectLink: string;
}

export const postFeedback: any = async (args: postFeedbackArgs) => {
  const res: any = await axios
    .post(
      `${environment.API_BASE_URL}feedback/?projectLink=${args.projectLink}`,
      JSON.stringify(args.body),
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
          return error;
        }
        if (error.request) {
          store.dispatch(globalErrorWasThrown("Server antwortet nicht!"));
        }
      }
    );
  return res;
};
