---
layout: post
title: "Higher Order Functions"
date: 2014-09-28
---

This is my first technical post, in fact my first post in this blog. I reserve this place for CS related things only.

Seniors often talk about 'leveling up' as developers, or as Computer Scientists. That's what just happened to me, I leveled up slightly.
I understood higher order functions more than I ever did, and such an accomplishment is worth noting down. Here's what I learnt:

> **Higher order functions are really just what changes the 'x' in our mathematical f(x) functions.**

It took me long enough to figure that out, and fortunately I figured it out before mid-terms hit me with lambda calculus. 
Here's an example and an explanation of what goes on in my head when I deal with such questions.

Let's say we have four higher order functions:

First we have a very simple **identity function** that returns the argument itself

{% highlight javascript %}
function id(x) {
	return x;
}
{% endhighlight %}

Then a **square function** which takes in a function and returns a function.

{% highlight javascript %}
function square(f) {
	return function(x) {
		return f(x * x);
	}	
}
{% endhighlight %}

Followed by an **add_one function** which takes in a fucntion and returns a function as well.

{% highlight javascript %}
function add_one(f) {
	return function(x) {
		return f(x + 1);
	}
}
{% endhighlight %}


Lastly, a **twice function** which also takes in a function and (you guessed it) returns a function.

{% highlight javascript %}
function twice(f) {
	return function(x) {
		return f(f(x));
	}
}
{% endhighlight %}

Here are some questions to make sense of what I mentioned above.

We simply evaluate the results of these code in our head:

{% highlight javascript %}
(add_one(square(id)))(4);
{% endhighlight %}

I like to do it in steps. So first: ignore the `(4)`. It's just an argument. We deal with our functions first.
We now know that by passing `id` into `square`, we'll get `f(x * x)`.

But what is `f`? Like I mentioned above, it's very similiar to mathematics. We'll treat `f` as just a **function**. Like how `f(x)` is the most common function we see
in mathematics. 

So this function `square(id)` would give you `x * x`. (Remember, ignore the f!)

Now we pass this function into `add_one`, it'll return you `(x + 1) * (x + 1)`. See how it worked? You're essentially modifying the x in f(x). 

When we pass 4 into the function, `4 * 4` is returned. **much wow**

Whenever we see such patterns in the higher order functions we're dealing with, this method makes things much easier. 

That's at least my method of seeing how things work, I might be wrong. I just wanted to note this down somewhere, because 
it meant something to me that I leveled up! :D
