import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { GraphContext } from '../contexts';
import { Rect, Tooltip, TooltipItem } from './';

const BarDatum = ({
  color,
  datum,
  height,
  onClick,
  onMouseEnter,
  onMouseLeave,
  tooltip: withTooltip,
  width,
  x,
  y,
}) => {
  const { outlinedStyle } = useContext(GraphContext);
  const [tooltip, setTooltip] = useState({
    pageX: null,
    pageY: null,
    show: false,
  });

  return (
    <>
      <Rect
        chart="bar"
        fillColor={color}
        onClick={onClick}
        onMouseEnter={event => {
          setTooltip(state => ({ ...state, show: true }));
          onMouseEnter(event);
        }}
        onMouseLeave={event => {
          setTooltip(state => ({ ...state, show: false }));
          onMouseLeave(event);
        }}
        onMouseMove={event => {
          event.persist();
          const { pageX, pageY } = event;
          setTooltip(state => ({ ...state, pageX, pageY }));
        }}
        outlinedStyle={outlinedStyle}
        position={{ x, y }}
        size={{ width, height }}
      />
      {withTooltip &&
        tooltip.show &&
        createPortal(
          <Tooltip mousePosition={tooltip}>
            <TooltipItem color={color} {...datum} />
          </Tooltip>,
          document.body
        )}
    </>
  );
};

export default BarDatum;
