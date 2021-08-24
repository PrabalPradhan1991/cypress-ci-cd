import { environment } from "utils/environment";
import axios, { AxiosResponse } from "axios";
import { CapaContributionResponse } from "models/ResponseModel";
import { globalErrorWasThrown } from "store/actions/globalErrorActions";
import store from "store";

export type PreferenceDataArgs = {
  projectId: number;
  sprintId: number;
  projectLink: string;
  userId: number;
  relevant: boolean;
};

export const updateCapaContributionOfProject = async (
  args: PreferenceDataArgs
): Promise<CapaContributionResponse> => {
  try {
    const result: AxiosResponse = await axios.put(
      `${environment.API_BASE_URL}capa/${args?.projectId}/${args?.sprintId}/?projectLink=${args.projectLink}`,
      {
        userId: args?.userId,
        relevant: args?.relevant,
      }
    );
    return result.data as CapaContributionResponse;
  } catch (error: any) {
    if (error.request) {
      store.dispatch(globalErrorWasThrown("Server antwortet nicht!"));
    }
    throw error;
  }
};
