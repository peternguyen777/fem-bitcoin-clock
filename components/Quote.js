import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Quote = (props) => {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const quoteToggleHandler = async () => {
    let randomQuoteInt = Math.floor(Math.random() * quotes.length);

    setCurrentQuote({
      id: quotes[randomQuoteInt]?.id,
      quote: quotes[randomQuoteInt]?.quote,
    });
  };

  useEffect(() => {
    quoteToggleHandler();
  }, [quotes]);

  return (
    <AnimatePresence>
      {!props.menuToggle && (
        <div className='absolute z-30 flex w-full landscape:hidden lg:landscape:block'>
          <div className='px-[26px] pt-8 pb-10 md:pl-16 md:pr-32 md:pt-20 md:pb-16 lg:px-[165px]'>
            <motion.div
              className='flex justify-start'
              variants={props.containerVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
            >
              <motion.div
                className='pr-4'
                key={currentQuote.id}
                variants={props.containerVariants}
                initial='hidden'
                animate='visible'
              >
                <p className='mb-2 w-[290px] text-[12px] leading-[22px] text-white md:mb-3 md:w-[540px] md:text-[16px] md:leading-[26px] lg:text-[18px] lg:leading-[28px]'>
                  {currentQuote.quote}
                </p>
                <p className='text-[12px] font-bold leading-[22px] text-white md:text-[16px] md:leading-[26px] lg:text-[18px] lg:leading-[28px]'>
                  Satoshi Nakamoto
                </p>
              </motion.div>
              <div>
                <motion.svg
                  width='18'
                  height='18'
                  xmlns='http://www.w3.org/2000/svg'
                  className='cursor-pointer fill-[#fff] opacity-50 hover:opacity-100'
                  onClick={quoteToggleHandler}
                  whileHover={{ rotate: 180 }}
                  transition={{
                    ease: "easeOut",
                  }}
                >
                  <path d='M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z' />
                </motion.svg>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Quote;
