import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";

const ImageCard = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const preload = new Image();
    preload.src = image.src.large;
  }, [image.src.large]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewOriginal = () => {
    window.open(image.url, "_blank");
    setIsModalOpen(false);
  };
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
      >
        <img
          src={image.src.medium}
          alt={image.alt || "Pexels image"}
          className="w-full h-48 object-cover"
        />
      </div>
      <ImageModal
        onViewOriginal={handleViewOriginal}
        image={image}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ImageCard;
