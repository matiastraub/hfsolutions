import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Modal = React.memo(({ isOpen, onClose, title, children }) => {
  const MotionDiv = motion.div
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          key="modal-backdrop"
          className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} // only the backdrop is 0.4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MotionDiv
            key="modal-content"
            className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div>{children}</div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  )
})
