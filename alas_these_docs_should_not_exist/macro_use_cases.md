# macro use cases: when and how are macros useful?

this document catalogs realistic macro use cases that could bring genuine value to production systems. each example demonstrates a specific pattern where macros excel at eliminating boilerplate, improving performance, or enabling domain-specific abstractions.

## implementation status checklist

use this index to track how our language currently supports these powerful patterns:

### performance optimizations
- [ ] logger guards for expensive operations
  - [ ] builtin support - [ ] userspace support
- [ ] memoization patterns  
  - [ ] builtin support - [ ] userspace support

### code generation and serialization
- [ ] automatic serializers and deserializers
  - [ ] builtin support - [ ] userspace support  
- [ ] sql query builders
  - [ ] builtin support - [ ] userspace support

### boilerplate reduction
- [ ] property accessors and builders
  - [ ] builtin support - [ ] userspace support
- [ ] visitor pattern implementation
  - [ ] builtin support - [ ] userspace support

### domain-specific languages  
- [ ] html templating
  - [ ] builtin support - [ ] userspace support
- [ ] configuration dsls
  - [ ] builtin support - [ ] userspace support

### control flow abstractions
- [ ] retry logic with backoff
  - [ ] builtin support - [ ] userspace support
- [ ] transaction patterns
  - [ ] builtin support - [ ] userspace support

### memory management and resource handling
- [ ] raii patterns (resource acquisition is initialization)
  - [ ] builtin support - [ ] userspace support
- [ ] custom allocators and memory pools
  - [ ] builtin support - [ ] userspace support

### api patterns and middleware
- [ ] decorators and middleware composition
  - [ ] builtin support - [ ] userspace support
- [ ] api client generation
  - [ ] builtin support - [ ] userspace support

### data structure manipulation
- [ ] lens and optics for deep updates
  - [ ] builtin support - [ ] userspace support
- [ ] pattern matching and destructuring
  - [ ] builtin support - [ ] userspace support

### error handling patterns
- [ ] result and option chaining
  - [ ] builtin support - [ ] userspace support
- [ ] error context and debugging
  - [ ] builtin support - [ ] userspace support

### testing utilities
- [ ] property-based testing
  - [ ] builtin support - [ ] userspace support
- [ ] mock generation
  - [ ] builtin support - [ ] userspace support

### domain-specific optimizations
- [ ] the "check if visited, mark if not" pattern
  - [ ] builtin support - [ ] userspace support
- [ ] state machine generation
  - [ ] builtin support - [ ] userspace support

## performance optimizations

### logger guards for expensive operations

**problem:** logging frameworks often evaluate expensive string interpolations even when the log level is disabled, causing unnecessary performance overhead.

**without macros:**
```python
# Python - the expensive operation runs even if debug is disabled
logger.debug(f"Processing user {user.id} with complex data: {expensive_computation(user)}")

# manual guard - verbose and error-prone
if logger.is_debug_enabled():
    logger.debug(f"Processing user {user.id} with complex data: {expensive_computation(user)}")
```

**with macros:**
```rust
// Rust - the expensive computation only runs if debug logging is enabled
debug!("Processing user {} with complex data: {}", user.id, expensive_computation(user));

// expands to something like:
if log_enabled!(log::Level::Debug) {
    log::debug(&format!("Processing user {} with complex data: {}", user.id, expensive_computation(user)));
}
```

**value:** eliminates performance overhead in production while keeping debug code readable and maintainable.

### memoization patterns

**problem:** repeatedly computing expensive functions with the same inputs wastes cycles.

**without macros:**
```python
# manual memoization - repetitive and error-prone
_fibonacci_cache = {}
def fibonacci(n):
    if n in _fibonacci_cache:
        return _fibonacci_cache[n]
    result = fibonacci(n-1) + fibonacci(n-2) if n > 1 else n
    _fibonacci_cache[n] = result
    return result
```

**with macros:**
```nim
# Nim - memoize macro automatically adds caching
import macros, tables

macro memoize(procDef: untyped): untyped =
  # extract procedure name and parameters
  let procName = procDef[0]
  let params = procDef[3]
  let body = procDef[6]
  
  # generate cache variable name
  let cacheName = ident($procName & "Cache")
  
  result = quote do:
    var `cacheName` = initTable[typeof(`params`[1][1]), typeof((`body`))]()
    
    proc `procName`(`params`[1][1]: `params`[1][2]): auto =
      if `params`[1][1] in `cacheName`:
        return `cacheName`[`params`[1][1]]
      
      let result = block:
        `body`
      `cacheName`[`params`[1][1]] = result
      return result

# usage:
memoize:
  proc fibonacci(n: int): int =
    if n <= 1: n
    else: fibonacci(n-1) + fibonacci(n-2)

# expands to create cache table and lookup logic automatically
```

**value:** automatic optimization without cluttering the core algorithm logic.

## code generation and serialization

### automatic serializers and deserializers

**problem:** hand-writing serialization code for every data structure is tedious and error-prone.

**without macros:**
```java
// Java - manual serialization boilerplate
public class User {
    private String name;
    private int age;
    private List<String> emails;
    
    public JSONObject toJson() {
        JSONObject json = new JSONObject();
        json.put("name", this.name);
        json.put("age", this.age);
        json.put("emails", this.emails);
        return json;
    }
    
    public static User fromJson(JSONObject json) {
        User user = new User();
        user.name = json.getString("name");
        user.age = json.getInt("age");
        user.emails = json.getJSONArray("emails").toList();
        return user;
    }
}
```

**with macros:**
```rust
// Rust - derive macro automatically generates serialization code
#[derive(Serialize, Deserialize)]
struct User {
    name: String,
    age: u32,
    emails: Vec<String>,
}

// usage is now trivial:
let json_str = serde_json::to_string(&user)?;
let user: User = serde_json::from_str(&json_str)?;
```

**value:** eliminates hundreds of lines of boilerplate while ensuring consistency and reducing bugs.

### sql query builders

**problem:** building dynamic SQL queries safely without injection vulnerabilities.

**without macros:**
```python
# Python - manual query building is verbose and unsafe
def find_users(name=None, age_min=None, age_max=None):
    query = "SELECT * FROM users WHERE 1=1"
    params = []
    
    if name is not None:
        query += " AND name LIKE ?"
        params.append(f"%{name}%")
    
    if age_min is not None:
        query += " AND age >= ?"
        params.append(age_min)
        
    if age_max is not None:
        query += " AND age <= ?"
        params.append(age_max)
    
    return execute_query(query, params)
```

**with macros:**
```nim
# Nim - SQL DSL macro with compile-time query building
import macros, strutils

macro sql(tableName: untyped, clauses: varargs[untyped]): untyped =
  var query = "SELECT * FROM " & $tableName
  var hasWhere = false
  
  for clause in clauses:
    case $clause[0]:
      of "where":
        if not hasWhere:
          query.add(" WHERE ")
          hasWhere = true
        query.add($clause[1])
      of "orderBy":
        query.add(" ORDER BY " & $clause[1])
      of "limit":
        query.add(" LIMIT " & $clause[1])
  
  result = quote do:
    executeQuery(`query`)

# usage becomes declarative and type-safe:
sql(users, 
    where("name LIKE ? AND age BETWEEN ? AND ?"),
    orderBy("created_at DESC"),
    limit("10"))
```

**value:** type-safe query building with compile-time validation and injection protection.

## boilerplate reduction

### property accessors and builders

**problem:** creating getters, setters, and builder patterns requires massive amounts of repetitive code.

**without macros:**
```java
// Java - verbose property boilerplate
public class Person {
    private String firstName;
    private String lastName;
    private int age;
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    
    public static class Builder {
        private String firstName;
        private String lastName;
        private int age;
        
        public Builder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }
        
        public Builder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }
        
        public Builder age(int age) {
            this.age = age;
            return this;
        }
        
        public Person build() {
            Person person = new Person();
            person.firstName = this.firstName;
            person.lastName = this.lastName;
            person.age = this.age;
            return person;
        }
    }
}
```

**with macros:**
```rust
// Rust - derive macros eliminate the boilerplate
use getters::Getters;
use typed_builder::TypedBuilder;

#[derive(Getters, TypedBuilder)]
pub struct Person {
    #[getter(copy)]
    first_name: String,
    #[getter(copy)]
    last_name: String,
    #[getter(copy)]
    age: i32,
}

// usage:
let person = Person::builder()
    .first_name("John".to_string())
    .last_name("Doe".to_string())
    .age(30)
    .build();
```

**value:** reduces 50+ lines of boilerplate to 3 derive annotations while maintaining type safety.

### visitor pattern implementation

**problem:** implementing the visitor pattern requires repetitive dispatch code for every visitable type.

**without macros:**
```java
// Java - manual visitor pattern implementation
interface Visitor {
    void visit(NumberNode node);
    void visit(StringNode node);
    void visit(BinaryOpNode node);
}

abstract class ASTNode {
    abstract void accept(Visitor visitor);
}

class NumberNode extends ASTNode {
    int value;
    void accept(Visitor visitor) { visitor.visit(this); }
}

class StringNode extends ASTNode {
    String value;
    void accept(Visitor visitor) { visitor.visit(this); }
}

class BinaryOpNode extends ASTNode {
    ASTNode left, right;
    String operator;
    void accept(Visitor visitor) { visitor.visit(this); }
}
```

**with macros:**
```rust
// Rust - procedural macro generates visitor pattern automatically
use visitor_derive::Visitable;

#[derive(Visitable)]
enum ASTNode {
    Number { value: i32 },
    String { value: String }, 
    BinaryOp { left: Box<ASTNode>, right: Box<ASTNode>, operator: String },
}

// expands to generate:
// trait Visitor<T> {
//     fn visit_number(&mut self, node: &NumberNode) -> T;
//     fn visit_string(&mut self, node: &StringNode) -> T;
//     fn visit_binary_op(&mut self, node: &BinaryOpNode) -> T;
// }
//
// impl ASTNode {
//     fn accept<T>(&self, visitor: &mut dyn Visitor<T>) -> T {
//         match self {
//             ASTNode::Number { value } => visitor.visit_number(value),
//             ASTNode::String { value } => visitor.visit_string(value),
//             ASTNode::BinaryOp { left, right, operator } => 
//                 visitor.visit_binary_op(left, right, operator),
//         }
//     }
// }

// usage:
struct PrintVisitor;
impl Visitor<String> for PrintVisitor {
    fn visit_number(&mut self, value: &i32) -> String { value.to_string() }
    fn visit_string(&mut self, value: &String) -> String { format!("\"{}\"", value) }
    fn visit_binary_op(&mut self, left: &Box<ASTNode>, right: &Box<ASTNode>, op: &String) -> String {
        format!("({} {} {})", left.accept(self), op, right.accept(self))
    }
}
```

**value:** generates entire visitor hierarchies from declarative specifications.

## domain-specific languages

### html templating

**problem:** generating HTML safely while maintaining readability and avoiding injection attacks.

**without macros:**
```python
# Python - manual HTML generation is verbose and unsafe
def render_user_profile(user, posts):
    html = "<div class='profile'>"
    html += f"<h1>{escape_html(user.name)}</h1>"
    html += f"<p>Age: {escape_html(str(user.age))}</p>"
    html += "<div class='posts'>"
    for post in posts:
        html += "<article>"
        html += f"<h2>{escape_html(post.title)}</h2>"
        html += f"<p>{escape_html(post.content)}</p>"
        html += "</article>"
    html += "</div>"
    html += "</div>"
    return html
```

**with macros:**
```nim
# Nim - HTML DSL macro with automatic escaping
import macros, htmlgen, strutils

macro html(body: untyped): untyped =
  proc processNode(node: NimNode): NimNode =
    case node.kind:
      of nnkCall:
        # handle tag calls like div(class="profile"): ...
        let tagName = $node[0]
        var attrs = ""
        var children = newSeq[NimNode]()
        
        for i in 1..<node.len:
          if node[i].kind == nnkExprEqExpr:
            # attribute assignment
            attrs.add(&" {$node[i][0]}=\"{$node[i][1]}\""")
          else:
            # child content
            children.add(processNode(node[i]))
        
        result = quote do:
          result.add("<" & `tagName` & `attrs` & ">")
          `children`
          result.add("</" & `tagName` & ">")
      
      of nnkStrLit:
        result = quote do:
          result.add(escapeHtml(`node`))
      
      else:
        result = node
    
    result
  
  let processedBody = processNode(body)
  
  result = quote do:
    var result = ""
    `processedBody`
    result

# usage:
let userProfile = html:
  div(class="profile"):
    h1: user.name
    p: "Age: " & $user.age 
    div(class="posts"):
      for post in posts:
        article:
          h2: post.title
          p: post.content

# generates type-safe HTML with automatic escaping
```

**value:** type-safe HTML generation with automatic escaping and readable structure.

### configuration dsls

**problem:** configuration files need validation, type checking, and complex default value logic.

**without macros:**
```python
# Python - manual configuration parsing
class DatabaseConfig:
    def __init__(self, raw_config):
        self.host = raw_config.get('host', 'localhost')
        self.port = int(raw_config.get('port', 5432))
        self.database = raw_config['database']  # required
        self.username = raw_config['username']  # required
        self.password = raw_config.get('password', '')
        self.ssl_mode = raw_config.get('ssl_mode', 'require')
        
        # validation
        if self.port < 1 or self.port > 65535:
            raise ValueError("Port must be between 1 and 65535")
        if self.ssl_mode not in ['require', 'prefer', 'disable']:
            raise ValueError("Invalid SSL mode")
```

**with macros:**
```rust
// Rust - config macro with validation and defaults
use config_derive::Config;

#[derive(Config)]
pub struct DatabaseConfig {
    #[config(default = "localhost")]
    host: String,
    
    #[config(default = 5432, validate = "port_range")]
    port: u16,
    
    #[config(required)]
    database: String,
    
    #[config(required)]
    username: String,
    
    #[config(default = "", env = "DB_PASSWORD")]
    password: String,
    
    #[config(default = "require", validate = "ssl_mode_valid")]
    ssl_mode: String,
}

// usage:
let config = DatabaseConfig::from_file("database.toml")?;
```

**value:** declarative configuration with automatic parsing, validation, and environment variable support.

## control flow abstractions

### retry logic with backoff

**problem:** implementing retry logic with exponential backoff is complex and error-prone.

**without macros:**
```python
# Python - manual retry implementation
import time
import random

def call_api_with_retry(func, *args, **kwargs):
    max_retries = 5
    base_delay = 1.0
    max_delay = 60.0
    
    for attempt in range(max_retries + 1):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            if attempt == max_retries:
                raise e
            
            delay = min(base_delay * (2 ** attempt), max_delay)
            jitter = delay * 0.1 * random.random()
            time.sleep(delay + jitter)
```

**with macros:**
```nim
# Nim - retry macro with configurable strategy
import macros, random, times

macro withRetry(maxRetries: int, baseDelay: float, maxDelay: float, 
                jitter: bool, body: untyped): untyped =
  result = quote do:
    block retryBlock:
      for attempt in 0..`maxRetries`:
        try:
          break retryBlock:
            `body`
        except Exception as e:
          if attempt == `maxRetries`:
            raise e
          
          var delay = min(`baseDelay` * pow(2.0, float(attempt)), `maxDelay`)
          when `jitter`:
            delay += delay * 0.1 * rand(1.0)
          
          sleep(int(delay * 1000))

# usage:
withRetry(5, 1.0, 60.0, true):
  callExternalApi(userId)
```

**value:** reusable retry logic with customizable backoff strategies.

### transaction patterns

**problem:** ensuring database transactions are properly committed or rolled back.

**without macros:**
```python
# Python - manual transaction handling
def transfer_money(from_account, to_account, amount):
    conn = get_connection()
    try:
        conn.begin()
        
        # check sufficient funds
        from_balance = get_balance(conn, from_account)
        if from_balance < amount:
            raise InsufficientFundsError()
        
        # perform transfer
        update_balance(conn, from_account, from_balance - amount)
        update_balance(conn, to_account, get_balance(conn, to_account) + amount)
        
        # log transaction
        log_transaction(conn, from_account, to_account, amount)
        
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()
```

**with macros:**
```nim
# Nim - transaction macro with automatic rollback
import macros

macro withTransaction(connVar: untyped, body: untyped): untyped =
  result = quote do:
    let `connVar` = getConnection()
    try:
      beginTransaction(`connVar`)
      let transactionResult = block:
        `body`
      commitTransaction(`connVar`)
      transactionResult
    except Exception as e:
      try:
        rollbackTransaction(`connVar`)
      except:
        discard  # ignore rollback errors
      raise e
    finally:
      try:
        closeConnection(`connVar`)
      except:
        discard  # ignore close errors

# usage:
withTransaction(conn):
  let fromBalance = getBalance(conn, fromAccount)
  if fromBalance < amount:
    raise newException(InsufficientFundsError, "Not enough funds")
  updateBalance(conn, fromAccount, fromBalance - amount)
  updateBalance(conn, toAccount, getBalance(conn, toAccount) + amount)
  logTransaction(conn, fromAccount, toAccount, amount)
```

**value:** automatic resource management with guaranteed cleanup.

## memory management and resource handling

### raii patterns (resource acquisition is initialization)

**problem:** ensuring resources are properly cleaned up even when exceptions occur.

**note:** while Python has context managers (`with` statements) and Java has try-with-resources, these approaches have limitations:
- context managers require explicit `with` blocks for each resource
- try-with-resources only works with `AutoCloseable` interfaces  
- both require runtime overhead for resource tracking
- async contexts complicate resource management significantly

macros can provide zero-cost abstractions that work across sync/async boundaries and multiple resource types.

**without macros:**
```cpp
// C++ - manual resource management
void process_file(const std::string& filename) {
    FILE* file = fopen(filename.c_str(), "r");
    if (!file) {
        throw std::runtime_error("Cannot open file");
    }
    
    char* buffer = malloc(1024);
    if (!buffer) {
        fclose(file);
        throw std::runtime_error("Cannot allocate buffer");
    }
    
    try {
        // process file with buffer
        size_t bytes_read = fread(buffer, 1, 1024, file);
        process_data(buffer, bytes_read);
    } catch (...) {
        free(buffer);
        fclose(file);
        throw;
    }
    
    free(buffer);
    fclose(file);
}
```

**with macros:**
```rust
// Rust - RAII with automatic cleanup (Drop trait)
use std::fs::File;
use std::io::Read;

fn process_file(filename: &str) -> Result<(), Box<dyn std::error::Error>> {
    let mut file = File::open(filename)?;  // automatically closed when dropped
    let mut buffer = Vec::with_capacity(1024);  // automatically freed when dropped
    
    file.read_to_end(&mut buffer)?;
    process_data(&buffer)?;
    
    Ok(())
    // file and buffer automatically cleaned up here
}

// or with a custom RAII macro:
macro_rules! with_resources {
    ($($name:ident: $init:expr),* => $body:block) => {
        $(let $name = $init;)*
        let _result = $body;
        // cleanup happens automatically through Drop
        _result
    };
}
```

**value:** guaranteed resource cleanup without explicit error handling code.

### custom allocators and memory pools

**problem:** frequent allocation/deallocation causes performance overhead and fragmentation.

**with macros:**
```rust
// Rust - arena allocator macro
// NOTE: this must be a macro because it needs compile-time type information
// ($type:ty) to generate the correct Layout and pointer casting at compile time.
// A function cannot inspect or manipulate types - only macros can expand
// based on type parameters and generate type-specific code.
macro_rules! arena_allocate {
    ($arena:expr, $count:expr, $type:ty) => {
        {
            let layout = std::alloc::Layout::array::<$type>($count).unwrap();
            let ptr = $arena.allocate(layout).unwrap().as_ptr() as *mut $type;
            std::slice::from_raw_parts_mut(ptr, $count)
        }
    };
}

// usage:
let arena = Arena::new();
let numbers = arena_allocate!(arena, 1000, i32);
let strings = arena_allocate!(arena, 500, String);
// all memory freed when arena is dropped
```

**value:** high-performance memory management with automatic cleanup.

## api patterns and middleware

### decorators and middleware composition

**problem:** cross-cutting concerns like authentication, logging, and caching require repetitive code.

**without macros:**
```python
# Python - manual decorator application
def authenticate_user(func):
    def wrapper(*args, **kwargs):
        if not current_user.is_authenticated:
            raise UnauthorizedException()
        return func(*args, **kwargs)
    return wrapper

def log_api_call(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            logger.info(f"API call {func.__name__} succeeded in {time.time() - start_time:.2f}s")
            return result
        except Exception as e:
            logger.error(f"API call {func.__name__} failed in {time.time() - start_time:.2f}s: {e}")
            raise
    return wrapper

def cache_result(ttl_seconds):
    def decorator(func):
        def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{hash(args)}:{hash(frozenset(kwargs.items()))}"
            cached = cache.get(cache_key)
            if cached:
                return cached
            result = func(*args, **kwargs)
            cache.set(cache_key, result, ttl_seconds)
            return result
        return wrapper
    return decorator

# applying multiple decorators is verbose
@authenticate_user
@log_api_call
@cache_result(300)
def get_user_profile(user_id):
    return expensive_profile_computation(user_id)
```

**with macros:**
```rust
// Rust - procedural macro for middleware composition
use api_macros::api_endpoint;

#[api_endpoint(auth = "required", cache = "300s", log = "true")]
fn get_user_profile(user_id: u64) -> UserProfile {
    expensive_profile_computation(user_id)
}

// expands to something like:
fn get_user_profile_inner(user_id: u64) -> UserProfile {
    expensive_profile_computation(user_id)
}

fn get_user_profile(user_id: u64) -> Result<UserProfile, ApiError> {
    // authentication middleware (equivalent to Python's authenticate_user)
    if !current_user().is_authenticated() {
        return Err(ApiError::Unauthorized);
    }
    
    // caching middleware  
    let cache_key = format!("get_user_profile:{}", user_id);
    if let Some(cached) = cache.get(&cache_key) {
        return Ok(cached);
    }
    
    // logging middleware
    let start = std::time::Instant::now();
    let result = match get_user_profile_inner(user_id) {
        Ok(profile) => {
            log::info!("API call get_user_profile succeeded in {:?}", start.elapsed());
            Ok(profile)
        }
        Err(e) => {
            log::error!("API call get_user_profile failed in {:?}: {}", start.elapsed(), e);
            Err(e)
        }
    };
    
    // cache successful results
    if let Ok(ref profile) = result {
        cache.set(cache_key, profile.clone(), Duration::from_secs(300));
    }
    
    result
}
```

**note:** while Python decorators can be combined (`@auth @log @cache`), this requires runtime function wrapping with performance overhead. the macro approach generates the middleware composition at compile time, eliminating runtime indirection.

**value:** declarative middleware composition with compile-time validation.

### api client generation

**problem:** writing HTTP client code for REST APIs is repetitive and error-prone.

**without macros:**
```java
// Java - manual API client implementation (feel the pain!)
public class GitHubApiClient {
    private final String baseUrl;
    private final String token;
    private final HttpClient httpClient;
    
    public GitHubApiClient(String token) {
        this.baseUrl = "https://api.github.com";
        this.token = token;
        this.httpClient = HttpClient.newHttpClient();
    }
    
    public User getUser(String username) throws ApiException {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/users/" + username))
                .header("Authorization", "Bearer " + token)
                .header("Accept", "application/vnd.github.v3+json")
                .GET()
                .build();
                
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() >= 400) {
                throw new ApiException("HTTP " + response.statusCode() + ": " + response.body());
            }
            
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(response.body(), User.class);
        } catch (IOException | InterruptedException e) {
            throw new ApiException("Request failed", e);
        }
    }
    
    public Issue createIssue(String owner, String repo, CreateIssue issueData) throws ApiException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonBody = mapper.writeValueAsString(issueData);
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/repos/" + owner + "/" + repo + "/issues"))
                .header("Authorization", "Bearer " + token)
                .header("Accept", "application/vnd.github.v3+json")
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();
                
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() >= 400) {
                throw new ApiException("HTTP " + response.statusCode() + ": " + response.body());
            }
            
            return mapper.readValue(response.body(), Issue.class);
        } catch (IOException | InterruptedException e) {
            throw new ApiException("Request failed", e);
        }
    }
    
    // ... hundreds more methods for each API endpoint
    // ... each with the same repetitive error handling, serialization, headers, etc.
}
```

**with macros:**
```rust
// Rust - generate API client from OpenAPI spec
use api_gen::generate_client;

generate_client! {
    name: "GitHubApi",
    spec: "github-api.yaml",
    base_url: "https://api.github.com",
}

// generates methods like:
// async fn get_user(&self, username: &str) -> Result<User, ApiError>
// async fn create_issue(&self, owner: &str, repo: &str, issue: CreateIssue) -> Result<Issue, ApiError>

// usage:
let client = GitHubApi::new("token")?;
let user = client.get_user("octocat").await?;
let issue = client.create_issue("owner", "repo", CreateIssue { title: "Bug".into(), body: None }).await?;
```

**value:** type-safe API clients generated from specifications.

## data structure manipulation

### lens and optics for deep updates

**problem:** updating nested immutable data structures requires verbose and error-prone code.

**without macros:**
```rust
// Rust - manual deep updates
#[derive(Clone)]
struct Address {
    street: String,
    city: String,
    zip: String,
}

#[derive(Clone)]
struct Person {
    name: String,
    address: Address,
}

#[derive(Clone)]
struct Company {
    name: String,
    employees: Vec<Person>,
}

// updating deeply nested data
fn update_employee_zip(company: Company, employee_index: usize, new_zip: String) -> Company {
    let mut new_company = company.clone();
    new_company.employees[employee_index].address.zip = new_zip;
    new_company
}
```

**with macros:**
```haskell
-- Haskell - lens macro for deep updates
{-# LANGUAGE TemplateHaskell #-}
import Control.Lens

data Address = Address
  { _street :: String
  , _city :: String  
  , _zip :: String
  } deriving (Show)

data Person = Person
  { _name :: String
  , _address :: Address
  } deriving (Show)

data Company = Company
  { _companyName :: String
  , _employees :: [Person]
  } deriving (Show)

-- generate lenses automatically
makeLenses ''Address
makeLenses ''Person  
makeLenses ''Company

-- usage is now clean and composable:
updateEmployeeZip :: Company -> Int -> String -> Company
updateEmployeeZip company idx newZip = 
  company & employees . ix idx . address . zip .~ newZip
```

**value:** clean, composable deep updates without manual tree traversal.

### pattern matching and destructuring

**problem:** extracting values from complex data structures requires repetitive checks and casts.

**without macros:**
```java
// Java - manual pattern matching
public String processJson(JsonNode node) {
    if (node.isObject()) {
        JsonNode typeNode = node.get("type");
        if (typeNode != null && typeNode.isTextual()) {
            String type = typeNode.asText();
            switch (type) {
                case "user":
                    JsonNode nameNode = node.get("name");
                    if (nameNode != null && nameNode.isTextual()) {
                        return "User: " + nameNode.asText();
                    }
                    break;
                case "product":
                    JsonNode priceNode = node.get("price");
                    if (priceNode != null && priceNode.isNumber()) {
                        return "Product: $" + priceNode.asDouble();
                    }
                    break;
            }
        }
    }
    return "Unknown";
}
```

**with macros:**
```rust
// Rust - pattern matching with serde and match
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
#[serde(tag = "type")]
enum JsonData {
    #[serde(rename = "user")]
    User { name: String },
    #[serde(rename = "product")]  
    Product { price: f64 },
}

fn process_json(data: JsonData) -> String {
    match data {
        JsonData::User { name } => format!("User: {}", name),
        JsonData::Product { price } => format!("Product: ${}", price),
    }
}
```

**value:** exhaustive pattern matching with compile-time validation.

## error handling patterns

### result and option chaining

**problem:** handling multiple fallible operations leads to nested error checking.

**without macros:**
```rust
// Rust - manual error handling
fn process_user_data(user_id: u64) -> Result<String, Error> {
    let user = match get_user(user_id) {
        Ok(u) => u,
        Err(e) => return Err(e),
    };
    
    let profile = match get_profile(user.profile_id) {
        Ok(p) => p,
        Err(e) => return Err(e),
    };
    
    let preferences = match get_preferences(user.id) {
        Ok(prefs) => prefs,
        Err(e) => return Err(e),
    };
    
    Ok(format_user_summary(user, profile, preferences))
}
```

**with macros:**
```rust
// Rust - ? operator (which is essentially a macro)
fn process_user_data(user_id: u64) -> Result<String, Error> {
    let user = get_user(user_id)?;
    let profile = get_profile(user.profile_id)?;
    let preferences = get_preferences(user.id)?;
    
    Ok(format_user_summary(user, profile, preferences))
}

// or with custom error handling macros:
macro_rules! try_all {
    ($($expr:expr),+ => $success:expr) => {
        {
            $(let $expr = $expr?;)+
            $success
        }
    };
}

// usage:
try_all! {
    user = get_user(user_id),
    profile = get_profile(user.profile_id),
    preferences = get_preferences(user.id)
    => format_user_summary(user, profile, preferences)
}
```

**value:** clean error propagation without repetitive match statements.

### error context and debugging

**problem:** errors deep in call stacks lose important context about what operation was being performed.

**with macros:**
```rust
// Rust - context macro for error enrichment
macro_rules! with_context {
    ($context:expr, $body:expr) => {
        $body.with_context(|| $context)
    };
}

fn process_file(path: &Path) -> Result<Vec<Record>, anyhow::Error> {
    let content = with_context!(
        format!("Failed to read file: {}", path.display()),
        std::fs::read_to_string(path)
    )?;
    
    let records = with_context!(
        format!("Failed to parse CSV from file: {}", path.display()),
        parse_csv(&content)
    )?;
    
    Ok(records)
}
```

**value:** rich error messages without cluttering business logic.

## testing utilities

### property-based testing

**problem:** writing comprehensive tests requires thinking of many edge cases manually.

**with macros:**
```rust
// Rust - quickcheck property testing
use quickcheck_macros::quickcheck;

#[quickcheck]
fn prop_reverse_twice_is_identity(xs: Vec<i32>) -> bool {
    let reversed_twice: Vec<i32> = xs.iter().cloned().rev().rev().collect();
    xs == reversed_twice
}

#[quickcheck] 
fn prop_sort_is_idempotent(mut xs: Vec<i32>) -> bool {
    xs.sort();
    let first_sort = xs.clone();
    xs.sort();
    first_sort == xs
}

// generates hundreds of test cases automatically
```

**value:** finds edge cases that manual testing would miss.

### mock generation

**problem:** creating mocks for testing requires repetitive implementation of interfaces.

**with macros:**
```rust
// Rust - mockall derive macro
use mockall::automock;

#[automock]
trait UserRepository {
    async fn get_user(&self, id: u64) -> Result<User, Error>;
    async fn save_user(&self, user: &User) -> Result<(), Error>;
    async fn delete_user(&self, id: u64) -> Result<(), Error>;
}

// the macro generates a complete MockUserRepository struct with:
// - all trait methods implemented to record calls and return configured values
// - expect_* methods for setting up call expectations (expect_get_user, expect_save_user, etc.)  
// - with() methods for parameter matching
// - returning() methods for configuring return values
// - times() methods for call count verification
// - automatic verification that all expectations were met

// usage in tests:
#[tokio::test]
async fn test_user_service() {
    let mut mock_repo = MockUserRepository::new();
    mock_repo
        .expect_get_user()
        .with(eq(123))
        .returning(|_| Ok(User { id: 123, name: "Test".into() }));
    
    let service = UserService::new(Box::new(mock_repo));
    let user = service.get_user(123).await.unwrap();
    assert_eq!(user.name, "Test");
}
```

**value:** automatic mock generation with type-safe expectations.

## domain-specific optimizations

### the "check if visited, mark if not" pattern

**problem:** this pattern appears frequently in graph algorithms and memoization.

**without macros:**
```python
# Python - manual visited checking (from the language's own tests)
visited = set()

def process_node(node):
    if node.id in visited:
        return
    visited.add(node.id)
    
    # actual processing...
    for child in node.children:
        process_node(child)
```

**with a macro:**
```nim
# Nim - visited macro that combines check and mark
import macros, sets

macro withVisitedCheck(item: untyped, visitedSet: untyped, body: untyped): untyped =
  result = quote do:
    if `item` notin `visitedSet`:
      `visitedSet`.incl(`item`)
      `body`

# usage:
proc processNode(node: Node, visited: var HashSet[int]) =
  withVisitedCheck(node.id, visited):
    # actual processing happens only if not visited
    for child in node.children:
      processNode(child, visited)
```

**value:** eliminates a common source of bugs in graph traversal algorithms.

### state machine generation

**problem:** implementing state machines requires verbose switch statements and state validation.

**with macros:**
```rust
// Rust - state machine macro
use state_machine_macro::state_machine;

state_machine! {
    ConnectionState {
        Disconnected => {
            connect() -> Connecting,
        },
        Connecting => {
            connected() -> Connected,
            failed() -> Disconnected,
            timeout() -> Disconnected,
        },
        Connected => {
            disconnect() -> Disconnecting,
            error() -> Disconnected,
        },
        Disconnecting => {
            disconnected() -> Disconnected,
        },
    }
}

// generates enum, state transition methods, and validation
```

**value:** compile-time verification of state machine correctness.

## conclusion

macros excel in scenarios where:

1. **boilerplate elimination** - repetitive patterns that can be abstracted
2. **domain-specific languages** - specialized syntax for particular problem domains  
3. **compile-time computation** - generating code based on static analysis
4. **cross-cutting concerns** - aspects that span multiple parts of a system
5. **performance optimization** - avoiding runtime overhead through compile-time decisions
6. **type safety enforcement** - catching errors at compile time rather than runtime

the key insight is that macros should solve **real problems** that developers face repeatedly, not just provide syntactic sugar. each example above addresses a genuine pain point in production software development.

the most valuable macros are those that:
- eliminate entire classes of bugs (null pointer exceptions, resource leaks)
- reduce cognitive load (complex nested error handling becomes linear)
- enable domain experts to work in their natural vocabulary (sql, html, etc.)
- provide performance benefits without sacrificing readability
- scale complexity management (what works for 10 fields works for 1000)

**avoid macros when:**
- simple functions would suffice
- the abstraction is used only once or twice
- debugging becomes significantly harder
- the macro system cannot express the required logic cleanly

macros are tools for creating better programming languages within existing languages. use them to eliminate the distance between the problem domain and the solution domain.