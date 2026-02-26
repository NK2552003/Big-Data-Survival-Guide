# Spark + Grafana

### 1) Create Output Folder

```jsx
mkdir -p /home/hadoop/spark_out/fortune_output

ls -l /home/hadoop/spark_out
```

### 2) Start dfs and namenode

```jsx
start-dfs.sh
start-yarn.sh

or 

start-all.sh
```

### **2) Start spark-shell**

```jsx
spark-shell
```

### 3) Load CSV

```scala
val df = spark.read
  .option("header","true")
  .option("inferSchema","true")
  .csv("file:///home/hadoop/data/fortune1000.csv")
```

### 4) Now type:

```scala
import org.apache.spark.sql.functions._
```

This statement gives you access to:

- sum
- avg
- count
- max
- min
- col
- lit
- etc.

Without this import,

Spark shell won’t recognize those functions.

### 5) Now aggregation

```scala
val aggDf = df
  .groupBy("Sector")
  .agg(
    sum("Revenue").alias("total_revenue"),
    avg("Profits").alias("avg_profit"),
    count("*").alias("company_count")
  )
  .orderBy(desc("total_revenue"))
```

And:

```scala
aggDf.show(20,false)
```

### 6) Go in spark shell and type this to create the output path

```jsx
val outDir = "file:///home/hadoop/spark_out/fortune_output"
```

### 7) Now Run

```jsx
aggDf
  .coalesce(1)              // single CSV file
  .write
  .mode("overwrite")
  .option("header", "true")
  .csv(outDir)
```

### 8) Run this

```jsx
aggDf.printSchema()
```

Big Data

```jsx
// ---------- CONFIG - adjust if your paths differ ----------
val inputPath = "file:///home/hadoop/data/products-2000000.csv"   // your raw CSV
val outDir = "file:///home/hadoop/spark_out/products_final_output" // output folder (Spark writes a folder)

// ---------- LOAD ----------
val df = spark.read
  .option("header", "true")
  .option("inferSchema", "true")
  .csv(inputPath)

println("Loaded schema:")
df.printSchema()
println("Sample:")
df.select(df.columns.take(8).map(col): _*).show(6, false)  // show first 8 cols for quick peek

// ---------- FUNCTIONS & CLEANING ----------
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._

// helper: robust numeric cleaning for price/stock columns (remove commas/currency etc)
def toDoubleCol(c: String) = regexp_replace(col(c).cast(StringType), "[,$₹€£]", "").cast(DoubleType)
def toLongCol(c: String) = regexp_replace(col(c).cast(StringType), "[,]", "").cast(LongType)

// determine actual column names present (fallbacks if capitalization differs)
val cols = df.columns.map(_.trim)
def pick(nameCandidates: String*) = nameCandidates.find(n => cols.exists(_.equalsIgnoreCase(n))).getOrElse(nameCandidates.head)

val categoryCol = pick("Category","category","category_name")
val priceCol    = pick("Price","price","UnitPrice","price_usd")
val stockCol    = pick("Stock","stock","Inventory","available_stock")
val nameCol     = pick("Name","name","product_name")

println(s"Using columns -> category:$categoryCol, price:$priceCol, stock:$stockCol, name:$nameCol")

// build a cleaned DF with numeric columns (if conversion fails you'll get nulls)
val clean = df
  .withColumn("price_num", when(col(priceCol).isNotNull, toDoubleCol(priceCol)).otherwise(lit(null).cast(DoubleType)))
  .withColumn("stock_num", when(col(stockCol).isNotNull, toLongCol(stockCol)).otherwise(lit(0).cast(LongType)))
  .withColumn("category_clean", when(col(categoryCol).isNull, lit("UNKNOWN")).otherwise(col(categoryCol)))
  .withColumn("product_name", col(nameCol))

println("Clean sample:")
clean.select("product_name","category_clean","price_num","stock_num").show(6, false)

// ---------- AGGREGATION: Per-category report ----------
val report = clean.groupBy(col("category_clean").alias("category"))
  .agg(
    count("*").alias("total_products"),
    sum("stock_num").alias("total_stock"),
    avg("price_num").alias("avg_price")
  )
  .na.fill(0.0, Seq("avg_price"))   // fill avg_price nulls with 0
  .withColumn("total_revenue", col("avg_price") * col("total_stock"))
  .orderBy(desc("total_revenue"))

println("Category report (top 30):")
report.show(30, false)

// ---------- WRITE single CSV (force local FS) ----------
report.coalesce(1)
  .write
  .mode("overwrite")
  .option("header","true")
  .csv(outDir)

println(s"WROTE results to folder (check locally): ${outDir}")
```

[https://grafana-assets-bucket.s3.ap-south-1.amazonaws.com/product_result.csv](https://grafana-assets-bucket.s3.ap-south-1.amazonaws.com/product_result.csv)

[https://grafana-assets-bucket.s3.ap-south-1.amazonaws.com/products-2000000.csv](https://grafana-assets-bucket.s3.ap-south-1.amazonaws.com/products-2000000.csv)

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::grafana-assets-bucket/*"
        }
    ]
}