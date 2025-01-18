# React Re-render Examples

This project contains various examples demonstrating different approaches to managing re-renders in React applications. It showcases the use of React Context, Redux, and optimized context patterns to manage state and performance effectively.

## Table of Contents
- [Getting Started](#getting-started)
- [Examples](#examples)
- [Benefits and Drawbacks](#benefits-and-drawbacks)
- [Gotchas with Memoization](#gotchas-with-memoization)
- [Contributing](#contributing)

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/alexander-shch/React-Re-tender-Examples
cd React-Re-tender-Examples
npm install
```

Then, you can run the application:

```bash
npm start
```

## Examples

The following examples are included in this project:
1. **Context Example**: Demonstrates how context updates affect child components.
2. **Redux Example**: Shows how to manage state globally using Redux.
3. **Optimized Context Example**: An optimized version of context management.
4. **Form Context Example**: Demonstrates managing form state with optimized context.
5. **Props Example**: Illustrates how prop changes trigger re-renders.
6. **Memo Example**: Shows the use of `React.memo` to prevent unnecessary re-renders.
7. **Callback Example**: Demonstrates how `useCallback` affects re-renders of memoized components.

## Benefits and Drawbacks

Refer to the [examples_summary.md](src/examples_summary.md) for detailed benefits and drawbacks of each approach.

## Gotchas with Memoization

Refer to the [examples_summary.md](src/examples_summary.md) for common pitfalls and tips when using `React.memo` and `useCallback`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.
