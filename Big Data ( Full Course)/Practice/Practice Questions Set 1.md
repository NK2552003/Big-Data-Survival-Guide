# Practice Questions Set 1

## For You To Think

- **If your single backend server crashes, your entire application crashes. Why do big companies never rely on one server, and why do beginners still start with one?**
- **Why can one computer not handle 1 TB of data efficiently, but 10 weak computers working together can? Explain the fundamental concept behind this.**
- **If a database can store millions of records, why do companies still need Hadoop, Spark, NoSQL, caching, and distributed storage systems?**
- **What actually happens internally when millions of users open the same website at the same time? Why doesn’t the server explode, and what architecture handles this?**
- **If microservices are so powerful, why do almost all startups begin with monoliths? What does this tell you about business vs engineering?**
- **Why does scaling a backend become useless if the database cannot scale? What makes databases the real bottleneck in large systems?**
- **Why is analyzing data more valuable than collecting it? What does a company lose when it only collects data but never analyzes it?**
- **Why does MapReduce break huge files into small chunks and send these chunks to different machines? Why not just load the full file on one strong machine?**
- **Why do companies track every click, scroll, search, and button press on a website? What is the real business reason behind collecting this data?**
- **Why is distributed architecture not just a technical choice but a necessity for any company serving millions of users? What problem does it solve that cannot be solved by a single powerful machine?**

# Big Data

1. Why can’t traditional databases handle Big Data? Explain the core limitations.
2. What does “Volume, Velocity, Variety” actually change for developers and companies?
3. If storage is cheap now, why do companies still worry about “big data scaling”?
4. What is the difference between “big data” and “large files”?
5. Is Big Data always useful? Give scenarios where collecting too much data harms business.
6. How do organizations decide which data to store and which to ignore?
7. Why is parallel processing important for modern data?
8. What happens if big data is collected but never analyzed?
9. Can Big Data exist without cloud platforms?
10. How does data governance become harder as data size increases?

# Hadoop

1. Why was Hadoop created when databases and servers already existed?
2. Why does Hadoop use HDFS instead of normal file systems like NTFS/ext4?
3. Explain why Hadoop prefers “moving computation to data” instead of moving data to computation.
4. Why does HDFS use replication (3 copies by default)?
5. Why doesn’t Hadoop allow random writes easily?
6. What problem does YARN solve that old Hadoop (MRv1) failed at?
7. Why can a cheap cluster of machines perform better than one expensive machine in Hadoop?
8. Why is NameNode a single point of failure? How does this impact cluster design?
9. Why do companies still teach Hadoop even though Spark is popular?
10. What makes MapReduce slow compared to in-memory engines?

# MapReduce

1. Why does MapReduce require data to be in key-value format?
2. Why is the Shuffle phase considered the costliest step of MapReduce?
3. Why do mappers and reducers run on different machines?
4. Why can’t reducers start before some mappers finish?
5. Why does MapReduce write intermediate results to disk instead of RAM?
6. How does MapReduce achieve fault tolerance during job execution?
7. Why is WordCount the best example to learn MapReduce fundamentals?
8. If MapReduce is slow, why do some companies still use it today?
9. Can MapReduce work well for real-time data? Why or why not?
10. Why does MapReduce fit batch processing but not interactive analytics?

# Distributed Systems

1. Why do companies move from single-machine systems to distributed architectures?
2. What problem does “horizontal scaling” solve that “vertical scaling” cannot?
3. Why do distributed systems face problems like network latency and partition failures?
4. What does CAP theorem imply about every distributed system?
5. Why can adding more servers sometimes reduce performance?
6. Why is data consistency harder in distributed systems?
7. Why is fault tolerance a critical design goal in modern architecture?
8. Why are distributed systems harder to debug than monoliths?
9. What problems arise when you store the same data across multiple machines?
10. Why does communication overhead matter more than CPU power?

# Monolith Architecture

1. Why did monolith architecture become the standard for early web applications?
2. What problems appear when a monolith grows very large?
3. Why do monoliths become harder to deploy over time?
4. Can a monolith be scalable? Under what conditions?
5. Why do companies rewrite old monolith systems instead of patching them?
6. What risks exist when breaking a monolith into microservices?
7. Why is a monolith simpler for beginners to understand?
8. When is a monolith better than microservices?

# Microservices

1. Why do microservices improve developer productivity at scale?
2. Why does communication between microservices become a challenge?
3. What makes debugging microservices harder than debugging monoliths?
4. Why do microservices require central monitoring and logging systems?
5. Why do microservices need API gateways?
6. What problems appear if microservices share the same database?
7. Why do microservices require strict boundaries for responsibilities?
8. When should a small startup avoid microservices?

# Scaling

1. What is the fundamental difference between vertical and horizontal scaling?
2. Why is horizontal scaling more common for modern web apps?
3. Why does caching improve system performance drastically?
4. Why does a load balancer make systems more reliable?
5. Why is distribution of load more important than raw server power?
6. Is scaling always technical? Can business-level scaling be an issue too?
7. Why does database scaling become the bottleneck before backend scaling?
8. Why is replication not equal to scalability?
9. What role does CDN play in scaling?
10. Why can't we scale infinitely even with cloud infrastructure?

# Big Data & Data Analytics

1. Why is big data meaningless without analytics?
2. How does analytics convert raw data into decision-making power?
3. Why is visualization important in big data analytics?
4. Why do analytics engines need data in structured or semi-structured form?
5. Why is preprocessing a major part of any data analytics workflow?
6. Why do data scientists need distributed storage to work effectively?
7. Why do companies use predictive analytics on top of big data?
8. How does the size of data affect algorithm choice?
9. Why is data sampling sometimes necessary in big-data analytics?
10. Why are SQL engines being redesigned to work on Big Data?

# Big Data & Web Development

1. Why must modern web applications be designed with big-data production in mind?
2. How do user actions in web apps generate big data?
3. Why do frontend interactions matter for analytics pipelines?
4. Why do backend developers need to understand log data structures?
5. What role do APIs play in generating or transporting analytics data?
6. Why do large web apps store user event data separately from main databases?
7. How does caching impact data collection and analytics accuracy?
8. Why are distributed systems required for high-traffic web apps?
9. How do analytics dashboards depend on big data technologies?
10. Why must web developers understand eventual consistency in large systems?