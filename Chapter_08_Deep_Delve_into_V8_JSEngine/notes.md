# How JavaScript Code Gets Executed in V8

## 1. JavaScript Code
- The source code written by the developer.

---

## 2. Parsing
The source code goes through the **parsing phase** to check correctness and prepare it for execution.

### a. Lexical Analysis
- The code is broken down into **tokens** (keywords, identifiers, operators, literals, etc.).

### b. Syntax Analysis
- Tokens are arranged into a **Syntax Tree (AST – Abstract Syntax Tree)**.
- Ensures the code follows JavaScript grammar rules.

### c. Semantic Analysis
- Checks the meaning of the code.
- Ensures variable declarations, type checks, and scope rules are valid.

---

## 3. Execution Pipeline

### a. Interpreter (Ignition Interpreter)
- Converts the AST into **Bytecode**.
- Quickly starts executing the code.

### b. Optimization
- While running, V8 monitors "hot code" (frequently executed code).

### c. TurboFan Compiler
- Optimizes the hot code into **highly optimized machine code** for faster execution.

---

## 4. Execution & Deoptimization
- Optimized code executes directly on the CPU.
- If assumptions made during optimization fail, V8 **deoptimizes** and falls back to the interpreter.

---

## Summary Flow

1. **JavaScript Code**  
2. **Parsing** → Lexical Analysis → Syntax Analysis → Semantic Analysis  
3. **Interpreter (Ignition)** → Generates Bytecode  
4. **Optimization** → TurboFan → Optimized Machine Code  
5. **Execution** → If needed → Deoptimization → Back to Interpreter



```mermaid
flowchart TD
    A[JavaScript Code] --> B[Parsing]
    B --> B1[Lexical Analysis<br/>(Tokens)]
    B --> B2[Syntax Analysis<br/>(AST)]
    B --> B3[Semantic Analysis<br/>(Checks meaning)]
    B --> C[Interpreter (Ignition)]
    C --> D[Bytecode]
    D --> E[Execution Starts]
    E --> F[Hot Code Detected?]
    F -->|Yes| G[TurboFan Compiler<br/>(Optimized Machine Code)]
    G --> H[Execution (Fast)]
    F -->|No| H
    H --> I{Optimization Fails?}
    I -->|Yes| C
    I -->|No| H

```