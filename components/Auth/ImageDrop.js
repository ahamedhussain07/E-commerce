import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";

const ImageDrop = ({ handleChange, mediaPreview, inputRef }) => {
  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        name="media"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
      <div>
        {mediaPreview === null ? (
          <>
            <div className="Avatar" onClick={() => inputRef.current.click()}>
              <Avatar size={"xl"}>
                <AvatarBadge boxSize={"2.5rem"}>
                  <FaCamera color="steelblue" cursor={"pointer"} />
                </AvatarBadge>
              </Avatar>
            </div>
          </>
        ) : (
          <>
            <div className="Avatar" onClick={() => inputRef.current.click()}>
              <Avatar size={"xl"} src={mediaPreview}>
                <AvatarBadge boxSize={"2.5rem"}>
                  <FaCamera color="steelblue" cursor={"pointer"} />
                </AvatarBadge>
              </Avatar>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageDrop;
