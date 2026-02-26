# Spark Something Practical

This guide assumes your `data.csv` is located at:

```jsx
hdfs:///data/data.csv
```

Everything below works inside:

```jsx
spark-shell
```

## 0. Check HDFS Path (Before Starting)

```jsx
hdfs dfs -ls /data
```

You must see:

```jsx
/data/data.csv
```

## 1. Read the File (Basic RDD Operation)

Spark loads the file as an RDD (Distributed dataset):

Scala:
- For Windows
```jsx
val rdd = sc.textFile("hdfs:///data/data.csv")
rdd.take(10).foreach(println)
```
- For Mac
 
```jsx
val rdd = sc.textFile("hdfs://localhost:9000/<foldername>/data.csv")
rdd.take(10).foreach(println)
```

## 2. Word Count (Spark Equivalent of MapReduce WordCount)

```jsx
val words = rdd.flatMap(_.split("\\W+")).filter(_.nonEmpty).map(_.toLowerCase)
val counts = words.map((_,1)).reduceByKey(_+_)
counts.take(20).foreach(println)
```

## 3. Search / Grep (Spark Equivalent of MapReduce grep)

```jsx
val myword = rdd.filter(_.contains("Eminem"))
errors.take(10).foreach(println)
```

## 4. Sorting the Dataset (Spark Equivalent of MR Sort)

Sort entire file alphabetically:

```jsx
val sorted = rdd.sortBy(x => x)
sorted.take(20).foreach(println)
```

## 5. Count Lines / Count Words / Count Characters

### Count lines

```scala
rdd.count()
```

### Count characters (per line)

```scala
rdd.map(_.length).take(20)
```

### Count total characters

```scala
rdd.map(_.length).reduce(_ + _)
```

## 7. Top 10 Most Frequent Words (Simple Analytics)

```jsx
counts.takeOrdered(10)(Ordering.by(-_._2))
```

## **8. Convert Your CSV Into Structured DataFrame**

If your `data.csv` has simple comma-separated fields, use DataFrames:
- For Windows
```jsx
val df = spark.read.option("header","false").csv("hdfs:///data/data.csv")
df.show(10)
```
- For Mac

```jsx
val df = spark.read.option("header","false").csv("hdfs://localhost:9000/<foldername>/data.csv")
df.show(10)
```

DataFrame makes Spark 10x easier.

## 9. DataFrame Analytics

Assume you want to count rows:

```jsx
df.count()
```

Filter rows:

```jsx
df.filter($"_c0".contains("error")).show()
```

Sort:

```jsx
df.orderBy($"_c0".asc).show()
```

Add new column:

```jsx
df.withColumn("len", length($"_c0")).show()
```

## 10. Save Output Back to HDFS

RDD:
 - For Windows
```jsx
counts.saveAsTextFile("hdfs:///output/wordcount_out")
```
- For Mac

```jsx
counts.saveAsTextFile("hdfs://localhost:9000/output/wordcount_out")
```

DataFrame:

```jsx
df.write.csv("hdfs:///output/df_out")
```
- For Mac

```jsx
df.write.csv("hdfs://localhost:9000/output/df_out")
```


## 11. Full Simple Pipeline Example
- For Windows
```jsx
val file = sc.textFile("hdfs:///data/data.csv")

val cleaned = file.flatMap(_.split("\\W+")).filter(_.nonEmpty).map(_.toLowerCase)

val wc = cleaned.map((_,1)).reduceByKey(_+_)

wc.saveAsTextFile("hdfs:///output/my_wordcount")
```
- For Mac

```jsx
val file = sc.textFile("hdfs://localhost:9000/<foldername>/data.csv")

val cleaned = file.flatMap(_.split("\\W+")).filter(_.nonEmpty).map(_.toLowerCase)

val wc = cleaned.map((_,1)).reduceByKey(_+_)

wc.saveAsTextFile("hdfs://localhost:9000/output/my_wordcount")
```

Now Just Exit From Scala:

```jsx
hdfs dfs -ls /output/my_wordcount
```

You should see something like:

```jsx
/output/my_wordcount/_SUCCESS
/output/my_wordcount/part-00000
/output/my_wordcount/part-00001
```

Spark creates multiple output files = one per partition.

```jsx
hdfs dfs -cat /output/my_wordcount/part-00000
```

or

```jsx
hdfs dfs -cat /output/my_wordcount/part-00001
```

or

```jsx
hdfs dfs -cat /output/my_wordcount/part-* | head
```