# Hadoop Via Docker

## 1. Prerequisites

1. **Install Docker:** Ensure you have **Docker Desktop** (or Docker Engine) installed and running on your system (Windows, Mac, or Linux).
2. **Install Docker Compose:** This usually comes bundled with Docker Desktop.

## 2. Use a Pre-built Docker Compose Stack (Recommended)

Instead of manually building a Dockerfile for each Hadoop service (NameNode, DataNode, etc.), you can use a ready-made setup from the community, like the widely used one from **Big Data Europe (BDE)** or the official Apache one.3

The BDE repository is a popular choice for quick cluster setup.4

### Step 2.1: Clone the Repository

Open your terminal and clone the repository that contains the `docker-compose.yml` file:5

Bash

`git clone https://github.com/big-data-europe/docker-hadoop.git`

`cd docker-hadoop`

### Step 2.2: Start the Cluster

Use the `docker-compose up` command.6 The `-d` flag runs the containers in the background (**detached** mode).7

Bash

`docker-compose up -d`

This command will:

1. Pull the required images (e.g., `bde2020/hadoop-namenode`, `bde2020/hadoop-datanode`).
2. Create a Docker network for the containers to communicate.
3. Start all the Hadoop services (usually **NameNode**, **DataNode**, **ResourceManager**, and **NodeManager**).

### Step 2.3: Verify the Cluster Status

Check that all services are running:

Bash

`docker ps`

You should see multiple containers listed, typically including `namenode`, `datanode`, `resourcemanager`, and `nodemanager`.

### Step 2.4: Access the Web UIs (GUIs)

You can check the health of your cluster by accessing the web interfaces:8

| **Service** | **Default Local URL** |
| --- | --- |
| **NameNode (HDFS UI)** | `http://localhost:9870` |
| **ResourceManager (YARN UI)** | `http://localhost:8088` |

### Step 2.5: Run Commands (Enter the NameNode)

To interact with HDFS, you typically execute commands inside the **`namenode`** container:

Bash

```jsx
# Enter the NameNode container's bash shell
docker exec -it namenode bash
```

From inside the container, you can run standard Hadoop commands:

Bash

```jsx
# Create a directory in HDFS
hdfs dfs -mkdir /user/test

# List the contents of the root directory
hdfs dfs -ls /

# Exit the container
exit
```

---

## 3. Stopping and Cleaning Up 🧹

When you are done with the cluster, stop and remove the containers and network using the same `docker-compose.yml` file:

Bash

```jsx
# Stop and remove all containers, networks, and volumes defined in the file
docker-compose down
```
