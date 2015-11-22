---
layout: post
title: "Git Bisect"
date: 2015-07-04
---

I went into work the other morning with an overdue bug from the previous night and couldn't find a way to solve it. 

Given the fact that the feature was written weeks ago, I couldn't remember which commit I broke the code in. Luckily, Josh came up (once more) and showed me this useful tool called `git bisect`. 

What `git bisect` does is it performs a binary search (yeah, O(log n) guys) for the commit that screws things up and you are able to figure out what exactly went wrong. 

So here's how it works. For a certain file, we start by running:

        git bisect start

Obviously, something is broken in this current commit, therefore we go with

        git bisect bad

to indicate that the commit is broken.

Then git will automatically jump to the next commit, which I assume is half of the current range specified. You will be in that commit and you could check your product to see if it's broken. If it's all fine and dandy, we go ahead and run:

        git bisect good

to indicate that the commit is good. 

We can see how this works. Git keeps a pointer to the front and back of the current search range and slowly performs a binary search until the single commit that you found which broke your code. 

Very useful tool when you couldn't figure out what broke your code. 

Don't forget, there's one last step to make sure your repository doesn't become a huge ball of mess:

        git bisect reset

This will reset your repository after finding the broken commit. 

Really really useful! 

