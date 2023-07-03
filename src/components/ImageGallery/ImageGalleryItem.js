import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
  return (
    <li className="ImageGalleryItem" key={id}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  // largeImageURL:PropTypes.string.isRequired
};
