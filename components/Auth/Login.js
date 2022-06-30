import {
  Button,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import ImageDrop from "./ImageDrop";

const Login = ({
  handleChange,
  handlepassword,
  handlelogin,
  inputRef,
  mediaPreview,
  Show
}) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

  return (
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
          {...register("Name", {
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
          {errors?.Name?.message}
        </FormHelperText>
      </FormControl>

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

      <FormControl>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type={"text"}
          variant="filled"
          {...register("Number", {
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
          {errors?.Number?.message}
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            backgroundColor={"black.50"}
            focusBorderColor="red"
            placeholder="Enter Password"
            variant="outline"
            type={Show ? "text" : "password"}
            {...register("Passowrd", {
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
          {errors?.Password?.message}
        </FormHelperText>
      </FormControl>
      {/* {!Login && (
        <Text color="blue.900" as={"u"}>
          Forgot Password?
        </Text>
      )} */}

      <Text color="black.200">
        Already have An Account?
        <Button variant={"link"} onClick={handlelogin}>
          Login
        </Button>
      </Text>
      <Button type={"submit"} colorScheme={"whatsapp"}>
        Create an Account
      </Button>

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
    </>
  );
};

export default Login;
