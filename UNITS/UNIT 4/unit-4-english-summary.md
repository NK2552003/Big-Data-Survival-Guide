# Unit IV: Big Data Frameworks (English Summary)

### Topics
1. Applications on Big Data Using Pig and Hive
2. Data processing operators in Pig
3. Hive services
4. HiveQL – Querying Data in Hive
5. Fundamentals of HBase and Zookeeper
6. IBM Infosphere BigInsights and Streams


## Applications on Big Data Using Pig and Hive
Pig and Hive let users process large Hadoop datasets without writing MapReduce. Pig Latin is a scripting language; HiveQL is SQL-like. Analysts use Hive for queries and Pig for ETL pipelines.

- Pig is procedural and excellent for data transformations and ETL; its Grunt shell and UDF support speed development.
- Hive provides a data‑warehouse on HDFS and lets SQL-trained analysts run ad‑hoc analytics. Its metastore and execution engine integrate with other tools such as Spark and Impala.
- Use cases include log parsing, data cleansing, ETL jobs, and preparing training data for machine learning.

> Example: telecom call-duration aggregation in Pig and Hive.

## Data processing operators in Pig
Pig Latin offers operators that manipulate bags, relations, and tuples. Common ones include:

- **LOAD, STORE** for reading/writing HDFS data (text, Avro, Parquet).
- **FILTER, GROUP, JOIN, CROSS, COGROUP, SPLIT** for relational operations.
- **FOREACH … GENERATE, ORDER, LIMIT, DISTINCT** for projection, sorting, sampling.

Operators are lazy and chain into optimized dataflows, which the engine converts into MapReduce/Tez/Spark. UDFs and `EXPLAIN` help extend and debug logic.

## Hive services
Key components:

- **Metastore** for metadata and statistics; shared with Spark, Impala, Presto.
- **HiveServer2** for JDBC/ODBC sessions with authentication and result streaming.
- **Driver** and **Execution Engine** (MapReduce/Tez/Spark) that compile and run queries. CLI/Beeline and web UI provide interfaces.

Security (Kerberos, LDAP) and high availability are supported.

## HiveQL – Querying Data in Hive
Supports DDL and DML, partitioning, bucketing, window functions, ACID transactions, and various file formats (Parquet, ORC, Avro, JSON). UDFs extend functionality.

```sql
SELECT country, SUM(amount) FROM sales GROUP BY country;
```

Cost-based optimization, vectorization, and `EXPLAIN` assist performance tuning.

## Fundamentals of HBase and Zookeeper
HBase is a NoSQL store with tables, column families, regions, and strong consistency; it serves random reads/writes at low latency. Zookeeper provides coordination (leader election, configuration, watches) used by HBase and many Hadoop components. Ensembling requires quorum and ensures high availability.

Example: time-series metrics with HBase, HBase + Zookeeper used by Kafka, Hive, Spark.

## IBM Infosphere BigInsights and Streams
BigInsights: IBM’s Hadoop distribution with GUI workbench (BigSheets), text analytics, geospatial functions, and connectors to DB2/Netezza/SPSS/Cognos. Streams: real-time streaming analytics platform using SPL/Java/C++ operators for low-latency processing of sensor, social, or market data.

Together they cover batch and stream analytics in enterprise environments.

