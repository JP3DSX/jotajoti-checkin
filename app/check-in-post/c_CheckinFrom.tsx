"use client";
//Core Frameworks
import { useRouter } from "next/navigation";
import { useState } from "react";
//Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";
//User GUI Components
import postCheckin from "@/components/checkIn/s_dataPost";
//Types
import { CheckInData } from "@/types/common";
import { modeMenuMaster } from "@/data/master";
import { SelectMenu } from "@/types/common";
import { locationMenuMaster } from "@/data/master";
import { Result } from "@/types/common";

const troopsCheck = [
  { name: "beaver", alias: "ビーバー", checked: false },
  { name: "cub", alias: "カブ", checked: false },
  { name: "boy", alias: "ボーイ", checked: false },
  { name: "venture", alias: "ベンチャー", checked: false },
  { name: "rover", alias: "ローバー", checked: false },
  { name: "others", alias: "その他", checked: false },
];

export default function CheckinForm() {
  const [mode, setMode] = useState("");
  const [location, setLocation] = useState("");
  const [sendBtState, setSendBtState] = useState(false);
  const [callsign, setCallsign] = useState("");
  const [memo, setMemo] = useState("");
  const [name, setName] = useState("");
  const [troops, setTroops] = useState(troopsCheck);
  const router = useRouter();
  let modeMenuItem = modeMenuMaster;
  let locationMenuItem = locationMenuMaster;

  const modeChangeHandler = (event: SelectChangeEvent) => {
    setMode(event.target.value as string);
  };
  const locationChangeHandler = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };
  const callsignChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCallsign(event.target.value as string);
  };
  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value as string);
  };
  const memoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value as string);
  };
  const chkboxChangeHandler = (index: number, checked: boolean) => {
    console.log(index);
    setTroops((prev) => {
      let data = prev;
      data[index].checked = checked;
      return data;
    });
  };

  const checkinClickHandler = () => {
    const data: CheckInData = {
      _id: "",
      callsign: callsign,
      name: name,
      mode: mode,
      location: location,
      memo: memo,
      troops: {
        beaver: troops[0].checked,
        cub: troops[1].checked,
        boy: troops[2].checked,
        venture: troops[3].checked,
        rover: troops[4].checked,
        others: troops[5].checked,
      },
      InsertDate: ""
    };
    let result: Promise<Result> = postCheckin(data);
    console.log(result.then((data)=> {
      return data.status + ": " + data.message + "\n" + data.body;
    }));
    setSendBtState(true);
    router.back();
  };

  return (
    <Container sx={{ p: 2 }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <TextField
                id="filled-helperText"
                label="CallSign"
                type="text"
                variant="filled"
                helperText="*お持ちの場合"
                color="primary"
                onChange={callsignChangeHandler}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <TextField
                id="filled-helperText"
                label="Name"
                type="text"
                variant="filled"
                helperText="団体名もしくは個人名"
                color="primary"
                onChange={nameChangeHandler}
                required={true}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel>Mode</InputLabel>
              <Select
                labelId="post-mode-select"
                id="demo-simple-select"
                value={mode}
                label="Mode"
                defaultValue="EYE-OFFICIAL"
                onChange={modeChangeHandler}
                required={true}
              >
                {modeMenuItem.map((data: SelectMenu) => (
                  <MenuItem value={data.value}>{data.text}</MenuItem>
                ))}
              </Select>
              <FormHelperText>参加方法</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel>Location</InputLabel>
              <Select
                labelId="post-location-select"
                //id=""
                value={location}
                label="Location"
                onChange={locationChangeHandler}
                required={true}
              >
                {locationMenuItem.map((data: SelectMenu) => (
                  <MenuItem value={data.value}>{data.text}</MenuItem>
                ))}
              </Select>
              <FormHelperText>会場名かエリア</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4} alignContent="cneter">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <FormGroup aria-label="position" row>
                <FormGroup aria-label="position">
                  {troops.map((troopsCheck, index) => {
                    if (index < 3) {
                      return (
                        <FormControlLabel
                          label={troopsCheck.alias}
                          control={
                            <Checkbox
                              onChange={(e) =>
                                chkboxChangeHandler(index, e.target.checked)
                              }
                            />
                          }
                        />
                      );
                    }
                  })}
                </FormGroup>
                <FormGroup aria-label="position">
                  {troops.map((troopsCheck, index) => {
                    if (index >= 3) {
                      return (
                        <FormControlLabel
                          label={troopsCheck.alias}
                          control={
                            <Checkbox
                              onChange={(e) =>
                                chkboxChangeHandler(index, e.target.checked)
                              }
                            />
                          }
                        />
                      );
                    }
                  }
                      )}
                </FormGroup>
              </FormGroup>
              <FormHelperText>参加者の所属隊</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={8} alignItems="center">
            <FormControl
              sx={{ m: 1, maxWidth: "100%", width: 500, alignItems: "stretch" }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Memo"
                multiline
                rows={2}
                onChange={memoChangeHandler}
              />
            </FormControl>
            <FormHelperText>補足情報・コメントbなど</FormHelperText>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Box margin="auto">
              <Button
                variant="contained"
                onClick={() => {
                  router.back();
                }}
                color='info'
              >
                もどる
              </Button>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box margin="auto">
              <Button 
              variant="contained" 
              onClick={checkinClickHandler}
              disabled={sendBtState}
              color='warning'
              >
                Check-In!
              </Button>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
