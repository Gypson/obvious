import React from "react";
import _pt from "prop-types";
import { mutuallyExclusiveTrueProps } from "airbnb-prop-types";
import useStyles from "../../hooks/useStyles";
import removeFocusOnMouseUp from "../../utils/removeFocusOnMouseUp";
import ProfilePhoto from "../ProfilePhoto";
import Shimmer from "../Shimmer";
import Text from "../Text";
import Spacing from "../Spacing";
import toRGBA from "../../utils/toRGBA";

const stripeColorTypePropType = mutuallyExclusiveTrueProps(
  "important",
  "info",
  "warning"
);

const styleSheet = ({ color, ui, unit, pattern }) => ({
  container: {
    position: "relative",
    border: "1px solid transparent",
    borderRadius: ui.borderRadius,
    margin: 0,
    padding: 0,
  },

  container_horizontalSpacing: {
    paddingLeft: unit * 2,
    paddingRight: unit * 2,
  },

  container_verticalSpacing: {
    marginBottom: unit * 2,
    marginTop: unit * 2,
  },

  container_withStripe: {
    borderColor: color.accent.border,
    borderWidth: `1px 1px 1px ${unit * 0.5}px`,
    padding: `${unit * 2}px ${unit * 2}px ${unit * 2}px ${unit * 1.5 + 1}px`,
  },

  container_important: {
    backgroundColor: color.core.danger[0],
    borderLeftColor: color.core.danger[3],
  },

  container_info: {
    backgroundColor: color.accent.bg,
    borderLeftColor: color.core.primary[3],
  },

  container_warning: {
    backgroundColor: color.core.warning[0],
    borderLeftColor: color.core.warning[3],
  },

  table: {
    display: "table",
    tableLayout: "fixed",
    width: "100%",
  },

  tableCell: {
    display: "table-cell",
    verticalAlign: "top",
  },

  profilePhoto: {
    width: 4 * unit,
  },

  profileBadge: {
    position: "absolute",
    transform: `translate(50%, ${-unit}px)`,
  },

  messageBody: {
    paddingLeft: unit,
  },

  messageBodyContent: {
    wordBreak: "break-word",
  },

  messageTitle: {
    marginRight: unit,
    wordBreak: "break-word",
  },

  resetButton: {
    ...pattern.resetButton,
    textAlign: "left",
  },

  sendingOverlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "all",
    backgroundColor: toRGBA(color.core.neutral[3], 50),
    zIndex: 1,
  },

  tag: {
    border: ui.border,
    borderRadius: unit / 4,
    display: "inline-block",
    lineHeight: 1,
    marginRight: unit,
    maxWidth: "100%",
    overflow: "hidden",
    padding: `0 ${unit / 2}px`,
    textOverflow: "ellipsis",
    verticalAlign: "sub",
    whiteSpace: "nowrap",
  },
});

const MessageItem = ({
  children,
  disableTitleTranslation,
  email,
  formattedTimestamp,
  horizontalSpacing,
  icon,
  imageBadgeSrc,
  imageDescription,
  imageSrc,
  important,
  info,
  loadingAuthor,
  onClickImage,
  onClickTitle,
  sending,
  source,
  title,
  titleClickDescription,
  titleTag,
  verticalSpacing,
  warning,
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const timestamp = source ? `${time} via ${source}` : formattedTimestamp;

  const striped = !!(important || info || warning);
  const containerStyles = cx(
    styles.container,
    horizontalSpacing && styles.container_horizontalSpacing,
    verticalSpacing && styles.container_verticalSpacing,
    striped && styles.container_withStripe,
    important && styles.container_important,
    info && styles.container_info,
    warning && styles.container_warning
  );

  const formatedTitle = disableTitleTranslation ? (
    <span className="notranslate">{title}</span>
  ) : (
    title
  );

  if (loadingAuthor) {
    return (
      <div className={containerStyles}>
        <div className={cx(styles.profilePhoto, styles.tableCell)}>
          <Shimmer width={32} height={32} radius="50%" />
        </div>

        <div className={cx(styles.messageBody, styles.tableCell)}>
          <Spacing bottom={0.5}>
            <Spacing right={1} inline>
              <Shimmer width={175} height={14} />
            </Spacing>

            <Text inline small muted>
              {timestamp}
            </Text>

            {email && <Shimmer height={12} width={225} />}
          </Spacing>

          {children}
        </div>

        {sending && <div className={cx(styles.sendingOverlay)} />}
      </div>
    );
  }

  let profilePhoto = null;

  if (imageSrc) {
    profilePhoto = (
      <ProfilePhoto
        imageSrc={imageSrc}
        size={4}
        title={imageDescription || title}
      />
    );
  } else if (icon) {
    profilePhoto = (
      <Spacing left={2} top={0.5}>
        {icon}
      </Spacing>
    );
  }

  const avatar = imageBadgeSrc ? (
    <div>
      {profilePhoto}

      <div className={cx(styles.profileBadge)}>
        <ProfilePhoto
          inline
          imageSrc={imageBadgeSrc}
          size={2}
          title="Profile photo badge"
        />
      </div>
    </div>
  ) : (
    profilePhoto
  );

  return (
    <div className={containerStyles}>
      <div className={cx(styles.table)}>
        <div className={cx(styles.profilePhoto, styles.tableCell)}>
          {onClickImage ? (
            <button
              className={cx(styles.resetButton)}
              type="button"
              title={imageDescription || title}
              onClick={onClickImage}
              onMouseUp={removeFocusOnMouseUp}
            >
              {avatar}
            </button>
          ) : (
            avatar
          )}
        </div>

        <div className={cx(styles.messageBody, styles.tableCell)}>
          <Spacing bottom={0.5}>
            <span className={cx(styles.messageTitle)}>
              {onClickTitle ? (
                <button
                  className={cx(styles.resetButton)}
                  type="button"
                  title={titleClickDescription || title}
                  onClick={onClickTitle}
                  onMouseUp={removeFocusOnMouseUp}
                >
                  <Text inline bold>
                    {formatedTitle}
                  </Text>
                </button>
              ) : (
                <Text inline bold>
                  {formatedTitle}
                </Text>
              )}
            </span>

            {titleTag && (
              <span className={cx(styles.tag)}>
                <Text inline micro muted>
                  {titleTag}
                </Text>
              </span>
            )}

            <Text inline small muted>
              {timestamp}
            </Text>

            {email && (
              <Text small muted>
                From: {email}
              </Text>
            )}
          </Spacing>

          <div className={cx(styles.messageBodyContent)}>{children}</div>
        </div>
      </div>

      {sending && <div className={cx(styles.sendingOverlay)} />}
    </div>
  );
};

MessageItem.propTypes = {
  verticalSpacing: _pt.bool,
  titleTag: _pt.string,
  titleClickDescription: _pt.string,
  title: _pt.string.isRequired,
  source: _pt.string,
  sending: _pt.bool,
  onClickTitle: _pt.func,
  onClickImage: _pt.func,
  loadingAuthor: _pt.bool,
  imageSrc: _pt.string,
  imageDescription: _pt.string,
  imageBadgeSrc: _pt.string,
  icon: _pt.node,
  horizontalSpacing: _pt.bool,
  formattedTimestamp: _pt.string.isRequired,
  email: _pt.node,
  disableTitleTranslation: _pt.bool,
  children: _pt.any.isRequired,
  important: stripeColorTypePropType,
  info: stripeColorTypePropType,
  warning: stripeColorTypePropType,
};

MessageItem.defaultProps = {
  disableTitleTranslation: false,
  email: null,
  horizontalSpacing: false,
  icon: null,
  imageBadgeSrc: "",
  imageDescription: "",
  imageSrc: "",
  important: false,
  info: false,
  loadingAuthor: false,
  onClickImage: null,
  onClickTitle: null,
  sending: false,
  source: "",
  titleClickDescription: "",
  titleTag: "",
  verticalSpacing: false,
  warning: false,
};

export default MessageItem;
