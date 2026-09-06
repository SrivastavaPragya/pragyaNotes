// DataBase Sharding
//
// Sharding horizontally partitions data across multiple database instances, with each shard
// holding a subset of the total dataset. Unlike replication where every node has all data,
// sharding distributes data so no single database becomes a bottleneck.
//
// Sharding partitions your dataset across multiple database instances using a deterministic
// routing strategy. Each shard is a fully functional database that stores only a portion of the
// total data, typically determined by a shard key—a field in your data model that determines
// which shard owns each record.
//
// How it works: Sharding operates at the application or middleware layer, not within the
// database itself. Your application code (or a proxy like Vitess or Citus) calculates which
// shard to query based on the shard key, routes the request to the appropriate database, and
// returns results. Each shard is just a normal PostgreSQL or MySQL instance that happens to store
// a subset of data. The complexity lives in the routing logic, shard key selection, and handling
// edge cases like cross-shard queries and resharding operations.
//
// When to Use (and When Not To)
// Use Sharding When:
// Your database has outgrown vertical scaling and you need to distribute write load across
// multiple databases. If you're hitting CPU, memory, or IOPS limits on the largest available
// instance, and read replicas don't help (because writes are the bottleneck), sharding is the
// solution. Instagram sharded at 25M users; Twitter sharded earlier due to write-heavy workloads.
