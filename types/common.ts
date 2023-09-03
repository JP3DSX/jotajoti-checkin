export type SelectMenu = {
  value: string;
  text: string;
};
export type CheckInData = {
  _id: string;
  callsign: string;
  name: string;
  mode: string;
  location: string;
  memo: string;
  troops: {
    beaver: boolean;
    cub: boolean;
    boy: boolean;
    venture: boolean;
    rover: boolean;
    others: boolean;
  };
  InsertDate: string;
};
export type Result = {
  status: number,
  message: String,
  body: Promise<any>
}
export type fetchResult = {
  status: number;
  message: string;
  body: JSON;
};
