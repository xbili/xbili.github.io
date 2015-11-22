---
layout: post
title: "CSS Positions: Relative and Absolute"
date: 2015-06-03
---

I've already spent 2 weeks at ShopBack as a Frontend Engineer intern and came to realise that I still don't understand CSS well enough. A couple of days ago I was trying to overlay half of an image onto a banner. I found it so difficult to wrap my head around `absolute` and `relative` positioning. Josh, our DevOps engineer explained briefly to me how it works and why it works.

Relative
---

This is mainly for moving the element left and right. What this does is that it shifts it by x number of pixels from it's *original position*. This still preserves the flow of the document as the element. It does not remove the element from the normal flow.

Absolute
---

Absolute on the other hand fully removes the element from the flow of the document and has it's position *relative* to the browser, **OR** it's offset parent. I have an example for this.

HTML:

    <div class="outer">
        <div class="inner">
            Blah blah blah
        </div>
    </div>


CSS:

    .outer {
        background-color: green;
        position: relative;
        height: 100px;
        width: 400px;
    }
    .inner {
        background-color: blue;
        position: absolute;
        height: 200px;
        width: 200px;
        top: 50%;
        left: 25%;
    }


This will give me:
![img1]({{site.url}}/assets/dist/img/030615-1.png)

In this case, `div.inner` will look for its offset parent, which is `div.outer` to apply `top`. In this case `div.inner` is **relative** to `div.outer`. If `div.outer` did not exist, then `div.inner`'s offset parent will be the `html`, which is the entire browser window. 

This also affects using percentage for the top, bottom, left, right values. Doing `top: 50%;` means you want to shift `div.inner` by 50% of `div.outer`'s height. Therefore it moves by 50 pixels (half of its offset parent's height) instead of 100 pixels (half of its own height).

Pretty neat, hopefully I can explore more CSS in detail next time. Oh, and this blog needs a redesign. 
