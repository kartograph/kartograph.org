---
layout: docs
title: Kartograph.py Docs
---

← [Return to Kartograph.py Docs](/docs/kartograph.py/)

# Kartograph.py Filter Syntax


Sometimes the shapefile you are using contains more features that you actually need in your map. Kartograph.py allows you to filter the features that should be included in each layer.

## Basic expressions

Basic expressions are the smallest unit of filtering in Kartograph. Each expression consists of an array in the form ``[property, operator, value]``. The *property* refers to a property of your source geo data, for instance a column in a shapefile attributes table. The *value* might be a string, number or a list of values. The valid operators are explained below.

### Is / =
Checks whether a shape property equals a given value. If you prefer, you can write ``=`` instead of ``"is"`` as well.


    "filter": ["ISO3", "is", "FRA"]

or
 
    "filter": ["ISO3", "=", "FRA"]

There is a third syntax

    "filter": { "ISO3": "FRA" }


### Like
Checks whether a shape property matches partly against a given value. This works just like the ``LIKE`` you know from SQL. You can use "%" as wildcard.

    "filter": ["NUTS", "like", "FR%"]

### Matching regular expressions

If you need more flexibility you may also use the **matches** operator, which allows you to test properties against regular expressions. The following expression would include all polygons where the NUTS id starts with "FR" followed by a digit.

    "filter": ["NUTS", "matches", "^FR\d"]

### Check against a list of candidates
You can test a property against a set of values at once by using the **in** operator.

    "filter": ["ISO", "in", ["FRA", "DEU", "ESP", "GBR"]]

You can achieve the same using the following short-hand syntax:

    "filter": { "ISO": ["FRA", "DEU", "ESP", "GBR"] }

### Numerical filter: greater, less

Using the ``greater`` and ``less`` operators you can filter by numerical attributes:

    "filter": ["AREA", "greater", 100000]


### Not

If Kartograph.py finds the word "not" in the operator term, the result will be logically inverted.

    "filter": ["ISO", "is not", "FRA"],
    "filter": ["ISO", "not like", "F%"]


## Nested expressions

You can combine multiple expressions using **and** and **or** operations.


    "filter": { 
        "and": [
            ["ISO", "is", "FRA"],
            ["STAT_LEVEL", "greater", 2]
        ]
    }


You can even recursively nest **and** and **or** expressions to build complex filters:


    "filter": {
        "or": [
            { "and": [
                ["NUTS_LEVEL", "is", 3],
                ["NUTS_ID", "like", "FR%"]
             ]},
            { "and": [
                ["NUTS_LEVEL", "is", 2],
                ["NUTS_ID", "not like", "FR%"]
            ]}
        ]
    }