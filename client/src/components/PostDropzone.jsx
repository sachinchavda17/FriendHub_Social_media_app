import React from "react";
import Dropzone from "react-dropzone";

const PostDropzone = () => {
  return (
    <div>
      <Dropzone
        acceptedFiles=".jpg,.jpeg,.png"
        multiple={false}
        onDrop={handleDrop}
      >
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            border={`2px dashed ${palette.primary.main}`}
            p="1rem"
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <input {...getInputProps()} />
            {!imgName ? (
              <Typography>Add Picture Here</Typography>
            ) : (
              <FlexBetween>
                <Typography>{imgName}</Typography>
                <EditOutlinedIcon />
              </FlexBetween>
            )}
          </Box>
        )}
      </Dropzone>
    </div>
  );
};

export default PostDropzone;
