/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { baseApi } from "@/redux/baseApi";
import { useIsDriverQuery } from "@/redux/features/driver/driver.api";

const UserDropdown = () => {
  const { data } = useIsDriverQuery(undefined);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("check if user is driver forntend", data?.driver_email);

  const handleLogout = async () => {
    const result = await logout(undefined).unwrap();
    if ("error" in result) {
      const error = result.error as any;
      toast.error(error.data?.message || "Failed to logout");
    } else {
      toast.success("Logged out successfully!");
      dispatch(baseApi.util.resetApiState());
      navigate("/");
    }
  };

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
            {data?.driver_email && (
              <DropdownMenuItem>
                <Link to={"/dashboard/driver"} className="w-full">
                  Driver Dashboard
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <Link to={"/dashboard/user/profile"} className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to={"/dashboard/user/billing"} className="w-full">
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/dashboard/user/team"} className="w-full">
                Team
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/dashboard/user/subscription"} className="w-full">
                Subscription
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoading}
              className="cursor-pointer hover:bg-red-600 focus:bg-red-600"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropdown;
