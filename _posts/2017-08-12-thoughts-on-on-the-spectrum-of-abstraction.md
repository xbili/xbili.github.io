---
layout: post
title: Thoughts On: On the Spectrum of Abstraction
description: >
    I came across this talk from React Europe Conference 2016 online and was
    particularly enlightened by some of the great points mentioned by Cheng Lou.
date: 2017-08-12 22:30:00 +0800
categories: programming
---

I came across [this talk](https://www.youtube.com/watch?v=mVVNJKv9esE)
from React Europe Conference 2016 online and was particularly enlightened by
some of the great points mentioned by Cheng Lou.

An interesting question that kicked off what eventually turned into a 30-minute
mindblowing session was this:

> If B is a subclass of A, why is A the superclass and B the subclass? If B
has more properties than A, why do we call B a subclass/subset? Why is B not a
superset/superclass?

This question was interesting not because of the technicality that it
encompasses, but it sheds some light on the kinds of question that I often
overlook in software engineering.

The uncomfortable questions that could only arise if I **think deep**. Thinking
deep is something that I need to work on in my day-to-day life. I am not asking
important questions that facilitates the understanding of certain concepts that
I fail to grasp fully.

(By the way, it is called a subclass because there are lesser *instances*
rather than *methods/properties*. We have to be clear of what are we counting.)

The speaker has came up with a 'mental model' to think about abstraction. We
can view them as trees, with the root being the most abstract, and the leaf
nodes as concrete use cases which are "useful".

An example would be how React is a higher node in the abstraction tree as
compared to a product that is built with React.


## Quick Jargons

The notion of **power** is also defined as such:

> "The ability of drill down the level of abstraction to get a concrete use
case."

**Utility/Usefulness** on the other end of the spectrum is defined as:

> "Attached to concreteness, something is immediately useful if I don't need
to understand what abstractions we master to make it work."

e.g. How React isn't **useful**, since it is not useful for to be a product
itself.

**Cost** would be to go up or down a level of abstraction.

Then we have the **Principle of Least Power/Pareto Principle**

> "Use least powerful tools to achieve goals, because of the lesser mental
overhead."


## Case Studies

There were many good case studies brought up in the video, but I'll note down
some that were especially meaningful to me.


### Case Study: Library vs Framework

This mental model of abstraction is particularly useful when we try to
differentiate between a library and a framework.

Libraries are lower in the tree, therefore more useful. Frameworks are higher
in the tree, and hence covers more use cases and shared knowledge.

This is a very refreshing way to look at libraries vs framework, as CS2103
tried to explain it in a pretty archaic way if I remember correctly. By looking
at abstraction as a tree, I can point out exactly what level of abstraction I
am currently on, and my choices for going up or down the abstraction tree.


### Case Study: Immutability vs Mutability

I have always had trouble understanding the arguments going for and against
immutability. From my experience, it has always been about several zealots
throwing buzzwords at me to get me convinced that the more buzzwords a certain
paradigm could provide, the better it is.

Cheng Lou expressed this very well with the abstraction tree, and this quote:

> Not about the potential power of doing more - it's about exploiting
properties you gain by doing less.

Personally, this suddenly made so much sense.

It's difficult to reason with mutability when one asks "I can do X with
mutability, can you do it in an immutable way?", and the immutable zealot goes
"Well we could do X this way with immutability." What eventually happens is the
mutability lover has an elegant solution for a particular problem that
immutability cannot solve as elegantly.

Which totally makes sense, since mutability is higher than immutability in the
abstraction tree. *But then the quote kicks in.* With immutability, we have
other cooler features that are suddenly easier to implement, such as time
traveling.

An interesting advice given by my professor in CS3217 last semester is that
every question in software engineering has a standard answer.

**It depends.**

Which implies that there are trade-offs in every solution that we decide on.
The quote by Cheng Lou complements well with that, since now we have a way of
understanding the different trade-offs that we are making.

Are we drilling up or down in the abstraction tree? How are our requirements
going to change over time?

It isn't just about how high our abstraction is in the current state of the
software, it's about deciding on the right level of abstraction.


### Case Study: JS (inline) CSS vs Traditional CSS

This is another issue that I am confused about. Why are we moving back to
placing CSS inline in Javascript?

Here is what I failed to understand. Let's take a look at CSS in the
abstraction tree. It is definitely on a lower level compared to Javascript.
But how are we using it? We need to have useful candies such as nested CSS,
naming conventions, mixins.

These are all things that has to be achieved using different tools, not
supported by CSS itself.

One final nail in the coffin for why CSS is at the wrong level of abstraction,
**preprocessors**. We have LESS and SASS and many others to help CSS stay on
the correct level of abstraction.

CSS needs actual functions, rather than the current DSL. We need to move
stylesheets into a higher level of abstraction to keep the cost low.


## Concrete Experiences

What better way than to learn from other people's mistakes, right?

Here are a few that the speaker mentions:

1. Don't cover every use-case
    - Less work = more performance gain
    - Clear justification to not cover every use case because of the
    abstraction tree
    - More use-case = more mental overhead
2. Not DRY (i.e. repeating code is fine)
    - We are paying more cost to abstract things rather than to use them!
3. Don't be swayed by elegance
    - Elegance is too loaded for a word
    - "The single unifying principle" is too general to be used in a specific
    way
4. When in doubt, use examples
    - Examples are leaf nodes on the tree of abstraction
    - Use now, understand later
    - When lacking ideas of how to express a library, write examples, write
    documentations

The last point is probably the golden advice. Many times I fret too much about
the details and could not move forward with implementation. This would be a
great time to fill in some documentation so that I maintain a clear head of
which level of abstraction I am in right now.

Also, **test cases** are the perfect examples to write as well! :)


## Quick Conclusion

The talk ended with a pretty apt example of how this talk itself is "the most
useless talk of this conference." But by definition, the talk is also the most
power talk of the conference. If we do not apply, but only think in theory,
then we won't have much use for the talk at all.

The next time I think about writing an application or library, it'd probably
be good to apply some of the mental model learnt from here.
