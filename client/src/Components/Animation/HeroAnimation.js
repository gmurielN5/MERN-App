import React, { useState } from 'react';
import {
  useChain,
  useSpring,
  useTrail,
  animated,
  useSpringRef,
} from 'react-spring';

import { Text } from './Text';

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);

  const springRef = useSpringRef();
  const styles = useSpring({
    loop: true,
    config: { mass: 1, tension: 280, friction: 60 },
    from: { y: 0 },
    to: { y: -100 },
    ref: springRef,
  });
  const trailRef = useSpringRef();
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    x: open ? 0 : 1000,
    opacity: open ? 1 : 0,
    from: { opacity: 0, x: 1000 },
    ref: trailRef,
  });
  useChain([springRef, trailRef]);
  return (
    <div className="band">
      {trail.map(({ ...style }, index) => (
        <animated.span
          className="names"
          style={{ ...styles }}
          key={`x${index}`}
        >
          <animated.div style={style}>
            <animated.div>{items[index]}</animated.div>
          </animated.div>
        </animated.span>
      ))}
    </div>
  );
};

export const HeroAnimation = () => {
  const [open, set] = useState(true);

  return (
    <div className="stage">
      <div className="content" onClick={() => set((state) => !state)}>
        <Trail open={open}>
          <Text />
          <Text />
          <Text />
          <Text />
          <Text />
          <Text />
        </Trail>
      </div>
    </div>
  );
};
