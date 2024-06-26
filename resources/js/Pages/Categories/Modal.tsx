import React, { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button
          className="absolute top-0 right-0 m-4"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
