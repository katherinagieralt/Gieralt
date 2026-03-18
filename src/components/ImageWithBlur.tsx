import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ImageWithBlurProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
  width?: string | number;
  height?: string | number;
}

export function ImageWithBlur({ 
  src, 
  alt, 
  className = "", 
  aspectRatio = "aspect-video",
  loading = "lazy",
  decoding = "async",
  width,
  height
}: ImageWithBlurProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Low-res placeholder / Blur effect */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center"
          >
            <div className="w-full h-full bg-rose-500/5 backdrop-blur-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        width={width}
        height={height}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.1
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover ${isLoaded ? "" : "invisible"}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}


