# Hadoop & Apache Spark Installation Guide for macOS (Homebrew)

how to install and run:

* **Hadoop (HDFS + YARN)**
* **Apache Spark**
* **Passwordless SSH**
* **macOS-specific fixes (permissions, SSH, SIP issues)**
* **Common error solutions**

Works on:

* macOS Intel
* macOS Apple Silicon (M1/M2/M3)
* macOS ≥ Ventura/Sonoma/Sequoia

---

## 1. Install Dependencies

### Install Homebrew (if not installed)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Update Homebrew

```bash
brew update
```

---

## 2. Install Hadoop & Spark via Homebrew

### Install Java (Hadoop requires JDK 8 or 11)

```bash
brew install openjdk@17
```

### Set JAVA_HOME

```bash
echo 'export JAVA_HOME="$(brew --prefix openjdk@17)"' >> ~/.zshrc
source ~/.zshrc
```

### Install Hadoop & Spark

```bash
brew install hadoop
brew install apache-spark
```

### Check versions

```bash
hadoop version
spark-shell --version
```

---

## 3. Set Environment Variables

Open your shell config:

```bash
nano ~/.zshrc
```

Add:

```bash
export HADOOP_HOME=/opt/homebrew/opt/hadoop/libexec
export SPARK_HOME=/opt/homebrew/opt/apache-spark/libexec

export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$SPARK_HOME/bin
```

Apply:

```bash
source ~/.zshrc
```

**Save nano file on Mac:**
`Ctrl + O`, then **Enter**, then `Ctrl + X`.

---

## 4. Enable SSH Server (Required for Hadoop)

macOS blocks SSH by default; Hadoop needs it for local daemons.

Enable Remote Login:

```bash
sudo systemsetup -setremotelogin on
```

If macOS says **“Full Disk Access required”**, go to:

**System Settings → Privacy & Security → Full Disk Access → Enable Terminal**

Verify SSH:

```bash
sudo systemsetup -getremotelogin
```

Expected:

```
Remote Login: On
```

---

## 5. Create Passwordless SSH

Generate SSH keys:

```bash
ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
```

Add to authorized keys:

```bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

Test:

```bash
ssh localhost
ssh $(whoami)@$(hostname)
```

If it logs in without password, you're ready.

---

## 6. Fix Hadoop Directory Paths (macOS Issue)

macOS clears `/tmp`, causing Hadoop failures.

Create permanent storage dirs:

```bash
mkdir -p ~/hadoop/data/name
mkdir -p ~/hadoop/data/data
```

---

## 7. Configure Hadoop

### 7.1 **core-site.xml**

```bash
nano $HADOOP_HOME/etc/hadoop/core-site.xml
```

Add:

```xml
<configuration>
 <property>
  <name>fs.defaultFS</name>
  <value>hdfs://localhost:9000</value>
 </property>

 <property>
  <name>hadoop.tmp.dir</name>
  <value>/Users/<username>/hadoop</value>
 </property>
</configuration>
```

---

### 7.2 **hdfs-site.xml**

```bash
nano $HADOOP_HOME/etc/hadoop/hdfs-site.xml
```

Add:

```xml
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>1</value>
  </property>

  <property>
    <name>dfs.namenode.name.dir</name>
    <value>file:///Users/<your-username>/hadoop/data/name</value>
  </property>

  <property>
    <name>dfs.datanode.data.dir</name>
    <value>file:///Users/<your-username>/hadoop/data/data</value>
  </property>
</configuration>
```

Fix permissions:

```bash
sudo chmod -R 755 /Users/<username>/hadoop
```

---

### 7.3 **mapred-site.xml**

```bash
nano $HADOOP_HOME/etc/hadoop/mapred-site.xml
```

Add:

```xml
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>

  <property>
    <name>yarn.app.mapreduce.am.env</name>
    <value>HADOOP_MAPRED_HOME=/opt/homebrew/opt/hadoop/libexec</value>
  </property>

  <property>
    <name>mapreduce.map.env</name>
    <value>HADOOP_MAPRED_HOME=/opt/homebrew/opt/hadoop/libexec</value>
  </property>

  <property>
    <name>mapreduce.reduce.env</name>
    <value>HADOOP_MAPRED_HOME=/opt/homebrew/opt/hadoop/libexec</value>
  </property>
</configuration>
```

---

### 7.4 **yarn-site.xml**

```bash
nano $HADOOP_HOME/etc/hadoop/yarn-site.xml
```

Add:

```xml
<?xml version="1.0"?>
<configuration>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
</configuration>
```

---

## 8. Format NameNode

```bash
hdfs namenode -format
```

---

## 9. Start Hadoop Services

```bash
start-dfs.sh
start-yarn.sh
```

Check processes:

```bash
jps
```

Expected:

```
NameNode
DataNode
SecondaryNameNode
ResourceManager
NodeManager
Jps
```

---

## 10. Stop Hadoop Services

```bash
stop-dfs.sh
stop-yarn.sh
```

---

## 11. Hadoop Web Interfaces

| Service              | URL                                            |
| -------------------- | ---------------------------------------------- |
| NameNode UI          | [http://localhost:9870](http://localhost:9870) |
| DataNode UI          | [http://localhost:9864](http://localhost:9864) |
| YARN ResourceManager | [http://localhost:8088](http://localhost:8088) |

---

## 12. Test HDFS

```bash
hdfs dfs -mkdir /test
hdfs dfs -put ~/.zshrc /test
hdfs dfs -ls /test
hdfs dfs -cat /test/.zshrc | head -n 5
```

