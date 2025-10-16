## Contributing

We welcome contributions to **kubit-react-charts**! This project is open source and we encourage community participation through **forks and pull requests**. All contributions must be made through the fork workflow - we do not accept direct pushes to the main repository.

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

4. **Create a Feature Branch**: Always create a new branch for your changes. Use proper branch naming conventions for automatic version detection.

   ```sh
   git checkout -b <branch-type>/<branch-name>
   ```

5. **Make Changes**: 
   - Make your changes to the kubit-react-charts codebase
   - Follow the coding standards outlined in our style guide
   - Add or update tests for your changes
   - Update documentation if necessary
   - Test your changes thoroughly using `npm test`

6. **Commit Changes**: Use conventional commit messages for automatic versioning.

   ```sh
   git commit -m "feat(charts): add new scatter plot chart component"
   ```

7. **Keep Your Fork Updated**: Before pushing, sync with the upstream repository.

   ```sh
   git fetch upstream
   git rebase upstream/main
   ```

8. **Push to Your Fork**: Push your changes to your forked repository (never to the original).

   ```sh
   git push origin <branch-name>
   ```

9. **Open a Pull Request**: 
   - Go to the original [kubit-react-charts repository](https://github.com/kubit-ui/kubit-react-charts)
   - Click "New pull request"
   - Select "compare across forks"
   - Choose your fork and branch as the source
   - Fill out the PR template with details about your changes
   - Submit the pull request for review

### Branch Naming & Automatic Publishing

This repository uses an **automatic publishing system** that determines the version bump based on your branch name and PR content. When your PR is merged, the package will be automatically published to NPM.

#### Branch Naming Patterns

Use these branch prefixes for kubit-react-charts to ensure automatic publishing works correctly:

| Branch Pattern | Version Bump | Example | Description |
|----------------|--------------|---------|-------------|
| `feat/` or `feature/` | **MINOR** | `feat/scatter-plot` | New chart types or features |
| `fix/` or `bugfix/` | **PATCH** | `fix/line-chart-rendering` | Bug fixes in charts |
| `break/` or `breaking/` | **MAJOR** | `break/remove-old-chart-api` | Breaking API changes |
| `hotfix/` | **PATCH** | `hotfix/critical-chart-bug` | Urgent chart fixes |
| `chore/` | **PATCH** | `chore/update-d3-version` | Maintenance tasks |

#### Advanced Version Detection

The system also analyzes your **PR title** and **description** for more precise version detection:

##### MAJOR (Breaking Changes)
- `BREAKING CHANGE:` in PR description
- `!` in PR title (e.g., `feat!: redesign button API`)
- `[breaking]` tag in PR title
- Conventional commits with `!` (e.g., `feat(api)!: change interface`)

##### MINOR (New Features)
- PR titles starting with `feat:` or `feature:`
- `[feature]` tag in PR title
- Conventional commits like `feat(charts): add bubble chart component`

##### PATCH (Bug Fixes & Others)
- PR titles starting with `fix:` or `bugfix:`
- All other changes (default behavior)
- Conventional commits like `fix(pieChart): tooltip positioning issue`

#### Examples for kubit-react-charts

**Adding a new chart type:**
```sh
git checkout -b feat/radar-chart
# Make your changes in your fork
git commit -m "feat(charts): add radar chart component with customizable axes"
# Create PR with title: "feat(charts): add radar chart component"
# Result: MINOR version bump (e.g., 1.0.0 → 1.1.0)
```

**Fixing a chart rendering bug:**
```sh
git checkout -b fix/line-chart-data-points
# Make your changes in your fork
git commit -m "fix(lineChart): resolve data point alignment issue with large datasets"
# Create PR with title: "fix(lineChart): resolve data point alignment issue"
# Result: PATCH version bump (e.g., 1.0.0 → 1.0.1)
```

**Breaking API changes:**
```sh
git checkout -b break/chart-props-restructure
# Make your changes in your fork
git commit -m "feat!: restructure chart component props for better consistency"
# Create PR with title: "feat!: restructure chart component props"
# PR description: "BREAKING CHANGE: Chart props have been restructured for better consistency..."
# Result: MAJOR version bump (e.g., 1.0.0 → 2.0.0)
```

### Important Notes for Contributors

- **Never push directly** to the main kubit-react-charts repository
- Always work on **your own fork** and create pull requests
- Keep your fork **synchronized** with the upstream repository
- **Test your charts** thoroughly before submitting
- Include **screenshots or demos** of new chart types in your PR
- Update **Storybook stories** for new components
- Follow the existing **code style** and patterns used in the project