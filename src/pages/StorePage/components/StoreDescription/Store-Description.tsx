import "./Store-Description.css";

interface StoreDescriptionProps {
  description: string;
}
const StoreDescription = (prop: StoreDescriptionProps) => {
  return (
    <div className="store-content-wrapper">
      <div className="store-description">{prop.description}</div>
    </div>
  );
};

export default StoreDescription;
