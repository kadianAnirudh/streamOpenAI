import Image from "next/image";
import streamLogo from "../Images/streamLogo.png";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <header>
      <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" class="flex items-center h-[50px] w-[50px]">
            <Image
              src={streamLogo}
              className="mr-3 h-full"
              alt="Stream Logo"
              priority
            />
          </Link>

          {/* Signup and SignIn button */}
          <div className="flex items-center lg:order-2">
            <div className="flex items-center">
              <Link
                href="/ai"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Stream AI
              </Link>
              <Link
                href="/generator"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Generator
              </Link>
              <Link
                href="/maps"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Maps
              </Link>
            </div>

            {!user ? (
              <div className="flex items-center">
                <Link
                  href="/sign-in"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
