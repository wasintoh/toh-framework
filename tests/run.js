/**
 * In-band test runner.
 *
 * Why not `node --test tests/`? Node's default test isolation spawns each
 * test file as a child process that reports over an IPC channel. On Node 24
 * that channel is intermittently corrupted by this repo's dependency stack
 * ("Unable to deserialize cloned data due to invalid or unsupported
 * version") even though every test passes when run in-band. Importing the
 * test files here runs node:test in-process — deterministic on Node >= 18,
 * and the process exit code still reflects failures.
 */

import './codex.test.js';
