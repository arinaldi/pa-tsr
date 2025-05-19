import type {
  ForwardRefExoticComponent,
  ReactNode,
  SVGAttributes,
} from 'react';

import type { Database } from '@/supabase/db-types';

export type Album = Database['public']['Tables']['albums']['Row'];
export type Ranking = Database['public']['Tables']['rankings']['Row'];
export type Release = Database['public']['Tables']['releases']['Row'];
export type Song = Database['public']['Tables']['songs']['Row'];

export type Callback = () => void;

export interface Children {
  children: ReactNode;
}

export interface ErrorProps {
  error: Error;
  reset: () => void;
}

interface IconProps extends SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export type Icon = ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

interface SuccessResult {
  data: unknown;
  type: 'success';
}

interface ErrorResult {
  message: string;
  type: 'error';
}

export type MutateResult = SuccessResult | ErrorResult;

export interface Route {
  href: string;
  icon: Icon;
  label: string;
  items?: {
    href: string;
    label: string;
  }[];
}
