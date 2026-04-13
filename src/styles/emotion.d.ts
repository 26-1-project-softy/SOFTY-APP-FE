import '@emotion/react';
import type { ColorsType } from './colors';
import type { FontsType } from './fonts';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsType;
    fonts: FontsType;
  }
}
