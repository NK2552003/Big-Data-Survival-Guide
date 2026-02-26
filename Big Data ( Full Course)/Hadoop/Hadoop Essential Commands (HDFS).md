# Hadoop Essential Commands (HDFS)

Core HDFS + Basic Hadoop Usage)

# 1. Understanding Command Structure

Every HDFS command starts with:

```
hdfs dfs -<command> <arguments>
```

Example:

```
hdfs dfs -ls /
```

If you remember that, you already know the pattern.

# 2. Directory Commands

These are the first commands any new Hadoop student must know.

### Create a directory

```
hdfs dfs -mkdir /foldername
```

### Create directory with parent folders

```
hdfs dfs -mkdir -p /movies/raw
```

### List files and folders

```
hdfs dfs -ls /
```

### List recursively

```
hdfs dfs -ls -R /
```

# 3. Uploading and Downloading Files

This is the most used set of commands.

### Upload file from local filesystem to HDFS

```
hdfs dfs -put localfile.txt /movies/
```

### Upload and overwrite if already exists

```
hdfs dfs -put -f localfile.txt /movies/
```

### Copy local file to HDFS (alternative)

```
hdfs dfs -copyFromLocal file.txt /movies/
```

### Move local file to HDFS

```
hdfs dfs -moveFromLocal file.txt /movies/
```

### Download a file from HDFS to local

```
hdfs dfs -get /movies/moviesdata.jsonl .
```

# 4. Viewing Files Stored in HDFS

Beginners must know how to see data inside HDFS.

### Print file content

```
hdfs dfs -cat /movies/moviesdata.jsonl
```

### Show first lines of file

```
hdfs dfs -head /movies/moviesdata.jsonl
```

### Show last lines of file

```
hdfs dfs -tail /movies/moviesdata.jsonl
```

### Pipe into `more` for page-by-page view

```
hdfs dfs -cat /movies/moviesdata.jsonl | more
```

# 5. Copy, Move, Delete Files in HDFS

Basic file management commands.

### Copy file inside HDFS

```
hdfs dfs -cp /movies/file1.txt /backup/file1.txt
```

### Move file inside HDFS

```
hdfs dfs -mv /movies/file1.txt /archive/
```

### Delete a file

```
hdfs dfs -rm /movies/file1.txt
```

### Delete directory with all files

```
hdfs dfs -rm -r /movies
```

# 6. File and Storage Information Commands

Helps students understand file sizes, block info, etc.

### Check size of a file or directory

```
hdfs dfs -du -h /movies
```

### Check free and used space in HDFS

```
hdfs dfs -df -h /
```

### Check block details of a file

```
hdfs fsck /movies/moviesdata.jsonl -files -blocks -locations
```

This shows block size, number of blocks, and which DataNode stores each block.

# 7. Starting and Stopping Hadoop Services

Beginners always get confused here. Keep this section simple.

### Start HDFS daemons (NameNode + DataNode)

```
start-dfs.sh
```

### Start YARN daemons (ResourceManager + NodeManager)

```
start-yarn.sh
```

### Stop HDFS

```
stop-dfs.sh
```

### Stop YARN

```
stop-yarn.sh
```

# 8. Checking Hadoop Components

### Hadoop version

```
hadoop version
```

### Report DataNode storage and cluster health

```
hdfs dfsadmin -report
```

This shows:

- Total capacity
- Used space
- Free space
- Connected DataNodes

# 9. Running a Hadoop MapReduce Job

### Running a MapReduce jar

```
hadoop jar myjob.jar MainClass /input /output
```

### Running a Hadoop Streaming job (Python)

```
hadoop jar $HADOOP_HOME/share/hadoop/tools/lib/hadoop-streaming-*.jar \
  -input /movies/moviesdata.jsonl \
  -output /movies/output \
  -mapper mapper.py \
  -reducer reducer.py \
  -file mapper.py \
  -file reducer.py
```

# 10. Helpful Shortcuts

### Delete output directory before rerunning job

```
hdfs dfs -rm -r /movies/output
```

### Touch a new empty file

```
hdfs dfs -touchz /movies/empty.txt
```

### Check file permissions

```
hdfs dfs -chmod 755 /movies
```