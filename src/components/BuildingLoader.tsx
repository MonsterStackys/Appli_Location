import { motion } from 'motion/react';

export function BuildingLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-32 h-40">
        {/* Building structure */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-32 bg-gradient-to-b from-[#009E60] to-[#007d4d] rounded-t-lg"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Windows */}
          <div className="grid grid-cols-3 gap-2 p-2">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-full h-3 bg-[#FCD116] rounded-sm"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Door */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-[#3A75C4] rounded-t-md" />
        </motion.div>

        {/* Construction crane */}
        <motion.div
          className="absolute top-0 right-0 w-16 h-16"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-1 h-12 bg-[#FCD116] absolute left-1/2 -translate-x-1/2" />
          <div className="w-14 h-1 bg-[#FCD116] absolute top-2 left-1/2 -translate-x-1/2" />
        </motion.div>

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#3A75C4] rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: '50%',
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <motion.p
        className="mt-6 text-muted-foreground"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Chargement en cours...
      </motion.p>
    </div>
  );
}
