# HDFS Overview

HDFS is the storage layer of Hadoop.
Its job is simple to say, but massive to implement:

Store huge datasets reliably across many machines,
and let processing frameworks (MapReduce, Spark, Hive) read/write efficiently.

# **1. Why HDFS Exists**

Traditional local filesystems (ext4, NTFS) are not made for:

- Very large files (GB–TB)
- Distributed clusters
- Automatic replication
- Streaming large files for analytics

A single machine = single point of failure.

If that machine dies, your data dies.

HDFS solves that by:

- Splitting files into blocks
- Storing blocks across many machines
- Keeping replicas automatically
- Recovering from failures automatically

This is why Big Data systems use HDFS.

# **2. HDFS Architecture Overview**

Very simple to visualize:

```mermaid
graph TD
    A[NameNode<br/>Master Server] --> B[DataNode 1]
    A --> C[DataNode 2]
    A --> D[DataNode 3]
    
    style A fill:#ff9999,stroke:#333,stroke-width:3px
    style B fill:#99ccff,stroke:#333,stroke-width:2px
    style C fill:#99ccff,stroke:#333,stroke-width:2px
    style D fill:#99ccff,stroke:#333,stroke-width:2px
```

## **NameNode**

- Stores **metadata** (not actual data)
- File names, permissions, block locations
- Keeps mapping:
    
    `/movies/moviesdata.jsonl → block1 on DN1, block2 on DN3, block3 on DN2`
    

## **DataNode**

- Stores the **actual data blocks**
- Sends heartbeat to NameNode
- Sends block reports regularly

# **3. How HDFS Stores Files Internally (Blocks)**

This is the core of HDFS.

### **Default block size**:

128 MB (older versions had 64MB)

When you upload a file:

```
Suppose file size = 350MB
Block size = 128MB
```

HDFS breaks it like this:

```
Block 1 = 128 MB
Block 2 = 128 MB
Block 3 = 94 MB
```

Blocks are distributed across DataNodes.

HDFS never stores the entire file on a single machine.

That’s why large datasets become manageable.

# **4. Replication (Fault Tolerance)**

Default replication factor = **3**

Meaning each block is stored 3 times on 3 different DataNodes.

So:

```
Block 1 → DN1, DN2, DN3
Block 2 → DN3, DN4, DN1
Block 3 → DN2, DN4, DN5
```

If one DataNode goes down, you still have two copies.

NameNode constantly ensures replication.

If a block replica is lost, NameNode automatically creates a new replica somewhere else.

# **5. Write Pipeline (How data enters HDFS)**

This is important for deep understanding.

### When you run:

```
hdfs dfs -put file.txt /movies/
```

Process:

1. Client asks NameNode: "I want to write a file."
2. NameNode replies with:
    
    "Here are 3 DataNodes for the first block."
    
3. Client sends block data to DataNode 1.
4. DataNode 1 streams it to DataNode 2.
5. DataNode 2 streams it to DataNode 3.
6. DataNode 3 sends acknowledgment back up the chain.
7. Client asks for next block location.

So data flows like a pipeline:

```
Client → DN1 → DN2 → DN3
```

This is extremely efficient.

# **6. Read Pipeline (How HDFS returns data)**

When you run:

```
hdfs dfs -cat /movies/file.txt
```

Process:

1. Client asks NameNode: "Where are the blocks?"
2. NameNode sends list of block locations.
3. Client picks the nearest DataNode.
4. Reads block1, block2, block3 sequentially.
5. Reconstructs file on the client side.

NameNode does NOT supply data.

Only DataNodes do.

That’s why NameNode is light and DataNodes handle heavy IO.

# **7. NameNode Internals (Very important)**

NameNode stores:

### **1. File system namespace**

- Directory structure
- File names
- Permissions

### **2. Block map**

Mapping of blockID → DataNode list

### **3. Two critical files:**

- **fsimage** (checkpointed metadata snapshot)
- **edits** (log of recent filesystem operations)

Combined, these define the entire HDFS namespace.

### **NameNode memory**

Metadata is held in RAM for speed.

This is why NameNode needs high memory.

---

# **8. DataNode Internals**

DataNodes store actual data in block form inside:

```
dfs.data.dir
```

Each block is a file on Linux filesystem.

DataNode sends 2 kinds of information regularly:

### **1. Heartbeats** (every 3 seconds)

"Yes, I'm alive."

### **2. Block reports**

"What blocks I have."

If DataNode stops sending heartbeat for 10 minutes:

- NameNode marks it as dead
- Re-replicates blocks elsewhere

# **9. Block Placement Strategy**

HDFS places replicas intelligently:

### Replication factor = 3

Usual placement:

1. One replica on local rack
2. One on a different rack
3. One on same rack as the second

This avoids data loss even if an entire rack fails.

# **10. Heartbeats**

Heartbeat = health signal.

If heartbeat missing:

- DataNode declared dead
- Blocks on it are considered lost
- NameNode replicates from remaining copies

# **11. Rack Awareness**

Hadoop cluster has racks of machines.

HDFS knows which DataNode is in which rack.

Goal:

- Avoid putting all replicas in the same rack
- Reduce network traffic
- Improve fault tolerance

Rack awareness is critical in large clusters.

# **12. HDFS Commands in Context**

Commands you use daily interact with NameNode and DataNode.

Example:

### Create directory

```
hdfs dfs -mkdir /movies
```

NameNode updates namespace.

### Upload file

```
hdfs dfs -put file.jsonl /movies
```

NameNode tells DataNodes where to store blocks.

### Check block locations

```
hdfs fsck /movies/file.jsonl -files -blocks -locations
```

NameNode returns block metadata.

# **13. HDFS vs Linux Filesystem**

| Feature | Linux FS | HDFS |
| --- | --- | --- |
| Use case | Local storage | Distributed big data storage |
| File size | MB–GB | GB–TB–PB |
| Fault tolerance | No | Yes (replication) |
| Data blocks | No | Yes |
| Single machine | Yes | No |
| Append | Limited | Supported |
| Streaming large reads | Not optimized | Optimized |

HDFS is **not** a replacement for Linux FS.

You use HDFS for analytics datasets, not OS files.