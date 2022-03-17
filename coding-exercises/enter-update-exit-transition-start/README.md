# step by step building plan of this project:
1. get min max of tricky array
2. build xAxis
3. build yAxis
4. bring "something" on the page
5. bind code we have so far written to the first button
6. make step 2 by copying code --> why does it not work? Repeart the selectAll step.
    // 4    4    0
    comment out everything we don't want. do we want anything to enter? no
    do we want new groups, circles, text? no!
    only transform stays.
7. step 3: copy function from previous step. 
    already works but keeps datapoint D.
    go through logic:
    //  4     3    what does it return, updating elements, and exiting elements.
    pull out exiting elements with exit
8. step 4: copy previous function.
    pull out entering elements
    re-use old code
    first don't update position. then do.
9. Now: many specialised functions. Goal: on function that deals with all the cases.
    If we have UPDATING elements, what should happend with them?
    If we have ENTERING elements, what should happend with them?
    If we have EXITING elements, what should happend with them?
10. delete step 2-4, and eventListeners
11. rename step 1 to visualizeData()
12. create dataIndex variable
13. deal with updating, entering and exiting selections.
14. try to find the missing bug (text not updating on some transition...data keys!)
15. TRANSITIONS: 
    add transition to updating data transformation
    add transition to exiting elements
    make entering elements always enter from the top
    duration to updating elements, delay to incoming elements
    optional: entering from top, exiting fall down.
16. Point out the bug with the name that remains (data keys!)
17. why does the letter not update? only for incoming element do we deal with text.
    bad solution: update the letter, too -> demonstrate
    better: E and D should be considered different data points, not one shape updating names  
18. Swap two datapoints in the dataset. look what happens!
    Explain WHY this happens
    D3 has no concept what makes a datapoint this datapoints
    --> key function, an id! we have to tell D3 what makes this datapoint unique
