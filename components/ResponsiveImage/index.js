import React from "react";
import _pt from "prop-types";
import { mutuallyExclusiveTrueProps } from "airbnb-prop-types";
import useStyles from "../../hooks/useStyles";

export const DEFAULT_BORDER_RADIUS = 6;
const objectFitPropType = mutuallyExclusiveTrueProps("contain", "cover");

const styleSheet = ({ ui }) => ({
  image: {
    display: "block",
    boxShadow: ui.boxShadow
  },

  image_noShadow: {
    boxShadow: "none"
  },

  image_cover: {
    objectFit: "cover"
  },

  image_contain: {
    objectFit: "contain"
  }
});

const ResponsiveImage = ({
  alt,
  contain,
  cover,
  noShadow,
  maxWidth,
  maxHeight,
  src,
  borderRadius,
  shimmer
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  let image = null;

  React.useEffect(() => {
    createAsyncImage();

    return () => {
      removeImage();
    };
  }, []);

  React.useEffect(() => {
    removeImage();
    setImageLoaded(false);
    createAsyncImage();
  }, [src]);

  const createAsyncImage = () => {
    image = new Image();
    image.addEventListener("load", () => {
      handleAsyncImageLoad();
    });
    image.addEventListener("error", () => {
      handleAsyncImageLoad();
    });
    image.src = src;
  };

  const removeImage = () => {
    if (image) {
      delete image.onload;
      delete image.onerror;
    }
  };

  const handleAsyncImageLoad = () => {
    if (image) {
      image = null;
      setImageLoaded(true);
    }
  };

  if (!imageLoaded && shimmer) {
    return shimmer;
  }

  return (
    <img
      className={cx(
        styles.image,
        contain && styles.image_contain,
        cover && styles.image_cover,
        noShadow && styles.image_noShadow,
        {
          borderRadius,
          maxWidth,
          maxHeight
        }
      )}
      src={src}
      width="100%"
      height="auto"
      alt={alt}
    />
  );
};

ResponsiveImage.propTypes = {
  alt: _pt.string,
  borderRadius: _pt.number,
  noShadow: _pt.bool,
  contain: objectFitPropType,
  cover: objectFitPropType,
  maxWidth: _pt.oneOfType([_pt.string, _pt.number]),
  maxHeight: _pt.oneOfType([_pt.string, _pt.number]),
  src: _pt.string,
  shimmer: _pt.node
};

ResponsiveImage.defaultProps = {
  alt: null,
  borderRadius: DEFAULT_BORDER_RADIUS,
  contain: false,
  cover: false,
  maxHeight: "none",
  maxWidth: "none",
  noShadow: false,
  shimmer: null,
  src: null
};

export default ResponsiveImage;
