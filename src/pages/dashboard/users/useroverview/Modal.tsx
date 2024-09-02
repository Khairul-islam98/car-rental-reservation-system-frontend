/* eslint-disable @typescript-eslint/ban-ts-comment */
 {/* @ts-ignore */}
const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full dark:text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
  

export default Modal;