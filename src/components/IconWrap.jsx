import React from 'react'

const IconWrap = ({ children, onClick, color = "white", title }) => (
    <motion.div
        title={title}
        whileHover={{
            scale: 1.15,
            boxShadow: "0 0 18px rgba(255,255,255,0.4)",
        }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="w-10 h-10 rounded-full bg-black/50
               flex items-center justify-center
               cursor-pointer"
        style={{ color }}
    >
        {children}
    </motion.div>

)

export default IconWrap