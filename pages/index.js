import Head from "next/head";
import { useState, useCallback, useEffect } from "react";
import BackgroundImages from "../components/BackgroundImages";
import moment from "moment";
import Quote from "../components/Quote";
import TimeStats from "../components/TimeStats";

export default function Home() {
  const [day, setDay] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [worldTime, setWorldTime] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const menuToggleHandler = () => {
    setMenuToggle(!menuToggle);
  };

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

      //parse time (eg. 12:44) and AM/PM
      let str = data.datetime;
      let time = moment(str).format("HH:mm");

      // let dayInWeek;

      let weekday = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      //parse day name
      if (data.day_of_week === 0) {
        var dayInWeek = 6;
      } else {
        var dayInWeek = data.day_of_week - 1;
      }

      let dayOfWeek = weekday[dayInWeek];

      //parse date
      let date = moment(str).format("DD MMMM YYYY");

      //parse UTC Time
      let utcTime = moment(str).utc().format("HH:mm");

      const transformedWorldTime = {
        timezone: timeZone,
        time,
        utcTime,
        abbreviation: data.abbreviation,
        date,
        dayOfWeek,
        utcOffset: data.utc_offset,
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

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      <Head>
        <title>Bitcoin Clock</title>
        <meta name='description' content='Generated by create next app' />
        {!day && <meta name='theme-color' content='#2a2a2a' />}

        <link rel='icon' href='/favicon-32x32.png' />
      </Head>

      <main className='relative select-none overflow-hidden'>
        {/* Quotes Panel */}
        <Quote menuToggle={menuToggle} containerVariants={containerVariants} />

        {/* Time Stats Panel */}
        <TimeStats
          containerVariants={containerVariants}
          menuToggle={menuToggle}
          menuToggleHandler={menuToggleHandler}
          day={day}
          worldTime={worldTime}
          timeOfDay={timeOfDay}
        />

        {/* Transparent Dark BG */}
        <div className='absolute z-10 h-screen w-full bg-black opacity-40'></div>
        {!isLoading && <BackgroundImages day={day} />}
      </main>

      <footer></footer>
    </div>
  );
}
