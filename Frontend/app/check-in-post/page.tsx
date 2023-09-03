import  Box  from "@mui/material/Box";
import { Stack } from "@mui/material";
import { Divider } from "@mui/material";
import { Suspense } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card"
import CheckinForm from "./c_checkinFrom";

export default async function postCheckinData() {
  return (
    <Card sx={{ maxWidth: "100%"  }}>
{      
      // <
      //   sx={{
      //     width: "100%",
      //     p: 2,
      //     display: "flex",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     bgcolor: "primary",
      //     borderRadius: "10px",
      //   }}
      // >
}
      <CheckinForm />
      </Card>
  );
}
