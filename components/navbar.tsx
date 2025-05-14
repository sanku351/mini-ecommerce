"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-gray-900" />
                <span className="ml-2 text-xl font-bold text-gray-900">MiniShop</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/submit"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/submit"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Submit Product
              </Link>
              <Link
                href="/products"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/products"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                My Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="flex">
          <Link
            href="/submit"
            className={`flex-1 text-center py-2 ${
              pathname === "/submit" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500"
            }`}
          >
            Submit Product
          </Link>
          <Link
            href="/products"
            className={`flex-1 text-center py-2 ${
              pathname === "/products" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500"
            }`}
          >
            My Products
          </Link>
        </div>
      </div>
    </nav>
  )
}
