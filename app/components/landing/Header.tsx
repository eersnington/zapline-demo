import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header({
  storeData,
  cartItems,
}: {
  storeData: {
    storeName: string;
    products: { id: number; name: string; price: number; image: string }[];
  };
  cartItems: number;
}) {
  return (
    <header className="bg-gray-950 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-[#ebebeb]">
            {storeData.storeName} {" (Demo Store)"}
          </h1>
        </Link>
        <nav className="hidden md:flex space-x-8 text-[#ebebeb]">
          <Link href="/" className=" hover:text-gray-400 transition-colors">
            Home
          </Link>
          <Link
            href="https://zaplineai.com/"
            className=" hover:text-gray-400 transition-colors"
          >
            Zapline
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-[#ebebeb]"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItems > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-[#ebebeb] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-[#ebebeb]"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#ebebeb] text-[#ebebeb]"
            >
              <DropdownMenuItem>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/products">Products</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
