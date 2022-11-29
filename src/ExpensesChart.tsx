import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import expensesData from "./data.json";
export const ExpensesChart = () => {
  const [focusBar, setFocusBar] = useState<any>(null);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = d.getDay() - 1;
  const getFillColour = (focusBar: number, index: number) => {
    if (day == index) {
      if (focusBar == index) {
        return "#bbdefb";
      }
      return "#90caf9";
    } else {
      if (focusBar == index) {
        return "#ff8a80";
      } else {
        return "#ff7043";
      }
    }
  };

  const ToolTipContent = ({ payload }: any) => {
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          border: "none",
          padding: "0.3em",
          borderColor: "none",
          fontSize: "14px",
        }}
      >
        {payload.length > 0 ? `$${payload[0].payload.amount}` : ""}
      </div>
    );
  };
  return (
    <div style={{backgroundColor:"hsl(27, 66%, 92%)"}}>
      <Grid
        container
        spacing={3}       
      >
        <Grid
          item
          sm={4}
          xs={0}
          md={4}
          lg={4}
          sx={{ backgroundColor: "hsl(27, 66%, 92%)" }}
        ></Grid>
        <Grid
          item
          sm={4}
          xs={12}
          md={4}
          lg={4}
          sx={{ backgroundColor: "hsl(27, 66%, 92%)" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                backgroundColor: "#ff7043",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                padding: "1em",
                margin: "1em 0em 1em 0em",
                borderRadius: "0.5em",
              }}
            >
              <Box>
                <div style={{ fontSize: "13px", fontWeight: "500" }}>
                  My Balance
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    marginTop: "0.2em",
                    fontWeight: "500",
                  }}
                >
                  $921.48
                </div>
              </Box>
              <Box
                sx={{ color: "black", fontWeight: "700", fontFamily: "serif" }}
              >
                ExpenseeChart
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                borderRadius: "0.5em",
                marginBottom: "1em"
              }}
            >
              <Box
                sx={{
                  fontSize: "2em",
                  margin: "1em",
                  fontWeight: "500",
                  fontFamily: "sans-serif",
                }}
              >
                Spending- Last 7 Days
              </Box>
              <Box
                sx={{
                  margin: "0.5em",
                  alignSelf: "center",
                  position: "relative",
                  height: "100%",
                }}
              >
                <BarChart
                  width={350}
                  height={200}
                  data={expensesData}
                  onMouseMove={(state) => {
                    if (state.isTooltipActive) {
                      setFocusBar(state.activeTooltipIndex);
                    } else {
                      setFocusBar(null);
                    }
                  }}
                >
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis hide={true} />
                  <Tooltip
                    itemStyle={{ backgroundColor: "black" }}
                    content={<ToolTipContent />}
                    isAnimationActive={false}
                    cursor={{ fill: "transparent" }}
                  />
                  <Legend />
                  <Bar
                    dataKey="amount"
                    radius={[5, 5, 5, 5]}
                    legendType="none"
                    isAnimationActive={false}
                  >
                    {expensesData.map((entry, index) => (
                      <Cell fill={getFillColour(focusBar, index)} />
                    ))}
                  </Bar>
                </BarChart>
                <hr style={{backgroundColor:"hsl(27, 66%, 92%)", border:"none", height:"2px"}}></hr>
              </Box>
              <Box sx={{ display: "flex" , justifyContent:"space-between", margin:"2em"}}>
                <Box><div style={{color: "gray", fontSize:"13px", fontWeight:"500"}}>Total this month
                </div><div style={{fontSize:"30px", fontWeight:"700"}}>$478.33</div></Box>
                <Box><div style={{fontSize:"13px", fontWeight:"700"}}>+2.4%
                </div><div style={{fontSize:"13px", fontWeight:"500", color: "gray"}}>from last month </div></Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sm={4}
          xs={0}
          md={4}
          lg={4}
          sx={{ backgroundColor: "hsl(27, 66%, 92%)" }}
        ></Grid>
      </Grid>
    </div>
  );
};
