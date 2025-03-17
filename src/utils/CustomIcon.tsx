import { ReactSVG } from 'react-svg';

interface IconProps {
  src: string;
  color?: string;
  id?: string
}

const CustomIcon = ({ src, color = 'grey', id = "" }: IconProps) => {
  return (
    <ReactSVG
      src={src}
      id={id}
      beforeInjection={(svg) => {
        svg.querySelectorAll('path').forEach((path) => {
          path.setAttribute('fill', color);  // Dynamically set the fill color
        });
      }}
    />
  );
};

export default CustomIcon;
