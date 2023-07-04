import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services/api';
import { Button } from './Button/Button';

const toastConfig = {
  position: 'top-left',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};
export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    loading: false,
    loadMoreBtn: false,
    error: false,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    const prevSearchQuery = prevState.searchQuery;
    const prevPage = prevState.page;

    if (prevSearchQuery !== searchQuery || prevPage !== page) {
      try {
        this.setState({ loading: true });
        const images = await fetchImages(searchQuery, page);

        this.setState({ images: images.hits });

        const totalHits = images.totalHits;
        const totalPages = Math.ceil(totalHits / 12);

        if (images.hits.length === 0) {
          toast.warn('...ooops! No images', toastConfig);
        }

        if (page === 1 && images.hits.length > 0) {
          toast.success('Your images were successfully fetched!', toastConfig);
        }
        if (totalPages > page) {
          this.setState({
            loadMoreBtn: true,
            images: [...prevState.images, ...images.hits],
          });
        }
        if (page === totalPages) {
          this.setState({ loadMoreBtn: false });
        }
      } catch (error) {
        this.setState({ error: error.message });
        toast.error(error.message, toastConfig);
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  //==========================================================
  render() {
    const { images, loading, loadMoreBtn, error } = this.state;
    return (
      <div>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
        <ImageGallery images={images} />
        {loadMoreBtn && <Button onClick={this.onLoadMore} />}

        {error && <h2 className="error">{error}</h2>}
      </div>
    );
  }
}
