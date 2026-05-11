import Image from "next/image"
import { motion } from "framer-motion"

export function Avatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex justify-center items-center"
    >
      <div className="relative w-96 h-96 rounded-lg shadow-2xl shadow-primary/40 border border-primary/30">
        <Image
          src="/avatar.svg"
          alt="Avatar"
          fill
          className="object-contain rounded-lg"
          priority
        />
      </div>
    </motion.div>
  )
}
