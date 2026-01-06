import ParagraphGradient from '@/components/paragraph';

const text = "It is long established that the reader will be distracted by the readable content of a page when looking at its layout."
export default function Page() {
  return (
	<div>
		<ParagraphGradient content={text} />
	</div>
  );
}
