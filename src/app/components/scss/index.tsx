import {useEffect, useState} from 'react';

import {fetchRandomCat, RandomCatResponse} from '../../../api/api';

import './style.scss';

export const ScssCat = () => {
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
    <section className="scss-cat-container">
      <h2>SCSS</h2>
      <div className="scss-cat-input-wrapper">
        <input
          id="isEnabled-scss"
          type="checkbox"
          title="Enabled"
          checked={isEnabled}
          onChange={handleChangeEnable}
        />
        <label htmlFor="isEnabled-scss" title="Enabled">
          Enabled
        </label>
      </div>
      <div className="scss-cat-input-wrapper">
        <input
          id="isAutoRefreshEnabled-scss"
          type="checkbox"
          title="Auto-refrash"
          checked={isAutoRefreshEnabled}
          onChange={handleChangeAutoRefresh}
          disabled={!isEnabled}
        />
        <label htmlFor="isAutoRefreshEnabled-scss" title="Auto-refrash">
          Auto-refrash every 5 second
        </label>
      </div>
      <button
        title="Get cat"
        onClick={handleClick}
        disabled={isLoading || !isEnabled}
        className="scss-cat-button">
        {isLoading ? 'Loading...' : 'Get cat'}
      </button>
      {state && (
        <img src={state?.url} alt="Random cat" className="scss-cat-img" />
      )}
    </section>
  );
};
