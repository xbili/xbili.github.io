---
layout: post
title: "APIs with JavaScript"
date: 2014-11-27
---

Finals just ended yesterday with my CS1101S paper, and I dare say it was quite manageable.

Here's what I learnt today, using APIs with JavaScript. 

First of all, we all have to learn about **HTTP** before we talk anything about web programming.

HTTP: Hypertext Transfer Protocol
---------------------------------

HTTP is actually a set of rules for getting something from one place to another. So what are these 'places'?

They are split into two types:

1. Servers: Other computers on the Internet
2. Clients: That's us.

So when a *HTTP request* is made, the request zips through the Internet until it finds the right server to handle that *request*. Then the server would send the *response* back to you. 

I'll mention more about this *request/response* later on. 

> **Client/Server relationship is a prerequisite of a set of principles called Representational State Transfer (REST)**

What this means is that every link clicked on the webpage would result in a *state transition*. Means it simply brings you to the next page, representing the current *state* of the application. 

When an application or webpage follow this type of *page-to-page* navigation, we start to follow the *REST principles*. And we call these applications **RESTful**. (Finally, this term that is so commonly seen makes sense) 

Right, so we got all of that HTTP stuff settled, let's move on to find out what are *APIs* (yet another commonly heard name all over the Internet)

API: Application Programming Interface
--------------------------------------

In English, *APIs* specifies the ways a program can interact with an application.

We mentioned about *RESTful applications* above, so for an API to be RESTful, it must fulfil certain criterias:

1. It has to seperate the *client* from the *server*
2. It cannot *hold state* between requests: meaning no information is stored by server from request to request
3. It has to use *HTTP* and *HTTP methods*

(There are many other criterias, but for now, these would do)

Right, I mentioned that I'll talk more about *request/response*

Making a REQUEST
----------------

Here's the code sample for making a request:
{% highlight javascript %}
var xhr = new XMLHttpRequest();

xhr.open('GET', 'www.blah.com', false);

xhr.send();
{% endhighlight %}

Before I go into what these means, we have to know the four verbs of HTTP methods:

1. **GET**: *retrieves* information form specified source
2. **POST**: *sends* new information to specified source
3. **PUT**: *updates* exisiting information to specified source
4. **DELETE**: *removes* existing information from specified source

These are methods are named really intuitively, I like it.

Now let's go into the code: 

First, `xhr` stores a new `XMLHttpRequest` object, and this object contains various methods. 

`open` defines the request, first parameter being the HTTP verb that you're about to execute, followed by the server, then here's the last parameter which I still understand quite vaguely. `false` means that this function will wait until it gets a response from the server. I'll read more on this. 

`send` will then... you guessed it, send the reqeust. 

Within xhr, it will contain certain information about the request. `console.log(xhr.statusCode);` will return you the status code of the HTTP request. 
**TODO**: Read up more about these methods that `xhr` contain. 

Parsing the Response
--------------------

There are two types of responses that the API can return you. Either *XML* or *JSON*. Read the docs to find out which one the API is providing! So here's what the response will contain: 

1. Response line: three-digit HTTP code, I wouldn't write them down here since they are easily 'Google-able'.
2. Header: this contains further information about server and its response.
3. Body: basically, either *XML* or *JSON*

**Parsing XML**
{% highlight javascript %}
var xmldoc = xhr.responseXML;
{% endhighlight %}

With the above code, `xmldoc` now contains the XML returned by the server. 

XML stands for E**x**tensible **M**arkup **L**anguage. It's like HTML, but with all sorts of tags that you create yourself. Now that you have xmldoc, you could easily access items in the response body by applying methods/accessing members of `xmldoc`. Still have to read up more about this. 

On the other hand...

JSON stands for **J**ava**S**cript **O**bject **N**otation. It's exactly how you would create a new anonymous JavaScript object. 
{% highlight javascript %}
var new_obj = {
    a: 5,
    b: 4,
    c: 3
};
{% endhighlight%}

in JSON would be... 

{% highlight javascript %}
{
    "a": 5,
    "b": 4,
    "c": 3
}
{% endhighlight %}

I've read somewhere that there is no such thing as `responseJSON` method for `XMLHttpRequest` object, only `responseText`. So if the response is not in XML, it should be stored as `responseText`. In that case, `var jsonDoc = xhr.responseText;` would return you the JSON response body. (I'll correct this if it's wrong)

That's about all that I learnt for APIs with JavaScript. Most of it was from [this][] course here by Codecademy. Really learnt quite a bit, despite playing around with APIs for quite a while. I'll **definitely** be playing around with a few APIs over the semester break, and let's see how much can I do with it. :)

Hope to keep this learning streak going!