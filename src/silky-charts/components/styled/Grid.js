import styled from 'styled-components';
import { palette } from '../../utils';

const Grid = styled.g.attrs(() => ({
  className: 'grid',
}))`
  path {
    stroke: transparent;
  }

  line {
    stroke: ${palette.grid};
  }
`;

export default Grid;
