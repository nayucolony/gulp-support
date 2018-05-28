import 'prismjs'
import '../../node_modules/prismjs/themes/prism.css'
import '../../node_modules/prismjs/components/prism-css'
import '../../node_modules/prismjs/components/prism-scss'
import '../../node_modules/prismjs/components/prism-javascript'
import '../../node_modules/prismjs/components/prism-bash'
import '../../node_modules/prismjs/components/prism-json'
import 'prismjs/plugins/toolbar/prism-toolbar.css'
import 'prismjs/plugins/toolbar/prism-toolbar.min.js'
import '../../node_modules/prismjs/components/prism-markup-templating'
import '../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js'
import '../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css'
import '../../node_modules/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

const message = `

%c見つかっちゃいましたね。

書籍は購入されましたか？
もしまだ購入されてない場合は、ぜひ下記からお願いします！

https://amzn.to/2kkEeYj

お気付きの点がありましたら、著者までおしらせください！

https://twitter.com/nayucolony

`

console.log(message, 'color:#333; font-weight:bold; font-size:24px')
