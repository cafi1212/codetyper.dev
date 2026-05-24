export interface Snippet {
  id: string;
  code: string;
  language: string;
  length: 'short' | 'mid' | 'long';
  name: string;
}

export const SNIPPETS: Snippet[] = [
  // ================= JAVASCRIPT =================
  {
    id: 'js-short-1',
    language: 'JavaScript',
    length: 'short',
    name: 'fetchData',
    code: `const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
};`
  },
  {
    id: 'js-short-2',
    language: 'JavaScript',
    length: 'short',
    name: 'sumAll',
    code: `const sum = (...args) => args.reduce((a, b) => a + b, 0);`
  },
  {
    id: 'js-short-3',
    language: 'JavaScript',
    length: 'short',
    name: 'isPristine',
    code: `const isPristine = (arr) => arr.every(item => item === null);`
  },
  {
    id: 'js-mid-1',
    language: 'JavaScript',
    length: 'mid',
    name: 'debounce',
    code: `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};`
  },
  {
    id: 'js-mid-2',
    language: 'JavaScript',
    length: 'mid',
    name: 'memoize',
    code: `const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};`
  },
  {
    id: 'js-long-1',
    language: 'JavaScript',
    length: 'long',
    name: 'deepClone',
    code: `const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj);
  
  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
};`
  },
  {
    id: 'js-long-2',
    language: 'JavaScript',
    length: 'long',
    name: 'eventEmitter',
    code: `class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, cb) {
    (this.events[name] ||= []).push(cb);
    return () => this.off(name, cb);
  }
  emit(name, ...args) {
    const list = this.events[name] || [];
    list.forEach(fn => fn(...args));
  }
  off(name, cb) {
    this.events[name] = (this.events[name] || []).filter(fn => fn !== cb);
  }
}`
  },

  // ================= TYPESCRIPT =================
  {
    id: 'ts-short-1',
    language: 'TypeScript',
    length: 'short',
    name: 'ResultInterface',
    code: `interface Result<T, E> {
  success: boolean;
  data?: T;
  error?: E;
}`
  },
  {
    id: 'ts-short-2',
    language: 'TypeScript',
    length: 'short',
    name: 'assertNever',
    code: `function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}`
  },
  {
    id: 'ts-mid-1',
    language: 'TypeScript',
    length: 'mid',
    name: 'useLocalStorage',
    code: `function useLocalStorage<T>(key: string, initialValue: T) {
  const [val, setVal] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  const updateValue = (newValue: T) => {
    setVal(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };
  return [val, updateValue] as const;
}`
  },
  {
    id: 'ts-mid-2',
    language: 'TypeScript',
    length: 'mid',
    name: 'typeGuards',
    code: `interface Admin { role: "admin"; rights: string[] }
interface Guest { role: "guest"; exp: number }
type User = Admin | Guest;

function isAdmin(user: User): user is Admin {
  return user.role === "admin";
}`
  },
  {
    id: 'ts-long-1',
    language: 'TypeScript',
    length: 'long',
    name: 'builderPattern',
    code: `class QueryBuilder<T extends object> {
  private query: Partial<T> = {};

  where<K extends keyof T>(key: K, value: T[K]): this {
    this.query[key] = value;
    return this;
  }

  limit(count: number): this {
    Object.assign(this.query, { limit: count });
    return this;
  }

  build(): Partial<T> {
    return { ...this.query };
  }
}`
  },

  // ================= HTML =================
  {
    id: 'html-short-1',
    language: 'HTML',
    length: 'short',
    name: 'metaTags',
    code: `<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
  },
  {
    id: 'html-short-2',
    language: 'HTML',
    length: 'short',
    name: 'srOnly',
    code: `<button class="sr-only">
  Skip to Main Content
</button>`
  },
  {
    id: 'html-mid-1',
    language: 'HTML',
    length: 'mid',
    name: 'cardLayout',
    code: `<div class="card bg-gray-900 rounded-lg p-6 shadow-md">
  <h2 class="text-xl font-semibold mb-2 text-white">Project Title</h2>
  <p class="text-gray-400 text-sm mb-4">A simple layout example.</p>
  <button class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
    Deploy Now
  </button>
</div>`
  },
  {
    id: 'html-mid-2',
    language: 'HTML',
    length: 'mid',
    name: 'navBar',
    code: `<nav class="flex items-center justify-between px-6 py-4 bg-zinc-950">
  <a href="/" class="text-lg font-bold text-emerald-500">Logo</a>
  <div class="flex space-x-4">
    <a href="/docs" class="text-zinc-300 hover:text-white">Docs</a>
    <a href="/api" class="text-zinc-300 hover:text-white">API</a>
  </div>
</nav>`
  },
  {
    id: 'html-long-1',
    language: 'HTML',
    length: 'long',
    name: 'contactForm',
    code: `<form class="max-w-md mx-auto space-y-6 bg-zinc-900 p-8 rounded-xl border border-zinc-800">
  <div>
    <label class="block text-sm font-medium text-zinc-300">Name</label>
    <input type="text" required class="w-full mt-1 p-2 bg-zinc-950 border border-zinc-700 rounded text-white" />
  </div>
  <div>
    <label class="block text-sm font-medium text-zinc-300">Email</label>
    <input type="email" required class="w-full mt-1 p-2 bg-zinc-950 border border-zinc-700 rounded text-white" />
  </div>
  <div>
    <label class="block text-sm font-medium text-zinc-300">Message</label>
    <textarea rows="4" class="w-full mt-1 p-2 bg-zinc-950 border border-zinc-700 rounded text-white"></textarea>
  </div>
  <button type="submit" class="w-full bg-emerald-600 py-3 rounded-lg text-white font-medium">Send Message</button>
</form>`
  },

  // ================= JAVA =================
  {
    id: 'java-short-1',
    language: 'Java',
    length: 'short',
    name: 'helloWorld',
    code: `System.out.println("Hello, World!");`
  },
  {
    id: 'java-short-2',
    language: 'Java',
    length: 'short',
    name: 'instanceVar',
    code: `private final Map<String, Integer> cache = new HashMap<>();`
  },
  {
    id: 'java-mid-1',
    language: 'Java',
    length: 'mid',
    name: 'singleton',
    code: `public class Database {
    private static Database instance;
    private Database() {}
    public static synchronized Database getInstance() {
        if (instance == null) {
            instance = new Database();
        }
        return instance;
    }
}`
  },
  {
    id: 'java-mid-2',
    language: 'Java',
    length: 'mid',
    name: 'binarySearch',
    code: `public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
  },
  {
    id: 'java-long-1',
    language: 'Java',
    length: 'long',
    name: 'userEntity',
    code: `@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    public User() {}
    
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}`
  },

  // ================= RUST =================
  {
    id: 'rust-short-1',
    language: 'Rust',
    length: 'short',
    name: 'letMatch',
    code: `let x = Some(5);
let y = x.unwrap_or(0);`
  },
  {
    id: 'rust-short-2',
    language: 'Rust',
    length: 'short',
    name: 'vecMacro',
    code: `let mut scores: Vec<i32> = vec![10, 20, 30];`
  },
  {
    id: 'rust-mid-1',
    language: 'Rust',
    length: 'mid',
    name: 'optionMatching',
    code: `fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}`
  },
  {
    id: 'rust-mid-2',
    language: 'Rust',
    length: 'mid',
    name: 'structImpl',
    code: `struct Rectangle { width: u32, height: u32 }
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}`
  },
  {
    id: 'rust-long-1',
    language: 'Rust',
    length: 'long',
    name: 'customResult',
    code: `use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();
    File::open("hello.txt")?.read_to_string(&mut username)?;
    Ok(username)
}

fn main() -> io::Result<()> {
    let user = read_username_from_file()?;
    println!("Logged in as: {}", user);
    Ok(())
}`
  },

  // ================= KOTLIN =================
  {
    id: 'kotlin-short-1',
    language: 'Kotlin',
    length: 'short',
    name: 'dataClass',
    code: `data class User(val id: Long, val email: String)`
  },
  {
    id: 'kotlin-short-2',
    language: 'Kotlin',
    length: 'short',
    name: 'nullSafety',
    code: `val name: String? = null
val length = name?.length ?: 0`
  },
  {
    id: 'kotlin-mid-1',
    language: 'Kotlin',
    length: 'mid',
    name: 'extensionFunc',
    code: `fun String.removeWhitespace(): String {
    return this.replace("\\s".toRegex(), "")
}

fun main() {
    println("Hello World".removeWhitespace())
}`
  },
  {
    id: 'kotlin-mid-2',
    language: 'Kotlin',
    length: 'mid',
    name: 'collectionsFilter',
    code: `val items = listOf("kotlin", "java", "zig", "rust")
val result = items
    .filter { it.startsWith("k") }
    .map { it.uppercase() }`
  },
  {
    id: 'kotlin-long-1',
    language: 'Kotlin',
    length: 'long',
    name: 'coroutineSum',
    code: `import kotlinx.coroutines.*

suspend fun fetchStockPrice(symbol: String): Double {
    delay(1000)
    return 145.20
}

fun main() = runBlocking {
    val price = async { fetchStockPrice("GOOG") }
    println("Stock price: \${price.await()}")
}`
  },

  // ================= ZIG =================
  {
    id: 'zig-short-1',
    language: 'Zig',
    length: 'short',
    name: 'helloWorld',
    code: `const std = @import("std");
pub fn main() void {
    std.debug.print("Hello, World!\\n", .{});
}`
  },
  {
    id: 'zig-short-2',
    language: 'Zig',
    length: 'short',
    name: 'constantVars',
    code: `const x: i32 = 42;
var y: u32 = 100;`
  },
  {
    id: 'zig-mid-1',
    language: 'Zig',
    length: 'mid',
    name: 'structDefinition',
    code: `const Point = struct {
    x: f32,
    y: f32,

    pub fun init(x: f32, y: f32) Point {
        return Point{ .x = x, .y = y };
    }
};`
  },
  {
    id: 'zig-mid-2',
    language: 'Zig',
    length: 'mid',
    name: 'tryErrorHandling',
    code: `const FileError = error{NotFound, AccessDenied};

fn openFile(path: []const u8) FileError!void {
    if (path.len == 0) return FileError.NotFound;
}`
  },
  {
    id: 'zig-long-1',
    language: 'Zig',
    length: 'long',
    name: 'memAllocator',
    code: `const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const list = try allocator.alloc(i32, 10);
    defer allocator.free(list);

    for (list, 0..) |*item, i| {
        item.* = @intCast(i);
    }
}`
  }
];
