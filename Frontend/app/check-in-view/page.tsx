import Card from "@mui/material/Card";
import CheckinDataGrid from "./c_CheckInDataGrid";

export default async function CheckinView() {
  return (
    <Card sx={{ maxWidth: "100%" }}>
        <CheckinDataGrid />
    </Card>
  );
}
