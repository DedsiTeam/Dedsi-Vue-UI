# dedsi-vue-ui

## Install

```
npm install dedsi-vue-ui

pnpm add dedsi-vue-ui
```


## Usage

``` typescript
import { createApp } from 'vue'

import DedsiVueUI from 'dedsi-vue-ui'
import 'dedsi-vue-ui/theme.css'

const app = createApp(App)

app.use(DedsiVueUI)

app.mount('#app')

```

``` html
<template>
  <dedsi-button>Button</dedsi-button>
</template>

<script setup>
import { DedsiButton } from 'dedsi-vue-ui';
</script>
```