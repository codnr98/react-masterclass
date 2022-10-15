import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { width } from "@mui/system";

const Div = styled.div`
  width: 90%;
  height: 90%;
`;

interface CoinHistoryDate {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function CoinChart() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<CoinHistoryDate[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );
  console.log(data?.map((x) => new Date(x.time_open)));
  // console.log(data?.map((item) => new Date(item.time_open).getDate()));
  return (
    <Div>
      {isLoading ? (
        "Loading Chart"
      ) : (
        <ApexChart
          width="100%"
          type="line"
          series={[
            {
              name: "hi",
              data: data?.map((item) => Number(item.close)) as number[],
            },
          ]}
          options={{
            xaxis: {
              categories: data?.map((x) =>
                new Date(x.time_open).toLocaleDateString("en-US")
              ),
            },
          }}
        />
      )}
    </Div>
  );
}

export default CoinChart;
