# QuMail Backend

A secure, quantum-resistant email key management backend service built with Node.js and Express.

## Features

- **Quantum Key Management**: Generate and manage quantum-resistant encryption keys
- **Mail Metadata Handling**: Store and retrieve encrypted mail metadata
- **RESTful API**: Clean, modern REST API design
- **SQLite Database**: Lightweight, serverless database for data persistence
- **CORS Support**: Cross-origin resource sharing enabled
- **Comprehensive Testing**: Jest test suite included

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Git**

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tPrakash2305/qumail-backend.git
   cd qumail-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)

   Create a `.env` file in the root directory for any sensitive configuration:

   ```bash
   # .env file (DO NOT commit this file)
   PORT=4000
   NODE_ENV=development
   GITHUB_TOKEN=your_token_here
   ```

4. **Start the server**

   ```bash
   npm start
   ```

   The server will start at `http://localhost:4000`

## Project Structure

```
QuMail_Backend/
├── config/
│   ├── database.js      # Database configuration
│   └── db.js           # Database connection
├── controllers/
│   ├── keyController.js    # Key management logic
│   └── mailController.js   # Mail handling logic
├── models/
│   ├── key.js          # Key data model
│   ├── ledger.js       # Ledger model
│   └── mailMetaData.js # Mail metadata model
├── routes/
│   ├── keyRoutes.js    # Key API routes
│   └── mailRoutes.js   # Mail API routes
├── tests/
│   └── api.test.js     # API test suite
├── utils/
│   ├── cryptoUtil.js   # Cryptographic utilities
│   └── cryptoUtils.js  # Additional crypto helpers
├── server.js           # Main application entry point
├── package.json        # Project dependencies
└── jest.config.js      # Jest configuration
```

## API Endpoints

### Root

- `GET /` - API status and available endpoints

### Keys

- `POST /api/keys` - Generate a new quantum key
- `GET /api/keys` - Retrieve all keys
- `GET /api/keys/:id` - Retrieve a specific key
- `DELETE /api/keys/:id` - Delete a key

### Mails

- `POST /api/mails` - Create new mail metadata
- `GET /api/mails` - Retrieve all mail metadata
- `GET /api/mails/:id` - Retrieve specific mail metadata
- `PUT /api/mails/:id` - Update mail metadata
- `DELETE /api/mails/:id` - Delete mail metadata

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Security Best Practices

### Important Security Notes

**WARNING: Never commit secrets to version control!**

1. **Use Environment Variables**

   - Store sensitive data (API keys, tokens, passwords) in environment variables
   - Use a `.env` file locally (add it to `.gitignore`)
   - Example:
     ```javascript
     const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
     ```

2. **Rotate Exposed Credentials**

   - If a token or key is accidentally committed, rotate it immediately
   - Revoke the old token on the service provider (GitHub, AWS, etc.)
   - Create a new token and update your environment variables

3. **Use `.gitignore`**

   - Ensure `.env`, config files with secrets, and database files are ignored
   - Example `.gitignore`:
     ```
     node_modules/
     .env
     *.db
     *.sqlite
     *.log
     .DS_Store
     ```

4. **Enable GitHub Secret Scanning**
   - GitHub's push protection is already active on this repository
   - This prevents accidental secret commits

## Development

### Adding New Features

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:

   ```bash
   git add .
   git commit -m "Add: your feature description"
   ```

3. Push to GitHub:

   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request on GitHub

### Code Style

- Use meaningful variable names
- Add comments for complex logic
- Follow existing code patterns
- Write tests for new features

## Environment Variables

Create a `.env` file with the following variables:

```bash
# Server Configuration
PORT=4000
NODE_ENV=development

# GitHub Integration (if needed)
GITHUB_TOKEN=your_personal_access_token_here
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name

# Database (optional, defaults to SQLite)
DB_PATH=./data/qumail.db
```

**Remember:** Never commit the `.env` file to version control!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Authors

- **tPrakash2305** - [GitHub Profile](https://github.com/tPrakash2305)

## Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/tPrakash2305/qumail-backend/issues) page to report bugs or request features.

## Support

For questions or support, please open an issue on GitHub.

## Recent Updates

### Security Improvements

- Removed hardcoded secrets from codebase
- Implemented environment variable usage
- Added security documentation
- Enabled GitHub secret scanning protection

---

**Built for secure quantum-resistant communications**
