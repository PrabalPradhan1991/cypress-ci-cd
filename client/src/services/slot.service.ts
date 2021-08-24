import axios from "axios";
import { environment } from "utils/environment";

//FIXME: Return Type muss eingefügt werden und APIModel gesetzt werden
export interface getSlotsArgs {
  user2projectId: number;
  sprintId: number;
  projectLink: string;
}
export const getSlots = (args: getSlotsArgs) => {
  let res: any = axios
    .get(
      `${environment.API_BASE_URL}user/${args.user2projectId}/${args.sprintId}?projectLink=${args.projectLink}`
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

export type SlotData = {
  capacity: number;
  id: number;
  projectLink: string;
};

export const putSlot: any = async (body: SlotData) => {
  //FIXME: Not Typesafe
  const data = {
    capa: body.capacity,
  };

  const res: any = await axios
    .put(
      `${environment.API_BASE_URL}slot/${body.id}?projectLink=${body.projectLink}`,
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
