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
                    "min-w-[150px]  flex-none rounded-t-md border-l border-r border-t p-2  outline-0 ",
                    selected
                      ? "bg-primary-500 text-white"
                      : "bg-background-500 text-primary-500"
                  )
                }
                onClick={() => onClick(tab.label)}
              >
                {tab.label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="border border-slate-200 bg-background-500">
            {children}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default Tabs;
