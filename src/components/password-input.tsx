import { Eye, EyeOff } from 'lucide-react';
import { useReducer } from 'react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

export default function PasswordInput(props: React.ComponentProps<'input'>) {
  const [on, toggle] = useReducer((flag) => !flag, false);

  return (
    <InputGroup>
      <InputGroupInput type={on ? 'text' : 'password'} {...props} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Show or hide password"
          onClick={toggle}
          size="icon-sm"
          title="Show or hide password"
          type="button"
        >
          {on ? <Eye /> : <EyeOff />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
