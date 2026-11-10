// Optional binding retained for the starter's database helper; this Site has no D1 binding.
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
  }
}
