import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        // console.log(image)
        <ImageGalleryItem
          key={image.id}
          image={image}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
