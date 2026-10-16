# SBADA

### Smart Business Analytics Dashboard

SBADA is a web-based business analytics dashboard designed to manage sales data, monitor business performance, and provide analytical insights through data visualization.

## Tech Stack

### Backend

- PHP
- Laravel
- Composer

### Frontend

- React
- TypeScript
- Inertia.js
- Tailwind CSS
- Lucide React

### Database

- PostgreSQL

### Development Tools

- Node.js
- NPM
- Vite
- Git & GitHub

## System Requirements

- PHP 8.4.21
- Composer 2.7.2
- NPM 10.9.2
- Database PostgreSQL 18.4

## Installation

1. Clone the repository.

    ```bash
    git clone [repository-url]
    cd sbada
    ```

2. Install PHP dependencies.

    ```bash
    composer install
    ```

3. Install frontend dependencies.

    ```bash
    npm install
    ```

4. Create environment configuration.

    ```bash
    cp .env.example .env
    ```

5. Generate application key.

    ```bash
    php artisan key:generate
    ```

6. Configure database credentials in `.env`.

7. Run database migrations.

    ```bash
    php artisan migrate
    ```

8. Start the development servers.

    Terminal 1:

    ```bash
    php artisan serve
    ```

    Terminal 2:

    ```bash
    npm run dev
    ```

## Project Documentation

For detailed information about the development environment, dependencies, and technology versions, see:

- [Environment Documentation](docs/ENVIRONMENT.md)

## License

This project is developed for prototype (not final product) and portfolio purposes.
