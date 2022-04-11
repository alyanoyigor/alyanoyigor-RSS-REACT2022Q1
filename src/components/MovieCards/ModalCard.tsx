import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { MOVIE_API_KEY } from '../../config';
import { DetailedMovieData } from '../../interfaces';
import { Preloader } from '../Preloader';

type ModalOverlayProps = {
  movieData: DetailedMovieData;
  onConfirm: () => void;
};

type ModalCardProps = {
  cardId: string;
  onConfirm: () => void;
};

const BackdropStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;

const BG_MOVIE_URL = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';

const Modal = styled.div`
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  overflow: hidden;
  background-image: url(${BG_MOVIE_URL}${(props: { bg: string }) => props.bg});
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
`;

const Backdrop = ({ onConfirm }: { onConfirm: () => void }) => (
  <BackdropStyled onClick={onConfirm} />
);

const ModalOverlay = ({ movieData, onConfirm }: ModalOverlayProps) => (
  <Modal bg={movieData.backdrop_path}>
    <img src={movieData.poster_path} alt="" />
    <button onClick={onConfirm}>Okay</button>
  </Modal>
);

export class ModalCard extends React.Component<
  ModalCardProps,
  { movieData: DetailedMovieData | null; isFetching: boolean }
> {
  backdropRoot: Element | null;
  modalOverlayRoot: Element | null;
  constructor(props: ModalCardProps) {
    super(props);
    this.backdropRoot = document.getElementById('backdrop-root');
    this.modalOverlayRoot = document.getElementById('modal-overlay-root');
    this.state = { movieData: null, isFetching: true };
  }
  componentDidMount() {
    this.getDetailMovieData().then((movieData) => this.setState({ movieData, isFetching: false }));
  }

  async getDetailMovieData() {
    try {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.props.cardId}?api_key=${MOVIE_API_KEY}`
      );
      return movies.data;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.isFetching || !this.state.movieData) {
      return <Preloader />;
    }

    return (
      <React.Fragment>
        {this.backdropRoot &&
          ReactDOM.createPortal(<Backdrop onConfirm={this.props.onConfirm} />, this.backdropRoot)}
        {this.modalOverlayRoot &&
          ReactDOM.createPortal(
            <ModalOverlay movieData={this.state.movieData} onConfirm={this.props.onConfirm} />,
            this.modalOverlayRoot
          )}
      </React.Fragment>
    );
  }
}
