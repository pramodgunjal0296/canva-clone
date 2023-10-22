import { BsFillTrashFill } from "react-icons/bs";
import Element from "./Element";

const CreateComponent = ({ info, current_component, removeComponent }) => {
  const randValue = Math.floor(Math.random() * 100);

  let html = "";
  if (info.name === "main_frame") {
    html = (
      <div
        onClick={() => info.setCurrentComponent(info)}
        className="hover:border-[2px] hover:border-indigo-500 shadow-md"
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          zIndex: info.z_index,
        }}
      >
        {info.image && (
          <img className="w-full h-full" src={info.image} alt="image" />
        )}
      </div>
    );
  }
  if (info.name === "shape" && info.type === "rect") {
    html = (
      <div
        id={randValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate
            ? ` rotate(${info.rotate} deg) `
            : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <Element id={randValue} info={info} exId="" />
        {current_component.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md"
          >
            <BsFillTrashFill />
          </div>
        )}
      </div>
    );
  }
  if (info.name === "shape" && info.type === "circle") {
    html = (
      <div
        id={randValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate
            ? ` rotate(${info.rotate} deg) `
            : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <Element id={randValue} info={info} exId={`${randValue}c`} />
        <div
          id={`${randValue}c`}
          className="rounded-full"
          style={{
            width: info.width + "px",
            height: info.width + "px",
            background: info.color,
            opacity: info.opacity,
          }}
        ></div>
        {current_component.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md"
          >
            <BsFillTrashFill />
          </div>
        )}
      </div>
    );
  }
  if (info.name === "shape" && info.type === "triangle") {
    html = (
      <div
        id={randValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate
            ? ` rotate(${info.rotate} deg) `
            : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <Element id={randValue} info={info} exId={`${randValue}c`} />

        <div
          id={`${randValue}c`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0,100% 100%,0 100%)",
          }}
        ></div>
        {current_component.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md"
          >
            <BsFillTrashFill />
          </div>
        )}
      </div>
    );
  }
  return html;
};

export default CreateComponent;
