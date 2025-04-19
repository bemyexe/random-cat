import {useEffect, useState} from 'react';

import {fetchRandomCat, RandomCatResponse} from '../../../api/api';

import styles from './style.module.scss';

export const ModulesCat = () => {
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
    <section className={styles['modules-cat-container']}>
      <h2>Modules</h2>
      <div className={styles['modules-cat-input-wrapper']}>
        <input
          id="isEnabled-modules"
          type="checkbox"
          title="Enabled"
          checked={isEnabled}
          onChange={handleChangeEnable}
        />
        <label htmlFor="isEnabled-modules" title="Enabled">
          Enabled
        </label>
      </div>
      <div className={styles['modules-cat-input-wrapper']}>
        <input
          id="isAutoRefreshEnabled-modules"
          type="checkbox"
          title="Auto-refrash"
          checked={isAutoRefreshEnabled}
          onChange={handleChangeAutoRefresh}
          disabled={!isEnabled}
        />
        <label htmlFor="isAutoRefreshEnabled-modules" title="Auto-refrash">
          Auto-refrash every 5 second
        </label>
      </div>
      <button
        onClick={handleClick}
        disabled={isLoading || !isEnabled}
        className={styles['modules-cat-button']}
        title="Get cat">
        {isLoading ? 'Loading...' : 'Get cat'}
      </button>
      {state && (
        <img src={state?.url} alt="Random cat" className="scss-cat-img" />
      )}
    </section>
  );
};
