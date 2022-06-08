import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ButtonSmall from "../components/ButtonSmall";
import BackgroundImages from "../components/BackgroundImages";
import ModalExpand from "../components/ModalExpand";

export default function Home() {
  const [day, setDay] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);

  const menuToggleHandler = () => {
    setMenuToggle(!menuToggle);
  };

  const dayToggleHandler = () => {
    setDay(!day);
  };

  return (
    <div>
      <Head>
        <title>Bitcoin Clock</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon-32x32.png' />
      </Head>

      <main className='relative select-none'>
        <div className='absolute z-20 flex h-full w-full flex-col justify-end overflow-hidden'>
          <div
            className={`${
              menuToggle
                ? `xl:my-auto xl:pt-0 xl:pb-0`
                : `h-full xl:pt-14 xl:pb-24`
            } flex w-full flex-col justify-between px-[26px] pt-8 pb-10 sm:pl-16 sm:pr-32 sm:pt-20 sm:pb-16 xl:px-[165px] `}
          >
            <div
              className={`${
                menuToggle && `hidden`
              } flex justify-between xl:justify-start`}
            >
              <div>
                <p className='mb-2 text-[12px] leading-[22px] text-white sm:mb-3 sm:text-[18px] sm:leading-[28px] xl:w-[540px]'>
                  “The science of operations, as derived from mathematics more
                  especially, is a science of itself, and has its own abstract
                  truth and value.”
                </p>
                <p className='text-[12px] font-bold leading-[22px] text-white sm:text-[18px] sm:leading-[28px]'>
                  Ada Lovelace
                </p>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='ml-4 w-[18px] cursor-pointer fill-[#fff] pt-2 opacity-50 hover:opacity-100'
                  onClick={dayToggleHandler}
                >
                  <path d='M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z' />
                </svg>
              </div>
            </div>
            <div className='xl:flex xl:items-end xl:justify-between'>
              <div>
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
                  <h6 className='ml-4 leading-[25px] tracking-[3px] text-white xl:text-[20px] xl:leading-[28px] xl:tracking-[4px]'>
                    {day ? "Good Morning" : "Good Evening"}
                    <span className='hidden sm:inline-block'>{`, It's Currently`}</span>
                  </h6>
                </div>
                <div className='mb-4'>
                  <h1 className='inline-block align-baseline text-[100px] leading-[100px] text-white sm:text-[175px] sm:leading-[175px] xl:text-[200px] xl:leading-[200px]'>
                    23:37
                    <span className='font-inter text-[15px] font-light uppercase leading-[28px] tracking-[0px] text-white sm:text-[32px] sm:leading-[28px] xl:text-[40px]'>
                      BST
                    </span>
                  </h1>
                </div>
                <h6 className='mb-12 font-bold text-white sm:tracking-[3.6px] xl:mb-0 xl:text-[24px] xl:leading-[28px] xl:tracking-[4.8px]'>
                  in LONDON, UK
                </h6>
              </div>
              <ButtonSmall expander={menuToggle} onClick={menuToggleHandler} />
            </div>
          </div>
          {menuToggle && <ModalExpand day={day} menuToggle={menuToggle} />}{" "}
        </div>
        <div className='absolute z-10 h-screen w-full bg-black opacity-40'></div>

        <BackgroundImages day={day} />
      </main>

      <footer></footer>
    </div>
  );
}
