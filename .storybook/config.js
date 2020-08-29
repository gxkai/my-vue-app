import {configure} from '@storybook/vue'
import '../src/main'
import {addParameters} from "@storybook/vue";
addParameters({
  //配置背景色选项
  backgrounds: [{
    name: '#ffffff',
    value: '#ffffff',
    default: true
  },
    {
      name: '#fefefe',
      value: '#fefefe'
    },
    {
      name: '#111111',
      value: '#111111'
    }
  ],
  //自定义视图大小
  viewport: {
    viewports: {
      PC: {
        name: 'PC',
        styles: {
          width: '1440px',
          height: '900px',
        },
      },
      Pad: {
        name: 'Pad',
        styles: {
          width: '1080px',
          height: '810px',
        },
      },
      Phone: {
        name: 'Phone',
        styles: {
          width: '375px',
          height: '812px',
        },
      }
    },
    defaultViewport: 'PC',
  }
});
function loadStories () {
  const req = require.context('../src/components', true, /\.stories\.ts$/)
  req.keys().forEach((filename)=>req(filename))
}

configure(loadStories, module)
