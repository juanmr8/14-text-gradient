'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface WordMotionProps {
	content: string;
	ariaLabel?: string;
}

function WordMotion({ content, ariaLabel }: WordMotionProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	// Split content into words
	const words = content.split(' ');

	// Track scroll progress of the container'
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	return (
		<div
			ref={containerRef}
			className='relative h-[200vh] w-full p-8 text-[11vw] leading-[0.85] font-bold lg:text-[4vw]'
			aria-label={ariaLabel || content}
		>
			<div className='sticky top-8 max-w-[26ch]'>
				{/* Background text layer (light) */}
				<p className='text-neutral-300' aria-hidden='true'>
					{content}
				</p>

				{/* Foreground text layer (dark) that reveals on scroll */}
				<p className='absolute top-0 left-0 text-neutral-700'>
					{words.map((word, index) => {
						// Calculate when this word should start and finish animating
						// Distribute animations across the scroll range with stagger
						const totalWords = words.length;
						const start = index / totalWords;
						const end = (index + 1) / totalWords;

						// Create opacity transform for this specific word
						const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

						return (
							<React.Fragment key={`${word}-${index}`}>
								<motion.span style={{ opacity }} className='inline-block'>
									{word}
								</motion.span>
								{index < words.length - 1 && ' '}
							</React.Fragment>
						);
					})}
				</p>

				{/* Screen reader only version with full text */}
				<span className='sr-only'>{content}</span>
			</div>
		</div>
	);
}

export default WordMotion;
