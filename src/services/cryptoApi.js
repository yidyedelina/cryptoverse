import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const cryptoHeaders = {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "40530449dbmsh58a18cb6270cd74p100f44jsnecb3f27ec96d",
};
const baseUrl = "https://coinranking1.p.rapidapi.com";
const createRequest = (url)=> ({url, headers:cryptoHeaders})
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
            
        }),
      getCryptoDetails: builder.query({
        query: (coinId) => createRequest(`/coin/${coinId}`),
      }),
      getCryptoHistory: builder.query({
        query: ({coinId,timeperiod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`),
      })
    })
})
export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi;

