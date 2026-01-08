import WordGSAP from '@/components/word-gsap';
import WordMotion from '@/components/word-motion';
import WordVanilla from '@/components/word-vanilla';

const text =
	'The length of a function is inversively proportional to the complexity and indentation level of that function.';
export default function Page() {
	return (
		<div className='bg-[#F1F1F1]'>
			{/* <WordGSAP content={text} /> */}
			{/* <WordMotion content={text} /> */}
			<WordVanilla content={text} />
		</div>
	);
}
