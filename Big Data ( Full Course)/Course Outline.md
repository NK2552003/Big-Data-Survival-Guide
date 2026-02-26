# Course Outline

## Module 1: Foundations of Data Systems

### 1.1 Understanding Data

- What is data?
- How raw data becomes useful information
- Types of data:
    - Structured (e.g., tables)
    - Unstructured (e.g., images, videos)
    - Semi-structured (e.g., JSON, XML)
- Simple examples from daily life

### 1.2 Systems of Record vs Systems of Analysis

- What is OLTP (online transaction processing)?
- What is OLAP (online analytical processing)?
- Difference in purpose (day-to-day usage vs insights and reporting)

## Module 2: Databases and Their Design

### 2.1 What is a Database?

- What is a database and why we use it
- Difference between storing data in normal files vs database systems

### 2.2 DBMS (Database Management System)

- What is a DBMS?
- Basic DBMS functions: storing, querying, updating, managing data

### 2.3 Types of Databases

- Relational Databases (e.g., MySQL, PostgreSQL): store data in tables
- NoSQL Databases (short overview only):
    - Key-value stores (e.g., Redis)
    - Document stores (e.g., MongoDB)
    - Column-based stores (e.g., Cassandra)
    - Graph-based stores (e.g., Neo4j)

### 2.4 Overview of Strengths & Limitations

- Relational databases work well with structured data, but can struggle with very large or flexible datasets
- NoSQL databases handle large, flexible or fast-changing data, but may not fully support transactions in all cases

## Module 3: System Scalability and Distributed Architecture

### 3.1 Scaling Basics

- Vertical vs horizontal scaling
- Load balancing basics

### 3.2 Distributed Systems Concepts

- What makes a system “distributed”?
- CAP Theorem (Consistency, Availability, Partition tolerance)
- Data replication and sharding
- Fault tolerance

## Module 4: Linux Essentials for Data Engineering

### 4.1 Introduction to Linux

- Why Linux for data platforms
- Differences from Windows OS

### 4.2 Key Concepts

- File system hierarchy
- Permissions and ownership
- Processes and networking basics

### 4.3 Essential Commands

- Navigating file system (`ls`, `cd`, `pwd`)
- File operations (`cat`, `cp`, `mv`)
- User and permissions (`chmod`, `chown`)
- Service management and monitoring

## Module 5: Hadoop Ecosystem Essentials

### 5.1 Introduction to Hadoop

- Why Hadoop was invented
- Hadoop architectural overview

### 5.2 Key Components

- HDFS: Storage layer fundamentals
- YARN: Resource management
- MapReduce: Parallel processing (conceptual only)

### 5.3 Hadoop File System Basics

- Block storage
- Replication and fault tolerance

### 5.4 Practical Setup

- Running Hadoop on WSL
- Getting familiar with HDFS commands

## Module 6: Apache Spark for Data Processing

### 6.1 Introduction to Spark

- What is Apache Spark?
- Why Spark replaced MapReduce

### 6.2 Spark Building Blocks

- RDDs (Resilient Distributed Datasets)
- DataFrames and Datasets
- Spark SQL overview

### 6.3 Spark Execution Model

- DAGs (Directed Acyclic Graphs)
- Lazy execution and fault tolerance

### 6.4 Running Spark on Hadoop

- Configuring Spark with Hadoop (YARN cluster mode on WSL)
- Using Spark to process data from HDFS

## Module 7: Introduction to Cloud Computing

### 7.1 Why Cloud for Big Data

- Cloud-native vs on-premise infrastructure
- Elastic scaling and cost models

### 7.2 AWS Overview

- Understanding billing and free tier limits
- Core services for data:
    - S3
    - EC2
    - IAM
    - Glue (optional)

### 7.3 Setting Up on AWS Free Tier

- Create account and secure it
- Build an S3 bucket for storage
- Deploy a small EC2 instance for data pipeline testing

## Module 8: Cloud-Based Data Engineering Workflow

### 8.1 Storage Layer

- Storing raw data in AWS S3

### 8.2 Compute Layer

- Running Spark on EC2 (or local setup with WSL)
- Using AWS Glue or PySpark scripts on cloud

### 8.3 Data Delivery

- Exporting processed data for visualization
- Integration with Power BI / QuickSight (optional)

## Module 9: Putting It All Together

### 9.1 End-to-End Pipeline

- Data ingestion → Storage → Processing → Serving
- Local Hadoop + Spark + S3 workflow

### 9.2 Deployment Strategy

- On WSL for local
- On AWS for cloud

### 9.3 Cost Optimization

- Controlling usage within free tier
- Best practices for storage, compute, and transfers