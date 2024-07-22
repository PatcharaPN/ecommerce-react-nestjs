// Modal.tsx
import React, { ReactNode } from "react";
import "./userProfile.css";
import ImageUpload from "../../pages/StorePage/components/StoreDescription/Store-Logo";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-user" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Profile</h2>
        <div className="modal-edit">
          <div className="user-image-wrapper">
            <div className="imageupload">
              <ImageUpload />
            </div>
          </div>
          <div className="form-wrapper">
            <div className="user-edit-form">
              <form action="" className="user-form">
                <input
                  type="text"
                  placeholder="Username"
                  className="form-input"
                />
                <input type="text" placeholder="Email" className="form-input" />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  className="form-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-input"
                />
                <button type="submit" className="create-btn">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
