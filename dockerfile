FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy source
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start development server with host binding
CMD ["pnpm", "run", "dev", "--host"]