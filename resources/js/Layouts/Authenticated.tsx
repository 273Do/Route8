import React, { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import R8Logo from "../../img/Route8.png";
import { LordIcon } from "../Pages/Common/lord-icon";
import Footer from "./Footer";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface Props {
  auth: any;
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function Authenticated({ auth, header, children }: Props) {
  // const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [searchWord, setSearchWord] = useState<string>("");

  const mode: string[] = ["title", "start", "goal", "body"];
  const [searchMode, setSearchMode] = useState<string>(mode[0]);

  const navigateTo = (route: string, method: string = "get", data = {}) => {
    Inertia.visit(route, {
      method: method,
      data: data,
    });
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && /^\s*$/.test(searchWord) == false) {
      e.preventDefault();
      navigateTo(`/posts/search/${searchMode}/${searchWord.trim()}`);
    }
  };

  // const handleChangeModeClick = () => {
  //   if (searchMode == Mode[0]) setSearchMode(Mode[1]);
  //   else if (searchMode == Mode[1]) setSearchMode(Mode[2]);
  //   else if (searchMode == Mode[2]) setSearchMode(Mode[3]);
  //   else if (searchMode == Mode[3]) setSearchMode(Mode[0]);
  //   //console.log(searchMode);
  // };

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const handleChangeModeClick = () => {
    const currentModeIndex = mode.indexOf(searchMode);
    if (currentModeIndex !== -1) {
      const nextModeIndex = (currentModeIndex + 1) % mode.length;
      setSearchMode(mode[nextModeIndex]);
    }

    setButtonDisabled(true);

    // 1秒後にボタンを再び有効化
    setTimeout(() => {
      setButtonDisabled(false);
    }, 900);
  };

  const showSwal = () => {
    withReactContent(Swal).fire({
      background: "transparent",
      confirmButtonColor:"#222",
      title: <h2 style={{color:"#f4ede4"}}>License</h2>,
      html:
      <>
      <h3 style={{textDecoration:"none", color:"#f4ede4"}}><a href="https://lordicon.com/" target="_blank" rer="noopener noreferrer" style={{color:"#f4ede4"}}>Icons by Lordicon.com</a></h3>
      <h3 style={{textDecoration:"none", color:"#f4ede4"}}>Source is on <a href="https://github.com/273Do/Route8" target="_blank" rer="noopener noreferrer" style={{color:"#f4ede4"}}>GitHub</a></h3>
      <h3 style={{color:"#f4ede4"}}>The explanation is on <a href="https://qiita.com/273Do/items/15ab0361b020d68cc4eb" target="_blank" rer="noopener noreferrer" style={{color:"#f4ede4"}}>Qiita</a></h3>
      </>,
      footer:
      <>
      <p style={{color:"#f4ede4"}}>This site was created by 273Do.</p>
      <p style={{color:"#f4ede4"}}>この作成物および同梱物を使用したことによって生じたすべての障害・損害・不具合等に関しては，私と私の関係者および私の所属するいかなる団体・組織とも，一切の責任を負いません．各自の責任においてご使用ください．</p>
      </>,
    })
  }

  return (
    // <div className="min-h-screen bg-gray-100">
    //     <nav className="bg-white border-b border-gray-100">
    //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
    //             <div className="flex justify-between h-16">
    //                 <div className="flex">
    //                     <div className="shrink-0 flex items-center">
    //                         <Link href="/">
    //                             <ApplicationLogo className="block h-9 w-auto text-gray-500" />
    //                         </Link>
    //                     </div>

    //                     <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
    //                         <NavLink
    //                             href={route("dashboard")}
    //                             active={route().current("dashboard")}
    //                         >
    //                             Dashboard
    //                         </NavLink>
    //                         <NavLink
    //                             href={route("index")}
    //                             active={route().current("index")}
    //                         >
    //                             PostPage
    //                         </NavLink>
    //                         <NavLink
    //                             href={route("create")}
    //                             active={route().current("create")}
    //                         >
    //                             CreatePage
    //                         </NavLink>
    //                     </div>
    //                 </div>

    //                 <div className="hidden sm:flex sm:items-center sm:ml-6">
    //                     <div className="ml-3 relative">
    //                         <Dropdown>
    //                             <Dropdown.Trigger>
    //                                 <span className="inline-flex rounded-md">
    //                                     <button
    //                                         type="button"
    //                                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
    //                                     >
    //                                         {auth.user.name}

    //                                         <svg
    //                                             className="ml-2 -mr-0.5 h-4 w-4"
    //                                             xmlns="http://www.w3.org/2000/svg"
    //                                             viewBox="0 0 20 20"
    //                                             fill="currentColor"
    //                                         >
    //                                             <path
    //                                                 fillRule="evenodd"
    //                                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    //                                                 clipRule="evenodd"
    //                                             />
    //                                         </svg>
    //                                     </button>
    //                                 </span>
    //                             </Dropdown.Trigger>

    //                             <Dropdown.Content>
    //                                 <Dropdown.Link
    //                                     href={route("logout")}
    //                                     method="post"
    //                                     as="button"
    //                                 >
    //                                     ログアウト
    //                                 </Dropdown.Link>
    //                             </Dropdown.Content>
    //                         </Dropdown>
    //                     </div>
    //                 </div>

    //                 <div className="-mr-2 flex items-center sm:hidden">
    //                     <button
    //                         onClick={() =>
    //                             setShowingNavigationDropdown(
    //                                 (previousState) => !previousState,
    //                             )
    //                         }
    //                         className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
    //                     >
    //                         <svg
    //                             className="h-6 w-6"
    //                             stroke="currentColor"
    //                             fill="none"
    //                             viewBox="0 0 24 24"
    //                         >
    //                             <path
    //                                 className={
    //                                     !showingNavigationDropdown
    //                                         ? "inline-flex"
    //                                         : "hidden"
    //                                 }
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 strokeWidth="2"
    //                                 d="M4 6h16M4 12h16M4 18h16"
    //                             />
    //                             <path
    //                                 className={
    //                                     showingNavigationDropdown
    //                                         ? "inline-flex"
    //                                         : "hidden"
    //                                 }
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 strokeWidth="2"
    //                                 d="M6 18L18 6M6 6l12 12"
    //                             />
    //                         </svg>
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>

    //         <div
    //             className={
    //                 (showingNavigationDropdown ? "block" : "hidden") +
    //                 " sm:hidden"
    //             }
    //         >
    //             <div className="pt-2 pb-3 space-y-1">
    //                 <ResponsiveNavLink
    //                     href={route("dashboard")}
    //                     active={route().current("dashboard")}
    //                 >
    //                     Dashboard
    //                 </ResponsiveNavLink>
    //             </div>

    //             <div className="pt-4 pb-1 border-t border-gray-200">
    //                 <div className="px-4">
    //                     <div className="font-medium text-base text-gray-800">
    //                         {auth.user.name}
    //                     </div>
    //                     <div className="font-medium text-sm text-gray-500">
    //                         {auth.user.email}
    //                     </div>
    //                 </div>

    //                 <div className="mt-3 space-y-1">
    //                     <ResponsiveNavLink
    //                         method="post"
    //                         href={route("logout")}
    //                         as="button"
    //                     >
    //                         ログアウト
    //                     </ResponsiveNavLink>
    //                 </div>
    //             </div>
    //         </div>
    //     </nav>

    //     {/* {header && (
    //         <header className="bg-white shadow">
    //             <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    //                 {header}
    //             </div>
    //         </header>
    //     )} */}

    //     <main>{children}</main>
    // </div>
    <div className="contents">
      <header>
        <div>
          <img src={R8Logo} alt="Route8Logo" onClick={showSwal}/>
        </div>
        {/* <form action="#" className="search_form" onSubmit={handleSearch}> */}
        <div className="search_form" onKeyDown={handleSearch}>
          <div
            className={`search_button ${buttonDisabled ? "button_disabled" : ""}`}
            onClick={() => handleChangeModeClick()}
          >
            <LordIcon
              src="https://cdn.lordicon.com/kkvxgpti.json"
              trigger="click"
              colors={{ primary: "#000" }}
              size={28}
            />
          </div>
          <input
            type="text"
            className="search_area"
            placeholder={
              searchMode.substring(0, 1).toUpperCase() + searchMode.substring(1).toLowerCase()
            }
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
        <Link className="link_no_underline" method="post" href={route("logout")}>
          <div className="user_button">
            <LordIcon
              src="https://cdn.lordicon.com/kthelypq.json"
              trigger="hover"
              colors={{ primary: "#000" }}
              size={28}
            />
            <p>{auth.user.name}</p>
          </div>
        </Link>
      </header>
      <main>{children}</main>
      <Footer user_data={auth.user} />
    </div>
  );
}
