import useSWR from "swr";

const URL =
  "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

const COURSE_PRICE = 15;

export const useEthPrice = () => {
  const { data, ...rest } = useSWR<{
    market_data: { current_price: { usd: string } };
  }>(URL, { refreshInterval: 10000 });
  // console.log("d", data?.market_data.current_price.usd);
  const perItem =
    (data?.market_data.current_price.usd &&
      COURSE_PRICE / Number(data?.market_data.current_price.usd)) ??
    null;
  return {
    eth: { data, perItem, ...rest },
  };
};
