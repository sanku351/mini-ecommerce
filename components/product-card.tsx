import Image from "next/image"
import { formatCurrency } from "@/lib/utils"

interface Product {
  id: number
  name: string
  price: number
  description: string
  imageUrl?: string
  created_at: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { name, price, description, imageUrl } = product

  // Truncate description if it's too long
  const truncatedDescription = description.length > 100 ? `${description.substring(0, 100)}...` : description

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        {imageUrl ? (
          <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
          <span className="text-lg font-bold text-gray-900">{formatCurrency(price)}</span>
        </div>

        <p className="text-gray-600 text-sm mt-2">{truncatedDescription}</p>
      </div>
    </div>
  )
}
