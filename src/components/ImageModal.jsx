import React from "react";

const ImageModal = ({ image, isOpen, onClose, onViewOriginal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[96vh] w-full overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 ">
          <h3 className="text-lg font-semibold text-gray-800">Image Preview</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-4 max-h-[70vh] overflow-auto">
          <img
            src={image.src.large}
            alt={image.alt || "Pexels image"}
            className="w-full h-auto object-contain max-h-[60vh]"
          />
        </div>
        {/* Modal Footer */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {image.photographer}
                </p>
                <p className="text-sm text-gray-500">Photographer</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-sm">Dimensions</p>
              <p className="text-xs text-gray-500">
                {image.width} × {image.height}
              </p>
            </div>
          </div>
          {image.alt && (
            <p className="text-sm text-gray-700 mb-3">{image.alt}</p>
          )}
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onViewOriginal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              View On Pexels
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
