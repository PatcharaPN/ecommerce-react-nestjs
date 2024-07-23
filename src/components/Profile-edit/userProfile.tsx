// Modal.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import "./userProfile.css";
import ImageUpload from "../../pages/StorePage/components/StoreDescription/Store-Logo";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { User } from "../../types/types";
import { UpdateUser } from "../../app/features/authSlice";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.currentUser);
  const [update, setUpdate] = useState<User>({
    _id: user?._id || "",
    username: user?.username || "",
    email: user?.email || "",
    date: user?.dateOfBirth || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (user && user._id) {
      dispatch(
        UpdateUser({
          _id: user._id,
          username: update.username,
          date: update.date,
          email: update.email,
        })
      );
      onClose();
    }
  };

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
              <form onSubmit={handleUpdate} className="user-form">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-input"
                  value={update.username}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                  value={update.email}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  className="form-input"
                  value={update.date}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
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
