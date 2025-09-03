import Spinner from '@/components/spinner';

export default function InputSpinner() {
  return (
    <div className="absolute top-0 right-0 bottom-0 flex items-center justify-center">
      <Spinner className="mr-1.5 size-6 cursor-none p-1" />
    </div>
  );
}
