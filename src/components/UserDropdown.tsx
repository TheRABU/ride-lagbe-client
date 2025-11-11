import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaUser } from "react-icons/fa";
import { Link } from "react-router";

const UserDropdown = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded-full">
            <FaUser className="text-4xl" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="bg-neutral-800 text-white min-w-max">
            <Link to={"/dashboard/user"}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropdown;
