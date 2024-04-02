// components/Stadium/CustomAlert.tsx
import React from 'react';

interface CustomAlertProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="alert">
      <p>{message}</p>
      <div className="alert-buttons">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CustomAlert;
