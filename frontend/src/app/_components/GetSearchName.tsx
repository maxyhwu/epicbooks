"use client";

import { useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";

export default function GetSerachName() {
  const searchInputRef = useRef<HTMLInputElement>(null);;
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const searchString = searchInputRef.current?.value;
    const params = new URLSearchParams(searchParams);
    params.set("searchName", searchString!);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-wrap items-stretch gap-5">
      <input
        type="search"
        className="relative placeholder-gray-400 m-0 -mr-0.5 bg-buttons block w-[20%] min-w-0 flex-auto rounded-md border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-teal-900 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-teal-900 dark:text-gray-400 "
        placeholder="Search Book"
        aria-label="Search"
        aria-describedby="button-addon1"
        ref={searchInputRef}
      >
      </input>

      <button
        className="hover:shadow-xs relative z-[2] border border-black bg-buttons flex items-center rounded-md px-6 py-2.5 text-xs font-medium shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
        type="button"
        id="button-addon1"
        onClick={handleSearch}
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <Search />
      </button>
    </div>
  );
}
