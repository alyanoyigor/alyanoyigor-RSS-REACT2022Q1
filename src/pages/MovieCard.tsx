import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedCard } from '../components/DetailedCard';
import styled from 'styled-components';
import { DetailedMovieData } from '../types/types';
import { Preloader } from '../components/Preloader';
import AppContext from '../store/context';
import { getDetailMovieData } from '../requests/requests';

const Button = styled.button`
  padding: 0 16px;
  border: 3px solid #2596be;
  background-color: #fff;
  line-height: 2.5;
  font-weight: 500;
  cursor: pointer;
`;

export const MovieCard = () => {
  const { id } = useParams();
  const ctx = useContext(AppContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState<DetailedMovieData | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsFetching(true);
        if (!id) throw new Error("Can't read id in useParams");
        const movieData = await getDetailMovieData(id);
        setMovie(movieData);
        ctx.dispatchAppState({
          type: 'ADD_DISPLAYED_CARD',
          payload: { id: movieData.id, title: movieData.title },
        });
      } catch (e) {
        console.log(e);
        return navigate('/');
      } finally {
        setIsFetching(false);
      }
    })();
  }, []);

  if (isFetching || !movie) {
    return <Preloader />;
  }

  return (
    <div data-testid="card-page">
      <Button
        onClick={() => {
          navigate(-1);
          ctx.dispatchAppState({ type: 'ADD_DISPLAYED_CARD' });
        }}
      >
        ← Back
      </Button>
      {movie && <DetailedCard movieData={movie} />}
    </div>
  );
};
