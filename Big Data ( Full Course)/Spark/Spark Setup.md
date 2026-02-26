# Spark Setup

We follow these principles:

- Download Spark in a temporary folder
- Install Spark permanently in `/opt/spark`
- Configure environment variables
- Validate Spark installation
- Validate Spark ↔ Hadoop integration

This is the exact setup used in real Hadoop + Spark environments.

`
If you are in MAC you don't have to do the given steps below as it was already configured in [Hadoop_Installation(for Mac).md](../Hadoop_Installation(for Mac).md) file. Just navigate to (7th Point in this file to test the connectivity and working)
`
# **1. Download Spark in a Temporary Folder (`/tmp`)**

### Why `/tmp`?

- It is a safe, temporary workspace
- Downloading in `/tmp` avoids cluttering your home directory
- If the download gets corrupted, deleting it is safe

### Command

```bash
cd /tmp
```

# **2. Download Spark (Hadoop 3 Compatible Build)**

```bash
wget https://downloads.apache.org/spark/spark-4.0.1/spark-4.0.1-bin-hadoop3.tgz
```

### Explanation

- `wget` downloads files from the internet.
- This is the official Apache Spark 4.x version built for Hadoop 3.
- The file will be stored in `/tmp`.

# **3. Create the Final Installation Directory**

Spark should NOT be installed inside `/tmp`.

Instead, we place it in a permanent system location:

```bash
cd
sudo mkdir -p /opt/spark
```

### Explanation

- `/opt` is used for manually installed software (industry standard)
- `p` creates the folder if it doesn’t exist
- `sudo` required because `/opt` belongs to root

# **4. Extract Spark Into the Installation Folder**

```bash
sudo tar -xzf /tmp/spark-4.0.1-bin-hadoop3.tgz -C /opt/spark --strip-components=1
```

### Explanation

- `tar -xzf` extracts a `.tgz` archive
- `C /opt/spark` tells tar to extract *inside* that folder
- `-strip-components=1` removes the top-level internal folder
    
    (so files are placed cleanly directly under `/opt/spark`)
    

After this step:

- your Spark installation = `/opt/spark`

# **5. Give Yourself Ownership of Spark Folder**

```bash
sudo chown -R $(whoami):$(whoami) /opt/spark
```

### Why this is necessary

- `/opt/spark` belongs to root
- You want to run Spark without sudo
- This command gives you full control over the folder

---

# **6. Add Spark + Hadoop Variables to `.bashrc`**

Edit your `.bashrc`:

```bash
nano ~/.bashrc
```

Add these lines at the bottom:

```bash
# Spark Setup
export SPARK_HOME=/opt/spark
export PATH=$PATH:$SPARK_HOME/bin

# Hadoop Config (required for HDFS access)
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
```

### Explanation

- `SPARK_HOME` tells Linux where Spark is installed
- Adding Spark’s `bin` folder to `PATH` allows running:
    - `spark-shell`
    - `pyspark`
    - `spark-submit`
- `HADOOP_CONF_DIR` is critical
    - Spark uses Hadoop’s config files to access HDFS and YARN
    - Without it, Spark cannot read `hdfs:///` paths

Reload `.bashrc`:

```bash
source ~/.bashrc
```

# **7. Validate Spark Installation**

Check version:

```bash
spark-shell --version
```

If Spark prints version → installation is correct.

# **8. Launch Spark Shell to Confirm It Starts**

```bash
spark-shell
```

If the interactive shell opens, Spark is successfully installed.

# **9. Test Spark ↔ HDFS connection**

Inside `spark-shell`:
- For Windows
```scala
val data = sc.textFile("hdfs:///data/data.csv")
data.take(5)
```

- For Mac
```scala
val data = sc.textFile("hdfs://localhost:9000/<foldername>/data.csv")
data.take(5)
# check the <foldername> using "hdfs dfs -ls /"
# you'll see something like "/nitish/data.csv" or "/data.csv"
```


If this prints lines from HDFS → Spark is now replacing MapReduce.