'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { CompanyData } from '@/types';

interface HeroOverlayProps {
    isLoading: boolean;
    data: CompanyData;
}

export default function HeroOverlay({ isLoading, data }: HeroOverlayProps) {
    if (!data || isLoading) return null;

    return (
        <div className="absolute inset-0 flex items-start md:items-center justify-center pointer-events-none z-10 overflow-y-auto">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.5
                    }}
                    className="pointer-events-auto mt-20 md:mt-0"
                >
                    {/* Glassmorphic Card */}
                    <div className="
            relative max-w-2xl mx-auto
            bg-white/10 backdrop-blur-2xl
            border border-white/20
            rounded-2xl md:rounded-3xl p-5 md:p-12
            shadow-2xl shadow-black/40
            before:absolute before:inset-0
            before:rounded-2xl md:before:rounded-3xl before:bg-gradient-to-br
            before:from-white/20 before:to-transparent
            before:opacity-50 before:-z-10
          ">
                        {/* Company Name - 3D Text Effect */}
                        <motion.h1
                            className="
                text-2xl sm:text-4xl md:text-7xl font-heading font-bold
                bg-gradient-to-br from-white via-accent-400 to-primary-500
                bg-clip-text text-transparent
                mb-2 md:mb-4
                drop-shadow-2xl
              "
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            {data.company.name}
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            className="
                text-sm sm:text-lg md:text-2xl text-white/90
                mb-4 md:mb-8 font-light tracking-wide
                drop-shadow-lg
              "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            {data.hero.subheadline}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-2 md:gap-4 mb-6 md:mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.8 }}
                        >
                            {/* Primary CTA - Magnetic Effect */}
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 20px 60px rgba(212, 175, 55, 0.5)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="
                  px-5 py-3 md:px-8 md:py-4 rounded-full
                  bg-gradient-to-r from-accent-500 to-accent-400
                  text-primary-900 font-bold text-sm md:text-lg
                  shadow-xl shadow-accent-500/50
                  hover:shadow-2xl hover:shadow-accent-500/60
                  transition-all duration-300
                  relative overflow-hidden
                  group
                "
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Phone className="w-5 h-5" />
                                    {data.hero.cta.primary}
                                </span>

                                {/* Shine effect */}
                                <div className="
                  absolute inset-0 -translate-x-full
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  group-hover:translate-x-full
                  transition-transform duration-1000
                " />
                            </motion.button>

                            {/* Secondary CTA */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="
                  px-5 py-3 md:px-8 md:py-4 rounded-full
                  bg-white/20 backdrop-blur-sm
                  border-2 border-white/40
                  text-white font-semibold text-sm md:text-lg
                  hover:bg-white/30
                  transition-all duration-300
                "
                            >
                                {data.hero.cta.secondary}
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="
                grid grid-cols-3 gap-2 md:gap-8
                border-t border-white/20 pt-4 md:pt-8
              "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.3, duration: 0.8 }}
                        >
                            {data.hero.stats.map((stat: any, index: number) => (
                                <div key={index} className="text-center">
                                    <span className="
                      text-xl md:text-4xl font-bold
                      text-accent-400
                      drop-shadow-lg
                    ">
                                        {stat.number}
                                    </span>
                                    <p className="text-white/70 text-xs md:text-base mt-1 md:mt-2">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 1.5,
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: 0.5
                }}
            >
                <div className="
          w-6 h-10 rounded-full
          border-2 border-white/40
          flex items-start justify-center
          p-2
        ">
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-white/80"
                        animate={{ y: [0, 12, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
