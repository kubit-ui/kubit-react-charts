## Contributing to Kubit React Charts

We welcome contributions to **@kubit-ui-web/react-charts**! This project uses **[Changesets](https://github.com/changesets/changesets)** for automated version management and publishing. All contributions must be made through the fork workflow.

### Why Fork-Based Contributing?

This project follows the **fork-based contribution model** to:

- Maintain code quality and security
- Ensure all changes are reviewed before merging
- Keep the main repository clean and stable
- Allow contributors to work independently on features

### Development Workflow

1. **Fork the Repository**: Click the "Fork" button in the upper right corner of the [kubit-react-charts repository](https://github.com/kubit-ui/kubit-react-charts) on GitHub. This will create a copy of the repository in your GitHub account.

2. **Clone Your Fork**: Clone your forked repository to your local machine (not the original repository).

   ```sh
   git clone https://github.com/your-username/kubit-react-charts.git
   cd kubit-react-charts
   ```

3. **Add Original Repository as Upstream**: Add the original repository as a remote to keep your fork synchronized.

   ```sh
   git remote add upstream https://github.com/kubit-ui/kubit-react-charts.git
   git fetch upstream
   ```

4. **Install Dependencies**: This project uses **pnpm** as package manager.

   ```sh
   # Install pnpm if you don't have it
   npm install -g pnpm

   # Install dependencies
   pnpm install
   ```

5. **Create a Feature Branch**: Always create a new branch for your changes. Use proper branch naming conventions for automatic version detection.

   ```sh
   git checkout -b <branch-type>/<branch-name>
   ```

   **Branch naming patterns:**

   | Branch Pattern          | Version Bump | When to Use                    |
   | ----------------------- | ------------ | ------------------------------ |
   | `feat/` or `feature/`   | **MINOR**    | New features or chart types    |
   | `fix/` or `bugfix/`     | **PATCH**    | Bug fixes                      |
   | `break/` or `breaking/` | **MAJOR**    | Breaking changes               |
   | `hotfix/`               | **PATCH**    | Urgent fixes                   |
   | `chore/`                | **PATCH**    | Maintenance, deps, refactoring |
   | `docs/`                 | **PATCH**    | Documentation only             |
   | `style/`                | **PATCH**    | Code style/formatting          |
   | `refactor/`             | **PATCH**    | Code refactoring               |
   | `test/`                 | **PATCH**    | Adding or updating tests       |

6. **Make Changes**:
   - Make your changes to the codebase
   - Follow the coding standards
   - Add or update tests for your changes
   - Update documentation if necessary
   - Test your changes thoroughly

   **Development commands:**

   ```sh
   # Run Storybook for development
   pnpm start

   # Build the package
   pnpm dist

   # Run tests
   pnpm test

   # Run linting
   pnpm eslint

   # Format code
   pnpm prettier
   ```

7. **Commit Changes**: Use **conventional commit** messages for automatic versioning.

   ```
   <type>: <description>
   ```

   **Examples:**

   ```sh
   # Adding a new chart
   git commit -m "feat: add Tooltip component with accessibility support"

   # Fixing a bug
   git commit -m "fix: resolve button hover state color issue"

   # Breaking change
   git commit -m "feat!: redesign Modal API for better composition"

   # Documentation update
   git commit -m "docs: add usage examples for Button component"
   ```

8. **Keep Your Fork Updated**: Before pushing, sync with the upstream repository.

   ```sh
   git fetch upstream
   git rebase upstream/main
   ```

9. **Push to Your Fork**: Push your changes to your forked repository (never to the original).

   ```sh
   git push origin <branch-name>
   ```

10. **Open a Pull Request**:
    - Go to the original [kubit-react-charts repository](https://github.com/kubit-ui/kubit-react-charts)
    - Click "New pull request"
    - Select "compare across forks"
    - Choose your fork and branch as the source
    - **IMPORTANT:** Your PR title must follow conventional commits format

    **PR Title Format (Required):**

    ```
    <type>: <description>
    ```

    **Examples:**
    - ✅ `feat: add Tooltip component`
    - ✅ `fix: resolve button styling issue`
    - ✅ `feat!: redesign theme API`
    - ❌ `Added new component` (missing type)
    - ❌ `fix button issue` (missing colon)

---

## Automatic Publishing with Changesets

### How It Works

When you open a PR with proper branch naming:

1. **Automated validation** checks:
   - ✅ Branch name follows conventions
   - ✅ PR title follows conventional commits
   - ✅ TypeScript type checking passes
   - ✅ Tests pass
   - ✅ Linting passes
   - ✅ Code quality checks pass

2. **Bot comments** with:
   - Validation results
   - Expected version bump type

3. **On merge**:
   - Changeset is auto-generated based on your commits
   - Version is bumped
   - CHANGELOG is updated
   - Package is built and published to NPM
   - GitHub Release is created
   - PR comment confirms published version

**No manual changeset needed - it's all automatic!** 🚀

### Version Bump Detection

The system determines version bumps based on:

1. **Branch name** (primary):
   - `feat/` → MINOR
   - `fix/` → PATCH
   - `break/` or `breaking/` → MAJOR

2. **PR title** (secondary):
   - `feat:` → MINOR
   - `fix:` → PATCH
   - `break:` or `feat!:` → MAJOR
   - `BREAKING CHANGE:` in description → MAJOR

### Release Channels

This project supports three release channels:

#### 1. **Canary Releases** (develop/next branches)

- Automatic on push to `develop` or `next`
- Version format: `X.Y.Z-canary.SHA`
- Use case: Quick testing before beta

#### 2. **Beta Releases** (break/\* branches)

- Automatic on push to `break/**` branches
- Version format: `X.Y.Z-beta.N`
- Use case: Testing breaking changes

#### 3. **Production Releases** (main branch)

- Automatic on PR merge to `main`
- Version format: `X.Y.Z`
- Use case: Stable releases

---

## Complete Workflow Examples

### Example 1: Adding a New Chart Type (MINOR)

```sh
# 1. Create feature branch
git checkout -b feat/radar-chart

# 2. Make changes
# ... create Radar chart component ...

# 3. Commit with proper format
git add .
git commit -m "feat: add Radar chart component with customizable axes"
git commit -m "test: add unit tests for Radar chart"
git commit -m "docs: add Storybook story for Radar chart"

# 4. Push to your fork
git push origin feat/radar-chart

# 5. Create PR with title: "feat: add Radar chart component"
# Result after merge: @kubit-ui-web/react-charts 1.11.0 → 1.12.0
```

### Example 2: Fixing a Bug (PATCH)

```sh
# 1. Create fix branch
git checkout -b fix/line-chart-rendering

# 2. Fix the issue
# ... fix line chart rendering ...

# 3. Commit the fix
git add .
git commit -m "fix: resolve line chart rendering issue with large datasets"

# 4. Push to your fork
git push origin fix/line-chart-rendering

# 5. Create PR with title: "fix: resolve line chart rendering issue"
# Result after merge: @kubit-ui-web/react-charts 1.11.0 → 1.11.1
```

### Example 3: Breaking Change (MAJOR)

```sh
# 1. Create breaking change branch
git checkout -b break/chart-api-redesign

# 2. Make breaking changes
# ... restructure chart API ...

# 3. Commit with breaking change indicator
git add .
git commit -m "feat!: redesign chart API for better type safety"
git commit -m "docs: add migration guide for v2.0.0"

# 4. Push to your fork
git push origin break/chart-api-redesign

# 5. Create PR with title: "feat!: redesign chart API"
# PR description should include:
# "BREAKING CHANGE: Chart API has been redesigned. See migration guide."
# Result after merge: @kubit-ui-web/react-charts 1.11.0 → 2.0.0
```

---

## PR Validation Checks

When you open a PR, automated checks will validate:

### Required Checks (Must Pass)

✅ **Branch Naming** - Must follow `type/description` pattern
✅ **PR Title** - Must follow `type: description` format
✅ **TypeScript** - Type checking must pass
✅ **Tests** - All tests must pass
✅ **Linting** - Code style must be consistent

### Warning Checks (Non-blocking)

⚠️ **Title Length** - Should be ≤ 72 characters
⚠️ **Console Logs** - No `console.log` in production code
⚠️ **TODOs** - Must reference GitHub issues (e.g., `// TODO: #123`)

---

## Development Guidelines

### Code Quality

- **TypeScript**: All code must be properly typed
- **Testing**: Write unit tests for components
- **Accessibility**: Follow WCAG 2.1 AA standards
- **Performance**: Optimize bundle size and runtime performance
- **Documentation**: Update docs for new features

### Testing Your Changes

```sh
# Run all checks before pushing
pnpm test

# Or run individual checks
pnpm eslint          # Linting
pnpm vitest          # Tests
pnpm dist            # Build
```

---

## Requirements

Before contributing, ensure you have:

- **Node.js**: v22.x or higher
- **pnpm**: v10.x or higher
- **Git**: Latest version

Check your versions:

```sh
node --version  # Should show v22.x.x
pnpm --version  # Should show 10.x.x
```

---

## Important Notes for Contributors

- **Never push directly** to the main repository
- Always work on **your own fork** and create pull requests
- Keep your fork **synchronized** with the upstream repository
- **Test thoroughly** before submitting
- Include **screenshots or videos** for UI changes
- Update **Storybook stories** for component changes
- Follow the existing **code style** and patterns

---

## Getting Help

- 📖 [Documentation](https://github.com/kubit-ui/kubit-react-charts)
- 💬 [GitHub Discussions](https://github.com/kubit-ui/kubit-react-charts/discussions)
- 🐛 [Report Issues](https://github.com/kubit-ui/kubit-react-charts/issues)
- 📧 [Email Support](mailto:kubit.lab.dev@gmail.com)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please be respectful and inclusive in all interactions.

---

## License

By contributing to this project, you agree that your contributions will be licensed under the Apache-2.0 License.
