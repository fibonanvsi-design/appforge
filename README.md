# AppForge - Web App Platform dengan Visual Builder + Deploy

Build, customize and deploy your web apps from a single dashboard.

## 🚀 Live Demo

**Live URL:** [Deployed on Vercel](https://appforge.vercel.app)

## Features

- **Visual Code Editor** - Monaco Editor dengan syntax highlighting
- **Project Management** - Create, edit, dan manage multiple projects
- **Live Preview** - Real-time preview aplikasi
- **One-Click Deploy** - Deploy ke Vercel dengan satu tombol
- **Multi-Framework Support** - React, Next.js, Vue, dan Static HTML

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **Editor:** Monaco Editor (VS Code di browser)
- **Database:** PostgreSQL (Supabase/Vercel Postgres)
- **Auth:** NextAuth.js
- **Deployment:** Vercel

## Development Setup

```bash
# Clone repository
git clone <repository-url>
cd appforge

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Setup database
npx prisma migrate dev

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment ke Vercel

### Prerequisites

1. Akun Vercel
2. Database PostgreSQL (gunakan Vercel Postgres atau Supabase)

### Steps

1. **Fork/Clone repository ini**

2. **Setup Database:**
   - Buat database PostgreSQL di Vercel atau Supabase
   - Copy connection string

3. **Deploy ke Vercel:**
   ```bash
   vercel login
   vercel link
   vercel env add DATABASE_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXTAUTH_URL
   vercel --prod
   ```

4. **Run migrations:**
   ```bash
   vercel env pull .env
   npx prisma migrate deploy
   ```

### Environment Variables

```
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_SECRET=your_secret_key_minimum_32_characters
NEXTAUTH_URL=https://your-app.vercel.app
```

## Usage Flow

1. **Register** → Buat akun baru
2. **Login** → Masuk ke dashboard
3. **Create Project** → Pilih framework dan template
4. **Edit Code** → Gunakan Monaco editor
5. **Preview** → Lihat hasil secara real-time
6. **Deploy** → Deploy ke production dengan satu klik

## API Endpoints

- `POST /api/auth/register` - Register user baru
- `GET /api/projects` - List semua projects
- `POST /api/projects` - Buat project baru
- `GET /api/projects/[id]` - Detail project
- `POST /api/projects/[id]/files` - Save file
- `POST /api/projects/[id]/deploy` - Deploy project

## License

MIT

## Author

Built with ❤️ using Next.js
