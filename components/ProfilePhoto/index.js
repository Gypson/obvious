import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import useTheme from "../../hooks/useTheme";

const styleSheet = ({ color, font }) => ({
  inline: {
    display: "inline-block"
  },
  image: {
    display: "block",
    background: color.core.neutral[9],
    color: color.base,
    objectFit: "cover",
    overflow: "hidden"
  },
  roundedImage: {
    borderRadius: "50%"
  },
  small: {
    height: 24,
    width: 24,
    maxHeight: 24,
    maxWidth: 24
  },
  regular: {
    height: 48,
    width: 48,
    maxHeight: 48,
    maxWidth: 48
  },
  large: {
    height: 96,
    width: 96,
    maxHeight: 96,
    maxWidth: 96
  },
  macro: {
    height: 160,
    width: 160,
    maxHeight: 160,
    maxWidth: 160
  },
  initials: {
    backgroundColor: color.core.primary[3],
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...font.textRegular
  },
  initials_dark: {
    backgroundColor: color.core.neutral[9],
    color: color.core.neutral[2]
  },
  initials_light: {
    backgroundColor: color.core.neutral[0],
    color: color.core.primary[3]
  }
});

const ProfilePhoto = ({
  imageSrc,
  inline,
  macro,
  large,
  small,
  size,
  square,
  title,
  children,
  background
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();
  const { unit } = theme;
  return (
    <div
      className={cx(
        inline && styles.inline,
        styles.regular,
        macro && styles.macro,
        large && styles.large,
        small && styles.small,
        !!size &&
          size > 0 && {
            height: size * unit,
            maxHeight: size * unit,
            maxWidth: size * unit,
            width: size * unit
          }
      )}
    >
      {imageSrc ? (
        <img
          className={cx(
            styles.image,
            styles.regular,
            !square && styles.roundedImage,
            macro && styles.macro,
            large && styles.large,
            small && styles.small,
            !!size &&
              size > 0 && {
                height: size * unit,
                maxHeight: size * unit,
                maxWidth: size * unit,
                width: size * unit
              }
          )}
          src={imageSrc}
          alt={title}
          title={title}
        />
      ) : (
        <div
          className={cx(
            !imageSrc && styles.initials,
            !imageSrc && background === "dark" && styles.initials_dark,
            !imageSrc && background === "light" && styles.initials_light,
            styles.regular,
            !square && styles.roundedImage,
            macro && styles.macro,
            large && styles.large,
            small && styles.small,
            !!size &&
              size > 0 && {
                height: size * unit,
                maxHeight: size * unit,
                maxWidth: size * unit,
                width: size * unit
              }
          )}
        >
          <span>{children}</span>
        </div>
      )}
    </div>
  );
};

ProfilePhoto.propTypes = {
  children: _pt.string,
  background: _pt.oneOf(["dark", "light", null]),
  title: _pt.string,
  square: _pt.bool,
  inline: _pt.bool,
  imageSrc: _pt.string,
  large: _pt.bool,
  macro: _pt.bool,
  size: _pt.bool,
  small: _pt.bool
};

ProfilePhoto.defaultProps = {
  background: null,
  children: null,
  imageSrc: null,
  inline: false,
  large: false,
  macro: false,
  size: false,
  small: false,
  square: false,
  title: null
};

export default ProfilePhoto;
