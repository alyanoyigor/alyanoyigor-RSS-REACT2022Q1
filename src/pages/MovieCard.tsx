import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedCard } from '../components/DetailedCard';
import styled from 'styled-components';
import { State } from '../types/types';
import { Preloader } from '../components/Preloader';
import { getDetailMovieData } from '../requests/requests';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';

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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { detailedCard, isLoading } = useSelector((state: { appState: State }) => state.appState);

  useEffect(() => {
    try {
      if (!id) throw new Error("Can't read id in useParams");
      dispatch(getDetailMovieData(id));
    } catch (e) {
      console.log(e);
      return navigate('/');
    }
  }, []);

  if (isLoading || !detailedCard) {
    return <Preloader />;
  }

  return (
    <div data-testid="card-page">
      <Button onClick={() => navigate(-1)}>← Back</Button>
      {detailedCard && <DetailedCard movieData={detailedCard} />}
    </div>
  );
};
