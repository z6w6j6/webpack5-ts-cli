// vue,js,css模板
module.exports = {batch:[
{ fun: componentName => {
    const name = componentName.charAt(0).toUpperCase() + componentName.slice(1)
      return `<template>
  <div class="${componentName}">
      ${componentName}组件
  </div>
</template>
<script>
  export default {
    name: '${name}'
  };
</script>
<style lang="scss" scoped>
  @import '${componentName}.scss';
    .${componentName} {
    };
</style>`
},
fileName:'index.vue'
  },
  { fun: componentName => {
    const name = componentName.charAt(0).toUpperCase() + componentName.slice(1)
      return`import ${name} from './${componentName}.vue'
export default [{
  path: "/${componentName}",
  name: "${name}",
  component: ${name}
}]`
  },
  fileName:'index.js'
},
   {fun:componentName => {
    return `.${componentName}{
}`
},
fileName:'index.css'
  }
],
vueTemplate: componentName => {
  const name = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  return `<template>
<div class="${componentName}">
  ${componentName}组件
</div>
</template>
<script>
export default {
name: '${name}'
};
</script>
<style lang="scss" scoped>
@import '${componentName}.scss';
.${componentName} {
};
</style>`
  },
entryTemplate: componentName => {
  const name = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  return`import ${name} from './${componentName}.vue'
export default [{
path: "/${componentName}",
name: "${name}",
component: ${name}
}]`
  },
  cssTemplate:componentName => {
    return `.${componentName}{
    }`
}
}
