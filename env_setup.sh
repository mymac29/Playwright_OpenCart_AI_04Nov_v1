#!/bin/bash

set -e

echo "=========================================="
echo " Environment Setup - Playwright + OpenCart"
echo "=========================================="

# Run this script from the project root (the folder containing package.json).
if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: Node.js is not installed or is not available in PATH."
  echo "Install Node.js, reopen Terminal, and run this script again."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "ERROR: npm is not installed or is not available in PATH."
  exit 1
fi

if [ ! -f "package.json" ]; then
  echo "ERROR: package.json was not found."
  echo "Open Terminal in your Playwright project root and run this script there."
  exit 1
fi

echo
echo "[1/7] Installing test data, environment variables, and date/time packages..."
npm install dotenv @faker-js/faker luxon

echo
echo "[2/7] Installing API / data validation packages..."
npm install ajv csv-parse xlsx

echo
echo "[3/7] Installing accessibility testing (WCAG)..."
npm install @axe-core/playwright

echo
echo "[4/7] Installing Allure reporting..."
npm install allure-playwright

echo
echo "[5/7] Installing Node.js TypeScript type definitions..."
npm install --save-dev @types/node

echo
echo "[6/7] Installing Playwright browser binaries..."
npx playwright install

echo
echo "[7/7] Installing MySQL DB validation / DML package..."
npm install mysql2

echo
echo "=========================================="
echo " Environment setup completed successfully!"
echo "=========================================="
