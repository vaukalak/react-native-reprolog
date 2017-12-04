/* global window */
/* eslint-disable no-console */
import { AsyncStorage } from 'react-native';
import { isRuntimeConfig } from 'reprolog/config';

const STORAGE_ITEM_NAME = 'reprolog.config';
const listeners = [];
let instance;
let config;

export default (initialConfig = { whiteList: [] }) => {
  config = initialConfig;
  if (instance) {
    throw new Error('RNConsoleRuntimeConfig instance already exists!');
  }
  window.reprolog = {
    dropCache: () => {
      AsyncStorage.setItem(STORAGE_ITEM_NAME, undefined);
    },
    updateWhiteList: (whiteList = [], save) => {
      config = {
        ...config,
        whiteList,
      };
      if (save) {
        AsyncStorage.setItem(
          STORAGE_ITEM_NAME,
          JSON.stringify(config),
        );
      }
      listeners.forEach((v) => { v(config); });
    },
  };
  instance = {
    [isRuntimeConfig]: true,
    getConfig: () => config,
    addUpdateListener: (cb) => {
      const index = listeners.indexOf(cb);
      if (index === -1) {
        listeners.push(cb);
      }
    },
    removeUpdateListener: (cb) => {
      const index = listeners.indexOf(cb);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    },
  };
  (async () => {
    const storedConfig = await AsyncStorage.getItem(STORAGE_ITEM_NAME);
    config = initialConfig;
    if (storedConfig) {
      try {
        config = JSON.parse(storedConfig);
        listeners.forEach((v) => { v(config); });
      } catch (err) {
        console.warn('could not parse config json');
      }
    }
  })();
  return instance;
};
