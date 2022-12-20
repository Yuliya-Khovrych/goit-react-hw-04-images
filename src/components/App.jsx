import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from 'api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [, setError] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      getImages();
    }
  }, [searchQuery, page]);

  async function getImages() {
    try {
      setIsLoading(true);
      setError(null);
      const { hits } = await fetchImages(searchQuery, page);
      console.log(hits);
      console.log(hits.length);

      if (hits.length > 0) {
        setImages(prevImages => [...prevImages, ...hits]);
      } else {
        setIsLoading(false);
        return toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    } catch {
      toast.error('We`re sorry, something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }

  const handleFormSubmit = searchQuery => {
    if (searchQuery !== setSearchQuery) {
      setImages([]);
      setPage(1);
      setSearchQuery(searchQuery);
      setError(null);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const selectImage = largeImageURL => {
    setSelectedImage(largeImageURL);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
    setSelectedImage('');
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />;
      <ImageGallery images={images} onSelect={selectImage} />
      {isLoading && <Loader />};
      {images.length >= 12 && <Button onClick={loadMore} />}
      {showModal && (
        <Modal largeImageURL={selectedImage} onClose={toggleModal}></Modal>
      )}
      <Toaster position="top-right" />
    </>
  );
};
