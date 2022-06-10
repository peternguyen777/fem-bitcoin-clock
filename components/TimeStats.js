import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ModalExpand from "./ModalExpand";
import Image from "next/image";
import ButtonSmall from "./ButtonSmall";

const TimeStats = (props) => {
  const [mode, setMode] = useState("satsMode");
  const [marketData, setMarketData] = useState([]);

  const modeToggleHandler = () => {
    if (mode === "timeMode") {
      setMode("satsMode");
    } else if (mode === "satsMode") {
      setMode("timeMode");
    }
  };

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
    <div className={`absolute bottom-0 z-20 w-full`}>
      <motion.div
        className={`${
          props.menuToggle
            ? `lg:h-[calc(100vh-400px)] lg:justify-center lg:pb-0 lg:pt-0 lg:landscape:pb-0`
            : `translate-y-[256px] md:translate-y-[440px] lg:translate-y-[400px] lg:pt-14 lg:pb-24 lg:landscape:pb-24`
        } flex flex-col px-[26px] pt-8 pb-10 transition duration-300 ease-out  md:pl-16 md:pr-32 md:pt-20 md:pb-16 lg:px-[165px] md:landscape:pt-0 md:landscape:pb-0 `}
        variants={props.containerVariants}
        initial='hidden'
        animate='visible'
      >
        <div onClick={modeToggleHandler} className='cursor-pointer'>
          <div className='mb-4 flex items-center'>
            {props.day ? (
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
            <h6 className='ml-4 leading-[25px] tracking-[3px] text-white md:text-[18px] md:leading-[28px] md:tracking-[3.6px] lg:text-[20px] lg:leading-[28px] lg:tracking-[4px]'>
              Good {props.timeOfDay}
              <span className='hidden md:inline-block'>{`, It's Currently`}</span>
            </h6>
          </div>
          <div className='mb-4'>
            <h1 className='inline-block align-baseline text-[100px] leading-[100px] text-white md:text-[175px] md:leading-[175px] lg:text-[200px] lg:leading-[200px]'>
              {mode === "timeMode" ? props.worldTime.time : marketData.satsTime}
            </h1>
          </div>
          <h6 className='mb-12 font-bold text-white md:text-[18px] md:leading-[28px] md:tracking-[3.6px] lg:mb-0 lg:text-[24px] lg:leading-[28px] lg:tracking-[4.8px]'>
            in{" "}
            {mode === "timeMode" ? props.worldTime.timezone : "MOSCOW, RUSSIA"}
          </h6>
        </div>
        <div className='relative landscape:hidden lg:landscape:block'>
          <ButtonSmall
            expander={props.menuToggle}
            onClick={props.menuToggleHandler}
          />
        </div>
      </motion.div>

      <ModalExpand
        day={props.day}
        menuToggle={props.menuToggle}
        data={props.worldTime}
        marketData={marketData}
        mode={mode}
      />
    </div>
  );
};

export default TimeStats;
