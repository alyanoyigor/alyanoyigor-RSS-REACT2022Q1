import styled from 'styled-components';
import { styledField } from './styledField';

export const StyledSelect = styled.select`
  ${styledField}
  border-color: ${(props: { isInvalid: boolean }) => (props.isInvalid ? '#d40e00' : '#ccc')}
`;
