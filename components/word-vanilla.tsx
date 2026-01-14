'use client';
import React, { useRef, useEffect } from 'react';

interface WordVanillaProps {
	content: string;
	ariaLabel?: string;
}

function WordVanilla({ content, ariaLabel }: WordVanillaProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const foregroundRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const foreground = foregroundRef.current;

		if (!container || !foreground) return;

		const words = content.split(' ');
		foreground.innerHTML = '';

		const wordSpans: HTMLSpanElement[] = [];
		words.forEach((word, index) => {
			const span = document.createElement('span');
			span.textContent = word;
			span.style.opacity = '0';
			// Remove inline-block - let it flow naturally
			foreground.appendChild(span);

			if (index < words.length - 1) {
				foreground.appendChild(document.createTextNode(' '));
			}

			wordSpans.push(span);
		});

		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const containerRect = container.getBoundingClientRect();
					const containerHeight = container.offsetHeight;
					const viewportHeight = window.innerHeight;

					const scrollStart = containerRect.top;
					const scrollRange = containerHeight - viewportHeight;
					const scrollProgress = Math.max(
						0,
						Math.min(1, -scrollStart / scrollRange)
					);

					wordSpans.forEach((span, index) => {
						const totalWords = wordSpans.length;
						const wordStart = index / totalWords;
						const wordEnd = (index + 1) / totalWords;

						let opacity = 0;
						if (scrollProgress >= wordStart && scrollProgress <= wordEnd) {
							opacity = (scrollProgress - wordStart) / (wordEnd - wordStart);
						} else if (scrollProgress > wordEnd) {
							opacity = 1;
						}

						// Round to avoid subpixel flickering
						span.style.opacity = opacity.toFixed(3);
					});
					ticking = false;
				});
				ticking = true;
			}
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [content]);

	return (
		<div
			ref={containerRef}
			className='relative h-[200vh] w-full p-8 text-[11vw] leading-[0.85] font-bold lg:text-[4vw]'
			aria-label={ariaLabel || content}
		>
			<div className='sticky top-8 max-w-[22ch]'>
				{/* Background text layer (light) */}
				<p className='text-neutral-300' aria-hidden='true'>
					{content}
				</p>

				{/* Foreground text layer (dark) - will-change helps with rendering */}
				<p
					ref={foregroundRef}
					className='absolute top-0 left-0 text-neutral-700'
					style={{ willChange: 'opacity' }}
				/>

				<span className='sr-only'>{content}</span>
			</div>
		</div>
	);
}

export default WordVanilla;
