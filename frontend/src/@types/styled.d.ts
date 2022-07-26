import 'styled-components';
import { themeSchema } from '../theme';

type CustomTheme = typeof themeSchema;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
