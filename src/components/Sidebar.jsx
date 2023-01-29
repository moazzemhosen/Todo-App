import { Box, Image, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { AiTwotoneHome } from "react-icons/ai";
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Menu,
  MenuItem,
} from "@randumbwilliam/react-pro-sidebar";
import "@randumbwilliam/react-pro-sidebar/dist/css/styles.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { SiMicrosoftoffice, SiOneplus } from "react-icons/si";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { CgDisplayGrid, CgLogIn } from "react-icons/cg";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../redux/auth/action.types";
import { useEffect } from "react";

export const Sidebar = () => {
  let { user, isAuth } = useSelector((state) => state.auth);
  const [windowwidth] = useState(window.innerWidth < 400);
  const dispatch = useDispatch();
  console.log(windowwidth);
  const [collapsed, setCollapsed] = useState(windowwidth);
  const toast = useToast();
  const { pathname } = useLocation();
  console.log("Path from sidebar", pathname);

  const handleLogout = () => {
    toast({
      title: "LogingOut from the Current Account !",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      dispatch({ type: LOGOUT });
    }, 1500);
  };

  const [active, setActive] = useState({
    home: true,
    all: false,
    official: false,
    personal: false,
    other: false,
    new: false,
  });

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    console.log("path Changed");
    if (pathname === "/") {
      setActive({
        home: true,
        all: false,
        official: false,
        personal: false,
        other: false,
        new: false,
      });
    } else if (pathname === "/all") {
      setActive({
        home: false,
        all: true,
        official: false,
        personal: false,
        other: false,
        new: false,
      });
    } else if (pathname === "/official") {
      setActive({
        home: false,
        all: false,
        official: true,
        personal: false,
        other: false,
        new: false,
      });
    } else if (pathname === "/personal") {
      setActive({
        home: false,
        all: false,
        official: false,
        personal: true,
        other: false,
        new: false,
      });
    } else if (pathname === "/others") {
      setActive({
        home: false,
        all: false,
        official: false,
        personal: false,
        other: true,
        new: false,
      });
    } else if (pathname === "/createNew") {
      setActive({
        home: false,
        all: false,
        official: false,
        personal: false,
        other: false,
        new: true,
      });
    }
  }, [pathname]);

  return (
    <Box
      id="sidebar"
      position={"relative"}
      marginRight={"10px"}
      top={0}
      left={0}
     
    >
      <ProSidebar collapsed={collapsed} >
        <SidebarHeader id="sidebarHeader">
          
          <Image
            src="data:image/png;base64,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"
            id="Profilepic"
          ></Image>
          <Text textAlign={"center"} id="username" fontSize={["10%","90%"]}>
            {isAuth ? user.name : ""}
          </Text>



          <Box id={"collapsedBtn"} onClick={handleCollapsed}>
            {collapsed ? (
              <AiOutlineDoubleRight fontWeight={900} />
            ) : (
              <AiOutlineDoubleLeft />
            )}
          </Box>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem
              icon={<AiTwotoneHome color="white" fontSize={"25px"} />}
              active={active.home}
            >
              Home
              <Link to="/"></Link>
            </MenuItem>
          </Menu>

          <Menu iconShape="square">
            <MenuItem
              icon={<FaList color="white" fontSize={"22px"} />}
              active={active.all}
            >
              All Todo
              <Link to="/all"></Link>
            </MenuItem>
          </Menu>

          <Menu iconShape="square">
            <MenuItem
              icon={<SiMicrosoftoffice color="white" fontSize={"22px"} />}
              active={active.official}
            >
              Official
              <Link to="/official"></Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="square">
            <MenuItem
              icon={<BsFillSuitHeartFill color="white" fontSize={"22px"} />}
              active={active.personal}
            >
              Personal
              <Link to="/personal"></Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="square">
            <MenuItem
              icon={<CgDisplayGrid color="white" fontSize={"25px"} />}
              active={active.other}
            >
              Others
              <Link to="/others"></Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="square">
            <MenuItem
              icon={<SiOneplus color="white" fontSize={"22px"} />}
              active={active.new}
            >
              Create New
              <Link to="/createNew"></Link>
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          {isAuth ? (
            <Menu iconShape="square">
              <MenuItem
                icon={<FiLogOut color="red" fontSize={"25px"}></FiLogOut>}
                onClick={handleLogout}
              >
                LOGOUT
                {/* <Link to="/createNew"></Link> */}
              </MenuItem>
            </Menu>
          ) : (
            <Menu iconShape="square">
              <MenuItem
                icon={<CgLogIn color="red" fontSize={"25px"}></CgLogIn>}
              >
                LOGIN
                <Link to="/login"></Link>
              </MenuItem>
            </Menu>
          )}
        </SidebarFooter>
      </ProSidebar>
    </Box>
  );
};
