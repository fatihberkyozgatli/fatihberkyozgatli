import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative w-8 h-8 hover:opacity-80 transition-opacity">
        <Image
          src="/avatar.svg"
          alt="Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className="font-mono font-semibold text-sm hidden sm:inline">fatihOS</span>
    </Link>
  )
}
