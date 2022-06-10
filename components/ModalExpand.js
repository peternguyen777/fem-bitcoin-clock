import React from "react";

const ModalExpand = (props) => {
  return (
    <div
      className={`${
        props.day ? `bg-white/75 text-black` : `bg-black/75 text-white `
      } ${
        props.menuToggle ? `translate-y-0` : `translate-y-full `
      } z-40 w-full py-12 px-[26px] backdrop-blur-sm transition duration-300 ease-out md:flex md:py-[120px] md:pl-[64px] md:pr-0 lg:py-[74px] lg:pl-[165px]`}
    >
      <div className='mb-4 md:mb-0 md:mr-20 lg:mr-24 lg:border-r lg:border-charcoal/25 xl:w-[570px]'>
        <div className='mb-4 flex items-center justify-between md:mb-12 md:flex-col md:items-start lg:mb-[42px]'>
          <h6 className='text-[10px] font-normal tracking-[2px] md:text-[13px] md:tracking-[2.6px] lg:mb-[9px] lg:text-[15px] lg:leading-[28px] lg:tracking-[3px]'>
            {props.mode === "timeMode" ? "UTC Time" : "Block Height"}
          </h6>
          <h5 className='text-right text-[20px] leading-[24px] md:text-left md:text-[40px] md:leading-[48px] lg:mr-24 lg:text-[56px] lg:leading-[68px] xl:mr-0'>
            {props.mode === "timeMode"
              ? props.data.utcTime
              : props.marketData.blockHeight}
          </h5>
        </div>
        <div className='flex items-center justify-between md:flex-col md:items-start'>
          <h6 className='text-[10px] font-normal tracking-[2px] md:text-[13px] md:tracking-[2.6px] lg:mb-[9px] lg:text-[15px] lg:leading-[28px] lg:tracking-[3px]'>
            {props.mode === "timeMode"
              ? "Current Time Zone"
              : "Market Capitalization"}
          </h6>
          <h5 className='text-[20px] leading-[24px] md:text-[40px] md:leading-[48px] lg:text-[56px] lg:leading-[68px]'>
            {props.mode === "timeMode"
              ? `${props.data.abbreviation} ${props.data.utcOffset} `
              : `$${props.marketData.marketCapUsd}B`}
          </h5>
        </div>
      </div>
      <div>
        <div className='mb-4 flex items-center justify-between md:mb-12 md:flex-col md:items-start lg:mb-[42px]'>
          <h6 className='text-[10px] font-normal tracking-[2px] md:text-[13px] md:tracking-[2.6px] lg:mb-[9px] lg:text-[15px] lg:leading-[28px] lg:tracking-[3px]'>
            {props.mode === "timeMode" ? "Day of the Week" : "Price per BTC"}
          </h6>
          <h5 className='text-[20px] leading-[24px] md:text-[40px] md:leading-[48px] lg:text-[56px] lg:leading-[68px]'>
            {props.mode === "timeMode"
              ? props.data.dayOfWeek
              : `$${props.marketData.currentPrice}`}
          </h5>
        </div>
        <div className='flex items-center justify-between md:flex-col md:items-start'>
          <h6 className='text-[10px] font-normal tracking-[2px] md:text-[13px] md:tracking-[2.6px] lg:mb-[9px] lg:text-[15px] lg:leading-[28px] lg:tracking-[3px]'>
            {props.mode === "timeMode" ? "date" : "Sats per Dollar"}
          </h6>
          <h5 className='text-[20px] leading-[24px] md:text-[40px] md:leading-[48px] lg:text-[56px] lg:leading-[68px]'>
            {props.mode === "timeMode"
              ? props.data.date
              : props.marketData.satsPerDollar}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ModalExpand;
