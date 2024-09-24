import { GlobeIcon } from "lucide-react";
import { LinkedInIcon } from "../icons/LinkedInIcon";
import { XIcon } from "../icons/XIcon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#ebebeb] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <span className="text-gray-800">Follow us:</span>
          <a
            href="https://zaplineai.cloud"
            aria-label="Website"
            className="text-gray-800 hover:text-gray-700 transition-colors"
          >
            <GlobeIcon className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/zaplineai"
            aria-label="Twitter"
            className="text-gray-800 hover:text-gray-700 transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/company/zaplineai/"
            aria-label="LinkedIn"
            className="text-gray-800 hover:text-gray-700 transition-colors"
          >
            <LinkedInIcon className="w-6 h-6" />
          </a>
        </div>
        <div className="text-gray-800 text-sm">
          <Link
            href="https://zaplineai.cloud"
            className=" hover:text-gray-700 transition-colors"
          >
            © {new Date().getFullYear()} {"Zapline AI"}. All rights reserved.
          </Link>
        </div>
      </div>
    </footer>
  );
}
