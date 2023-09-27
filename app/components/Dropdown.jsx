import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import MdiChevronDown from "@assets/icons/MdiChevronDown";
import { useRouter } from "next/navigation";

const Dropdown = ({
  selected,
  setSelected,
  options,
  title,
  isMultiple = false,
}) => {
  const route = useRouter();
  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        if (title === "All Paintings") {
          route.push(e?.key);
        } else setSelected(e);
      }}
      multiple={isMultiple}
    >
      <div className="relative">
        <Listbox.Button className="option-box relative w-full rounded-md cursor-default text-xs bg-primary-500 text-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-offWhite-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ">
          <span className="block truncate">
            {title === "Date of Paintings"
              ? title
              : selected?.value
              ? selected?.value
              : title}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <MdiChevronDown
              className="h-5 w-5 text-offWhite-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="option-box-option absolute mt-1 max-h-60 z-30 overflow-auto inset-x-0 rounded-md bg-primary-500 text-white py-1 text-xs xl:min-w-full shadow-lg xl:right-0 xl:left-auto ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((item, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none transition-all py-2 pl-6 ${
                    title !== "All Paintings" && "lg:pl-8"
                  }  pr-2 lg:pr-4 ${
                    active ? "bg-offWhite-400 text-black" : "text-offwhite-500"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.value}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-secondary-500 lg:pl-3">
                        <CheckIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default React.memo(Dropdown);
