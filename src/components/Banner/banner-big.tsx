import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  borderRadius: "10px",
  duration: "5s",
  height: "400px",
  zIndex: 1,
};
const slideImages = [
  {
    url: "https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg",
    caption: "Slide 1",
  },
  {
    url: "https://cdn3.f-cdn.com//files/download/186511415/JUST%20FOR%20YOU%20jpg.jpg?width=780&height=438&fit=crop",
    caption: "Slide 2",
  },
  {
    url: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cf8c5599420499.5f09d760d115b.jpg",
    caption: "Slide 3",
  },
];

export const BigImage = () => {
  return (
    <div className="slide-container">
      <Slide duration={2000} transitionDuration={600}>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
