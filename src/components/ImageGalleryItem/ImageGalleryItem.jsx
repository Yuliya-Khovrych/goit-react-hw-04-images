import PropTypes from 'prop-types';
import { ImageGalleryItemImage } from './ImageGalleryItemImage.styled';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onSelect,
}) => {
  return (
    <div>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => onSelect(largeImageURL)}
      />
    </div>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

