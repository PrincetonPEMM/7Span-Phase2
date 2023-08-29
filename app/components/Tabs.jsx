"use client";
import { Tab } from "@headlessui/react";

const Tabs = ({ tabs, children, tabIndex = 0, onClick }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div className="grid md:block">
        <Tab.Group defaultIndex={tabIndex}>
          <Tab.List className="overfow-x-auto flex w-full items-center space-x-2 overflow-x-auto">
            {tabs?.map((tab, index) => (
              <Tab
                key={"tab" + index}
                className={({ selected }) =>
                  classNames(
                    "min-w-[100px] flex-none border-b text-primary-500 border-transparent rounded-t-md ml-1 p-2 outline-0",
                    selected ? " border-b-primary-500" : "border-b-transparent"
                  )
                }
                onClick={() => onClick(tab.label)}
              >
                {tab.label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className=" bg-offWhite-500">{children}</Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default Tabs;
