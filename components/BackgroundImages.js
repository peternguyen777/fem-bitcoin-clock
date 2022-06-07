import React from "react";
import Image from "next/image";

const BackgroundImages = (props) => {
  return (
    <React.Fragment>
      {props.day ? (
        <>
          <div className='relative h-screen w-full overflow-hidden sm:hidden'>
            <Image
              src='/mobile/bg-image-daytime.jpg'
              alt=''
              layout='fill'
              objectFit='cover'
              quality={100}
            />
          </div>
          <div className='relative hidden h-screen w-full overflow-hidden sm:flex lg:hidden'>
            <Image
              src='/tablet/bg-image-daytime.jpg'
              alt=''
              layout='fill'
              objectFit='cover'
              quality={100}
            />
          </div>
          <div className='relative hidden h-screen w-full overflow-hidden lg:flex'>
            <Image
              src='/desktop/bg-image-daytime.jpg'
              alt=''
              layout='fill'
              objectFit='cover'
              quality={100}
            />
          </div>
        </>
      ) : (
        <>
          <div className='relative h-screen w-full overflow-hidden sm:hidden'>
            <Image
              src='/mobile/bg-image-nighttime.jpg'
              alt=''
              layout='fill'
              objectFit='cover'
              quality={100}
            />
          </div>
          <div className='relative hidden h-screen w-full sm:flex lg:hidden'>
            <Image
              src='/tablet/bg-image-nighttime.jpg'
              alt=''
              layout='fill'
              objectFit='cover'
              quality={100}
            />
          </div>
          <div className='relative hidden h-screen w-full overflow-hidden lg:flex'>
            <Image
              src='/desktop/bg-image-nighttime.jpg'
              alt=''
              layout='fill'
              objectFit='cover'
              quality={100}
            />
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default BackgroundImages;
