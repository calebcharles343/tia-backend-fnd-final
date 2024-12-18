import React, { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { closeModal, openModal } from "../store/modalSlice"; // Redux slice

function Modal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Component to trigger modal opening
interface OpenProps {
  children: React.ReactElement;
  open: string;
}

function Open({ children, open }: OpenProps) {
  const dispatch = useDispatch();

  return React.cloneElement(children, {
    onClick: () => dispatch(openModal(open)),
  });
}

// Component for modal window
function Window({ children, name }: { children: ReactNode; name: string }) {
  const dispatch = useDispatch();
  const { openName } = useSelector((state: any) => state.modal); // Replace `any` with your root state type
  // const { ref } = useOutsideClick(() => dispatch(closeModal()));

  if (name !== openName) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      // Apply ref only to the backdrop
    >
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
