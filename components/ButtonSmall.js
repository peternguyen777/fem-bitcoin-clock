import React from "react";
import Image from "next/image";

const ButtonSmall = (props) => {
  return (
    <div
      className='flex h-[39px] w-[115px] items-center justify-between rounded-full bg-white pl-[17px] pr-[4px] sm:h-[56px] sm:w-[146px] sm:pl-[21px] sm:pr-[9px]'
      onClick={props.onClick}
    >
      <h6 className='text-[12px] font-bold leading-[14px] tracking-[3.75px] opacity-50 sm:text-[16px] sm:leading-[28px] sm:tracking-[5px]'>
        {props.expander ? "LESS" : "MORE"}
      </h6>
      <div className='relative flex h-[32px] w-[32px] items-center justify-center rounded-full bg-charcoal hover:bg-[#999999] sm:h-[40px] sm:w-[40px]'>
        {props.expander ? (
          <svg
            width='40'
            height='40'
            xmlns='http://www.w3.org/2000/svg'
            className=''
          >
            <g fill='none' fill-rule='evenodd'>
              {/* <circle fill='#303030' cx='20' cy='20' r='20' /> */}
              <path stroke='#FFF' stroke-width='2' d='M14 23l6-6 6 6' />
            </g>
          </svg>
        ) : (
          <svg width='14' height='9' xmlns='http://www.w3.org/2000/svg'>
            <path stroke='#FFF' stroke-width='2' fill='none' d='m1 1 6 6 6-6' />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ButtonSmall;
