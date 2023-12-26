import { Plus } from "lucide-react";
import { useState } from "react";
import { AddResources } from "../../../components/modal/add-resource-modal";

export default function ReSourceManageMentPage() {
  const tabs = [
    {
      name: "Home",
      link: "#",
      content: "Home Content",
      para: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, sunt incidunt dolores dolor libero nemo accusamus, nobis sit, optio aut hic alias magnam beatae! optio aut hic alias magnam beatae!",
    },
    {
      name: "About",
      link: "#",
      content: "About Content",
      para: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, sunt incidunt dolores dolor libero nemo accusamus, nobis sit, optio aut hic alias magnam beatae! dolores dolor libero nemo accusamus",
    },
    {
      name: "Contact",
      link: "#",
      content: "Contact Content",
      para: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, sunt incidunt dolores dolor libero nemo accusamus, nobis sit, optio aut hic alias magnam beatae! ipsum dolor sit amet consectetur adipisicing",
    },
  ];
  const [openTab, setOpenTab] = useState("Home");
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const handleResourceAdd = () => {
    setIsAddResourceModalOpen(true);
    setIsAddProjectModalOpen(true);
  };
  const closeAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
  };

  return (
    <>
      {/* <h1 className='text-2xl font-bold mb-4 ml-5'>Resources</h1> */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Resources</h1>
        <button
          className="bg-black text-white px-3 py-2 rounded-md flex items-center  mr-3"
          onClick={handleResourceAdd}
        >
          <Plus className="w-5 h-5 mr-3 " />
          <span className="hidden sm:inline">Add Assignee</span>
        </button>
      </div>
      <div className="container mx-auto">
        <AddResources
            isOpen={isAddProjectModalOpen}
            onClose={closeAddProjectModal}                
        />
       
        <div className="flex items-center justify-evenly">
          <ul className="flex flex-col h-screen bg-white-200">
            {tabs.map((tab) => (
              <li
                key={tab.name}
                className={`w-full text-center px-2 py-2 my-2  rounded  ${
                  openTab === tab.name
                    ? "bg-blue-700 text-white"
                    : "bg-blue-300"
                }`}
              >
                <a
                  href={tab.link}
                  onClick={() => setOpenTab(tab.name)}
                  className="w-full px-16 py-3"
                >
                  {tab.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="pl-3 bg-white border rounded-xl h-screen w-3/4">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                className={tab.name === openTab ? "block" : "hidden"}
              >
                <div className="text-2xl font-extrabold">{tab.content}</div>
                <p>{tab.para}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
