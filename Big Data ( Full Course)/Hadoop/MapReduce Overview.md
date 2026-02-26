# MapReduce Overview

![image.png](image.png)

MapReduce is a programming model + execution engine designed to process very large amounts of data in parallel across many machines.

It has two phases:

Map → Break data into pieces and convert each piece into (key, value) pairs

Reduce → Collect all values belonging to the same key and combine them

That's it.
But behind the scenes: massive distributed magic.

# **Why MapReduce Exists**

Before MapReduce, processing huge files (GB/TB) on a single machine had problems:

- RAM not enough
- CPU slow
- Machine could crash
- No parallelism

MapReduce solves these by:

- Splitting work across many machines
- Automatically parallelizing tasks
- Automatically recovering from failures
- Automatically handling data distribution

You just write **map** and **reduce**.

Hadoop does everything else.

# **Big Picture of How MapReduce Works**

Imagine a big file stored in HDFS:

```
100GB log file
```

Hadoop automatically splits it:

```
Split 1 → Map Task 1
Split 2 → Map Task 2
Split 3 → Map Task 3
...
```

Each mapper processes its own piece of data in parallel.

The mapper outputs:

```
(key, value)
(key, value)
(key, value)
```

Then Hadoop does **Shuffle + Sort**, meaning:

- Group all identical keys together
- Send them to reducer machines

Reducer gets:

```
key1 → [values...]
key2 → [values...]
```

Reducer combines values and produces the final result.

# **MapReduce Step-by-Step Internals**

## **Step 1: Input Splitting**

Hadoop splits large files into chunks called **Input Splits** (default: 128MB each).

Each split → one mapper.

If your file is:

- 1GB → ~8 mappers
- 10GB → ~80 mappers

More mappers = more parallel work.

## **Step 2: Map Phase**

Mapper reads data line by line.

Example: WordCount mapper receives line:

```
"Hadoop is fast Hadoop is scalable"
```

It outputs:

```
("Hadoop", 1)
("is", 1)
("fast", 1)
("Hadoop", 1)
("is", 1)
("scalable", 1)
```

Mapper always outputs **key-value pairs**.

You can transform, parse, filter, or extract anything in the mapper.

## **Step 3: Partitioning**

Decides which reducer gets which key.

Default:

```
hash(key) % number_of_reducers
```

Example:

```
"Hadoop" always goes to reducer 1
"is" always goes to reducer 2
```

This ensures all identical keys go to the same reducer.

## **Step 4: Shuffle and Sort**

This is the **core** of MapReduce.

Hadoop:

- Groups all values with the same key
- Sorts keys
- Moves them across the cluster (network transfer)

Example reducer input:

```
"Hadoop" → [1, 1]
"is"     → [1, 1]
"fast"   → [1]
"scalable" → [1]
```

Shuffle is expensive — but Hadoop handles it automatically.

## **Step 5: Reduce Phase**

Reducer receives:

```
(key, list_of_values)
```

Example:

```
reduce("Hadoop", [1,1]) → ("Hadoop", 2)
reduce("is", [1,1]) → ("is", 2)
```

Reducer aggregates and outputs final result.

## **Step 6: Output to HDFS**

Reducer writes results into HDFS files:

```
part-r-00000
part-r-00001
...
```

Number of reducers = number of output files.

# **The Golden Rule of MapReduce**

You only write **2 functions**:

```
map(key, value)
reduce(key, values)
```

Everything else — splitting, distribution, retries, parallelism — Hadoop handles automatically.

# **Real Example (WordCount)**

### Input:

```
big data is big
data is powerful
```

### Mapper Output:

```
big → 1
data → 1
is → 1
big → 1

data → 1
is → 1
powerful → 1
```

### Shuffle:

```
big → [1,1]
data → [1,1]
is → [1,1]
powerful → [1]
```

### Reducer Output:

```
big       2
data      2
is        2
powerful  1
```

# **Where MapReduce Is Used**

Companies use MapReduce for:

- Log analysis
- Counting events (clicks, views, searches)
- Processing large text files
- Building search indexes
- Batch ETL pipelines
- Group-by and aggregations
- Big data transformations

MapReduce is slow compared to Spark, but it is:

- Reliable
- Fault-tolerant
- Perfect for batch jobs

# **Where MapReduce is NOT good**

- Real-time processing
- Streaming
- Interactive queries
- In-memory analytics
- Small datasets

Spark, Flink, Hive, Presto are faster for those use cases.

# **Three Ways to Use MapReduce**

## **1. Default Hadoop Examples (Zero coding)**

Run WordCount:

```
hadoop jar hadoop-mapreduce-examples.jar wordcount input output
```

## **2. Hadoop Streaming (Python / Bash / Node)**

Write simple scripts:

- mapper.py
- reducer.py

Run:

```
hadoop jar hadoop-streaming.jar -mapper mapper.py -reducer reducer.py
```


## **3. Java MapReduce (Professional way)**

Write full Java classes for mapper & reducer.

Used in production.