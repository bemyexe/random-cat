import {ModulesCat, ScssCat, StyledCat} from './components';

import './style.scss';

export const App = () => {
  return (
    <main className="app-container">
      <StyledCat />
      <ScssCat />
      <ModulesCat />
    </main>
  );
};
