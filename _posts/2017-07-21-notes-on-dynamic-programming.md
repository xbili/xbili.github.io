---
layout: post
title: Notes on Dynamic Programming
description: >
    It's been quite a while since I've touched algorithms, and I thought it'd be a good time to revise key concepts from time to time. I shall try and keep up a habit of going through important Data Structures and Algorithm concepts every Sunday afternoon, and write a blog post about it before dinner.
date: 2017-07-21 22:00:00 +0800
categories: programming
---

It's been quite a while since I've touched algorithms, and I thought it'd be a good time to revise key concepts from time to time. I shall try and keep up a habit of going through important Data Structures and Algorithm concepts every Sunday afternoon, and write a blog post about it before dinner.

Note: These are all written in Jupyter Notebook, which I've come to love a lot after participating in Kaggle competitions. :)

Revision of these concepts are based largely on CLRS, so definitely giving credit to the amazing authors of the book. [1]

## Key Concept

Dynamic Programming (DP) can be applied on many optimisation problems. Whenever we see problem statements that have the words "find **an** optimal solution" rather than "find **the** optimal solution", we more of less know that we have to use some form of DP.

To borrow words of Erik Demaine from MIT's 6.006, DP can be thought of as two simple concepts:

1. "Careful brute force"
2. Computing subproblems + reuse

The first definition is a little general and loose, since every algorithm can be thought of as a clever or careful brute force. But the second one sheds a lot of light on what dynamic programming is about.

Personally, I like to think of DP as pushing the problem towards our precomputed/cached values. Which is very similar to computing subproblems and reusing them. We'll see how this works in the toy example.

## Rod-cutting Problem

> Given a rod of length $n$ inches and a table of prices $p_i$ for $i = 1, 2 \ldots n$, determine the maximum revenue, $r_n$ obtained by cutting up the rod and selling the pieces.

The brute force solution that is obvious would be to try and cut the rod up in every possible way, and find the combination that gives us the most revenue.

### "To cut or not to cut"

There are a total of $2^{n-1}$ ways to cut the rod up. We can understand this by seeing that for every inch on the rod, we have a choice *to cut or not to cut*. (That is the... nevermind)

The rod has a total of $n-1$ position to cut, since cutting the $0$th inch and the $n$th inch gives us the same result (uncut rod).

Similar to how 8-bits can represent $2^8$ unsigned numbers, $n-1$ available positions to cut the rod represents $2^{n-1}$ ways in total to cut the rod.

That's polynomial time, and that's bad. But let's come up with a bad solution so that we can identify the areas where we can improve it.

### Properties of an optimal solution

Given that we cut the rod into $k$ pieces, for $1 \le k \le n$.

i.e. $$n = i_1 + i_2 + \ldots + i_k$$

The cuts will provide maximum corresponding revenue:

$$r_n = p_{i_1} + p_{i_2} + \ldots + p_{i_k}$$

We observe that to solve the original problem of size $n$, we solve smaller subproblems of the same type. i.e. After the first cut, we now have to solve two smaller independent questions that yields optimal solutions that with
the same properties.

Since the overall optimal solution incorporates the optimal solution from each subproblem, we say that the problem exhibits **optimal substructure**.

### Perspectives

Let's look at the problem from another perspective. We can arrange the subproblems in a different way that reduces the problem to an easier problem.

Decomposition of a single cut of the rod:

1. First piece of length $i$ cut-off from the left-hand end
2. Right-hand remainder of length $n - i$

We only divide the 2nd piece and keep the first piece in our computation. We do this recursively for every length $i$ to get the recursive equation:

$$r_n = \max_{1 \le i \le n} (p_i + r_{n - i})$$

This way, our optimal solution comes from computing subproblems in the remainder rod, rather than recursively computing both ends.

### Recursive Implementation

Let's come up with our bad solution of recursively solving the second cut of our rod.


```python
def cut_rod(p, n):
    # Our base-case comes with n goes to zero
    if n == 0:
        return 0

    # Neat trick to represent dummy values that you want to be smaller
    # than everything else
    res = -float('inf')

    for i in range(1, n + 1):
        # Check for the optimal solution in the second rod of the cut at i
        opt = p[i - 1] + cut_rod(p, n - i)

        # Set as our result if it is larger than our current greatest value
        res = max(res, opt)

    return res

# Test it out!
cut_rod([1, 5, 8, 9, 10, 17, 17, 20], 8)
```




    22



### Runtime Analysis

The above solution works, but what about its runtime? Let's take a look.

Let $T(n)$ be the number of nodes in a subtree whose root is labelled n in the recursion tree. (Inclusive of the inital cell) By definition:



$$
\begin{align*}
T(n) = \begin{cases}
1 & n = 0\\
1 + \sum^{n - 1}_{j = 0} T(j) & n \gt 0
\end{cases}
\end{align*}
$$

Suppose when $n = 0$,

$$T(0) = 2^{0} = 1$$

Suppose for $0 \le i \le n - 1$

$$T(i) = 2^i$$

Then,

$$
\begin{align*}
T(n) &= 1 + \sum^{n-1}_{j=0}T(j)\\
&= 1 + 1 + 2 + 2^2 + \ldots + 2^{n-1}\\
&= 2^n - 1 + 1\\
&= 2^n
\end{align*}
$$

Therefore, we can come to a conclusion that our worst case runtime for this solution is $O(2^n)$. That is non-polynomial. But here is where DP comes in handy. There are two conditions that has to be satisfied in order for DP to be able to solve in polynomial time.

1. The number of **distinct** subproblems is polynomial
2. We can solve each subproblem in polynomial time

There are two common approach to DP:

1. Top-down memoization + recursion
2. Bottom-up precomputation method

### Method 1: Memoization

Say hello to memoization. It is exactly how caching works!

1. Write the program recursively
2. Save the result of each subproblem in an array/hash table (our cache)
3. On each call, we return the value if the value has already been computed, else we recurse as usual

We call this new procedure as **memoized**.

Let's see how can we code this out in Python.


```python
def memo_cut_rod(p, n):

    # Our memoization table, our "cache"
    memo = [-float('inf') for _ in range(n)]

    def cut_rod(p, n, memo):
        # If we have already computed this value of n, let's just return it
        if memo[n-1] >= 0:
            return memo[n-1]

        # Our base-case comes with n goes to zero
        if n == 0:
            return 0

        # Neat trick to represent dummy values that you want to be smaller
        # than everything else
        res = -float('inf')

        for i in range(1, n + 1):
            # Check for the optimal solution in the second rod of the cut at i
            opt = p[i - 1] + cut_rod(p, n - i, memo)

            # Set as our result if it is larger than our current greatest value
            res = max(res, opt)

        # Memoize/cache this value
        memo[n-1] = res

        return res

    return cut_rod(p, n, memo)

# Test it out!
memo_cut_rod([1, 5, 8, 9, 10, 17, 17, 20], 8)
```




    22



### Method 2: Bottom-up Method

This method makes use of iteration to build up a table of precomputed subproblems. We solve the **SMALLEST** subproblems first and work up to the **BIGGEST** ones last.

The important invariant of this method would be that:

> We would have solved all sub-subproblems of a subproblem by the time we are solving a bigger subproblem.

Let's take a look at an example:


```python
def cut_rod(p, n):
    dp = [0 for _ in range(n + 1)]
    dp[0] = 0
    for i in range(1, n+1):
        res = 0
        for j in range(i):
            res = max(res, p[j] + dp[i - j - 1])
        dp[i] = res
    return dp[n]

# Test it out!
cut_rod([1, 5, 8, 9, 10, 17, 17, 20], 8)
```




    22



To build a DP solution bottom up, the ordering of the way we build it is very important. In this toy problem, the natural ordering of our subproblem is very obvious.

> A subproblem of size $i$ is smaller than a subproblem of size $j$ if $i \lt j$

To figure out which subproblem depend on each other, we can utilize a structure known as a **subproblem graph**.


```python
import networkx as nx
from nxpd import draw

G = nx.DiGraph()
G.graph['rankdir'] = 'LR'
G.graph['dpi'] = 120
G.add_nodes_from(range(4))
G.add_edges_from([(4,0), (4, 1), (4, 2), (4, 3), (3, 2), (3, 1), (3, 0), (2, 1), (2, 0), (1, 0)])
draw(G, show='ipynb')
```




![png](/images/notes-on-dynamic-programming/output_17_0.png){:class="img-fluid"}



This helps us understand:

1. Set of subproblems involved to solve each subproblem
2. How subproblems depend on one another

A directed edge $(x, y)$ implies that we need a solution to $y$ when solving $x$.

A bottom-up implementation can be done in the reverse topological sort order of the subproblem graph, while the top-down implementation can be viewed as a DFS of the subproblem graph.

## A quick conclusion

This has been very refreshing to review some of the concepts that I might have missed out during my freshman year doing CS2020. It was one of those topics taught during the most hectic period of the semester and I have to admit that I did not manage to master the concept well.

Off to Leetcode to practise more DP problems. :)

---

[1] Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2014). Chapter 15: Dynamic Programming. In *Introduction to Algorithms* (3rd ed., pp. 359-370). Cambridge, MA: The MIT Press.
