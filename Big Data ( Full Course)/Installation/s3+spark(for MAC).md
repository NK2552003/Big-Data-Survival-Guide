# Install Apache Spark on macOS and connect it with AWS S3 using the `s3a://` connector.

---

# **1. Install Apache Spark**

```sh
brew install apache-spark
```

Check version:

```sh
spark-shell --version
```

You should see: **Spark version 4.0.1** (or similar)

---

# **2. Configure AWS Credentials**

Verify AWS is configured:

```sh
aws configure list
```

This should show your credentials from:
```
~/.aws/credentials
~/.aws/config
```

Spark automatically picks these credentials.

---

# **3. Download S3 Connector JARs**

⚠️ **IMPORTANT:** Spark 4.0.1 uses Hadoop 3.4.1, so you need **matching versions** of the JARs.

Create a directory for JARs in Spark's installation:

```sh
sudo mkdir -p /opt/homebrew/Cellar/apache-spark/4.0.1_1/libexec/jars/s3-connector
cd /opt/homebrew/Cellar/apache-spark/4.0.1_1/libexec/jars/s3-connector
```

Download the required JARs (compatible versions):

```sh
# Hadoop AWS 3.4.1
sudo curl -L https://repo1.maven.org/maven2/org/apache/hadoop/hadoop-aws/3.4.1/hadoop-aws-3.4.1.jar -o hadoop-aws-3.4.1.jar

# AWS SDK v1 Bundle
sudo curl -L https://repo1.maven.org/maven2/com/amazonaws/aws-java-sdk-bundle/1.12.780/aws-java-sdk-bundle-1.12.780.jar -o aws-java-sdk-bundle-1.12.780.jar

# AWS SDK v2 Bundle
sudo curl -L https://repo1.maven.org/maven2/software/amazon/awssdk/bundle/2.29.52/bundle-2.29.52.jar -o bundle-2.29.52.jar
```

**OR** copy JARs directly to Spark's jars folder (simpler method):

```sh
# If you already downloaded them to ~/big_data_course/jars/
sudo cp ~/big_data_course/jars/*.jar /opt/homebrew/Cellar/apache-spark/4.0.1_1/libexec/jars/
```

---

# **4. Configure Spark Defaults (Direct Access - No Script Needed)**

Create/edit Spark's default configuration file:

```sh
sudo nano /opt/homebrew/Cellar/apache-spark/4.0.1_1/libexec/conf/spark-defaults.conf
```

Add these lines:

```properties
spark.hadoop.fs.s3a.impl org.apache.hadoop.fs.s3a.S3AFileSystem
spark.hadoop.fs.s3a.aws.credentials.provider software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider
spark.hadoop.fs.s3a.connection.timeout 60000
spark.hadoop.fs.s3a.connection.establish.timeout 60000
spark.hadoop.fs.s3a.socket.timeout 60000
```

Save and exit (Ctrl+X, then Y, then Enter).

**Note:** Using `software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider` (AWS SDK v2) avoids deprecation warnings. The old v1 provider `com.amazonaws.auth.DefaultAWSCredentialsProviderChain` still works but shows warnings.

---

# **5. Start Spark with S3 Support (Direct Access)**

Now you can use Spark commands **directly without any extra parameters**:

## PySpark Shell (Direct)

```sh
pyspark
```

## Spark Shell (Direct)

```sh
spark-shell
```

## Spark Submit (Direct)

```sh
spark-submit your_script.py
```

That's it! S3 support is now **permanently enabled** for all Spark sessions.

---

# **6. Test Connection to S3**

## PySpark Example:

```python
from pyspark.sql import SparkSession

# No extra configuration needed - uses spark-defaults.conf
spark = SparkSession.builder.appName("S3Test").getOrCreate()

# Read from S3
df = spark.read.text("s3a://your-bucket-name/path/file.txt")
df.show()

# Write to S3
df.write.mode("overwrite").parquet("s3a://your-bucket-name/output/")
```

## Scala Example (in spark-shell):

```scala
// Read from S3
spark.read.text("s3a://your-bucket-name/path/file.txt").show()

// Write to S3
spark.range(10).write.mode("overwrite").csv("s3a://your-bucket-name/test-output/")
```

## Simple Command Line Test:

```sh
# Start PySpark and test immediately
pyspark
```

Then in PySpark:
```python
spark.read.text("s3a://your-bucket-name/file.txt").show()
```

---

# **Important Notes**

1. **Always use `s3a://`** protocol (not `s3://` or `s3n://`)
2. **All 3 JARs are required** - missing any will cause errors
3. **Version compatibility matters** - Spark 4.0.1 needs Hadoop 3.4.1 JARs
4. **AWS credentials** must be configured via `aws configure`

---

# **Troubleshooting**

**Error: ClassNotFoundException: S3AFileSystem**
- Make sure all 3 JAR files are included in `--jars` parameter

**Error: NoSuchMethodError**
- Version mismatch - use Hadoop 3.4.1 JARs (not 3.4.2)

**Error: Access Denied**
- Check AWS credentials: `aws configure list`
- Verify S3 bucket permissions

---

**Installation complete! Test your connection with the examples above.** 🚀
