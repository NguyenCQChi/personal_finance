import { ReactSVG } from 'react-svg';

interface IconProps {
  src: string;
  color?: string;
}

const CustomIcon = ({ src, color = 'grey' }: IconProps) => {
  return (
    <ReactSVG
      src={src}
      beforeInjection={(svg) => {
        svg.querySelectorAll('path').forEach((path) => {
          path.setAttribute('fill', color);  // Dynamically set the fill color
        });
      }}
    />
  );
};

export default CustomIcon;
