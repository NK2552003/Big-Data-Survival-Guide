# Unit IV: Big Data Frameworks (Hinglish Summary)

### Topics
1. Pig aur Hive ke zariye Big Data applications
2. Pig mein Data processing operators
3. Hive services
4. HiveQL – Hive mein query karna
5. HBase aur Zookeeper ke fundamentals
6. IBM Infosphere BigInsights aur Streams


## Pig aur Hive ke zariye Big Data applications
Pig aur Hive Hadoop ke upar high-level tools hain. Pig Latin scripting language hai jo ETL ke liye use hoti hai. HiveQL SQL jaisa language hai jise analysts queries likhne ke liye istemal karte hain.

- Pig procedural hai aur data transformation pipelines mein acha hai; Grunt shell madad karta hai experiments mein aur UDFs se custom logic add hota hai. Pig lazy evaluation karta hai aur script ko MapReduce/Tez/Spark jobs mein convert karta hai.
- Hive HDFS par data-warehouse provide karta hai aur SQL waale log bina MapReduce likhe ad-hoc analytics kar sakte hain. Metastore ek shared metadata store hai jo Spark, Impala jaise tools use karte hain. HiveQL me partitioning, bucketing, aur window functions available hain.
- Use cases: log parsing, data cleaning, ETL, machine-learning ke liye training data tiyar karna, aur ad‑hoc reporting. Pig ko prototyping ke liye use karo, fir stable logic Hive me convert karo.

> **Example:** telecom call-duration aggregation: Pig script se daily average nikalke Hive table me store aur phir BI dashboard banaana.

```pig
logs = LOAD '/telecom/cdr/*' AS (user:chararray,duration:int);
avg = FOREACH (GROUP logs BY user)
 GENERATE group, AVG(logs.duration);
STORE avg INTO '/telecom/analysis/avg_duration';
```

Phir Hive me:

```sql
CREATE TABLE avg_call(user STRING, avg_dur DOUBLE)
STORED AS PARQUET;
LOAD DATA INPATH '/telecom/analysis/avg_duration' INTO TABLE avg_call;
```

## Pig mein Data processing operators
Pig Latin mein operators hain jo bags, relations, aur tuples ko manipulate karte hain. Common operators:

- **LOAD, STORE** (text, Avro, Parquet) ke saath HDFS se padhen/likhen. `PigStorage(',')` ya `JsonLoader()` etc.
- **FILTER, GROUP, JOIN, CROSS, COGROUP, SPLIT** relational operations ke liye. `JOIN` skewed ya replicated join chun sakta hai.
- **FOREACH … GENERATE, ORDER, LIMIT, DISTINCT** projection, sorting, sampling ke liye.

Operators lazy hote hain aur chain hoke optimized dataflows banate hain jo engine MapReduce/Tez/Spark mein convert karta hai. UDFs (Java/Python) aur `EXPLAIN` se debug aur extend kiya jaa sakta hai. Example:

```pig
A = LOAD 'data/users' AS (id:int,name:chararray,age:int);
B = FILTER A BY age > 25;
C = ORDER B BY name DESC;
D = LIMIT C 100;
STORE D INTO 'output/top_users';
```

Ye script pehle 25 se bade users filter karega, unko name ke descending order me sort karega, aur top 100 result store karega.

## Hive services
Mukhy components:

- **Metastore** metadata aur statistics ke liye; Spark, Impala, Presto isko share karte hain. Table definitions, partitions, aur file locations yahi stored hote hain.
- **HiveServer2** JDBC/ODBC sessions, authentication (Kerberos/LDAP/LDAP) aur result streaming ke liye. Beeline isse connect karta hai.
- **Driver** aur **Execution Engine** (MapReduce/Tez/Spark) jo queries compile aur run karte hain. CLI/Beeline aur web UI interfaces hain jahan query history aur plan dekh sakte hain.

Security (Kerberos, LDAP) aur high availability support karta hai. Metastore backup/restore important hota hai.

> **Tip:** `EXPLAIN SELECT * FROM table;` se query plan pata chalta hai. 

## HiveQL – Hive mein query karna
DDL aur DML statements support karta hai, partitioning, bucketing, window functions, ACID transactions, aur Parquet/ORC/Avro/JSON jaise formats. UDFs se functionality extend hoti hai.

```sql
CREATE TABLE users(id INT, name STRING) PARTITIONED BY (dt STRING);
INSERT INTO users PARTITION(dt='20260226')
SELECT id, name FROM staging_users;
SELECT dt, COUNT(*) FROM users GROUP BY dt;
```

Cost-based optimization, vectorization, aur `EXPLAIN` performance tuning mein madad karte hain. Window example:

```sql
SELECT id, name,
 ROW_NUMBER() OVER (PARTITION BY dt ORDER BY id) AS rn
FROM users;
```

## HBase aur Zookeeper ke fundamentals
HBase ek NoSQL store hai jisme tables, column families, regions, aur strong consistency hoti hai; yeh low-latency random reads/writes deta hai. Zookeeper coordination provide karta hai (leader election, configuration, watches) jo HBase aur kayi Hadoop components use karte hain. Ensemble mein odd number (3,5,7) nodes required honge taaki quorum maintain ho.

- Row key design dhyan se karo; for example time series me `region:timestamp` use karo.
- Hotspot avoid karne ke liye prefix ya salting karein.

Example: time-series metrics HBase mein, aur HBase + Zookeeper Kafka, Hive, Spark mein use hote hain.

## IBM Infosphere BigInsights aur Streams
BigInsights: IBM ka Hadoop distribution jisme GUI workbench (BigSheets), text analytics, geospatial functions, aur connectors DB2/Netezza/SPSS/Cognos ke liye hote hain. Isme pre-built analytics aur security features bhi hote hain.

Streams: real-time streaming analytics platform SPL/Java/C++ operators ke sath jo sensor, social, ya market data ke low-latency processing karte hain. Example SPL code fruit:

```spl
stream<rstring sym,float price> S = ReadFromSocket("")
 -> Filter(price>0)
 -> AggregateWindow(timeBatch(1 sec), avg(price) as avgPrice)
 -> WriteToKafka("avgPrices");
```

Ye batch aur stream analytics dono ko enterprise environment mein cover karte hain.
