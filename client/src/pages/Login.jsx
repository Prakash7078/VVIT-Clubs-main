import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
// import LiaEye from 'react-icons/lia'
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { Rings } from "react-loader-spinner";
function Login(props) {
  const { value } = props;
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
    value();
  };
  const handleSignup = () => {
    navigate("/signup");
    value();
  };
  useEffect(() => {
    if (userInfo) {
      if(userInfo.isAdmin){
        		navigate(`/dashboard/${userInfo._id}`);
      }else{
            navigate("/");
      }
    }
  }, [navigate, userInfo]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Rings
          height="80"
          width="80"
          color="#21BF73"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
  }
  return (
    <div id="login" className="sm:mt-32 mt-40">
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardHeader
          variant="gradient"
          color="brown"
          className="mb-4 grid h-20 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            onChange={handleChange}
            value={data.email}
            name="email"
          />
          <div className="flex items-center border-2 border-gray-300 rounded-md px-2">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              size="md"
              onChange={handleChange}
              value={data.password}
              name="password"
              className="flex-grow border-none "
            />
            <IoEyeOutline
              onClick={togglePasswordVisibility}
              className="cursor-pointer ml-2"
            />
          </div>

          <div className="-ml-2.5 ">
            <Link to="/passwordrequest">
              <Checkbox label="Forget Password ?" onClick={value} />
            </Link>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            color="brown"
            variant="gradient"
            onClick={handleLogin}
            fullWidth
          >
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              onClick={handleSignup}
              variant="small"
              color="brown"
              className="ml-1 font-bold cursor-pointer"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
