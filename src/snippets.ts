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
    id: 'js-short-4',
    language: 'JavaScript',
    length: 'short',
    name: 'uuidGen',
    code: `const uuid = () => Math.random().toString(36).substring(2, 15);`
  },
  {
    id: 'js-short-5',
    language: 'JavaScript',
    length: 'short',
    name: 'hexColor',
    code: `const randomHex = () => "#" + Math.floor(Math.random()*16777215).toString(16);`
  },
  {
    id: 'js-short-6',
    language: 'JavaScript',
    length: 'short',
    name: 'chunkArray',
    code: `const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));`
  },
  {
    id: 'js-short-7',
    language: 'JavaScript',
    length: 'short',
    name: 'delayTask',
    code: `const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));`
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
    id: 'js-mid-3',
    language: 'JavaScript',
    length: 'mid',
    name: 'throttle',
    code: `const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};`
  },
  {
    id: 'js-mid-4',
    language: 'JavaScript',
    length: 'mid',
    name: 'queryParams',
    code: `const getQueryParams = (url) => {
  const params = {};
  new URL(url).searchParams.forEach((val, key) => {
    params[key] = val;
  });
  return params;
};`
  },
  {
    id: 'js-mid-5',
    language: 'JavaScript',
    length: 'mid',
    name: 'pipeline',
    code: `const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const addOne = x => x + 1;
const double = x => x * 2;
const pipeline = pipe(addOne, double);`
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
  {
    id: 'js-long-3',
    language: 'JavaScript',
    length: 'long',
    name: 'flattenObject',
    code: `const flattenObject = (obj, prefix = '') => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};`
  },
  {
    id: 'js-long-4',
    language: 'JavaScript',
    length: 'long',
    name: 'diContainer',
    code: `class Container {
  constructor() {
    this.services = new Map();
  }
  register(name, definition) {
    this.services.set(name, definition);
  }
  get(name) {
    const service = this.services.get(name);
    if (typeof service === 'function' && service.toString().startsWith('class')) {
      return new service(this);
    }
    return service;
  }
}`
  },
  {
    id: 'js-long-5',
    language: 'JavaScript',
    length: 'long',
    name: 'webComponent',
    code: `class CustomButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const btn = document.createElement("button");
    btn.textContent = this.getAttribute("label") || "Click";
    btn.style.cssText = "background:#3b82f6;color:white;border:none;padding:8px 16px;border-radius:4px;";
    shadow.appendChild(btn);
  }
}
customElements.define("custom-btn", CustomButton);`
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
    id: 'ts-short-3',
    language: 'TypeScript',
    length: 'short',
    name: 'omitCustom',
    code: `type CustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;`
  },
  {
    id: 'ts-short-4',
    language: 'TypeScript',
    length: 'short',
    name: 'readonlyArray',
    code: `function freeze<T>(arr: T[]): readonly T[] {
  return Object.freeze([...arr]);
}`
  },
  {
    id: 'ts-short-5',
    language: 'TypeScript',
    length: 'short',
    name: 'promisify',
    code: `type Callback<T> = (err: Error | null, res?: T) => void;
type AsyncFn<T> = () => Promise<T>;`
  },
  {
    id: 'ts-short-6',
    language: 'TypeScript',
    length: 'short',
    name: 'extractRet',
    code: `type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;`
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
    id: 'ts-mid-3',
    language: 'TypeScript',
    length: 'mid',
    name: 'curryType',
    code: `type Curried<A, B, R> = (a: A) => (b: B) => R;
const addThree: Curried<number, number, number> = a => b => a + b;`
  },
  {
    id: 'ts-mid-4',
    language: 'TypeScript',
    length: 'mid',
    name: 'actionFactory',
    code: `interface Action<T, P> { type: T; payload: P }
function createAction<T extends string, P>(type: T, payload: P): Action<T, P> {
  return { type, payload };
}`
  },
  {
    id: 'ts-mid-5',
    language: 'TypeScript',
    length: 'mid',
    name: 'partialRecord',
    code: `type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
const roles: PartialRecord<'admin' | 'user' | 'dev', string> = { admin: 'Full Access' };`
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
  {
    id: 'ts-long-2',
    language: 'TypeScript',
    length: 'long',
    name: 'apiClient',
    code: `class BaseAPI {
  protected async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(\`/api\${endpoint}\`, options);
    if (!response.ok) {
      throw new Error(\`HTTP Error \${response.status}\`);
    }
    const data = await response.json();
    return data as T;
  }
}`
  },
  {
    id: 'ts-long-3',
    language: 'TypeScript',
    length: 'long',
    name: 'schemaValidator',
    code: `type Validator<T> = (value: unknown) => value is T;
class Schema<T> {
  constructor(private validate: Validator<T>) {}
  parse(data: unknown): T {
    if (this.validate(data)) return data;
    throw new Error("Invalid schema evaluation!");
  }
}`
  },
  {
    id: 'ts-long-4',
    language: 'TypeScript',
    length: 'long',
    name: 'mediatorPattern',
    code: `class Mediator<TEventMap extends Record<string, any>> {
  private handlers = new Map<keyof TEventMap, Set<(p: any) => void>>();
  on<K extends keyof TEventMap>(event: K, cb: (payload: TEventMap[K]) => void): void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(cb);
  }
  emit<K extends keyof TEventMap>(event: K, payload: TEventMap[K]): void {
    this.handlers.get(event)?.forEach(cb => cb(payload));
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
    id: 'html-short-3',
    language: 'HTML',
    length: 'short',
    name: 'flexRow',
    code: `<div class="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>`
  },
  {
    id: 'html-short-4',
    language: 'HTML',
    length: 'short',
    name: 'pictureTag',
    code: `<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="fallback.jpg" alt="Responsive Media" />
</picture>`
  },
  {
    id: 'html-short-5',
    language: 'HTML',
    length: 'short',
    name: 'datalist',
    code: `<input list="browsers" name="browser" />
<datalist id="browsers">
  <option value="Chrome" />
  <option value="Firefox" />
</datalist>`
  },
  {
    id: 'html-short-6',
    language: 'HTML',
    length: 'short',
    name: 'detailsAcc',
    code: `<details class="cursor-pointer">
  <summary class="font-bold">More info</summary>
  <p class="mt-2 text-zinc-400">Hidden drawer content here.</p>
</details>`
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
    id: 'html-mid-3',
    language: 'HTML',
    length: 'mid',
    name: 'bentoGrid',
    code: `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="col-span-2 bg-zinc-900 p-6 rounded-xl">Main Hero</div>
  <div class="bg-zinc-800 p-6 rounded-xl">Side Widget</div>
  <div class="bg-zinc-800 p-6 rounded-xl">Stats Block</div>
</div>`
  },
  {
    id: 'html-mid-4',
    language: 'HTML',
    length: 'mid',
    name: 'loginForm',
    code: `<fieldset class="border border-zinc-700 p-4 rounded-xl">
  <legend class="px-2 font-mono text-emerald-400">Auth</legend>
  <label class="block mb-2">Email</label>
  <input type="email" class="w-full bg-zinc-900 p-2 text-white" />
</fieldset>`
  },
  {
    id: 'html-mid-5',
    language: 'HTML',
    length: 'mid',
    name: 'svgCircle',
    code: `<svg class="w-12 h-12" viewBox="0 0 36 36">
  <circle cx="18" cy="18" r="16" fill="none" stroke="#27272a" stroke-width="2"/>
  <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="80 100"/>
</svg>`
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
  {
    id: 'html-long-2',
    language: 'HTML',
    length: 'long',
    name: 'pricingTable',
    code: `<div class="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
  <div class="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
    <h3 class="text-lg font-bold">Standard</h3>
    <span class="text-3xl font-extrabold mt-2">$29/mo</span>
    <ul class="space-y-2 text-zinc-400 mt-4 text-sm">
      <li>✓ Unlimited typing sessions</li>
      <li>✓ Global activity logging</li>
    </ul>
    <button class="w-full mt-6 bg-zinc-800 py-2 rounded font-semibold text-white">Subscribe</button>
  </div>
</div>`
  },
  {
    id: 'html-long-3',
    language: 'HTML',
    length: 'long',
    name: 'checkoutSequence',
    code: `<section class="p-6 bg-zinc-950 rounded-lg">
  <header class="flex justify-between border-b pb-4">
    <span class="font-bold">1. Shipping Info</span>
    <span class="text-emerald-500 font-mono">Completed ✓</span>
  </header>
  <main class="py-4 space-y-4">
    <div class="flex gap-4">
      <input type="text" placeholder="First Name" class="w-1/2 bg-zinc-900 duration-100 p-3 rounded text-white" />
      <input type="text" placeholder="Last Name" class="w-1/2 bg-zinc-900 duration-100 p-3 rounded text-white" />
    </div>
  </main>
</section>`
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
    id: 'java-short-3',
    language: 'Java',
    length: 'short',
    name: 'readNio',
    code: `List<String> lines = Files.readAllLines(Paths.get("test.txt"));`
  },
  {
    id: 'java-short-4',
    language: 'Java',
    length: 'short',
    name: 'streamSum',
    code: `int sum = numbers.stream().filter(n -> n % 2 == 0).mapToInt(Integer::intValue).sum();`
  },
  {
    id: 'java-short-5',
    language: 'Java',
    length: 'short',
    name: 'optionalCheck',
    code: `String result = Optional.ofNullable(maybeNull).orElse("Fallback String");`
  },
  {
    id: 'java-short-6',
    language: 'Java',
    length: 'short',
    name: 'arrayListInit',
    code: `List<String> list = new ArrayList<>(Arrays.asList("Dev", "Test"));`
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
    id: 'java-mid-3',
    language: 'Java',
    length: 'mid',
    name: 'atomicCounter',
    code: `public class Counter {
    private final AtomicInteger count = new AtomicInteger(0);
    public void increment() {
        count.incrementAndGet();
    }
    public int get() {
        return count.get();
    }
}`
  },
  {
    id: 'java-mid-4',
    language: 'Java',
    length: 'mid',
    name: 'tcpSocket',
    code: `try (ServerSocket server = new ServerSocket(8080)) {
    while (true) {
        try (Socket socket = server.accept()) {
            socket.getOutputStream().write("OK\\n".getBytes());
        }
    }
}`
  },
  {
    id: 'java-mid-5',
    language: 'Java',
    length: 'mid',
    name: 'builderPattern',
    code: `public class Request {
    private final String url;
    private Request(Builder builder) { this.url = builder.url; }
    public static class Builder {
        private String url;
        public Builder url(String url) { this.url = url; return this; }
        public Request build() { return new Request(this); }
    }
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
  {
    id: 'java-long-2',
    language: 'Java',
    length: 'long',
    name: 'reflectionParser',
    code: `public class ReflectionSerializer {
    public static String serialize(Object obj) throws Exception {
        StringBuilder sb = new StringBuilder("{");
        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field f : fields) {
            f.setAccessible(true);
            sb.append(String.format("\\"%s\\":\\"%s\\",", f.getName(), f.get(obj)));
        }
        if (fields.length > 0) sb.setLength(sb.length() - 1);
        return sb.append("}").toString();
    }
}`
  },
  {
    id: 'java-long-3',
    language: 'Java',
    length: 'long',
    name: 'producerConsumer',
    code: `public class Broker {
    private final BlockingQueue<String> queue = new ArrayBlockingQueue<>(10);
    public void produce(String msg) throws InterruptedException {
        queue.put(msg);
    }
    public String consume() throws InterruptedException {
        return queue.take();
    }
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
    id: 'rust-short-3',
    language: 'Rust',
    length: 'short',
    name: 'enumMatch',
    code: `enum Command { Quit, Move { x: i32, y: i32 } }
let cmd = Command::Quit;`
  },
  {
    id: 'rust-short-4',
    language: 'Rust',
    length: 'short',
    name: 'cliArgs',
    code: `let args: Vec<String> = std::env::args().collect();
let query = &args[1];`
  },
  {
    id: 'rust-short-5',
    language: 'Rust',
    length: 'short',
    name: 'stringCapacity',
    code: `let mut buffer = String::with_capacity(100);
buffer.push_str("rustacean");`
  },
  {
    id: 'rust-short-6',
    language: 'Rust',
    length: 'short',
    name: 'sliceArray',
    code: `let array = [1, 2, 3, 4, 5];
let slice = &array[1..3];`
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
    id: 'rust-mid-3',
    language: 'Rust',
    length: 'mid',
    name: 'iteratorFolding',
    code: `fn sum_squares(limit: u32) -> u32 {
    (1..limit)
        .filter(|&x| x % 2 == 0)
        .map(|x| x * x)
        .fold(0, |sum, i| sum + i)
}`
  },
  {
    id: 'rust-mid-4',
    language: 'Rust',
    length: 'mid',
    name: 'customErrors',
    code: `#[derive(Debug)]
enum NetError { Timeout, Offline }
impl std::fmt::Display for NetError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Network error occurred!")
    }
}`
  },
  {
    id: 'rust-mid-5',
    language: 'Rust',
    length: 'mid',
    name: 'genericLifetimes',
    code: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
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
  {
    id: 'rust-long-2',
    language: 'Rust',
    length: 'long',
    name: 'mutexArc',
    code: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }
    for handle in handles { handle.join().unwrap(); }
}`
  },
  {
    id: 'rust-long-3',
    language: 'Rust',
    length: 'long',
    name: 'asyncTokio',
    code: `use tokio::time::{sleep, Duration};

async fn send_payload() -> Result<&'static str, &'static str> {
    sleep(Duration::from_millis(150)).await;
    Ok("Delivery Success")
}

#[tokio::main]
async fn main() {
    match send_payload().await {
        Ok(v) => println!("Result: {}", v),
        Err(e) => eprintln!("Error: {}", e),
    }
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
    id: 'kotlin-short-3',
    language: 'Kotlin',
    length: 'short',
    name: 'smartCasts',
    code: `fun printLength(obj: Any) {
    if (obj is String) {
        println(obj.length)
    }
}`
  },
  {
    id: 'kotlin-short-4',
    language: 'Kotlin',
    length: 'short',
    name: 'stringTemplates',
    code: `val x = 10
val y = 20
println("Sum of $x and $y is \${x + y}")`
  },
  {
    id: 'kotlin-short-5',
    language: 'Kotlin',
    length: 'short',
    name: 'pairDestruct',
    code: `val (name, age) = Pair("Asaf", 25)
println("My name is $name and I am $age")`
  },
  {
    id: 'kotlin-short-6',
    language: 'Kotlin',
    length: 'short',
    name: 'applyScope',
    code: `val list = ArrayList<String>().apply {
    add("Kotlin")
    add("Rust")
}`
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
    id: 'kotlin-mid-3',
    language: 'Kotlin',
    length: 'mid',
    name: 'sealedInterfaces',
    code: `sealed interface UIState {
    object Loading : UIState
    data class Success(val data: List<String>) : UIState
    data class Error(val error: Throwable) : UIState
}`
  },
  {
    id: 'kotlin-mid-4',
    language: 'Kotlin',
    length: 'mid',
    name: 'observableDelegate',
    code: `class User {
    var name: String by Delegates.observable("<no name>") { prop, old, new ->
        println("$old -> $new")
    }
}`
  },
  {
    id: 'kotlin-mid-5',
    language: 'Kotlin',
    length: 'mid',
    name: 'flowProcessing',
    code: `fun logNumbers() = flow {
    for (i in 1..3) {
        delay(100)
        emit(i)
    }
}.map { it * 10 }`
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
  {
    id: 'kotlin-long-2',
    language: 'Kotlin',
    length: 'long',
    name: 'customDslBuilder',
    code: `class HTML {
    fun body() { println("Body building completed.") }
}
fun html(init: HTML.() -> Unit): HTML {
    val h = HTML()
    h.init()
    return h
}
fun main() {
    html {
        body()
    }
}`
  },
  {
    id: 'kotlin-long-3',
    language: 'Kotlin',
    length: 'long',
    name: 'androidScaffold',
    code: `@Composable
fun WelcomeScreen() {
    Scaffold(topBar = { TopAppBar(title = { Text("CodeTyper Dojo") }) }) { paddingValues ->
        Column(modifier = Modifier.padding(paddingValues)) {
            Text("Keep up the speed training!")
        }
    }
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
    id: 'zig-short-3',
    language: 'Zig',
    length: 'short',
    name: 'whileContinue',
    code: `var i: usize = 0;
while (i < 10) : (i += 1) {
    if (i == 5) continue;
}`
  },
  {
    id: 'zig-short-4',
    language: 'Zig',
    length: 'short',
    name: 'arrayIteration',
    code: `const arr = [_]i32{ 1, 2, 3, 4, 5 };
for (arr) |val| {
    _ = val;
}`
  },
  {
    id: 'zig-short-5',
    language: 'Zig',
    length: 'short',
    name: 'errorCatch',
    code: `const value = failingFunc() catch |err| {
    std.debug.print("Error: {}\\n", .{err});
    return;
};`
  },
  {
    id: 'zig-short-6',
    language: 'Zig',
    length: 'short',
    name: 'fixedArray',
    code: `var buffer: [256]u8 = undefined;
const slice = buffer[0..100];`
  },
  {
    id: 'zig-mid-1',
    language: 'Zig',
    length: 'mid',
    name: 'structDefinition',
    code: `const Point = struct {
    x: f32,
    y: f32,

    pub fn init(x: f32, y: f32) Point {
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
    id: 'zig-mid-3',
    language: 'Zig',
    length: 'mid',
    name: 'switchMatching',
    code: `const Color = enum { red, green, blue };
fn getHex(color: Color) u32 {
    return switch (color) {
        .red => 0xff0000,
        .green => 0x00ff00,
        .blue => 0x0000ff,
    };
}`
  },
  {
    id: 'zig-mid-4',
    language: 'Zig',
    length: 'mid',
    name: 'genericPoint',
    code: `fn PointOf(comptime T: type) type {
    return struct {
        x: T,
        y: T,
    };
}
const IntPoint = PointOf(i32);`
  },
  {
    id: 'zig-mid-5',
    language: 'Zig',
    length: 'mid',
    name: 'fileSystemOpen',
    code: `const std = @import("std");
fn readConfig() !void {
    var file = try std.fs.cwd().openFile("config.json", .{});
    defer file.close();
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
  },
  {
    id: 'zig-long-2',
    language: 'Zig',
    length: 'long',
    name: 'linkedList',
    code: `const Node = struct {
    value: i32,
    next: ?*Node = null,
};
pub fn append(allocator: std.mem.Allocator, list: *?*Node, val: i32) !void {
    const node = try allocator.create(Node);
    node.* = Node{ .value = val };
    if (list.*) |head| {
        var curr = head;
        while (curr.next) |next| { curr = next; }
        curr.next = node;
    } else {
        list.* = node;
    }
}`
  },
  {
    id: 'zig-long-3',
    language: 'Zig',
    length: 'long',
    name: 'hashingBuffer',
    code: `const std = @import("std");
const Sha256 = std.crypto.hash.sha2::Sha256;

fn hashMessage(msg: []const u8, out: *[32]u8) void {
    var hasher = Sha256.init(.{});
    hasher.update(msg);
    hasher.final(out);
}`
  }
];
