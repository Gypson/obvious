import React from "react";
import _pt from "prop-types";
import { mutuallyExclusiveTrueProps } from "airbnb-prop-types";
import uuid from "uuid/v4";
import IconUpload from "../../../../icons/src/interface/IconUpload";
import IconAudio from "../../../../icons/src/interface/IconAudio";
import IconPhoto from "../../../../icons/src/interface/IconPhoto";
import IconVideo from "../../../../icons/src/interface/IconVideo";
import IconClose from "../../../../icons/src/interface/IconClose";
import FormInput from "../basic/FormInput";
import FormField, { partitionFieldProps } from "../FormField";
import Table, { Cell } from "../Table";
import Spacing from "../Spacing";
import Text from "../Text";
import IconButton from "../IconButton";
import DateTime from "../DateTime";
import FormInputButton from "../basic/FormInputButton";
import toBytes from "../../utils/toBytes";

const acceptProp = mutuallyExclusiveTrueProps(
  "onlyAudio",
  "onlyImages",
  "onlyVideo"
);

const FileInput = ({ onChange, ...props }) => {
  const [files, setFiles] = React.useState([]);
  const [id] = React.useState(uuid());
  const ref = React.createRef();

  const handleChange = (event) => {
    const files = Array.from(event.currentTarget.files || []);
    setFiles(files);
    onChange(files, event);
  };

  const handleClick = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleRemoveFile = (event, index) => {
    setFiles(files.filter((file, i) => i !== index));
    onChange(files, event);
  };

  const { fieldProps, inputProps } = partitionFieldProps(props);
  const {
    hideFileSize,
    hideFileType,
    hideLastModified,
    onlyAudio,
    onlyImages,
    onlyVideo,
    ...restProps
  } = inputProps;
  let { accept } = inputProps;
  let Icon = IconUpload;

  if (onlyAudio) {
    accept = "audio/*";
    Icon = IconAudio;
  } else if (onlyImages) {
    accept = "image/*";
    Icon = IconPhoto;
  } else if (onlyVideo) {
    accept = "video/*";
    Icon = IconVideo;
  }

  return (
    <FormField {...fieldProps} id={id}>
      <FormInput
        {...restProps}
        id={id}
        accept={accept}
        type="file"
        tagName="input"
        onChange={handleChange}
        propagateRef={ref}
        hidden
      />

      <FormInputButton
        inverted
        invalid={fieldProps.invalid}
        small={fieldProps.compact}
        disabled={restProps.disabled}
        onClick={handleClick}
        afterIcon={<Icon size="1.25em" decorative />}
      >
        {files.length > 0 && <span>{` (${files.length})`}</span>}
      </FormInputButton>

      {files.length > 0 && !fieldProps.inline && (
        <Spacing top={1}>
          <Text small={fieldProps.compact}>
            <Table compact striped>
              <tbody>
                {files.map((file, i) => (
                  <tr key={file.name}>
                    <Cell>{file.name}</Cell>

                    {!hideFileSize && <Cell>{toBytes(file.size)}</Cell>}

                    {!hideLastModified && (
                      <Cell>
                        <DateTime at={file.lastModified} short />
                      </Cell>
                    )}

                    {!hideFileType && <Cell>{file.type}</Cell>}

                    <Cell endAlign>
                      <IconButton
                        onClick={(event) => {
                          handleRemoveFile(event, i);
                        }}
                      >
                        <IconClose accessibilityLabel="Remove chosen file" />
                      </IconButton>
                    </Cell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Text>
        </Spacing>
      )}
    </FormField>
  );
};

FileInput.propTypes = {
  hideFileSize: _pt.bool,
  hideFileType: _pt.bool,
  hideLastModified: _pt.bool,
  onChange: _pt.func,
  onlyAudio: acceptProp,
  onlyImages: acceptProp,
  onlyVideo: acceptProp,
};

FileInput.defaultProps = {
  hideFileSize: false,
  hideFileType: false,
  hideLastModified: false,
  onChange: null,
  onlyAudio: false,
  onlyImages: false,
  onlyVideo: false,
};

export default FileInput;
