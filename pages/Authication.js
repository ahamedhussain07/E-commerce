import { useState, useRef,useEffect } from "react";
import {
  Button,
  Input,
  Flex,
  Text,
  Stack,
  Image,
  InputGroup,
  InputRightElement,
  FormControl,
  FormHelperText,
  FormLabel,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";

import axios from "axios";
import baseUrl from "../utils/baseUrl";

import { registerUser } from "../utils/authUser";

import uploadPic from "../utils/uploadPicToCloudinary";

import ImageDrop from "../components/Auth/ImageDrop";
// import Login from "../components/Auth/Login";

let cancel;

function Authication() {
  const inputRef = useRef();

  const [Show, setShow] = useState(false);
  const [Login, setLogin] = useState(true);

  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  //username
  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  // for image
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }
  };

  const handlepassword = () => {
    setShow(!Show);
  };

  const handlelogin = () => {
    setLogin(!Login);
  };

  const checkUsername = async () => {
    setUsernameLoading(true);
    try {
      cancel && cancel();

      const CancelToken = axios.CancelToken;

      const res = await axios.get(`${baseUrl}/api/signup/${username}`, {
        cancelToken: new CancelToken((canceler) => (cancel = canceler)),
      });

      if (errorMsg !== null) setErrorMsg(null);

      if (res.data === "username available") {
        setUsernameAvailable(true);
        // set the username setUsername()
      }
    } catch (error) {
      setErrorMsg("Username not Available");
      setUsernameAvailable(false);
    }
    setUsernameLoading(false);
  };

  useEffect(() => {
    username === "" ? setUsernameAvailable(false) : checkUsername();
  }, [username]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setFormLoading(true);
    let profilePicUrl;

    if (media !== null) {
      profilePicUrl = await uploadPic(media);
    }

    if (media !== null && !profilePicUrl) {
      setFormLoading(false);
      return setErrorMsg("error at uplaoding image");
    }

    await registerUser(data, profilePicUrl, setErrorMsg, setFormLoading);
    console.log(data);
    reset();
  };
  //   console.log(errors);
  return (
    <div>
      <Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5} m={2} width={"22rem"}>
            <Text
              fontSize={"4xl"}
              bg={"gray.300"}
              p={2}
              alignContent="center"
              className="heading"
            >
              {Login ? "Create an Account" : "Login"}
            </Text>
            {Login && (
              <>
                <ImageDrop
                  handleChange={handleChange}
                  inputRef={inputRef}
                  mediaPreview={mediaPreview}
                />
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type={"text"}
                    variant="filled"
                    {...register("name", {
                      required: "Name is Required",
                      min: {
                        value: 3,
                        message: "Minimum Required Name is 3",
                      },
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "Required Letters in Name Field",
                      },
                    })}
                  />
                  <FormHelperText color="red.700" fontWeight={"500"}>
                    {errors?.name?.message}
                  </FormHelperText>
                </FormControl>
              </>
            )}
            <FormControl>
              <FormLabel>UserName</FormLabel>
              <Input
                type={"text"}
                variant="filled"
                {...register("username", {
                  required: "Name is Required",
                  min: {
                    value: 3,
                    message: "Minimum Required Name is 3",
                  },
                })}
              />
              <FormHelperText color="red.700" fontWeight={"500"}>
                {errors?.username?.message}
              </FormHelperText>
            </FormControl>
            {Login && (
              <>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type={"text"}
                    variant="filled"
                    {...register("number", {
                      required: "Phone Number is Required",
                      min: {
                        value: 10,
                        message: "Minimum Required Number  10",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Required Numbers only ",
                      },
                    })}
                  />
                  <FormHelperText color="red.700" fontWeight={"500"}>
                    {errors?.number?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type={"text"}
                    variant="filled"
                    {...register("address", {
                      required: "Address is Required",
                      min: {
                        value: 10,
                        message: "please put a valid address",
                      },
                    })}
                  />
                  <FormHelperText color="red.700" fontWeight={"500"}>
                    {errors?.address?.message}
                  </FormHelperText>
                </FormControl>
              </>
            )}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  backgroundColor={"black.50"}
                  focusBorderColor="red"
                  placeholder="Enter Password"
                  variant="outline"
                  type={Show ? "text" : "password"}
                  {...register("password", {
                    required: "Passowrd is Required",
                    min: {
                      value: 8,
                      message: "Minimum Required Passowrd  10",
                    },
                  })}
                />
                <InputRightElement
                  onClick={handlepassword}
                  cursor="pointer"
                  backgroundColor={"gray.100"}
                  children={Show ? <FaEye /> : <FaEyeSlash />}
                ></InputRightElement>
              </InputGroup>
              <FormHelperText color="red.700" fontWeight={"500"}>
                {errors?.password?.message}
              </FormHelperText>
            </FormControl>
            {!Login && (
              <Text color="blue.900" as={"u"}>
                Forgot Password?
              </Text>
            )}
            {Login ? (
              <>
                <Text color="black.200">
                  Already have An Account?
                  <Button variant={"link"} onClick={handlelogin}>
                    Login
                  </Button>
                </Text>
                <Button type={"submit"} colorScheme={"whatsapp"}>
                  Create an Account
                </Button>
              </>
            ) : (
              <>
                <Text color="black.200">
                  New Here?
                  <Button variant={"link"} onClick={handlelogin}>
                    SignUp
                  </Button>
                </Text>
                <Button type={"submit"} colorScheme={"whatsapp"}>
                  Login
                </Button>
              </>
            )}

            <Button type={"reset"} colorScheme={"twitter"}>
              Reset
            </Button>
          </Stack>
        </form>
        <Stack backgroundImage={"../public/img.png"}>
          <Image src="/img.jpg" alt="No images" boxSize={"100vh"} />
        </Stack>
      </Flex>
    </div>
  );
}

export default Authication;
