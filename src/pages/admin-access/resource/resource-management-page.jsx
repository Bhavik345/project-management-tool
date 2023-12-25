import { useState } from "react";

export default function ReSourceManageMentPage() {
    const tabs = [
        { name: "Home", link: "#", content: "Home Content",para:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, sunt incidunt dolores dolor libero nemo accusamus, nobis sit, optio aut hic alias magnam beatae! optio aut hic alias magnam beatae!' },
        { name: "About", link: "#", content: "About Content" , para:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, sunt incidunt dolores dolor libero nemo accusamus, nobis sit, optio aut hic alias magnam beatae! dolores dolor libero nemo accusamus' },
        { name: "Contact", link: "#", content: "Contact Content",para:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, sunt incidunt dolores dolor libero nemo accusamus, nobis sit, optio aut hic alias magnam beatae! ipsum dolor sit amet consectetur adipisicing' },
    ];
    const [openTab, setOpenTab] = useState("Home");

    return (
        <>
        <h1 className='text-2xl font-bold mb-4 ml-5'>Resources</h1>
            <div className="container mx-auto">
                <div className="flex items-center justify-evenly">
                    <ul className="flex flex-col h-screen bg-white-200">
                        {tabs.map((tab) => (
                            <li key={tab.name} className={`w-full text-center px-2 py-2 my-2  rounded  ${openTab === tab.name ? 'bg-blue-500 text-white' : 'bg-blue-300'}`}>
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
                    <div className="pl-3 bg-white border h-screen w-3/4">
                        {tabs.map((tab) => (
                            <div
                                key={tab.name}
                                className={
                                    tab.name === openTab ? "block" : "hidden"
                                }
                            >
                              <div className="text-2xl font-extrabold">
                                {tab.content}
                              </div>
                            <p>
                              {tab.para}
                            </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}