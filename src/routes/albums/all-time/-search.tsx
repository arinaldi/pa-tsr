import { useNavigate } from '@tanstack/react-router';
import { SearchIcon, X } from 'lucide-react';
import {
  type ChangeEvent,
  type ComponentProps,
  useRef,
  useState,
  useTransition,
} from 'react';

import Spinner from '@/components/spinner';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { DEBOUNCE_IN_MS } from '@/lib/constants';
import { Route } from './edit';

export default function Search(props: ComponentProps<'input'>) {
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch({ select: (search) => search.search });
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
    <InputGroup>
      <InputGroupInput
        defaultValue={defaultValue}
        name="search"
        onChange={onSearch}
        placeholder="Search"
        ref={inputRef}
        {...props}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      {!searching && defaultValue && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={onClear}>
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
      {searching && (
        <InputGroupAddon align="inline-end">
          <Spinner className="size-4" />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
