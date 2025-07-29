"use client";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <div className="cursor-pointer text-center font-thin text-2xl sm:text-4xl md:text-6xl dark:text-red">
        <Link href="/">NextPrice</Link>
      </div>
      <div className="text-center font-thin text-xs ">
        Prophet Based Time-Series Forecasting for Stock
      </div>
    </>
  );
};

export default Logo;
