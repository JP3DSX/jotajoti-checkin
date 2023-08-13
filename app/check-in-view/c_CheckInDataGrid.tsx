"use client";
import React from "react";
import useSWR from "swr";
import { mutate } from "swr";
import { GridColDef } from "@mui/x-data-grid";
import { CheckInData } from "@/types/common";
import { GridToolbar } from "@mui/x-data-grid";
import { StripedDataGrid } from "@/components/global/c_StripeDataGrid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ChangeEvent } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const cols: GridColDef[] = [
  {
    field: "callsign",
    headerName: "コールサイン",
    flex: 1,
    minWidth: 100,
    hideSortIcons: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "名称",
    flex: 1,
    minWidth: 175,
    hideSortIcons: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "location",
    headerName: "場所",
    flex: 1,
    minWidth: 40,
    hideSortIcons: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "memo",
    headerName: "コメント",
    sortable: false,
    flex: 1,
    minWidth: 250,
    hideSortIcons: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "troops1",
    headerName: "ビーバー",
    type: "boolean",
    hideSortIcons: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "troops2",
    headerName: "カブ",
    type: "boolean",
    hideSortIcons: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "troops3",
    headerName: "ボーイ",
    type: "boolean",
    hideSortIcons: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "troops4",
    headerName: "ベンチャー",
    type: "boolean",
    hideSortIcons: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "troops5",
    headerName: "ローバー",
    type: "boolean",
    hideSortIcons: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "troops6",
    headerName: "その他",
    type: "boolean",
    hideSortIcons: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "InsertDate",
    headerName: "登録日時",
    type: "dateTime",
    minWidth: 200,
    hideSortIcons: true,
    align: "right",
    headerAlign: "right",
  },
];

const styles = {
  grid: {
    // 列ヘッダに背景色を指定
    ".MuiDataGrid-columnHeaders": {
      backgroundColor: "#65b2c6",
      color: "#fff",
    },
  },
};

const fetcher = (url: URL) => fetch(url).then((res) => res.json());

export default function CheckinDataGrid() {
  let [reloadTimer, setReloadTimer] = useState(false);
  let [btState, setBtState] = useState(false);
  let [timer, setTimer] = useState<NodeJS.Timer>();
  const [istLoading, setIstLoading] = useState(false);
  const { data, error, isLoading } = useSWR("./api/v1/GetCheckin", fetcher);

  useEffect(() => {}, [istLoading]);
  useEffect(() => {
    if (reloadTimer) {
      clearInterval(timer);
      setTimer(
        setInterval(() => {
          mutate("./api/v1/GetCheckin");
          setIstLoading(true);
          const timer = setTimeout(() => {
            setIstLoading(false);
          }, 1000);
        }, 10000)
      );
    } else {
      clearInterval(timer);
    }
  }, [reloadTimer]);

  if (error) return "An error has occurred.";
  const timerHandler = (target: ChangeEvent, currentValue: boolean) => {
    setReloadTimer(currentValue);
  };
  const onClickHandler = () => {
    setBtState(true);
    setIstLoading(true);
    const timer = setTimeout(() => {
      setBtState(false);
      setIstLoading(false);
    }, 1000);
    mutate("./api/v1/GetCheckin");
  };
  var rowArray = new Array<Object>();
  rowArray = Object.assign([], rowArray);
  // console.log(checkins);
  data?.map((each: CheckInData, i: number) => {
    // console.log(each);
    rowArray.push({
      id: each._id,
      callsign: each.callsign,
      name: each.name,
      location: each.location,
      memo: each.memo,
      troops1: each.troops.beaver,
      troops2: each.troops.cub,
      troops3: each.troops.boy,
      troops4: each.troops.venture,
      troops5: each.troops.rover,
      troops6: each.troops.others,
      InsertDate: new Date(each.InsertDate),
    });
  });
  return (
    <Stack>
      <Box
        sx={{
          alignItems: "right",
        }}
      >
        <Stack direction="row" spacing={2} p={2}>
          <div style={{ flexGrow: 1 }}></div>
          <FormControlLabel
            control={
              <Switch
                checked={reloadTimer}
                inputProps={{ "aria-label": "Dark Mode" }}
                onChange={(target, value) => timerHandler(target, value)}
              />
            }
            label="Auto Reflesh 10s"
            labelPlacement="start"
          />
          <Button
            variant="contained"
            onClick={() => {
              onClickHandler();
            }}
            color="primary"
            disabled={btState}
          >
            Reflesh
          </Button>
          <Button
            variant="contained"
            href="./check-in-post"
            color="secondary"
            endIcon={<SendIcon />}
          >
            Add Check-in!
          </Button>
        </Stack>
      </Box>
      <Divider />
      <StripedDataGrid
        sx={styles.grid}
        loading={isLoading || istLoading}
        density="compact"
        columns={cols}
        rows={rowArray}
        getRowId={(row) => row.id}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          sorting: {
            sortModel: [{ field: "InsertDate", sort: "desc" }],
          },
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Stack>
  );
}
