import { ReactSVG } from 'react-svg';

interface IconProps {
  src: string;
  color?: string
}

const CustomIcon = ({ src, color = "grey" } : IconProps) => {
  return (
    <ReactSVG
      src={src} // Path to your SVG
      beforeInjection={(svg) => {
        svg.querySelectorAll('path').forEach((path) => {
          // path.setAttribute('fill', color)
          path.classList.add('custom-icon')
        })
      }}
      className="custom-icon-container"
    />
  );
};

export default CustomIcon