import React from "react";
import { motion } from "framer-motion";

const ButtonSmall = (props) => {
  return (
    <motion.div
      className='flex h-[39px] w-[115px] cursor-pointer items-center justify-between rounded-full bg-white pl-[17px] pr-[4px] sm:h-[56px] sm:w-[146px] sm:pl-[21px] sm:pr-[9px] lg:absolute lg:right-0 lg:bottom-0'
      onClick={props.onClick}
      whileHover={{ scale: 1.1 }}
    >
      <h6 className='select-none text-[12px] font-bold leading-[14px] tracking-[3.75px] opacity-50 sm:text-[16px] sm:leading-[28px] sm:tracking-[5px]'>
        {props.expander ? "LESS" : "MORE"}
      </h6>
      <div className='relative flex h-[32px] w-[32px] items-center justify-center rounded-full bg-charcoal transition duration-100 ease-out hover:bg-[#999999] sm:h-[40px] sm:w-[40px]'>
        {props.expander ? (
          <svg
            width='40'
            height='40'
            xmlns='http://www.w3.org/2000/svg'
            className='py-auto -translate-x-1 sm:translate-x-0'
          >
            <g fill='none' fillRule='evenodd'>
              <path stroke='#FFF' strokeWidth='2' d='M14 23l6-6 6 6' />
            </g>
          </svg>
        ) : (
          <svg
            width='14'
            height='9'
            xmlns='http://www.w3.org/2000/svg'
            className='py-auto px-auto'
          >
            <path stroke='#FFF' strokeWidth='2' fill='none' d='m1 1 6 6 6-6' />
          </svg>
        )}
      </div>
    </motion.div>
  );
};

export default ButtonSmall;
