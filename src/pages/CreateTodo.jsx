import {
  Box,
  Input,
  Button,
  Checkbox,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useReducer } from "react";
import styles from "./createtodo.module.css";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../redux/app/action";
import { POSTDATA_SUCCESS } from "../redux/app/action.types";
const initialState = {
  title: "",
  description: "",
  date: "",
  deadline: "",
  subTasks: [],
  status: "todo",
  tags: { Official: false, Personal: false, Others: false },
};

const types = {
  SET_TITLE: "SET_tITLE",
  SET_DECRIPTION: "SET_DECRIPTION",
  SET_DATE: "SET_DATE",
  SET_DEADLINE: "SET_DEADLINE",
  SET_SUBTASK: "SET_SUBTASK",
  UPDATE_SUBTASK: "UPDATE_SUBTASK",
  TOGGLE_SUBTASK: "TOGGLE_SUBTASK",
  SET_STATUS: "SET_STATUS",
  SET_TAGS: "SET_TAGS",
  RESET: "RESET",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.SET_TITLE:
      return { ...state, title: payload };

    case types.SET_DECRIPTION:
      return { ...state, description: payload };

    case types.SET_DATE:
      return { ...state, date: payload };
    case types.SET_DEADLINE:
      return { ...state, deadline: payload };
    case types.SET_SUBTASK:
      return { ...state, subTasks: [...state.subTasks, payload] };

    case types.UPDATE_SUBTASK:
      let updatedsubTask = state.subTasks.filter((e) => e.id !== payload);
      return { ...state, subTasks: updatedsubTask };

    case types.TOGGLE_SUBTASK:
      let toggledsubTask = state.subTasks.map((e) =>
        e.id === payload ? { ...e, status: !e.status } : e
      );
      return { ...state, subTasks: toggledsubTask };

    case types.SET_STATUS:
      return { ...state, status: payload };

    case types.SET_TAGS:
      return { ...state, tags: { ...state.tags, ...payload } };

    case types.RESET:
      return { ...initialState };
    default:
      throw new Error("Action is not Proper.Provide a proper action");
  }
};

export const CreateTodo = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [state, dispatchState] = useReducer(reducer, initialState);
  const { title, description, date, deadline, subTasks, status, tags } = state;
  const { Personal, Official, Others } = tags;
  const toast = useToast();

  console.log(user.email);
  let [subtask, setSubTask] = useState("");

  const handleSubTask = () => {
    let payload = {
      id: uuidv4(),
      text: subtask,
      status: false,
    };

    dispatchState({ type: types.SET_SUBTASK, payload });
    setSubTask("");
  };


  const handleAdd = () => {
    const payload = {
      ...state,
      user: user.email,
    };

    // axios
    //   .post(" http://localhost:8080/todos", payload)
    dispatch(postData(payload)).then((res) => {
      if (res.status === POSTDATA_SUCCESS) {
        toast({
          title: "TODO Created Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        dispatchState({type:types.RESET})
      } else {
        toast({
          title:
            "An Error Occered When creating TODO !. Please fill the From properly.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    });
  };

  return (
    <Flex direction={"column"} width={"100%"}>
      <Heading
        as="h2"
        size="lg"
        textAlign={"left"}
        marginBottom={"10px"}
        position={"sticky"}
        top={"-5px"}
        zIndex={5}
        background={"#282c34"}
      >
        <Button
          variant={"ghost"}
          _hover={{ background: "local" }}
          fontSize={"2xl"}
          leftIcon={<AiFillEdit></AiFillEdit>}
        ></Button>
        Create New Todo
      </Heading>


      <Box className={styles.main}>
        {/* todo Content */}
        <Flex direction={"column"} gap={"20px"}>
          <Input
            type={"text"}
            placeholder={"Write Your todo"}
            color={"black"}
            value={title}
            onChange={(e) =>
              dispatchState({ type: types.SET_TITLE, payload: e.target.value })
            }
          ></Input>

          <Text marginBottom={"-15px"}>Creation Date</Text>
          <Input
            type={"date"}
            value={date}
            color={"black"}
            onChange={(e) =>
              dispatchState({ type: types.SET_DATE, payload: e.target.value })
            }
          ></Input>

          <Text marginBottom={"-15px"}>Deadline</Text>
          <Input
            type={"date"}
            value={deadline}
            color={"black"}
            onChange={(e) =>
              dispatchState({
                type: types.SET_DEADLINE,
                payload: e.target.value,
              })
            }
          ></Input>
          <Textarea
            placeholder="Description"
            value={description}
            color={"black"}
            minHeight={"120px"}
            onChange={(e) =>
              dispatchState({
                type: types.SET_DECRIPTION,
                payload: e.target.value,
              })
            }
          ></Textarea>
        </Flex>

        {/* Add Subtask */}
        <Box>
          <Flex gap={"10px"}>
            <Input
              value={subtask}
              placeholder="Sub Task"
              color={"black"}
              onChange={(e) => setSubTask(e.target.value)}
            />
            <Button
              bg={"#6136fa"}
              _hover={{ background: "#6e47fa" }}
              onClick={handleSubTask}
            >
              {" "}
              ADD
            </Button>
          </Flex>
          <Flex direction={"column"} gap="10px" padding={"20px"}>
            {subTasks.map((task) => {
              return (
                <Flex key={task.id} gap={"10px"} alignItems={"center"}>
                  <Checkbox
                    checked={task.status}
                    size={"lg"}
                    colorScheme={"green"}
                    onChange={() =>
                      dispatchState({
                        type: types.TOGGLE_SUBTASK,
                        payload: task.id,
                      })
                    }
                  ></Checkbox>
                  <Text fontSize={"22px"}>{task.text} </Text>
                  <Button
                    leftIcon={<MdDelete color={"red"}></MdDelete>}
                    fontSize={"30px"}
                    variant={"ghost"}
                    _hover={{ background: "local" }}
                    onClick={() =>
                      dispatchState({
                        type: types.UPDATE_SUBTASK,
                        payload: task.id,
                      })
                    }
                  ></Button>
                </Flex>
              );
            })}
          </Flex>
        </Box>

        {/* tag andStatus */}
        <Flex
          direction={"column"}
          padding={"20px"}
          textAlign={"left"}
          gap="40px"
        >
          <Box>
            <Heading as={"h4"} size="md" marginBottom={"10px"} color={"gray"}>
              Status
            </Heading>
            <RadioGroup
              value={status}
              onChange={(e) =>
                dispatchState({ type: types.SET_STATUS, payload: e })
              }
            >
              <Stack direction={"column"}>
                <Radio value={"todo"} size="lg">
                  <Text color={"#f56565"}> Todo</Text>
                </Radio>
                <Radio value={"inprogress"} size="lg" >
                  <Text color={"black"}>InProgress...</Text>
                  
                </Radio>
                <Radio value={"done"} size="lg">
                 <Text color={"green"}> Done</Text>
                 
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Heading as={"h4"} size="md" marginBottom={"10px"} color={"gray"}>
              Tags
            </Heading>
            <Stack>
              <Checkbox
                size="lg"
                isChecked={Personal} 
                colorScheme="green"
                onChange={(e) => {
                  dispatchState({
                    type: types.SET_TAGS,
                    payload: { Personal: e.target.checked },
                  });
                 // console.log("Personal", e.target.checked);
                }}
              >
                <Text>Personal</Text>
               
              </Checkbox>
              <Checkbox
                size="lg"
                isChecked={Official}
                colorScheme="green"
                onChange={(e) => {
                  dispatchState({
                    type: types.SET_TAGS,
                    payload: { Official: e.target.checked },
                  });
                }}
              >
                <Text> Official</Text>
               
              </Checkbox>
              <Checkbox
                size="lg"
                isChecked={Others}
                colorScheme="green"
                onChange={(e) => {
                  dispatchState({
                    type: types.SET_TAGS,
                    payload: { Others: e.target.checked },
                  });
                }}
              >
                <Text> Others</Text>
               
              </Checkbox>
            </Stack>
          </Box>
        </Flex>

        {/* ADD Task Button */}
        <Box  width={"100%"}
            height={["10%","10%","10%","100%"]}>
          <Button
            bg={"#25c07f"}
            _hover={{ background: "#10dd7d" }}
            fontSize={"2xl"}
            letterSpacing={"2px"}
            width={"100%"}
            height={["10%","10%","10%","100%"]}
            padding={"50px"}
            onClick={handleAdd}
          >
            ADD TODO
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
