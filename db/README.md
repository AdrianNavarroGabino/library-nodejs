<h1>Node.js and PostgreSQL</h1>
<h2>Library project</h2>

<h3>Database script</h3>

```sql
    create table books (
        id		integer primary key,
        name	varchar(255) not null,
        owned	bool default false
    );
```