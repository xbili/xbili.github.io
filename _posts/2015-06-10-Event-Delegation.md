---
layout: post
title: "Event Delegation"
date: 2015-06-10
---

After finishing my work today, Jacky asked about listening to a dynamically added DOM element in a data table. 

Having learnt event delegation (properly) recently, I was able to explain this with relative ease.<!---excerpt-break-->

What jQuery selectors do is listen to a DOM element with either a class name or an ID name. But what happens if the class or ID is not created on document load? 

Let's say we have a `table` and we want to select a specific `tr` (table row) that was added in dynamically by JavaScript after the document loaded. To put things into perspective:

        <table class="parent">
            <tr class="row1"></tr>
            <tr class="row2"></tr>
        </table>

The two `tr`s were dynamically added into the table and it seems like we have no possible way to add an event listener to the DOM element.

This is where event delegation comes in. We set the event listener on the parent and it listens for any changes on it's children. And easy way of doing this in jQuery is as follows:

        $('.parent').on('click', 'tr', function() {
            // Do something with the row
        });

It is possible to listen to the dynamically added rows in the future since we are listening on the parent element instead. 

Really neat and useful trick! :0

