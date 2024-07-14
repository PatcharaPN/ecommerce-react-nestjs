import React from "react";
import StoreProfile from "../../components/Store-Profile/StoreProfile";
import StoreDescription from "./components/StoreDescription/Store-Description";
import Banner from "../../components/Banner/banner";

type Props = {};

function StorePage({}: Props) {
  return (
    <div>
      <StoreProfile />
      <StoreDescription />
    </div>
  );
}

export default StorePage;
