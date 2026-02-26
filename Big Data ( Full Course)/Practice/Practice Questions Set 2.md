# Practice Questions Set 2

# SECTION-A

## THEORY QUESTIONS

### (Big Data + Hadoop + Spark)

**Q1.** What is Big Data, in your own words?

**Q2.** What are the 3 main characteristics of Big Data?

**Q3.** What is Hadoop and why do we need it?

**Q4.** What is HDFS and why don’t we store huge data directly in local file system?

**Q5.** What is the role of NameNode in HDFS?

**Q6.** What is the role of DataNode in HDFS?

**Q7.** What is replication in HDFS?

**Q8.** Explain in simple words: “HDFS vs Local File System”

**Q9.** What is Apache Spark?

**Q10.** How is Spark different from Hadoop MapReduce?

**Q11.** What is RDD in Spark?

**Q12.** What is DataFrame in Spark?

**Q13.** Why is Spark faster than MapReduce?

**Q14.** What is a Spark job?

**Q15.** Why do data engineers use Parquet format?

### (Cloud)

**Q1.** What is Cloud Computing in simple words?

**Q2.** Why did the world need cloud computing?

**Q3.** How is cloud computing different from traditional on-premise computing?

**Q4.** What are the main characteristics of Cloud Computing?

**Q5.** What is virtualization, and why is it important for cloud computing?

**Q6.** What are the 3 types of cloud deployment models?

**Q7.** Explain Public Cloud in your own words.

**Q8.** Explain Private Cloud in your own words.

**Q9.** Explain Hybrid Cloud in your own words.

**Q10.** What are the 3 types of cloud service models?

**Q11.** What is IaaS? Give an example.

**Q12.** What is PaaS? Give an example.

**Q13.** What is SaaS? Give an example.

**Q14.** Why is scalability important in cloud computing?

**Q15.** What do you understand by elasticity in cloud computing?

**Q16.** What is multi-tenancy?

**Q17.** What is pay-as-you-go pricing in cloud?

**Q18.** Why is cloud computing cost-effective?

**Q19.** Name two problems companies had before cloud computing existed.

**Q20.** How does cloud support Big Data workloads?

**Q21.** Why is cloud considered reliable?

**Q22.** What is resource pooling?

**Q23.** What is shared responsibility model in cloud?

**Q24.** What is cloud service latency?

**Q25.** Why do startups prefer cloud over owning their own servers?

# SECTION-B

## HDFS PRACTICAL EXERCISE QUESTIONS

(basic)

**Exercise-1:**

Create a directory named `/trainingdata` in HDFS

and list it.

Expected commands:

- `hdfs dfs -mkdir /trainingdata`
- `hdfs dfs -ls /`

---

**Exercise-2:**

Copy a file named `students.csv`

from local system into `/trainingdata`

Expected commands:

- `hdfs dfs -put students.csv /trainingdata`
- `hdfs dfs -ls /trainingdata`

---

**Exercise-3:**

Display the first 20 lines of that file

Expected commands:

- `hdfs dfs -cat /trainingdata/students.csv | head -n 20`

---

**Exercise-4:**

Check disk usage of `/trainingdata` folder

Expected commands:

- `hdfs dfs -du -h /trainingdata`

---

**Exercise-5:**

Download the file back from HDFS to local

Expected commands:

- `hdfs dfs -get /trainingdata/students.csv ./outputfolder`

---

**Exercise-6**

Create a nested directory structure in HDFS:

```
/trainingdata/raw
/trainingdata/processed
/trainingdata/archive
```

---

**Exercise-7**

Move `students.csv` from `/trainingdata` → `/trainingdata/raw`

---

**Exercise-8**

Copy entire `/trainingdata/raw` folder to `/trainingdata/backup`

---

**Exercise-10**

Check HDFS summary / report

**Exercise-11**

Count lines of a file inside HDFS

# SECTION-C

## SPARK PRACTICAL EXERCISE QUESTIONS

(Basic, beginner level)

Assume spark-shell is already running.

**Exercise-1:**

Load the `/trainingdata/students.csv` file from HDFS

into Spark as DataFrame

---

**Exercise-2:**

Show the first 10 rows

---

**Exercise-3:**

Print schema of the DataFrame

---

**Exercise-4:**

Select columns: `name`, `age`

---

**Exercise-5:**

Filter rows where age > 20

---

**Exercise-6:**

Count total number of records

---

**Exercise-7:**

Group by `city`, count students per city

---

**Exercise-8:**

Sort by age

---

**Exercise-9:**

Save filtered output to HDFS at:

`/trainingdata/output_spark`

---

**Exercise-10:**

Load saved output back into Spark again

and show it.

---

**Exercise-11**

Select ONLY `name` column and remove duplicates

---

**Exercise-12**

Add new column:

```
age_plus_5 = age + 5
```

**Exercise-13**

Print only first 100 rows without truncation

# SECTION-D

## AWS S3 + AWS CLI EXERCISES

**Exercise-1:**

Configure AWS CLI using the access key

(using `aws configure`)

---

**Exercise-2:**

Create an S3 bucket

(expected: `aws s3 mb s3://bucketname`)

---

**Exercise-3:**

Upload a local file `students.csv`

into the bucket

(expected: `aws s3 cp students.csv s3://bucketname/`)

---

**Exercise-4:**

List files inside your bucket

(expected: `aws s3 ls s3://bucketname/`)

---

**Exercise-5:**

Download a file from S3 to your machine

(expected: `aws s3 cp s3://bucketname/students.csv ./`)

---

**Exercise-6:**

Sync a local folder with S3 folder

(expected: `aws s3 sync ./folder s3://bucketname/folder`)

---

**Exercise-7**

List all buckets in your AWS account

---

**Exercise-8**

Create a folder inside your S3 bucket

---

**Exercise-9**

Delete a file from bucket

---

**Exercise-11**

Copy file from **bucket A** to **bucket B**

---

**Exercise-12**

Upload 5 files

check storage size

verify via console

---

**Exercise-13**

Upload 1,000 rows JSON file

download back

check if exact match

| **name** | **age** | **city** | **city** |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |