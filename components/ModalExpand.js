import React from "react";

const ModalExpand = (props) => {
  return (
    <div
      className={`${
        props.day ? `bg-white/75 text-black` : `bg-black/75 text-white `
      } ${
        props.menuToggle ? `translate-y-0` : `translate-y-full `
      } z-40 w-full transform py-12 px-[26px] backdrop-blur-sm transition duration-300 ease-out sm:flex sm:py-[120px] sm:pl-[64px] sm:pr-0 lg:py-[74px] lg:pl-[165px]`}
    >
      <div className='mb-4 sm:mb-0 sm:mr-20 lg:mr-24 lg:border-r lg:border-charcoal/25 xl:w-[570px]'>
        <div className='mb-4 flex items-center justify-between sm:mb-12 sm:flex-col sm:items-start lg:mb-[42px]'>
          <h6 className='text-[10px] font-normal tracking-[2px] sm:text-[13px] sm:tracking-[2.6px] lg:mb-[9px] lg:text-[15px] lg:leading-[28px] lg:tracking-[3px]'>
            Current Time Zone
          </h6>
          <h5 className='text-right text-[20px] leading-[24px] sm:text-left sm:text-[40px] sm:leading-[48px] lg:mr-24 lg:text-[56px] lg:leading-[68px] xl:mr-0'>
            Europe, London
          </h5>
        </div>
        <div className='flex items-center justify-between sm:flex-col sm:items-start'>
          <h6 className='text-[10px] font-normal tracking-[2px] sm:text-[13px] sm:tracking-[2.6px] lg:mb-[9px] lg:text-[15px] lg:leading-[28px] lg:tracking-[3px]'>
            Day of the Year
          </h6>
          <h5 className='text-[20px] leading-[24px] sm:text-[40px] sm:leading-[48px] lg:text-[56px] lg:leading-[68px]'>
            295
          </h5>
        </div>
      </div>
      <div>
        <div className='mb-4 flex items-center justify-between sm:mb-12 sm:flex-col sm:items-start lg:mb-[42px]'>
          <h6 className='text-[10px] font-normal tracking-[2px] sm:text-[13px] sm:tracking-[2.6px] lg:mb-[9px] lg:text-[15px] lg:leading-[28px] lg:tracking-[3px]'>
            Day of the Week
          </h6>
          <h5 className='text-[20px] leading-[24px] sm:text-[40px] sm:leading-[48px] lg:text-[56px] lg:leading-[68px]'>
            5
          </h5>
        </div>
        <div className='flex items-center justify-between sm:flex-col sm:items-start'>
          <h6 className='text-[10px] font-normal tracking-[2px] sm:text-[13px] sm:tracking-[2.6px] lg:mb-[9px] lg:text-[15px] lg:leading-[28px] lg:tracking-[3px]'>
            Week Number
          </h6>
          <h5 className='text-[20px] leading-[24px] sm:text-[40px] sm:leading-[48px] lg:text-[56px] lg:leading-[68px]'>
            42
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ModalExpand;
