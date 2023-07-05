import React from 'react';

export class Modal extends React.Component {
  handleKeyClick = e => {
    if (e.key === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = e => {
    console.log(e.target, e.currentTarget);
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyClick);
  }

  render() {
    const { imgURL, onCloseModal } = this.props;
    return (
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal" onCloseModal={onCloseModal}>
          <img src={imgURL} alt="" />
        </div>
      </div>
    );
  }
}
