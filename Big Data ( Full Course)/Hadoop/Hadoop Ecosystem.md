# Hadoop Ecosystem

![image.png](image.png)

## 1. What is Hadoop?

**Hadoop** is an open-source framework designed for distributed storage and parallel processing of large datasets across clusters of commodity hardware.

Originally developed by Doug Cutting and Mike Cafarella in 2006, it was inspired by two Google papers:

1. Google File System (GFS)
2. MapReduce: Simplified Data Processing on Large Clusters

Hadoop was built to solve a very essential challenge: **"How do we store and process petabytes of data reliably, affordably, and efficiently using low-cost machines?"**

## 2. Why Hadoop Exists

### Problems With Traditional Systems:

- Scaling vertically (bigger servers) is costly.
- Relational databases cannot store unstructured data efficiently.
- Processing large data took too long, often hours or days.
- Systems were not fault-tolerant (if one node failed, jobs failed).

### Hadoop Provided:

- Horizontal scalability (add more commodity machines)
- Distributed storage (across nodes)
- Fault tolerance (replication of data)
- Distributed computation (process data in parallel)

## 3. Hadoop Architecture Overview

A typical Hadoop setup consists of two core components:

1. **HDFS (Hadoop Distributed File System)** — for storage
2. **MapReduce** — for processing

Later additions:

- YARN (Yet Another Resource Negotiator) — for cluster resource management

Additional tools were built around these core pieces over time, collectively forming the **Hadoop ecosystem**.

## 4. Core Components of Hadoop

### 4.1 HDFS — Hadoop Distributed File System

**Purpose**: Scalable, distributed storage for massive datasets.

**Key Features**:

- Master-slave architecture
- Files are split into blocks (default 128MB)
- Each block is replicated across multiple nodes (default replication factor: 3)
- Highly reliable and fault-tolerant

**Daemon Services**:

- NameNode: Master node storing metadata (file paths, block locations)
- DataNode: Worker nodes storing actual data blocks
- Secondary NameNode: Checkpoint node for NameNode (not a backup)

### 4.2 MapReduce — Computation Model

**Purpose**: Parallel processing of large data across nodes.

It works on a divide-and-conquer model:

- **Map step**: Input data is split into chunks and processed in parallel.
- **Reduce step**: Output of the map phase is grouped and aggregated.

**Example**: Counting the number of word occurrences in files.

Challenges:

- MapReduce jobs are slow since they persist intermediate results to disk.

### 4.3 YARN — Cluster Resource Manager (Introduced in Hadoop 2.x)

Without YARN, earlier Hadoop versions had a limitation: only MapReduce was available as a processing engine.

YARN separates storage and processing. It allows multiple processing models (like Spark, Tez, Flink) to run on Hadoop infrastructure.

**Components**:

- ResourceManager
- NodeManager
- ApplicationMaster

## 5. Hadoop Ecosystem Components

Below are the most important tools built around Hadoop:

### 5.1 Data Storage Tools

- **HDFS** (covered above)
- **HBase**: Distributed NoSQL database on top of HDFS. Suitable for random reads/writes on petabyte scale.

### 5.2 Data Processing Tools

- **MapReduce**: Native Hadoop processing model (batch).
- **Apache Spark**: Fast in-memory computation engine that can run on YARN. Supports batch, stream, graph, and ML workloads.
- **Apache Tez**: DAG-based framework optimized for high-performance batch processing.

### 5.3 Data Ingestion Tools

- **Apache Flume**: Agent-based tool for ingesting log and event data into Hadoop.
- **Apache Sqoop**: Transfers data between Hadoop and RDBMS like MySQL.
- **Kafka**: Distributed publish-subscribe messaging system for real-time data ingestion.

### 5.4 Data Access and Query Tools

- **Apache Hive**: Data warehousing tool that converts SQL queries (HiveQL) into MapReduce or Tez or Spark jobs.
- **Apache Pig**: High-level data flow platform using its own language (Pig Latin) built on MapReduce.
- **Apache Drill**: Schema-free SQL engine suitable for interactive querying on large datasets.
- **Presto/Trino**: High-performance distributed SQL query engine.

### 5.5 Workflow/Orchestration Tools

- **Apache Oozie**: Workflow scheduler to manage Hadoop jobs.
- **Apache Airflow** (not from Hadoop ecosystem but widely used with it): DAG-based task orchestrator for ETL pipelines.

### 5.6 Data Serialization/Interchange

- **Avro**: Row-based data serialization system.
- **Parquet**: Columnar storage format (optimized for analytical queries).
- **ORC**: Columnar format used by Hive.

### 5.7 Machine Learning with Hadoop

- **Apache Mahout**: Distributed machine learning framework built on top of MapReduce. (Mostly replaced by Spark MLlib now)
- **Petuum, H2O, TensorFlow**: Third-party tools deployed with Hadoop.

### 5.8 Security & Governance Tools

- **Apache Ranger**: Centralized security and RBAC for Hadoop.
- **Apache Knox**: Gateway for authentication across Hadoop services.
- **Apache Atlas**: Metadata and data lineage management.

## 6. How Hadoop Works Together (End-to-End Lifecycle)

1. **Ingestion**: Data comes from logs, databases, IoT, streams — via Sqoop, Kafka, Flume.
2. **Storage**: Lands in HDFS or HBase.
3. **Processing**:
    - Batch via MapReduce, Hive, Spark
    - Real-time via Spark Streaming or Kafka
4. **Querying**:
    - Interactive using Hive, Drill, Presto
5. **Analytics**:
    - Results passed to BI tools or ML workflows
6. **Scheduling/Workflow**:
    - Jobs chained using Oozie or Airflow

## 7. Hadoop Version Story

- **Hadoop 1.x**: Only MapReduce, tightly coupled with HDFS. Limited scalability.
- **Hadoop 2.x**: YARN introduced. New processing frameworks.
- **Hadoop 3.x**:
    - Erasure coding (storage efficiency)
    - Intra-datanode redundancy
    - Better scalability

## 8. Strengths of Hadoop Ecosystem

- Extremely scalable
- Fault-tolerant by design
- Works on low-cost hardware
- Supports multiple processing models (via YARN)
- Open-source and highly extensible
- Core for many modern data platforms (e.g., AWS EMR, HDInsight)

## 9. Limitations and Decline

- Slower compared to in-memory systems (Spark)
- MapReduce is disk heavy and slow
- Administration of clusters is complex
- Cloud-native alternatives like AWS S3 + EMR + Glue + Athena offer easier management
- Companies now prefer **data lakehouses** over Hadoop clusters

But the **core ideas** (distributed storage and processing) still drive most modern big data platforms.

## 10. Real-World Use Cases of Hadoop

- Log processing and analysis (e.g., LinkedIn)
- Clickstream analytics for recommendation engines (e.g., Netflix)
- Fraud detection and pattern analysis
- ETL pipelines for large-scale data warehouses