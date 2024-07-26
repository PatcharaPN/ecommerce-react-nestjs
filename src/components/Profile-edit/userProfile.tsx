import React, { useState, ChangeEvent, FormEvent } from "react";
import "./userProfile.css";
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
  const [file, setFile] = useState<File | null>(null);
  const [update, setUpdate] = useState<User>({
    _id: user?._id || "",
    username: user?.username || "",
    email: user?.email || "",
    date: user?.dateOfBirth || "",
    userImage: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("_id", update._id);
      if (update.username) form.append("username", update.username);
      if (update.email) form.append("email", update.email);
      if (update.date) form.append("date", update.date);
      if (file) form.append("image", file);

      for (let pair of form.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const updatedUser = await dispatch(UpdateUser(form)).unwrap();

      const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
      const mergedUserData = {
        ...existingUser,
        username: updatedUser.username || existingUser.username,
        email: updatedUser.email || existingUser.email,
        userImage: updatedUser.userImage || existingUser.userImage,
      };

      localStorage.setItem("user", JSON.stringify(mergedUserData));
      onClose();
    } catch (error) {
      console.error("An error occurred while updating the user", error);
    }
  };
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUpdate({
        ...update,
        userImage: URL.createObjectURL(selectedFile),
      });
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
              {update.userImage && (
                <img className="user-image" src={update.userImage} alt="User" />
              )}{" "}
              <input type="file" onChange={handleUpload} />
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
                  name="date"
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
