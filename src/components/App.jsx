import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services/api';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    loading: false,
    error: false,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      console.log(prevState.searchQuery);
      console.log(searchQuery);
      try {
        const fetchRequest = await fetchImages(searchQuery, page);
        this.setState({ loading: true, images: fetchRequest.data.hits });
      } catch (error) {
        this.setState({ error: error.message });
        toast.error(error.message);
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  //==========================================================
  render() {
    const { images, loading, error } = this.state;
    return (
      <div>
        <ToastContainer autoClose={3000} position="top-left" />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <div>Loading...</div>}
        <ImageGallery images={images} />
        {error && <h2>{error}</h2>}
      </div>
    );
  }
}
