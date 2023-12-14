"use client";

import { IoMdExit } from "react-icons/io";
import Cookies from "js-cookie";

export function Logout() {

  function handleLogout() {
    Cookies.remove("auth_token");
    window.location.href = "/";
  }

  return (
    <abbr onClick={handleLogout} title="Sair" className="cursor-pointer">
      <IoMdExit className="text-xl hover:text-red-600" />
    </abbr>
  );
}