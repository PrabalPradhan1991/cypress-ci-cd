import moment from "moment";

export type capafield = {
  id: number;
  capacity: number;
  //FIXME: Only for show off
  apiId: number;
  timeStamp: moment.Moment | null;
};
