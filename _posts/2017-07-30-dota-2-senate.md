---
layout: post
title: Dota 2 Senate
description: >
    I've just completed my third Leetcode competition. I admit that I am still pretty bad at solving these problems within a limited time period. So I'm working on a few questions every day, and participating in the weekly competitions to get better.
date: 2017-07-30 11:11:00 +0800
categories: programming
---

I've just completed my third Leetcode competition. I admit that I am still pretty bad at solving these problems within a limited time period. So I'm working on a few questions every day, and participating in the weekly competitions to get better.

Today's competition had a question on senate voting, which I did not manage to solve. I want to document the process of learning how to approach this question here.

---

Here's the problem:

In the world of Dota2, there are two parties: the Radiant and the Dire.

The Dota2 senate consists of senators coming from two parties. Now the senate wants to make a decision about a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise one of the two rights:

1. `Ban one senator's right`:
    A senator can make another senator lose all his rights in this and all the following rounds.
2. `Announce the victory`
    If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and make the decision about the change in the game.


Given a string representing each senator's party belonging. The character 'R' and 'D' represent the `Radiant` party and the `Dire` party respectively. Then if there are `n` senators, the size of the given string will be `n`.

The round-based procedure starts from the first senator to the last senator in the given order. This procedure will last until the end of voting. All the senators who have lost their rights will be skipped during the procedure.

Suppose every senator is smart enough and will play the best strategy for his own party, you need to predict which party will finally announce the victory and make the change in the Dota2 game. The output should be `Radiant` or `Dire`.

Original question link can be found [here](https://leetcode.com/contest/leetcode-weekly-contest-43/problems/dota2-senate/).

## Examples

I am very weak at understanding problems the moment I see them, and normally this is where I get very flustered and start to 'brute force' different solutions to see if they work. I had a mock interview with my CS2020 tutor recently and an important lesson I've learnt is how to formulate more examples and spot patterns from my examples before guessing a solution.

Let's take a look at the two examples provided by Leetcode.

### Example 1

**Input**: `"RD"`<br />
**Output**: `"Radiant"`

**Process**

*Round 1*

1. `R` comes and ban the second senator
2. `D` cannot vote

*Round 2*

1. `R` declares victory

### Example 2

**Input**: `"RDD"`<br />
**Output**: `"Dire"`

**Process**

*Round 1*
1. `R`: Ban the next `D` senator
2. `D`: Cannot exercise right anymore
3. `D`: Ban the first senator's right

*Round 2*
1. `R`: Cannot exercise right anymore
2. `D`: Cannot exercise right anymore
3. `D`: Declare victory

Let's try a naive approach to solving this problem. At each step when it's a senator's turn, he can either:

1. `Ban`, or
2. `Declare`

In order to be greedy, we should see that at each step:

0. If the senator is banned, there is nothing he could do
1. A senator should first check if he has won the floor by checking if all of his oppositions have been banned
2. If the above condition does not fulfill, the senator should proceed to ban a senator from the opposition

That seems like a neat solution that might result in a correct answer. Let us try to code it out.


```python
from collections import Counter


def predict_party_victory(senate):
    full = {'R': 'Radiant', 'D': 'Dire'}
    active, banned = Counter(senate), set()
    curr = 0

    while True:
        if curr == len(senate):
            curr = 0

        if curr in banned:
            curr += 1
            continue

        senator = senate[curr]
        opposition = 'R' if senator == 'D' else 'D'

        if active[opposition] == 0:
            return full[senator]
        else:
            to_ban = senator_to_ban(curr, senate, opposition, banned)
            if to_ban != None:
                active[opposition] -= 1
                banned.add(to_ban)
        curr += 1


def senator_to_ban(curr, senate, party, banned):
    """
    Returns the index of the next seneator to ban, if there is still one.
    """
    for i in range(len(senate)):
        if senate[i] == party and i not in banned and i != curr:
            return i
    return None
```


```python
print(predict_party_victory('RD'))
print(predict_party_victory('RDD'))
print(predict_party_victory('RDRD'))
print(predict_party_victory('D'))
```

    Radiant
    Dire
    Radiant
    Dire


This solution works, we're simply simulating the way that the senate works at each senator.

**But can we do better?**

Right now I am iterating through my entire list of senators to find the next senetor to ban. `senator_to_ban` would take $O(n)$ time. Plus we are doing it for each senator that is not banned, the worst case for what we do here would be $O(n^2)$.

I am also maintaining a set and a hash table, which is clearly linear space, $O(n)$.

The problem here lies with `senator_to_ban`. If I could only reduce the time taken to decide which senator the current would want to ban.

But is there a need to ban the senator immediately in that turn? Can I keep a running sum of senators from each party that are banned, and ban them only when we iterate to them?


```python
def predict_party_victory(senate):
    full = {'R': 'Radiant', 'D': 'Dire'}
    active, banned = Counter(senate), {'R': 0, 'D': 0}
    curr = 0

    while True:
        if curr == len(senate):
            curr = 0

        senator = senate[curr]
        opposition = 'R' if senator == 'D' else 'D'
        
        # We ban a senator if the party has a ban to give
        if banned[senator] > 0:
            banned[senator] -= 1
            curr += 1
            continue

        if active[opposition] == 0:
            return full[senator]
        else:
            banned[opposition] += 1
            active[opposition] -= 1
        curr += 1
```

I am faced with another problem here. If the senators take turns in a cycle, I would have no way of knowing when the loop would end because a senator is simply skipped if there is a ban to give. In the next cycle, we may not skip him again if all the bans are used up.

To solve this problem, we can make use of a data structure to represent our *queue* of senators. Yup, a *queue*.

We only place a senator back into the queue if we know that he was not banned.


```python
from collections import deque, Counter

def predict_party_victory(senate):
    active, banned = Counter(senate), {'R': 0, 'D': 0}
    queue = deque([i for i in range(len(senate))])
    while queue:
        curr = queue.popleft()

        senator = senate[curr]
        opposition = 'R' if senator == 'D' else 'D'
        
        # We ban a senator if the party has a ban to give
        if banned[senator] > 0:
            banned[senator] -= 1
            curr += 1
            continue

        if active[opposition] == 0:
            break
        else:
            banned[opposition] += 1
            active[opposition] -= 1

        # We only put the senator back into the queue if he was not banned
        queue.append(curr)
        
    return 'Radiant' if active['D'] == 0 else 'Dire'
```


```python
print(predict_party_victory('RD'))
print(predict_party_victory('RDD'))
print(predict_party_victory('RDRD'))
print(predict_party_victory('DRRDRDRDRDDRDRDR'))
```

    Radiant
    Dire
    Radiant
    Radiant


This solution got rid of our redundant check of maintaining a set and finding the next senator to ban.

The time complexity for this solution $O(n)$, since I just need to do a constant number of passes through all the senators before I able to determine who would win.

## Brief Conclusion

This question was in today's Leetcode contest. I think that it was due to the **huge** chunk of text that I did not give it much thought before moving on to the next. It actually turns out to be pretty straightforward if I had read the question clearly and **kept calm**.

Side note, sometimes I tend to abuse the 'Run Code' button a lot, in order to look for edge cases that I might have missed. I should take note that sometimes it is important to be able to convince myself the correctness of my code rather than test it out. I need to put in some work on that aspect of my problem solving skills.
