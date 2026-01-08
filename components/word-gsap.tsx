'use client';
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(SplitText, ScrollTrigger);

function WordGSAP({ content }: { content: string }) {
	const container = useRef<HTMLDivElement>(null);
	const ref = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		const tl = gsap.timeline();
		tl.set(ref.current, { opacity: 1, duration: 0 });

		const splitText = new SplitText(ref.current, { type: 'words' });
		tl.set(splitText.words, { opacity: 0 });
		tl.to(splitText.words, {
			opacity: 1,
			stagger: 0.1,
			scrollTrigger: {
				trigger: container.current,
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1,
			},
		});
	}, []);
	return (
		<div
			ref={container}
			className='relative h-[200vh] p-8 text-[4vw] leading-[0.8] font-bold'
		>
			<div className='sticky top-8 max-w-[26ch]'>
				<p className='text-neutral-300'>{content}</p>
				<p
					ref={ref}
					className='absolute top-0 left-0 text-neutral-700 opacity-0'
				>
					{content}
				</p>
			</div>
		</div>
	);
}

export default WordGSAP;
