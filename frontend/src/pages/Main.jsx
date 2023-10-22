import { useEffect, useState } from "react";
import Header from "../components/Header";
import { BsGrid1X2, BsFillImageFill } from "react-icons/bs";
import { FaShapes } from "react-icons/fa";
import { GoCloud } from "react-icons/go";
import { TfiText } from "react-icons/tfi";
import { FcFolder } from "react-icons/fc";
import { GiTransparentSlime } from "react-icons/gi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import TemplateDesign from "../components/main/TemplateDesign";
import MyImages from "../components/MyImages";
import Projects from "../components/Projects";
import Image from "../components/Image";
import CreateComponent from "../components/CreateComponent";

const Main = () => {
  const [state, setState] = useState("");
  const [current_component, setCurrentComponent] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [rotate, setRotate] = useState(0);
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [show, setShow] = useState({
    status: true,
    name: "",
  });
  const setElement = (type, name) => {
    setState(type);
    setShow({
      state: false,
      name,
    });
  };
  const moveElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if (isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    };
    const mouseUp = () => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };
  const resizeElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const height = parseInt(getStyle.height);
      const width = parseInt(getStyle.width);
      if (isMoving) {
        currentDiv.style.height = `${height + movementX}px`;
        currentDiv.style.width = `${width + movementY}px`;
      }
    };
    const mouseUp = () => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };
  const rotateElement = () => {
    console.log("rotateElement");
  };
  const removeComponent = (id) => {
    const temp = components.filter((c) => c.id !== id);
    setCurrentComponent("");
    setComponents(temp);
  };

  const remove_background = () => {
    const com = components.find((c) => c.id === current_component.id);
    const temp = components.filter((c) => c.id !== current_component.id);
    com.image = "";
    setImage("");
    setComponents([...temp, com]);
  };

  const [components, setComponents] = useState([
    {
      name: "main_frame",
      type: "rect",
      id: Math.floor(Math.random() * 100 + 1),
      height: 450,
      width: 650,
      z_index: 1,
      color: "#fff",
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    },
  ]);

  const createShape = (name, type) => {
    const style = {
      id: components.length + 1,
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: " #3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      remove_background: () => setImage(""),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setComponents([...components, style]);
  };

  useEffect(() => {
    if (current_component) {
      const index = components.findIndex((c) => c.id === current_component.id);
      const temp = components.filter((c) => c.id !== current_component.id);
      if (current_component.name !== "text") {
        components[index].width = width || current_component.width;
        components[index].height = height || current_component.height;
      }

      if (current_component.name === "main_frame" && image) {
        components[index].image = image || current_component.image;
      }
      components[index].color = color || current_component.color;
      if (current_component.name !== "main_frame") {
        components[index].left = left || current_component.left;
        components[index].top = top || current_component.top;
      }

      setComponents([...temp, components[index]]);
      setWidth("");
      setHeight("");
      setTop("");
      setLeft("");
    }
  }, [color, image, left, top, width, height]);
  return (
    <div className="min-w-screen h-screen bg-black">
      <Header />
      <div className="flex h-[calc(100%-60px)] w-screen">
        <div className="w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto">
          <div
            onClick={() => setElement("design", "design")}
            className={`${
              show.name === "design" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col gap-1 items-center
            hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsGrid1X2 />
            </span>
            <span className="text-xs font-medium">Design</span>
          </div>
          <div
            onClick={() => setElement("shape", "shape")}
            className={`${
              show.name === "shape" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col gap-1 items-center
            hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaShapes />
            </span>
            <span className="text-xs font-medium">Shapes</span>
          </div>

          <div
            onClick={() => setElement("image", "uploadImage")}
            className={`${
              show.name === "image" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col gap-1 items-center
            hover:text-gray-100`}
          >
            <span className="text-2xl">
              <GoCloud />
            </span>
            <span className="text-xs font-medium">Upload</span>
          </div>
          <div
            onClick={() => setElement("text", "text")}
            className={`${
              show.name === "text" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col gap-1 items-center
            hover:text-gray-100`}
          >
            <span className="text-2xl">
              <TfiText />
            </span>
            <span className="text-xs font-medium">Text</span>
          </div>
          <div
            onClick={() => setElement("project", "project")}
            className={`${
              show.name === "project" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col gap-1 items-center
            hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FcFolder />
            </span>
            <span className="text-xs font-medium">Project</span>
          </div>
          <div
            onClick={() => setElement("initImage", "images")}
            className={`${
              show.name === "initImage" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col gap-1 items-center
            hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsFillImageFill />
            </span>
            <span className="text-xs font-medium">Images</span>
          </div>
          <div
            onClick={() => setElement("background", "background")}
            className={`${
              show.name === "background" ? "bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col gap-1 items-center
            hover:text-gray-100`}
          >
            <span className="text-2xl">
              <GiTransparentSlime />
            </span>
            <span className="text-xs font-medium">Background</span>
          </div>
        </div>
        <div className="h-full w-[calc(100%-75px)]">
          <div
            className={`${
              show.status ? "p-0 -left-[350px]" : "px-8 left-[75px] py-5"
            } bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}
          >
            <div
              onClick={() => setShow({ name: "", status: true })}
              className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded"
            >
              <MdKeyboardArrowLeft />
            </div>
            {state === "design" && (
              <div className="grid grid-cols-2 gap-2">
                <TemplateDesign />
              </div>
            )}
            {state === "shape" && (
              <div
                onClick={() => createShape("shape", "rect")}
                className="grid grid-cols-3 gap-2"
              >
                <div className="h-[90px] bg-[#3c3c3d] cursor-pointer"></div>
                <div
                  onClick={() => createShape("shape", "circle")}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full"
                ></div>
                <div
                  onClick={() => createShape("shape", "triangle")}
                  style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer"
                ></div>
              </div>
            )}
            {state === "image" && (
              <div>
                <MyImages />
              </div>
            )}
            {state === "text" && (
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm">
                    <h2>Add a Text</h2>
                  </div>
                </div>
              </div>
            )}
            {state === "project" && (
              <div>
                <Projects />
              </div>
            )}
            {state === "initImage" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
                <Image />
              </div>
            )}
            {state === "background" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    1, 2, 3, 4, 45, 56, 87, 98, 90, 232, 234, 54, 567, 345, 324,
                    342, 324, 3442, 342, 234,
                  ].map((img, i) => (
                    <div
                      onClick={() =>
                        setImage("http://localhost:5174/project.png")
                      }
                      key={i}
                      className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
                    >
                      <img
                        className="w-full h-full object-fill"
                        src={`http://localhost:5174/project.png`}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex h-full">
            <div
              className={`flex justify-center relative items-center h-full ${
                !current_component
                  ? "w-full"
                  : " w-[calc(100%-250px)] overflow-hidden "
              }`}
            >
              <div className="m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden">
                <div
                  id="main_design"
                  className="w-auto relative h-auto overflow-hidden"
                >
                  {components.map((c, i) => (
                    <CreateComponent
                      key={i}
                      info={c}
                      current_component={current_component}
                      removeComponent={removeComponent}
                    />
                  ))}
                </div>
              </div>
            </div>
            {current_component && (
              <div className="h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2 ">
                <div className="flex gap-3 flex-col items-start h-full px-3 justify-start">
                  <div className="flex gap-4 justify-start items-start">
                    <span>Color :</span>
                    <label
                      className="w-[30px] h-[30px] cursor-pointer rounded-md"
                      style={{
                        background: `${
                          current_component.color &&
                          current_component.color !== "#fff"
                            ? current_component.color
                            : "gray"
                        }`,
                      }}
                      htmlFor="color"
                    ></label>
                    <input
                      onChange={(e) => setColor(e.target.value)}
                      type="color"
                      className="invisible"
                      id="color"
                    />
                  </div>
                  {current_component.name === "main_frame" && image && (
                    <div>
                      <button
                        className="p-[6px] bg-slate-700 text-white rounded-sm"
                        onClick={remove_background}
                      >
                        Remove Background
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
