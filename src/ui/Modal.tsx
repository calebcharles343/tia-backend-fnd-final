import React, { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { closeModal, openModal } from "../store/modalSlice.ts"; // Redux slice
import { RootState } from "../store/store.tsx";

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps): JSX.Element {
  return <>{children}</>;
}

// Component to trigger modal opening
interface OpenProps {
  children: React.ReactElement;
  open: string;
}

function Open({ children, open }: OpenProps): JSX.Element {
  const dispatch = useDispatch();

  return React.cloneElement(children, {
    onClick: () => dispatch(openModal(open)),
  });
}

// Component for modal window
interface WindowProps {
  children: ReactNode;
  name: string;
}

function Window({ children, name }: WindowProps): JSX.Element | null {
  const dispatch = useDispatch();
  const { openName } = useSelector((state: RootState) => state.modal);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 transition duration-500"
        onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the backdrop
      >
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#x2715; {/* Close Icon */}
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

// Assign subcomponents to Modal
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
