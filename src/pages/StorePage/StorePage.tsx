import React, { useEffect, useState } from "react";
import StoreProductList from "../../components/Store-product/StoreProduct-list";
import StoreProfile from "../../components/Store-Profile/StoreProfile";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { CreateStore, Store } from "../../types/types";
import "./StorePage.css";
import { createStore } from "../../app/features/productSlice";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
type Props = {};

function StorePage({}: Props) {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [store, setStore] = useState<Store | null>(null);
  const [currentUserId, setCurrentUser] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<CreateStore>({
    name: "",
    description: "",
    location: "",
    owner: "",
    storeimg: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const provinces = [
    "Bangkok",
    "Kanchanaburi",
    "Kalasin",
    "Kamphaeng Phet",
    "Khon Kaen",
    "Chanthaburi",
    "Chachoengsao",
    "Chonburi",
    "Chainat",
    "Chaiyaphum",
    "Chumphon",
    "Chiang Rai",
    "Chiang Mai",
    "Trang",
    "Trat",
    "Tak",
    "Nakhon Nayok",
    "Nakhon Pathom",
    "Nakhon Phanom",
    "Nakhon Ratchasima",
    "Nakhon Si Thammarat",
    "Nakhon Sawan",
    "Nonthaburi",
    "Narathiwat",
    "Nan",
    "Bueng Kan",
    "Buriram",
    "Pathum Thani",
    "Prachuap Khiri Khan",
    "Prachinburi",
    "Pattani",
    "Phra Nakhon Si Ayutthaya",
    "Phayao",
    "Phang Nga",
    "Phatthalung",
    "Phichit",
    "Phitsanulok",
    "Phetchaburi",
    "Phetchabun",
    "Phrae",
    "Phuket",
    "Maha Sarakham",
    "Mukdahan",
    "Mae Hong Son",
    "Yasothon",
    "Yala",
    "Ratchaburi",
    "Ranong",
    "Rayong",
    "Roi Et",
    "Lopburi",
    "Lampang",
    "Lamphun",
    "Loei",
    "Si Sa Ket",
    "Sakon Nakhon",
    "Songkhla",
    "Satun",
    "Samut Prakan",
    "Samut Songkhram",
    "Samut Sakhon",
    "Saraburi",
    "Sa Kaeo",
    "Sing Buri",
    "Sukhothai",
    "Suphan Buri",
    "Surat Thani",
    "Surin",
  ];

  useEffect(() => {
    const getUserId = localStorage.getItem("user");
    if (getUserId) {
      const user = JSON.parse(getUserId);
      setCurrentUser(user._id);
      if (user.store) {
        setStore(user.store);
      } else {
        setStore(null);
      }
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLSelectElement) {
      const target = e.target;
      if (target instanceof HTMLSelectElement) {
        const { name, value } = target;
        setFormData({
          ...formData,
          [name]: value,
          owner: currentUserId,
        });
      }
    } else if (target instanceof HTMLInputElement) {
      const { name, value } = target;
      setFormData({
        ...formData,
        [name]: value,
        owner: currentUserId,
      });
    }
  };
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData({
        ...formData,
        storeimg: URL.createObjectURL(selectedFile),
        owner: currentUserId,
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("location", formData.location);
      form.append("owner", currentUserId);

      if (file) {
        form.append("image", file);
      }

      const resultAction = await dispatch(createStore(form)).unwrap();
      console.log("Store creation result:", resultAction);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);

        const updatedStores = userData.store
          ? [...userData.store, resultAction]
          : [resultAction];

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userData,
            store: updatedStores,
          })
        );
        console.log("Updated store ID:", resultAction._id);
      }

      console.log("Navigating to:", `/store/${resultAction._id}`);
      navigate(`/store/${resultAction._id}`, { replace: true });
      window.location.reload();
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating store:", error);
    }
  };

  const filteredProvinces = provinces.filter((province) =>
    province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!store) {
    return (
      <div className="create-store-container">
        <p>Oop no store found on your account.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="createstore-btn"
          onClick={() => setOpenModal(true)}
        >
          Create
        </motion.button>

        <dialog className="backdrop" open={openModal}>
          <div className="create-store-modal">
            <div className="header-modal">
              <h1>Create Store</h1>
              <Icon
                width={40}
                height={40}
                icon="material-symbols:close"
                onClick={() => setOpenModal(false)}
              />
            </div>
            <div className="create-store-form">
              <div className="create-store-wrapper">
                <div className="imageupload">
                  <input
                    type="file"
                    name="storeimg"
                    id=""
                    onChange={handleUpload}
                  />
                </div>
              </div>
              <div className="create-store-form-wrapper">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Store name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search Provinces.. "
                    onChange={handleSearchChange}
                  />
                  <select
                    className="location-input"
                    name="location"
                    multiple
                    value={formData.location}
                    onChange={handleChange}
                  >
                    {filteredProvinces.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="description"
                    placeholder="Store Description"
                    className="form-input"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <motion.button
                    type="submit"
                    className="createstore-btn"
                    whileHover={{ scale: 1.05, backgroundColor: "black" }}
                  >
                    Create
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    );
  }

  return (
    <div>
      <StoreProfile />
      <StoreProductList />
    </div>
  );
}

export default StorePage;
