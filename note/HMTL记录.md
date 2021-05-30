## 剖析HTML文档
1. `<!DOCTYPE html>`: 声明文档类型. 很久以前，早期的HTML(大约1991年2月)，文档类型声明类似于链接，规定了HTML页面必须遵从的良好规则，能自动检测错误和其他有用的东西。使用如下：
2. `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
然而这种写法已经过时了，这些内容已成为历史。只需要知道 `<!DOCTYPE html>` 是最短有效的文档声明。
3. `<html></html>`: `<html>元素。这个元素包裹了整个完整的页面，是一个根元素。
4. `<head></head>`: `<head>`元素. 这个元素是一个容器，它包含了所有你想包含在HTML页面中但不想在HTML页面中显示的内容。这些内容包括你想在搜索结果中出现的关键字和页面描述，CSS样式，字符集声明等等。以后的章节能学到更多关于<head>元素的内容。
5. `<meta charset="utf-8">`: 这个元素设置文档使用utf-8字符集编码，utf-8字符集包含了人类大部分的文字。基本上他能识别你放上去的所有文本内容。毫无疑问要使用它，并且它能在以后避免很多其他问题。
6. `<title></title>`: 设置页面标题，出现在浏览器标签上，当你标记/收藏页面时它可用来描述页面。
7. `<body></body>`: `<body>`元素。 包含了你访问页面时所有显示在页面上的内容，文本，图片，音频，游戏等等。

## HTML中的空白
无论你在HTML元素的内容中使用多少空格(包括空白字符，包括换行)，当渲染这些代码的时候，HTML解释器会将连续出现的空白字符减少为一个单独的空格符。

## `<head>`标签里有什么? Metadata-HTML中的元数据

HTML `<head> `元素与` <body>` 元素不同，它的内容不会在浏览器中显示，它的作用是保存页面的一些 元数据。

元数据就是描述数据的数据，而HTML有一个“官方的”方式来为一个文档添加元数据——  `<meta>` 元素。
**指定你的文档中字符的编码**  
`<meta charset="utf-8">`
>注: 一些浏览器（比如Chrome）会自动修正错误的编码，所以取决于你所使用的浏览器，你或许不会看到这个问题。无论如何，你仍然应该为你的页面手动设置编码为utf-8，来避免在其他浏览器中可能出现的潜在问题。

**添加作者和描述**  
许多`<meta>` 元素包含了name 和 content 特性：

* name 指定了meta 元素的类型； 说明该元素包含了什么类型的信息。
* content 指定了实际的元数据内容。

> Note: 许多 <meta> 特性已经不再使用。 例如，keyword `<meta>` 元素（`<meta  name="keywords" content="fill, in, your, keywords, here">`）— 提供关键词给搜索引擎，根据不同的搜索词，查找到相关的网站 — 已经被搜索引擎忽略了， 因为作弊者填充了大量关键词到keyword， 错误地引导搜索结果。

当你在网站上查看源码时，你也会发现其他类型的元数据。你在网站上看到的许多功能都是专有创作，旨在向某些网站(如社交网站)提供可使用的特定信息。

```html
<meta property="og:image" content="https://developer.mozilla.org/static/img/opengraph-logo.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

**为文档设定主语言**  
可以通过添加lang属性到HTML开始标签中来实现`<html lang="zh-CN">` 还可以将文档的分段设置为不同的语言。例如，我们可以把日语部分设置为日语`<p>日语实例: <span lang="jp">ご飯が熱い。</span>.</p>`

**斜体字、粗体字、下划线...**  
这里是最好的经验法则：如果没有更合适的元素，那么使用 <b>、<i> 或 <u> 来表达传统上的粗体、斜体或下划线表达的意思是合适的。然而，始终拥有可访问性的思维模式是至关重要的。斜体的概念对人们使用屏幕阅读器是没有帮助的，对使用其他书写系统而不是拉丁文书写系统的人们也是没有帮助的。

<i> 被用来传达传统上用斜体表达的意义：外国文字，分类名称，技术术语，一种思想……
<b> 被用来传达传统上用粗体表达的意义：关键字，产品名称，引导句……
<u> 被用来传达传统上用下划线表达的意义：专有名词，拼写错误……

## HTML 布局元素细节
`<main>` 存放每个页面独有的内容。每个页面上只能用一次 <main>，且直接位于 <body> 中。最好不要把它嵌套进其它元素。

`<article>` 包围的内容即一篇文章，与页面其它部分无关（比如一篇博文）

`<section>` 与 `<article>` 类似，但 `<section>` 更适用于组织页面使其按功能（比如迷你地图、一组文章标题和摘要）分块。一般的最佳用法是：以 标题 作为开头；也可以把一篇 `<article>` 分成若干部分并分别置于不同的 `<section> `中，也可以把一个区段 `<section>` 分成若干部分并分别置于不同的 `<article>` 中，取决于上下文。

`<aside> `包含一些间接信息（术语条目、作者简介、相关链接，等等）。  

`<header>` 是简介形式的内容。如果它是 `<body>` 的子元素，那么就是网站的全局页眉。如果它是 `<article>` 或`<section>` 的子元素，那么它是这些部分特有的页眉（此 <header> 非彼 标题）。

`<nav>` 包含页面主导航功能。其中不应包含二级链接等内容。

`<footer>` 包含了页面的页脚部分。