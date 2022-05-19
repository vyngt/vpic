/* eslint-disable @next/next/no-img-element */
import { Picture } from "../../models";

export const PictureElement = ({ picture }: { picture: Picture }) => {
  return (
    <img
      className="img-fluid"
      src={picture.image}
      alt={picture.id.toString()}
      loading="lazy"
      width="100%"
      height="100%"
    />
  );
};

export const PictureRenderer = ({ pictures }: { pictures: Array<Picture> }) => {
  return (
    <div className="container">
      {pictures.map((pict) => (
        <PictureElement key={pict.id} picture={pict} />
      ))}
    </div>
  );
};
