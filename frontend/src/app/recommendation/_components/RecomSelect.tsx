"use client"
import { ChangeEvent, useState } from 'react';

type RecomProp = {
    username: string,
}

export default function RecomSelect(username:RecomProp) {
  const categories = ["adventure", "romance", "kids", "animals"];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const category = event.target.id.replace('vertical-list-', '');
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    }
  };


  const handleSave = async () => {
    console.log(selectedCategories); // This will log the array of selected categories
    // Perform any save operation here, such as sending to a server

  };

  return (
    <div className="mt-16 flex flex-col w-full justify-center items-center py-5">
      <p className="text-3xl m-3">Choose the category you like!</p>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <nav className="flex min-w-[400px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          {categories.map((category) => (
            <div
              role="button"
              className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              key={category}
            >
              <label htmlFor={`vertical-list-${category}`} className="flex items-center w-full px-3 py-2 cursor-pointer">
                <div className="grid mr-3 place-items-center">
                  <div className="inline-flex items-center">
                    <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor={`vertical-list-${category}`}>
                      <input
                        id={`vertical-list-${category}`}
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                        onChange={handleCheckboxChange}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                </div>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {category}
                </p>
              </label>
            </div>
          ))}
        </nav>
        <button onClick={handleSave} className="text-center hover:bg-gray-100 border bg-white rounded-md py-1 px-6 h-25 text-base">Save</button>
      </div>
    </div>
  );
}
