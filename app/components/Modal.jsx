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
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className={`mx-auto flex min-h-full w-full items-center justify-center p-4 text-center ${pModalClass}`}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`relative w-full transform overflow-hidden  rounded-2xl bg-white p-7 text-left align-middle shadow-xl transition-all ${previewClass}`}
                >
                  {label && (
                    <Dialog.Title
                      as="h3"
                      className="mb-1 text-center text-lg font-medium leading-6 text-slate-900"
                    >
                      {label}
                    </Dialog.Title>
                  )}
                  {closeModal && (
                    <button
                      iconBefore
                      className=" absolute right-3 top-3 rounded-full p-2 font-bold text-primary-500"
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
