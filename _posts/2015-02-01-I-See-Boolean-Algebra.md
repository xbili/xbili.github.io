---
layout: post
title: "I See Boolean Algebra"
date: 2015-02-01
---

Today is one of the rare times that I'm home from school during the semester, all thanks to a very bad flu that I've caught. So while staying at home, I overheard a discussion between my parents about how the double switch controlled our home ceiling fan. 

After weeks of Computer Organisation class, I decided to put my *boolean algebra* skills to the test. Albeit a very easy one.

So when approaching logic problems, the first step is to always draw out the truth table.

| Door Switch | Toilet Switch | Fan |
|:-----------:|:-------------:|:---:|
| 0           | 0             | 0   |
| 0           | 1             | 1   |
| 1           | 0             | 0   |
| 1           | 1             | 0   |

Here we see that the only time that the fan will turn on is if the door switch is **off** and the toilet switch is **on**. What can we deduce about this then? 

If we let Door Switch be **A**, and Toilet Switch be **B**:

The *minterm* expression of the expression will be **A'.B**. i.e. **NOT A OR B**.

Then I drew out a circuit diagram for the entire logic:

![Circuit Diagram]({{site.url}}/assets/dist/img/circuit1.jpg)

**Voila!** There goes some application to what I learnt in real life. I showed this to my dad and he was impressed. (It's not easy to impress him)

I don't know why this mattered so much to me, but the fact that I was able to apply something I learnt in school to somewhere else **excites me**.
