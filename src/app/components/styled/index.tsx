import {useEffect, useState} from 'react';
import styled from 'styled-components';

import {fetchRandomCat, RandomCatResponse} from '../../../api/api';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  gap: 10px;
  padding: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 1px solid #a3a1a1;
  border-radius: 5px;
`;

export const StyledCat = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);
  const [state, setState] = useState<RandomCatResponse | null>(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isAutoRefreshEnabled && isEnabled) {
      interval = setInterval(() => {
        handleClick();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoRefreshEnabled, isEnabled]);

  const handleClick = async () => {
    try {
      setisLoading(true);
      const res = await fetchRandomCat();
      setState(res);
    } catch (error) {
      console.log('app', error);
    } finally {
      setisLoading(false);
    }
  };

  const handleChangeEnable = () => {
    setIsEnabled(!isEnabled);
  };

  const handleChangeAutoRefresh = () => {
    setIsAutoRefreshEnabled(!isAutoRefreshEnabled);
  };
  return (
    <Section>
      <InputWrapper>
        <input
          id="isEnabled-styled"
          type="checkbox"
          title="Enabled"
          checked={isEnabled}
          onChange={handleChangeEnable}
        />
        <label htmlFor="isEnabled-styled" title="Enabled">
          Enabled
        </label>
      </InputWrapper>
      <InputWrapper>
        <input
          id="isAutoRefreshEnabled-styled"
          type="checkbox"
          title="Auto-refrash"
          checked={isAutoRefreshEnabled}
          onChange={handleChangeAutoRefresh}
          disabled={!isEnabled}
        />
        <label htmlFor="isAutoRefreshEnabled-styled" title="Auto-refrash">
          Auto-refrash every 5 second
        </label>
      </InputWrapper>
      <Button
        onClick={handleClick}
        disabled={isLoading || !isEnabled}
        title="Get cat">
        {isLoading ? 'Loading...' : 'Get cat'}
      </Button>
      {state && <img src={state?.url} alt="Random cat" />}
    </Section>
  );
};
