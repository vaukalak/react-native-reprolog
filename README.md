# React Native integrations for reprolog


## Install

```
npm i -S react-native-reprolog reprolog
```
or
```
yarn add react-native-reprolog reprolog
```

## Setup

```
import React from 'react';
import { LoggerProvider } from 'reprolog';
import { RNConsoleRuntimeConfig } from 'react-native-reprolog';
import { newOldDiffLogger } from 'reprolog/loggers';
import { consoleTableOutput } from 'reprolog/outputs';
import Root from './Root';

const reprologConfig = RNConsoleRuntimeConfig({
    whiteList: ['Root'],
});

export default () => (
    <LoggerProvider
      propsLogger={newOldDiffLogger(consoleTableOutput())}
      propsLoggerConfig={reprologConfig}
    >
        <Root />
    </LoggerProvider>
);
```

## Debugging

To access console reprolog console utilities in react-native app please 
make sure you read [this artile](https://corbt.com/posts/2015/12/19/debugging-with-global-variables-in-react-native.html).