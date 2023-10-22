import React from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <div>
      <div className="h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
        <div className="grid grid-cols-2 gap-2">
          {[
            1, 2, 3, 4, 45, 56, 87, 98, 90, 232, 234, 54, 567, 345, 324, 342,
            324, 3442, 342, 234,
          ].map((img, i) => (
            <Link
              key={i}
              className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
            >
              <img
                className="w-full h-full object-fill"
                src={`http://localhost:5173/project.png`}
                alt=""
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
