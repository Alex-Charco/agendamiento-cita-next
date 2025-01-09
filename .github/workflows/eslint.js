/*name: ESLint

on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]
  schedule:
    - cron: '15 10 * * 1'

jobs:
  eslint:
    name: Run eslint scanning
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write
      actions: read 
      
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install ESLint and SARIF Formatter
        run: |
          npm install eslint@latest
          npm install @microsoft/eslint-formatter-sarif@latest

      - name: Run ESLint
        env:
          SARIF_ESLINT_IGNORE_SUPPRESSED: "true"
        run: |
          npx eslint . --format @microsoft/eslint-formatter-sarif --output-file eslint-results.sarif
        continue-on-error: true

      - name: Check if SARIF file was created
        run: |
          if [ ! -f eslint-results.sarif ]; then 
            echo "Error: eslint-results.sarif not found!"
            exit 1
          fi

      - name: Upload analysis results to GitHub
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: eslint-results.sarif
          wait-for-processing: true
*/