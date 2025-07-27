"use client";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/">
        <div className="cursor-pointer text-center font-thin text-2xl sm:text-4xl md:text-6xl">
          NextPrice
        </div>
      </Link>
      <div className="text-center font-thin text-xs">
        Prophet Based Time-Series Forecasting for Stock
      </div>
    </>
  );
};

export default Logo;
