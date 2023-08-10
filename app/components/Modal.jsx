"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Modal = ({
  isOpen,
  modalClose,
  children,
  previewClass,
  pModalClass,
  label,
  closeModal,
}) => {
  const close = () => {};
  return (
    <>
      <Transition appear show={isOpen} as={Fragment} onClose={close}>
        <Dialog as="div" className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="pc-ease-out pc-duration-300"
            enterFrom="pc-opacity-0"
            enterTo="pc-opacity-100"
            leave="pc-ease-in pc-duration-200"
            leaveFrom="pc-opacity-100"
            leaveTo="pc-opacity-0"
          >
            <div className="pc-fixed pc-inset-0 pc-z-50 pc-bg-black pc-bg-opacity-25" />
          </Transition.Child>

          <div className="pc-fixed pc-inset-0 pc-z-50 pc-overflow-y-auto">
            <div
              className={`pc-mx-auto pc-flex pc-min-h-full pc-w-full pc-items-center pc-justify-center pc-p-4 pc-text-center ${pModalClass}`}
            >
              <Transition.Child
                as={Fragment}
                enter="pc-ease-out pc-duration-300"
                enterFrom="pc-opacity-0 pc-scale-95"
                enterTo="pc-opacity-100 pc-scale-100"
                leave="pc-ease-in pc-duration-200"
                leaveFrom="pc-opacity-100 pc-scale-100"
                leaveTo="pc-opacity-0 pc-scale-95"
              >
                <Dialog.Panel
                  className={`pc-relative pc-w-full pc-transform pc-overflow-hidden  pc-rounded-2xl pc-bg-white pc-p-7 pc-text-left pc-align-middle pc-shadow-xl pc-transition-all ${previewClass}`}
                >
                  {label && (
                    <Dialog.Title
                      as="h3"
                      className="pc-mb-1 pc-text-center pc-text-lg pc-font-medium pc-leading-6 pc-text-slate-900"
                    >
                      {label}
                    </Dialog.Title>
                  )}
                  {closeModal && (
                    <button
                      iconBefore
                      className=" pc-absolute pc-right-3 pc-top-3 pc-rounded-full pc-p-2 pc-font-bold pc-text-primary-500"
                      onClick={modalClose}
                    >
                      Modal close
                    </button>
                  )}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
