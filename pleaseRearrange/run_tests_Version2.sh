#!/usr/bin/env bash
set -euo pipefail
echo "=== run_tests.sh: Node.js project test runner ==="

if [ -f package.json ]; then
  if command -v npm >/dev/null 2>&1; then
    echo "Installing dependencies..."
    npm ci
    echo "Running tests..."
    npm test
    exit $?
  else
    echo "npm not found. Install Node.js to run tests."
    exit 2
  fi
fi

echo "No package.json found. Nothing to run."
exit 1