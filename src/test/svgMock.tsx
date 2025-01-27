import React, { FC } from 'react';

type SVGMockProps = {
  [key: string]: any;
} & React.HTMLAttributes<HTMLSpanElement>;

const SVGMock: FC<SVGMockProps> = props => {
  return <span {...props}>SVGMock</span>;
};

export default SVGMock;
