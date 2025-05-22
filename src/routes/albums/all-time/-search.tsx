import { useNavigate } from '@tanstack/react-router';
import {
  type ChangeEvent,
  type ComponentProps,
  useRef,
  useState,
  useTransition,
} from 'react';

import InputClearButton from '@/components/input-clear-button';
import InputSpinner from '@/components/input-spinner';
import { Input } from '@/components/ui/input';
import { DEBOUNCE_IN_MS } from '@/lib/constants';
import { Route } from './edit';

export default function Search(props: ComponentProps<'input'>) {
  const navigate = useNavigate({ from: Route.fullPath });
  const { search } = Route.useSearch();
  const defaultValue = search ?? '';
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const searching = Boolean(timeoutId) || pending;

  function onSearch(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeoutId);

    const { value } = event.target;
    const id = setTimeout(() => {
      startTransition(() => {
        navigate({
          search: () => ({
            search: value ?? undefined,
          }),
        });
      });

      setTimeoutId(undefined);
    }, DEBOUNCE_IN_MS);

    setTimeoutId(id);
  }

  function onClear() {
    startTransition(() => {
      navigate({
        search: () => ({
          search: undefined,
        }),
      });
    });

    if (inputRef?.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  return (
    <div className="relative">
      <Input
        defaultValue={defaultValue}
        name="search"
        onChange={onSearch}
        placeholder="Search"
        ref={inputRef}
        {...props}
      />
      {!searching && defaultValue && <InputClearButton onClick={onClear} />}
      {searching && <InputSpinner />}
    </div>
  );
}
