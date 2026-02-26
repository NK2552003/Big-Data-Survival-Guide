# MapReduce Mini Practice

## STEP 1 — Check the file exists in HDFS

```jsx
hdfs dfs -ls /data/data.csv
```

If it shows the file → perfect.

## STEP 2 — Delete old output if it exists

(Hadoop NEVER overwrites output folder)

```jsx
hdfs dfs -rm -r /data/output_wc
```

If folder doesn’t exist, ignore the warning.

## STEP 3 — Confirm where your Hadoop lives

You have Hadoop installed under `/home/hadoop/hadoop`. That’s the value we will use for `HADOOP_MAPRED_HOME`.

Check the path is correct:

```jsx
ls -ld /home/hadoop/hadoop
ls -l /home/hadoop/hadoop/share/hadoop/mapreduce
```

- For Mac
```
ls -ld /opt/homebrew/Cellar/hadoop/3.4.2
ls -l /opt/homebrew/Cellar/hadoop/3.4.2/libexec/share/hadoop/mapreduce

#if this doesn't work then change the path "/opt/homebrew/opt/hadoop/libexec/share/hadoop/mapreduce/" as given in inverted commas and run it again
```

You should see the mapreduce jars (you already do: hadoop-mapreduce-examples-3.4.2.jar etc).

## STEP 4 - Edit mapred-site.xml to set HADOOP_MAPRED_HOME and framework to YARN

Open (or create if missing) the file:
- For windows
```jsx
nano /home/hadoop/hadoop/etc/hadoop/mapred-site.xml
```

Replace `/home/hadoop/hadoop` below with your Hadoop root if different. Add these properties inside `<configuration>...</configuration>`:

```jsx
<property>
  <name>mapreduce.framework.name</name>
  <value>yarn</value>
</property>

<property>
  <name>yarn.app.mapreduce.am.env</name>
  <value>HADOOP_MAPRED_HOME=/home/hadoop/hadoop</value>
</property>

<property>
  <name>mapreduce.map.env</name>
  <value>HADOOP_MAPRED_HOME=/home/hadoop/hadoop</value>
</property>

<property>
  <name>mapreduce.reduce.env</name>
  <value>HADOOP_MAPRED_HOME=/home/hadoop/hadoop</value>
</property>
```
- For Mac
`
You don't have to do this as we have configured this file in Hadoop_Installation(for Mac).md file earlier
`

Save file.

Notes:

- `mapreduce.framework.name = yarn` ensures MR runs on YARN (required).
- `yarn.app.mapreduce.am.env` tells YARN what environment to use for the AM (so it can find MR jars).
- `mapreduce.map.env` / `mapreduce.reduce.env` tell the map/reduce task containers where to find MR jars

## STEP 5 - Export HADOOP_MAPRED_HOME in hadoop-env

Edit `hadoop-env.sh` so daemons started on this node have the variable:
- For windows
```jsx
nano /home/hadoop/hadoop/etc/hadoop/hadoop-env.sh
```
- For Mac
```jsx
nano $HADOOP_HOME/etc/hadoop/hadoop-env.sh
```

Add near the top:

```jsx
export HADOOP_MAPRED_HOME=/opt/homebrew/opt/hadoop/libexec
export HADOOP_HOME=/opt/homebrew/opt/hadoop/libexec
```

## STEP 6 - Start Hadoop/YARN

```jsx
start-dfs.sh
start-yarn.sh
```

## STEP 7 - Run your WordCount job

- For Windows

```jsx
hadoop jar /home/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.4.2.jar wordcount /data/data.csv /data/output_wc
```
- For Mac

```jsx
hadoop jar /opt/homebrew/Cellar/hadoop/3.4.2/libexec/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.4.2.jar wordcount /data/data.csv /data/output_wc
```

## STEP 8 - View the WordCount output

```jsx
hdfs dfs -cat /data/output_wc/part-r-00000 | head
```

### Additional - If you want to remove the existing output

```jsx
hdfs dfs -rm -r /data/output_wc
```

# GREP

`grep` MapReduce searches for a **pattern** inside your CSV stored in HDFS.

### Find all lines containing "error”

- For Windows
```jsx
hdfs dfs -rm -r /data/grep_output
hadoop jar ~/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.4.2.jar grep /data/data.csv /data/grep_output "error"
```
- For Mac
```
hdfs dfs -rm -r /data/grep_output
hadoop jar /opt/homebrew/Cellar/hadoop/3.4.2/libexec/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.4.2.jar grep /data/data.csv /data/grep_output "error"
#if this doesn't work then change the path "/opt/homebrew/opt/hadoop/libexec/share/hadoop/mapreduce/" as given in inverted commas and run it again
```


### Output

```jsx
hdfs dfs -cat /data/grep_output/part-r-00000
```

### Example: Find "Harshit”

- For Windows
```jsx
hdfs dfs -rm -r /data/grep_output
hadoop jar ~/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.4.2.jar grep /data/data.csv /data/grep_output "Harshit"
```

- For Mac
```
hdfs dfs -rm -r /data/grep_output
hadoop jar /opt/homebrew/Cellar/hadoop/3.4.2/libexec/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.4.2.jar grep /data/data.csv /data/grep_output "Harshit"

#if this doesn't work then change the path "/opt/homebrew/opt/hadoop/libexec/share/hadoop/mapreduce/" as given in inverted commas and run it again
```
### Output

```jsx
hdfs dfs -cat /data/grep_output/part-r-00000
```