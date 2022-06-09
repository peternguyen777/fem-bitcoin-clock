import Head from "next/head";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import ButtonSmall from "../components/ButtonSmall";
import BackgroundImages from "../components/BackgroundImages";
import ModalExpand from "../components/ModalExpand";
import moment from "moment";

export default function Home() {
  const [day, setDay] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [mode, setMode] = useState("satsMode");

  const [quotes, setQuotes] = useState([]);
  const [worldTime, setWorldTime] = useState({});
  const [marketData, setMarketData] = useState([]);

  const [currentQuote, setCurrentQuote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const menuToggleHandler = () => {
    setMenuToggle(!menuToggle);
  };

  const modeToggleHandler = () => {
    if (mode === "timeMode") {
      setMode("satsMode");
    } else if (mode === "satsMode") {
      setMode("timeMode");
    }
  };

  const fetchQuotesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://satoshi-quotes-default-rtdb.asia-southeast1.firebasedatabase.app/quotes.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedQuotes = await data.map((quote) => {
        return {
          id: quote.id,
          quote: quote.en,
        };
      });

      setQuotes(transformedQuotes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchQuotesHandler();
  }, [fetchQuotesHandler]);

  const fetchTimeHandler = useCallback(async () => {
    try {
      const response = await fetch("https://worldtimeapi.org/api/ip/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      //parse location eg. Sydney, Australia
      let text = data.timezone;
      let myArray = text.split("/").reverse();
      let timeZone = myArray.join(", ");
      // let timeZone = myArray[0];

      //parse time (eg. 12:44) and AM/PM
      let str = data.datetime;
      let time = moment(str).format("HH:mm");
      let ampm = moment(str).format("A");

      const transformedWorldTime = {
        timezone: timeZone,
        time: time,
        ampm: ampm,
        abbreviation: data.abbreviation,
        dayOfYear: data.day_of_year,
        dayOfWeek: data.day_of_week,
        weekNumber: data.week_number,
      };

      setWorldTime(transformedWorldTime);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchTimeHandler();
  }, [fetchTimeHandler]);

  setInterval(() => {
    fetchTimeHandler();
  }, 30000);

  useEffect(() => {
    //parse the time to hours
    let HH = worldTime.time;
    let hours = parseFloat(HH);

    if (hours >= 0 && hours < 6) {
      setDay(false);
      setTimeOfDay("Morning");
    } else if (hours >= 6 && hours < 12) {
      setDay(true);
      setTimeOfDay("Morning");
    } else if (hours >= 12 && hours < 18) {
      setDay(true);
      setTimeOfDay("Afternoon");
    } else if (hours >= 18) {
      setDay(false);
      setTimeOfDay("Evening");
    }
  }, [worldTime.time]);

  const quoteToggleHandler = async () => {
    let randomQuoteInt = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomQuoteInt]?.quote);
  };

  useEffect(() => {
    quoteToggleHandler();
  }, [quotes]);

  useEffect(() => {
    const fetchMarketDataHandler = async () => {
      const data = await Promise.all([
        fetch("https://api.coingecko.com/api/v3/coins/bitcoin").then(
          (response) => response.json()
        ),
        fetch("https://blockchain.info/q/getblockcount").then((response) =>
          response.json()
        ),
      ]);

      let satsPerDollar = Math.round(
        100000000 / data[0].market_data.current_price["usd"]
      );

      let satsString = satsPerDollar.toString();
      let satsTime = satsString.slice(0, 2) + ":" + satsString.slice(2);

      const transformedMarketData = {
        currentPrice: data[0].market_data.current_price["usd"],
        satsPerDollar,
        satsTime,
        marketCapUsd: parseInt(
          data[0].market_data.market_cap["usd"] / 1000000000
        ),
        blockHeight: data[1],
      };

      setMarketData(transformedMarketData);
    };

    fetchMarketDataHandler();
  }, []);

  return (
    <div>
      <Head>
        <title>Bitcoin Clock</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon-32x32.png' />
      </Head>

      <main className='relative select-none overflow-hidden'>
        <div
          className={`absolute z-20 flex h-full w-full flex-col ${
            menuToggle ? `justify-end` : `justify-between`
          }`}
        >
          <div
            className={`${
              menuToggle
                ? `lg:my-auto lg:pt-0 lg:pb-0`
                : `h-full justify-between lg:pt-14 lg:pb-24`
            } flex w-full flex-col px-[26px] pt-8 pb-10 md:pl-16 md:pr-32 md:pt-20 md:pb-16 lg:px-[165px] `}
          >
            <div
              className={`${
                menuToggle && `hidden`
              } flex justify-between lg:justify-start`}
            >
              <div>
                <p className='mb-2 text-[12px] leading-[22px] text-white md:mb-3 md:text-[18px] md:leading-[28px] lg:w-[540px]'>
                  {currentQuote}
                </p>
                <p className='text-[12px] font-bold leading-[22px] text-white md:text-[18px] md:leading-[28px]'>
                  Satoshi Nakamoto
                </p>
              </div>
              <div className='h-[18px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='ml-4 w-[18px] cursor-pointer fill-[#fff] pt-2 opacity-50 hover:opacity-100'
                  onClick={quoteToggleHandler}
                >
                  <path d='M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z' />
                </svg>
              </div>
            </div>
            <div className='transform transition duration-300 ease-out lg:flex lg:items-end lg:justify-between'>
              <div onClick={modeToggleHandler} className='cursor-pointer'>
                <div className='mb-4 flex items-center'>
                  {day ? (
                    <Image
                      src='/desktop/icon-sun.svg'
                      alt=''
                      height={24}
                      width={24}
                    />
                  ) : (
                    <Image
                      src='/desktop/icon-moon.svg'
                      alt=''
                      height={24}
                      width={23}
                    />
                  )}
                  <h6 className='ml-4 leading-[25px] tracking-[3px] text-white lg:text-[20px] lg:leading-[28px] lg:tracking-[4px]'>
                    Good {timeOfDay}
                    <span className='hidden md:inline-block'>{`, It's Currently`}</span>
                  </h6>
                </div>
                <div className='mb-4'>
                  <h1 className='inline-block align-baseline text-[100px] leading-[100px] text-white md:text-[175px] md:leading-[175px] lg:text-[200px] lg:leading-[200px]'>
                    {mode === "timeMode" ? worldTime.time : marketData.satsTime}
                    <span className='pl-2 font-inter text-[15px] font-light uppercase leading-[28px] tracking-[0px] text-white md:text-[32px] md:leading-[28px] lg:text-[40px]'>
                      {mode === "timeMode" ? worldTime.abbreviation : "SATS"}
                    </span>
                  </h1>
                </div>
                <h6 className='mb-12 font-bold text-white md:tracking-[3.6px] lg:mb-0 lg:text-[24px] lg:leading-[28px] lg:tracking-[4.8px]'>
                  in{" "}
                  {mode === "timeMode" ? worldTime.timezone : "MOSCOW, RUSSIA"}
                </h6>
              </div>
              <div className='relative'>
                <ButtonSmall
                  expander={menuToggle}
                  onClick={menuToggleHandler}
                />
              </div>
            </div>
          </div>
          {menuToggle && (
            <ModalExpand
              day={day}
              menuToggle={menuToggle}
              data={worldTime}
              marketData={marketData}
              mode={mode}
            />
          )}
        </div>
        <div className='absolute z-10 h-screen w-full bg-black opacity-40'></div>
        {!isLoading && <BackgroundImages day={day} />}
      </main>

      <footer></footer>
    </div>
  );
}
